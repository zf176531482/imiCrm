import React from 'react';
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
  Spin,
} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import { getHost } from '@/utils/utils';
import styles from './index.less';

@connect(({ service, loading }) => ({
  service,
  loading: loading.effects['service/fetchReport'],
}))
class DetailDrawer extends React.Component {
  state = {
    visible: false,
    disabledFlag: true,
    data: null,
  };

  componentDidMount() {
    this.setState({ visible: this.props.visible });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.visible != nextProps.visible) {
      this.setState({ visible: nextProps.visible });
      if (nextProps.visible) {
        const { dispatch } = this.props;
        dispatch({
          type: 'service/fetchReport',
          payload: {
            order_by: '-id',
            asset__id: nextProps.data.id,
          },
        });
      }
    }
    if (nextProps.data && this.state.data != nextProps.data) {
      this.setState({ data: nextProps.data });
    }
  }

  onClose = () => {
    this.props.onClose();
  };

  renderFiles = fileUrl => {
    if (!fileUrl) {
      return <span style={{ marginLeft: '5px' }}>-</span>;
    }

    return (
      <a className={styles.rows} href={`${getHost() + fileUrl}`} target="_blank">
        <Icon type="paper-clip" style={{ margin: '0 5px' }} /> {fileUrl.split('/').pop()}
      </a>
    );
  };

  renderAssets = assets => {
    if (!assets || !assets.length) {
      return <span style={{ marginLeft: '5px' }}>-</span>;
    }

    let data = assets.map((item, index) => {
      return (
        <div
          key={index}
          className={styles.rows}
          style={{ marginBottom: index == assets.length - 1 ? 0 : '5px' }}
        >
          <Icon type="file-text" style={{ margin: '0 5px' }} /> {item.serial}
        </div>
      );
    });

    return data;
  };

  renderInfoAsset = () => {
    let { data } = this.state;
    !data && (data = {});
    return (
      <Row gutter={16}>
        <Col span={12}>
          <Row gutter={16} style={{ marginTop: '3px' }}>
            <Col span={8} style={{ textAlign: 'right' }}>
              Serial :
            </Col>
            <Col span={16}>{data.serial}</Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={16} style={{ marginTop: '3px' }}>
            <Col span={8} style={{ textAlign: 'right' }}>
              Industry :
            </Col>
            <Col span={16}>{data.industry}</Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={16} style={{ marginTop: '3px' }}>
            <Col span={8} style={{ textAlign: 'right' }}>
              Application :
            </Col>
            <Col span={16}>{data.application}</Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={16} style={{ marginTop: '3px' }}>
            <Col span={8} style={{ textAlign: 'right' }}>
              Model :
            </Col>
            <Col span={16}>{data.model}</Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={16} style={{ marginTop: '3px' }}>
            <Col span={4} style={{ textAlign: 'right' }}>
              Plant Name :
            </Col>
            <Col span={20}>{data.plant_name}</Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={16} style={{ marginTop: '3px' }}>
            <Col span={4} style={{ textAlign: 'right' }}>
              Plant Type :
            </Col>
            <Col span={20}>{data.plant_type}</Col>
          </Row>
        </Col>
      </Row>
    );
  };

  render() {
    const {
      service: { report },
      loading,
    } = this.props;
    const { disabledFlag, visible, data } = this.state;

    return (
      <Drawer
        style={{
          overflow: 'auto',
          height: 'calc(100% - 108px)',
          paddingBottom: '108px',
        }}
        title="View History"
        width={700}
        onClose={this.onClose}
        visible={visible}
        destroyOnClose={true}
      >
        <Spin spinning={loading}>
          <Form layout="vertical" hideRequiredMark className={styles.drawerDetail}>
            <Row>
              <Col span={24}>
                <Form.Item
                  label="Asset Information"
                  className={styles.label}
                  style={{ marginBottom: '15px' }}
                >
                  {this.renderInfoAsset()}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Period">
                  <DatePicker.RangePicker
                    value={
                      report.period_start && report.period_end
                        ? [moment(report.period_start), moment(report.period_end)]
                        : []
                    }
                    disabled={this.state.disabledFlag}
                    format={'MM/DD/YYYY'}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Attach Report">{this.renderFiles(report.service_file)}</Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Other Assets">{this.renderAssets(report.extra_assets)}</Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Other Description">
                  <Input rows={1} disabled={disabledFlag} value={report.root_cause} />
                  <Input
                    style={{ marginTop: '10px' }}
                    rows={1}
                    disabled={disabledFlag}
                    value={report.action_taken}
                  />
                  <Input.TextArea
                    style={{ marginTop: '10px' }}
                    rows={2}
                    disabled={disabledFlag}
                    value={report.problem_description}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label="Spare Part Need">
                  <Input.TextArea rows={2} disabled={disabledFlag} value={report.spare_detail} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Drawer>
    );
  }
}

const DrawerDetail = Form.create()(DetailDrawer);

export default DrawerDetail;
