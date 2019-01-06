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
      return <span style={{ marginLeft: '5px' }}>--</span>;
    }

    return (
      <a className={styles.rows} href={`${getHost() + fileUrl}`} target="_blank">
        <Icon type="paper-clip" style={{ margin: '0 5px' }} /> {fileUrl.split('/').pop()}
      </a>
    );
  };

  renderAssets = assets => {
    if (!assets || !assets.length) {
      return <span style={{ marginLeft: '5px' }}>--</span>;
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
                <Form.Item label="Asset Information" className={styles.label}>
                  <div className={styles.assetInfoContainer}>{this.renderInfoAsset()}</div>
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
                    format={'MM/DD/YYYY, HH:mm:ss'}
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
                <Form.Item label="Add Assets">{this.renderAssets(report.extra_assets)}</Form.Item>
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
