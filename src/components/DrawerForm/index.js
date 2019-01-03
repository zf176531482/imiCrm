import React from 'react';
import { connect } from 'dva';
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

@connect(({ asset, loading }) => ({
  asset,
  loading: loading.models.asset,
}))
class FormDrawer extends React.Component {
  state = {
    visible: false,
    spareDisabled: true,
    childrenDrawer: false,
    selectChildrenRows: [],
    chooseRows: [],
    data: {},
  };

  uploadParams = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values);
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  onClose = () => {
    this.setState({
      selectChildrenRows: [],
      chooseRows: [],
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
    dispatch({
      type: 'asset/fetch',
    });
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
        console.log(this.state.chooseRows);
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
          loading={loading}
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
    let assetInfo = Object.keys(data)
      .filter(item => item != 'resource_uri')
      .map((item, index) => (
        <span key={index} className={styles.infoAsset}>
          {data[item]}
        </span>
      ));
    return assetInfo;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { spareDisabled, visible, childrenDrawer } = this.state;
    return (
      <Drawer
        style={{
          overflow: 'auto',
          height: 'calc(100% - 108px)',
          paddingBottom: '108px',
        }}
        title="Add Report"
        width={650}
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
            <Col span={10}>
              <Form.Item label="Period">
                {getFieldDecorator('period', {
                  rules: [{ required: true, message: 'Please choose the period' }],
                })(
                  <DatePicker.RangePicker
                    format={'MM/DD/YYYY'}
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
                  rules: [{ required: true, message: 'Please choose the attach report' }],
                })(
                  <Upload {...this.uploadParams}>
                    <Button type="dashed">
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
          <Button onClick={this.handleSubmit} type="primary">
            Submit
          </Button>
        </div>
      </Drawer>
    );
  }
}

const DrawerForm = Form.create()(FormDrawer);

export default DrawerForm;
