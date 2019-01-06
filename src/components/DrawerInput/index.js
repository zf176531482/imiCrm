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
  Select,
  Upload,
  message,
  Checkbox,
  Radio,
} from 'antd';
import { connect } from 'dva';
import StandardTable from '@/components/StandardTable';
import styles from './index.less';
import { INDUSTRY, PLANT_TYPE, PRODUCT_TYPE } from '@/utils/constants';

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
        const { dispatch } = this.props;
        dispatch({
          type: 'upgrade/input',
          payload: {
            application: values.application,
            country: values.country,
            industry: values.industry,
            location: values.location,
            maker: values.maker,
            model: values.model,
            plant_name: values.plantName,
            plant_type: values.plantType,
            typical_problem: values.problemDescription,
            product_type: values.productType,
          },
          callback: res => {
            if (res) {
              this.onClose();
              message.success('Create success');
              dispatch({
                type: 'upgrade/opportunity',
              });
            }
          },
        });
      }
    });
  };

  onClose = () => {
    this.props.onClose();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { spareDisabled, visible, childrenDrawer } = this.state;
    const { loading } = this.props;
    return (
      <Drawer
        style={{
          overflow: 'auto',
          height: 'calc(100% - 108px)',
          paddingBottom: '108px',
        }}
        title="Input"
        width={700}
        onClose={this.onClose}
        visible={visible}
        destroyOnClose={true}
      >
        <Form layout="vertical" hideRequiredMark className={styles.drawerInput}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Industry">
                {getFieldDecorator('industry', {
                  rules: [{ required: true, message: 'Please Select Industry!' }],
                })(
                  <Select
                    showSearch
                    placeholder="Select Industry"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {INDUSTRY.map((item, index) => {
                      return (
                        <Select.Option key={index} value={item}>
                          {item}
                        </Select.Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Plant Type">
                {getFieldDecorator('plantType', {
                  rules: [{ required: true, message: 'Please Select Plant Type!' }],
                })(
                  <Select
                    showSearch
                    placeholder="Select Plant Type"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {PLANT_TYPE.map((item, index) => {
                      return (
                        <Select.Option key={index} value={item}>
                          {item}
                        </Select.Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Product Type">
                {getFieldDecorator('productType', {
                  rules: [{ required: true, message: 'Please Select Product Type!' }],
                })(
                  <Select
                    showSearch
                    placeholder="Select Product Type"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {PRODUCT_TYPE.map((item, index) => {
                      return (
                        <Select.Option key={index} value={item}>
                          {item}
                        </Select.Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Country">
                {getFieldDecorator('country', {
                  rules: [
                    {
                      required: true,
                      message: 'Please Enter Country',
                    },
                  ],
                })(<Input placeholder="Enter Country" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Application">
                {getFieldDecorator('application', {
                  rules: [
                    {
                      required: true,
                      message: 'Please Enter Application',
                    },
                  ],
                })(<Input placeholder="Enter Application" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
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
            <Col span={12}>
              <Form.Item label="Location">
                {getFieldDecorator('location', {
                  rules: [
                    {
                      required: true,
                      message: 'Please Enter Location',
                    },
                  ],
                })(<Input placeholder="Enter Location" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
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
            <Col span={12}>
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
          <Button onClick={this.handleSubmit} type="primary" loading={loading}>
            Submit
          </Button>
        </div>
      </Drawer>
    );
  }
}

const DrawerInput = Form.create()(InputDrawer);

export default DrawerInput;
