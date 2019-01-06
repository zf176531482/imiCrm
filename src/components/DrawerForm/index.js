import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Form,
  Icon,
  Button,
  Drawer,
  Input,
  DatePicker,
  Upload,
  message,
  Checkbox,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import styles from './index.less';

@connect(({ asset, service, loading }) => ({
  asset,
  service,
  loading: loading.models.asset,
  reportloading: loading.models.service,
}))
class FormDrawer extends React.Component {
  state = {
    visible: false,
    spareDisabled: true,
    childrenDrawer: false,
    selectChildrenRows: [],
    chooseRows: [],
    data: {},
    fileList: [],
  };

  componentDidMount() {
    this.setState({ visible: this.props.visible });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.visible != nextProps.visible) {
      this.setState({ visible: nextProps.visible });
    }
    if (this.state.data != nextProps.data) {
      this.setState({ data: nextProps.data });
    }
  }

  normFile = e => {
    this.setState({ fileList: e.fileList });
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  uploadFile = res => {
    console.log(res.id);
    console.log(this.state.fileList[0].originFileObj);
    const { dispatch } = this.props;
    let formData = new FormData();
    formData.append('service_id', res.id);
    formData.append('file', this.state.fileList[0].originFileObj);
    dispatch({
      type: 'service/connectFileReport',
      payload: formData,
      callback: () => {
        message.success('Create success');
        this.onClose();
      },
    });
  };

  handleSubmit = e => {
    const { chooseRows, data, spareDisabled } = this.state;
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'service/createReport',
          payload: {
            asset: data.resource_uri,
            period_start: values.period[0].format(),
            period_end: values.period[1].format(),
            problem_description: values.description,
            root_cause: values.rootCause,
            action_taken: values.actionTaken,
            spare_part_needed: !spareDisabled,
            spare_detail: spareDisabled ? '' : values.sparePartDetail,
            extra_assets: chooseRows.map(item => item.resource_uri),
          },
          callback: this.uploadFile,
        });
      }
    });
  };

  onClose = () => {
    this.setState({
      spareDisabled: true,
      selectChildrenRows: [],
      chooseRows: [],
      fileList: [],
    });
    this.props.onClose();
  };

  onChange = e => {
    this.setState({ spareDisabled: !e.target.checked }, () => {
      this.props.form.validateFields(['sparePartDetail'], { force: true });
    });
  };

  showChildrenDrawer = () => {
    let { chooseRows } = this.state;
    this.setState({
      selectChildrenRows: chooseRows,
      childrenDrawer: true,
    });
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'asset/fetch',
    // });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };

  childrenSubmit = () => {
    let { selectChildrenRows } = this.state;
    this.setState(
      {
        chooseRows: selectChildrenRows,
        childrenDrawer: false,
      },
      () => {
        // console.log(this.state.chooseRows);
      }
    );
  };

  clearRow = index => {
    let rows = [...this.state.chooseRows];
    rows.splice(index, 1);
    this.setState({ chooseRows: rows });
  };

  renderChildrenDrawer = () => {
    let columns = [
      {
        title: 'Serial',
        dataIndex: 'serial',
      },
      {
        title: 'Product Type',
        dataIndex: 'product_type',
      },
      {
        title: 'Model',
        dataIndex: 'model',
      },
    ];

    let { selectChildrenRows } = this.state;

    const {
      asset: { data },
      loading,
    } = this.props;

    return (
      <div>
        <StandardTable
          rowKey={record => record.id}
          selectedRows={selectChildrenRows}
          // loading={loading}
          data={data}
          columns={columns}
          hasPagination={false}
          onSelectRow={rows => {
            this.setState({ selectChildrenRows: rows });
          }}
          // onChange={this.handleStandardTableChange}
        />
        <div className={styles.btnContainer}>
          <Button onClick={this.onChildrenDrawerClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={this.childrenSubmit} type="primary">
            Submit
          </Button>
        </div>
      </div>
    );
  };

  renderAssets = () => {
    let { chooseRows } = this.state;
    let data = [];
    chooseRows.map((item, index) => {
      data.push(
        <div key={index} className={styles.rows}>
          <Icon type="file-text" style={{ margin: '0 5px' }} />
          {item.serial}
          <Icon
            type="close"
            className={styles.close}
            onClick={() => {
              this.clearRow(index);
            }}
          />
        </div>
      );
    });
    return data;
  };

  renderInfoAsset = () => {
    let { data } = this.state;
    let assetInfo =
      data &&
      Object.keys(data)
        .filter(
          item =>
            item != 'resource_uri' && item != 'id' && item != 'sfdc_account' && item != 'plant_name'
        )
        .map((item, index) => (
          <span key={index} className={styles.infoAsset}>
            {data[item]}
          </span>
        ));
    return assetInfo;
  };

  render() {
    const { getFieldDecorator, setFieldsValue } = this.props.form;
    const { spareDisabled, visible, childrenDrawer, fileList } = this.state;
    const { reportloading } = this.props;
    return (
      <Drawer
        style={{
          overflow: 'auto',
          height: 'calc(100% - 108px)',
          paddingBottom: '108px',
        }}
        title="Add Report"
        width={700}
        onClose={this.onClose}
        visible={visible}
        destroyOnClose={true}
      >
        <Form layout="vertical" hideRequiredMark>
          <Row>
            <Col span={24}>
              <Form.Item label="Asset Information" className={styles.label}>
                <div className={styles.assetInfoContainer}>{this.renderInfoAsset()}</div>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Period">
                {getFieldDecorator('period', {
                  rules: [{ required: true, message: 'Please choose the period' }],
                })(
                  <DatePicker.RangePicker
                    showTime={{
                      hideDisabledOptions: true,
                      defaultValue: [
                        moment('00:00:00', 'HH:mm:ss'),
                        moment('23:59:59', 'HH:mm:ss'),
                      ],
                    }}
                    format={'MM/DD/YYYY, HH:mm:ss'}
                    getPopupContainer={trigger => trigger.parentNode}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Attach Report">
                {getFieldDecorator('attachreport', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                  rules: [{ required: true, message: 'Please choose the attach report' }],
                })(
                  <Upload>
                    <Button type="dashed" disabled={!!fileList.length}>
                      <Icon type="upload" /> Click to upload
                    </Button>
                  </Upload>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Root Cause">
                {getFieldDecorator('rootCause', {
                  rules: [
                    {
                      required: true,
                      message: 'please enter root cause',
                    },
                  ],
                })(<Input rows={1} placeholder="please enter root cause" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Action taken">
                {getFieldDecorator('actionTaken', {
                  rules: [
                    {
                      required: true,
                      message: 'please enter action taken',
                    },
                  ],
                })(<Input rows={1} placeholder="please enter action taken" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Problem Description">
                {getFieldDecorator('description', {
                  rules: [
                    {
                      required: true,
                      message: 'please enter problem description',
                    },
                  ],
                })(<Input.TextArea rows={2} placeholder="please enter problem description" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Checkbox style={{ paddingBottom: '8px' }} onChange={this.onChange}>
                Spare Part Need
              </Checkbox>
              <Form.Item>
                {getFieldDecorator('sparePartDetail', {
                  rules: [
                    {
                      required: !spareDisabled,
                      message: 'please enter spare part detail',
                    },
                  ],
                })(
                  <Input.TextArea
                    rows={2}
                    disabled={spareDisabled}
                    placeholder="please enter spare part detail"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Button onClick={this.showChildrenDrawer} type="dashed">
                Add Assets <Icon type="plus" />
              </Button>
              {this.renderAssets()}
            </Col>

            <Drawer
              title="Add Assets"
              width={650}
              closable={false}
              onClose={this.onChildrenDrawerClose}
              visible={childrenDrawer}
              destroyOnClose={true}
            >
              {this.renderChildrenDrawer()}
            </Drawer>
          </Row>
        </Form>
        <div className={styles.btnContainer}>
          <Button onClick={this.onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} type="primary" loading={reportloading}>
            Submit
          </Button>
        </div>
      </Drawer>
    );
  }
}

const DrawerForm = Form.create()(FormDrawer);

export default DrawerForm;
