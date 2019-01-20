import React from 'react';
import {
  Row,
  Col,
  Form,
  Icon,
  Button,
  Drawer,
  Input,
  message,
  Checkbox,
  Popover,
  Radio,
  Divider,
} from 'antd';
import { connect } from 'dva';
import { getHost } from '@/utils/utils';
import styles from './index.less';

const radios = {
  '0': {
    name: 'No problem',
    color: '#099447',
  },
  '1': {
    name: 'Exists on site',
    color: '#e4393c',
  },
  '-1': {
    name: 'Unkown',
    color: 'rgba(0, 0, 0, 0.65)',
  },
};

const UPGRADE_TYPE = {
  UGV: '#F5A623',
  UGC: '#099447',
};

@connect(({ login, upgrade, loading }) => ({
  login,
  upgrade,
  loading: loading.effects['upgrade/edit'],
}))
class UpgradesDrawer extends React.Component {
  state = {
    data: {},
    visible: false,
    checkVisible: false,
    markVisible: false,
    checkValueIndex: 0,
    maker: '',
    problem: '',
    solution: '',
    model: '',
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  };

  componentDidMount() {
    this.setState({ visible: this.props.visible });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.visible != nextProps.visible) {
      this.setState({ visible: nextProps.visible });
    }
    if (this.state.data != nextProps.data) {
      this.setState({
        data: nextProps.data,
        checkValueIndex: nextProps.data.problem + '',
        maker: nextProps.data.maker,
        problem: nextProps.data.typical_problem,
        solution: nextProps.data.possible_solution,
        model: nextProps.data.model,
      });
    }
  }

  onClose = () => {
    this.props.onClose();
  };

  handleMarkVisibleChange = visible => {
    this.setState({ markVisible: visible });
  };

  handleCheckVisibleChange = visible => {
    this.setState({ checkVisible: visible });
  };

  changeCheckValueIndex = e => {
    this.setState({ checkValueIndex: e.target.value });
  };

  onClose = () => {
    this.setState({
      maker: '',
      problem: '',
      solution: '',
      model: '',
    });
    this.props.onClose();
  };

  handleSubmit = () => {
    const { maker, model, problem, solution, data, checkValueIndex } = this.state;
    if (maker && model && problem && solution) {
      const { dispatch, my, login } = this.props;
      dispatch({
        type: 'upgrade/edit',
        id: data.id,
        payload: {
          problem: parseInt(checkValueIndex, 10),
          maker: maker,
          model: model,
          typical_problem: problem,
          possible_solution: solution,
        },
        callback: res => {
          if (res) {
            console.log(res);
            this.onClose();
            message.success('Edit success');
            dispatch({
              type: 'upgrade/opportunity',
              payload: my
                ? {
                    contact_email: login.user.email,
                  }
                : {},
            });
          }
        },
      });
    } else {
      message.error('Please enter all');
    }
  };

  handleMarkOk = () => {
    let { maker, problem, solution, model } = this;
    maker && this.setState({ maker: maker });
    model && this.setState({ model: model });
    problem && this.setState({ problem: problem });
    solution && this.setState({ solution: solution });
    this.setState({ markVisible: false });
  };

  renderCheckProblem = () => {
    let arr = Object.keys(radios).map((item, index) => {
      return (
        <div
          key={index}
          style={{ marginBottom: index == Object.keys(radios).length - 1 ? '0' : '10px' }}
        >
          <Radio value={item} style={{ color: radios[item].color }}>
            {radios[item].name}
          </Radio>
        </div>
      );
    });

    return (
      <Radio.Group value={this.state.checkValueIndex} onChange={this.changeCheckValueIndex}>
        {arr}
      </Radio.Group>
    );
  };

  renderMarkProblem = () => {
    return (
      <Form layout="vertical" hideRequiredMark className={styles.maker}>
        <Row>
          <Col span={24}>
            <Form.Item label="Maker">
              <Input
                onChange={e => {
                  this.maker = e.target.value;
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Model">
              <Input
                onChange={e => {
                  this.model = e.target.value;
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Problem">
              <Input
                onChange={e => {
                  this.problem = e.target.value;
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="ProblemPossible Solution">
              <Input
                onChange={e => {
                  this.solution = e.target.value;
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Button
              type="primary"
              style={{ width: '100%', marginTop: '5px' }}
              onClick={this.handleMarkOk}
            >
              OK
            </Button>
          </Col>
        </Row>
      </Form>
    );
  };

  render() {
    const {
      visible,
      checkVisible,
      checkValueIndex,
      markVisible,
      maker,
      problem,
      solution,
      model,
    } = this.state;
    const { data, loading } = this.props;

    return (
      <Drawer
        style={{
          overflow: 'auto',
          height: 'calc(100% - 108px)',
          paddingBottom: '108px',
        }}
        title={data.plant_name}
        width={500}
        onClose={this.onClose}
        visible={visible}
        destroyOnClose={true}
      >
        <Form layout="vertical" hideRequiredMark className={styles.drawerUpgrades}>
          <Row>
            <Col span={24}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
                {`${data.location} ${data.country}`}
                {/* Gyeonggi-do, South Korea */}
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...this.formLayout} label="Application :">
                <div>{data.application}</div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...this.formLayout} label="Upgrade Type :">
                <div
                  className={styles.type}
                  style={
                    data.upgrade_type
                      ? { background: `${UPGRADE_TYPE[data.upgrade_type]}` }
                      : {
                          color: 'rgba(0, 0, 0, 0.65)',
                          padding: 0,
                          fontWeight: 'normal',
                        }
                  }
                >
                  {data.upgrade_type ? data.upgrade_type : '-'}
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...this.formLayout} label="Success story :">
                {data.success_story && data.success_story.link_file ? (
                  <a href={`${getHost() + data.success_story.link_file}`} target="_blank">
                    <Icon type="file-text" /> {data.success_story.link_file.split('/').pop()}
                  </a>
                ) : (
                  '-'
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...this.formLayout} label="Problem :">
                <Row>
                  <Col
                    span={8}
                    style={{
                      color: radios[`${checkValueIndex}`]
                        ? radios[`${checkValueIndex}`].color
                        : 'rgba(0, 0, 0, 0.65)',
                    }}
                  >
                    {radios[`${checkValueIndex}`] ? radios[`${checkValueIndex}`].name : '-'}
                  </Col>
                  <Col span={6}>
                    <Popover
                      title="Problem"
                      content={this.renderCheckProblem()}
                      trigger="click"
                      placement="right"
                      visible={checkVisible}
                      onVisibleChange={this.handleCheckVisibleChange}
                    >
                      <a>
                        <Icon type="edit" theme="filled" />
                      </a>
                    </Popover>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
          {/* customer */}
          <Row>
            <Col span={24}>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  marginTop: '20px',
                }}
              >
                Customer Contact
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...this.formLayout} label="Name :">
                <div>{data.contact_name ? data.contact_name : '-'}</div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...this.formLayout} label="Phone :">
                <div>{data.contact_phonenumber ? data.contact_phonenumber : '-'}</div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...this.formLayout} label="Email :">
                <div>{data.contact_email ? data.contact_email : '-'}</div>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" align="middle">
            <Col span={12}>
              <Divider />
            </Col>
            <Col span={12}>
              <Popover
                title="Problem"
                content={this.renderMarkProblem()}
                trigger="click"
                placement="left"
                visible={markVisible}
                onVisibleChange={this.handleMarkVisibleChange}
              >
                <a>
                  <Icon type="edit" theme="filled" />
                </a>
              </Popover>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...this.formLayout} label="Maker :">
                <div>{maker ? maker : '-'}</div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...this.formLayout} label="Model :">
                <div>{model ? model : '-'}</div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...this.formLayout} label="Typical Problem :">
                <div>{problem ? problem : '-'}</div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...this.formLayout} label="Possible Solution :">
                <div>{solution ? solution : '-'}</div>
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

const DrawerUpgrades = Form.create()(UpgradesDrawer);

export default DrawerUpgrades;
