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
} from 'antd';
import styles from './index.less';

class DetailDrawer extends React.Component {
  state = {
    visible: false,
    disabledFlag: true,
  };

  componentDidMount() {
    this.setState({ visible: this.props.visible });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.visible != nextProps.visible) {
      this.setState({ visible: nextProps.visible });
    }
  }

  onClose = () => {
    this.props.onClose();
  };

  renderAssets = type => {
    let data = [];
    for (let index = 0; index < 4; index++) {
      data.push(
        <div key={index} className={styles.rows} style={{ marginBottom: index == 3 ? 0 : '10px' }}>
          <Icon type={type ? 'paper-clip' : 'file-text'} style={{ margin: '0 5px' }} /> 1111111
        </div>
      );
    }
    return data;
  };

  render() {
    const { disabledFlag, visible } = this.state;
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
        <Form layout="vertical" hideRequiredMark className={styles.drawerDetail}>
          <Row>
            <Col span={24}>
              <Form.Item label="Asset Information" className={styles.label}>
                <div className={styles.assetInfoContainer}>
                  <span className={styles.infoAsset}>Hebi coal power</span>
                  <span className={styles.infoAsset}>Power</span>
                  <span className={styles.infoAsset}>Coal</span>
                  <span className={styles.infoAsset}>902808-01</span>
                  <span className={styles.infoAsset}>Conventional</span>
                  <span className={styles.infoAsset}>840H</span>
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item label="Period">
                <DatePicker.RangePicker
                  disabled={disabledFlag}
                  format={'MM/DD/YYYY'}
                  getPopupContainer={trigger => trigger.parentNode}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Attach Report">{this.renderAssets(true)}</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Add Assets">{this.renderAssets()}</Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Other Description">
                <Input rows={1} placeholder="please enter root cause" disabled={disabledFlag} />
                <Input
                  style={{ marginTop: '10px' }}
                  rows={1}
                  placeholder="please enter action taken"
                  disabled={disabledFlag}
                />
                <Input.TextArea
                  style={{ marginTop: '10px' }}
                  rows={2}
                  placeholder="please enter problem description"
                  disabled={disabledFlag}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Spare Part Need">
                <Input.TextArea
                  rows={2}
                  placeholder="please enter spare part detail"
                  disabled={disabledFlag}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    );
  }
}

const DrawerDetail = Form.create()(DetailDrawer);

export default DrawerDetail;
