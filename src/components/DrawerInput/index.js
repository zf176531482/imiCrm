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
  Radio,
} from 'antd';
import { connect } from 'dva';
import StandardTable from '@/components/StandardTable';
import styles from './index.less';

@connect(({ upgrade, loading }) => ({
  upgrade,
  loading: loading.effects['upgrade/input'],
}))
class InputDrawer extends React.Component {
  state = {
    visible: false,
  };

  componentDidMount() {
    this.setState({ visible: this.props.visible });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.visible != nextProps.visible) {
      this.setState({ visible: nextProps.visible });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values);
      if (!err) {
        // dispatch({
        //   type: 'upgrade/input',
        //   payload: {
        //     "application": "{string}",
        //     "id": 1,
        //     "industry": "{string",
        //     "plant_type": "{string",
        //   },
        //   callback: () => {
        //     message.success('Create success');
        //     this.onClose();
        //   },
        // });
      }
    });
  };

  onClose = () => {
    this.props.onClose();
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
        title="Input"
        width={510}
        onClose={this.onClose}
        visible={visible}
        destroyOnClose={true}
      >
        <Form layout="vertical" hideRequiredMark className={styles.drawerInput}>
          <Row>
            <Col span={24}>
              <Form.Item label="Industry">
                <Radio.Group defaultValue="a" buttonStyle="solid">
                  <Radio.Button value="a" className={styles.radio}>
                    Power (3)
                  </Radio.Button>
                  <Radio.Button value="b" className={styles.radio}>
                    Oil & Gas (5)
                  </Radio.Button>
                  <Radio.Button value="c" className={styles.radio}>
                    Petrochemical
                  </Radio.Button>
                  <Radio.Button value="d" className={styles.radio}>
                    Industrial
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Plant Type">
                <Radio.Group defaultValue="a" buttonStyle="solid">
                  <Radio.Button value="a" className={styles.radio}>
                    Power (3)
                  </Radio.Button>
                  <Radio.Button value="b" className={styles.radio}>
                    Oil & Gas (5)
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Application">
                <Radio.Group defaultValue="a" buttonStyle="solid">
                  <Radio.Button value="a" className={styles.radio}>
                    Power (3)
                  </Radio.Button>
                  <Radio.Button value="b" className={styles.radio}>
                    Oil & Gas (5)
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Plant Name">
                {getFieldDecorator('plantName', {
                  rules: [
                    {
                      required: true,
                      message: 'Please Enter Plant Name',
                    },
                  ],
                })(<Input placeholder="Enter Plant Name" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Loaction">
                {getFieldDecorator('loaction', {
                  rules: [
                    {
                      required: true,
                      message: 'Please Enter Loaction',
                    },
                  ],
                })(<Input placeholder="Enter Loaction" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Maker">
                {getFieldDecorator('maker', {
                  rules: [
                    {
                      required: true,
                      message: 'Please Enter Maker',
                    },
                  ],
                })(<Input placeholder="Enter Maker" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Model">
                {getFieldDecorator('model', {
                  rules: [
                    {
                      required: true,
                      message: 'Please Enter Model',
                    },
                  ],
                })(<Input placeholder="Enter Model" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Problem Description">
                {getFieldDecorator('problemDescription', {
                  rules: [
                    {
                      required: true,
                      message: 'Please Enter Problem Description',
                    },
                  ],
                })(<Input.TextArea placeholder="Enter Problem Description" />)}
              </Form.Item>
            </Col>
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

const DrawerInput = Form.create()(InputDrawer);

export default DrawerInput;
