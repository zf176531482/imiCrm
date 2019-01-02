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
import styles from './index.less';

const radios = [
  {
    id: 1,
    name: 'Exists on site',
  },
  {
    id: 2,
    name: 'No problem',
  },
];

@Form.create()
class UpgradesDrawer extends React.Component {
  state = {
    visible: false,
    checkVisible: false,
    markVisible: false,
    checkValueIndex: 1,
    marker: '',
    problem: '',
    solution: '',
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
      marker: '',
      problem: '',
      solution: '',
    });
    this.props.onClose();
  };

  handleSubmit = () => {};

  handleMarkOk = () => {
    let { marker, problem, solution } = this;
    marker && this.setState({ marker: marker });
    problem && this.setState({ problem: problem });
    solution && this.setState({ solution: solution });
    this.setState({ markVisible: false });
  };

  renderCheckProblem = () => {
    let arr = [];

    radios.map((item, index) => {
      arr.push(
        <div key={index} style={{ marginBottom: index == radios.length - 1 ? '0' : '10px' }}>
          <Radio value={index}>{item.name}</Radio>
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
      <Form layout="vertical" hideRequiredMark className={styles.marker}>
        <Row>
          <Col span={24}>
            <Form.Item label="Maker">
              <Input
                onChange={e => {
                  this.marker = e.target.value;
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
      marker,
      problem,
      solution,
    } = this.state;
    const { data } = this.props;
    return (
      <Drawer
        style={{
          overflow: 'auto',
          height: 'calc(100% - 108px)',
          paddingBottom: '108px',
        }}
        title={data.name}
        width={500}
        onClose={this.onClose}
        visible={visible}
        destroyOnClose={true}
      >
        <Form layout="vertical" hideRequiredMark className={styles.drawerUpgrades}>
          <Row>
            <Col span={24}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
                Gyeonggi-do, South Korea
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...this.formLayout} label="Application :">
                <div>BFW control valve</div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...this.formLayout} label="Upgrade Type :">
                <div>UGV</div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...this.formLayout} label="Success story :">
                <Icon type="file-text" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...this.formLayout} label="Problem :">
                <Row>
                  <Col span={8}>{radios[checkValueIndex].name}</Col>
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
                <div>Example Name</div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...this.formLayout} label="Phone :">
                <div>+012398493482</div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...this.formLayout} label="Email :">
                <div>176531482@qq.com</div>
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
                placement="bottom"
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
                <div>{marker}</div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...this.formLayout} label="Problem :">
                <div>{problem}</div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item {...this.formLayout} label="Possible Solution :">
                <div>{solution}</div>
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

const DrawerUpgrades = Form.create()(UpgradesDrawer);

export default DrawerUpgrades;
