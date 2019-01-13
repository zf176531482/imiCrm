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
import { oppCreatType, DATA_BASE } from '@/utils/constants';

@connect(({ filter, upgrade, loading }) => ({
  filter,
  upgrade,
  loading: loading.effects['upgrade/input'],
  filterloading: loading.models.filter,
}))
class InputDrawer extends React.Component {
  state = {
    visible: false,
    selectedRow: '',
    selectOptions: oppCreatType(),
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
            plant_type: values.plant_type,
            typical_problem: values.problemDescription,
            product_type: values.product_type,
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

  onFocus = (selectItem, selectedRow) => {
    this.setState({ selectedRow: selectedRow });

    const { selectOptions } = this.state;
    const { dispatch } = this.props;

    if (
      (!selectItem.options.length &&
        selectOptions[selectedRow - 1] &&
        selectOptions[selectedRow - 1].selectValue) ||
      (!selectItem.options.length && selectedRow == 0)
    ) {
      const filter_list = {};
      selectOptions
        .filter(item => item.selectValue && item.key != 'product_type')
        .map(item => {
          filter_list[item.key] = item.selectValue;
        });

      dispatch({
        type: 'filter/fetch',
        payload: {
          cls: DATA_BASE.PLANT_INPUT,
          param: selectItem.key,
          filter_list,
        },
        callback: res => {
          selectOptions[selectedRow].options = res.data;
          this.setState({ selectOptions: selectOptions });
        },
      });
    }
  };

  onChange = value => {
    const { form } = this.props;
    const { selectedRow, selectOptions } = this.state;

    selectOptions[selectedRow].selectValue = value;

    const tmp = selectOptions.map((item, row) => {
      if (row > selectedRow && item.key != 'product_type') {
        item.options = [];
        item.selectValue = '';
        form.setFieldsValue({
          [item.key]: undefined,
        });
      }
      return item;
    });

    this.setState({ selectOptions: [...tmp] });
  };

  renderSelected = () => {
    const { getFieldDecorator } = this.props.form;
    const { filterloading } = this.props;
    const { selectOptions, selectedRow } = this.state;
    const list = selectOptions.map((item, index) => {
      return (
        <Col span={12}>
          <Form.Item label={item.name}>
            {getFieldDecorator(item.key, {
              rules: [{ required: true, message: `Please Select ${item.name}!` }],
            })(
              <Select
                loading={selectedRow == index && filterloading}
                allowClear
                showSearch
                placeholder={`Select ${item.name}`}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onFocus={() => {
                  this.onFocus(item, index);
                }}
                onChange={this.onChange}
              >
                {item.options.map((item, index) => {
                  return (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
        </Col>
      );
    });

    return list;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { spareDisabled, visible, childrenDrawer, selectedRow } = this.state;
    const { loading, filterloading } = this.props;
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
          <Row gutter={16}>{this.renderSelected()}</Row>
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
