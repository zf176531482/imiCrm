import React, { PureComponent } from 'react';
import { Row, Col, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Support.less';

const STEP_TYPE = {
    PREV: 0,
    NEXT: 1
}

const POPPER_TYPE = {
  'left-top': 'left-top',
  'top-left': 'top-left',
}
class Support extends PureComponent {
  state = {
    activeKey: '1',
    stepData: [
      {
        id: '1',
        title: '全新的自定义菜单导航1',
        content: '产品菜单及云环境的选择从顶部移至左侧，鼠标点击按钮可展开列表1。',
        img: '111',
        position: {top: '100px', left: '300px'},
        slot: () => <div>step1</div>
      },
      {
        id: '2',
        title: '全新的自定义菜单导航2',
        content: '产品菜单及云环境的选择从顶部移至左侧，鼠标点击按钮可展开列表2。',
        img: '111',
        position: {top: '200px', left: '400px'},
        slot: () => <div>step2</div>
      },
      {
        id: '3',
        title: '全新的自定义菜单导航3',
        content: '产品菜单及云环境的选择从顶部移至左侧，鼠标点击按钮可展开列表3。',
        img: '111',
        position: {top: '100px', left: '500px'},
        slot: () => <div>step3</div>
      },
      {
        id: '4',
        title: '全新的自定义菜单导航4',
        content: '产品菜单及云环境的选择从顶部移至左侧，鼠标点击按钮可展开列表4。',
        img: '111',
        position: {top: '200px', left: '600px'},
        slot: () => <div>step4</div>
      },
      {
        id: '5',
        title: '全新的自定义菜单导航5',
        content: '产品菜单及云环境的选择从顶部移至左侧，鼠标点击按钮可展开列表5。',
        img: '111',
        position: {top: '100px', left: '700px'},
        slot: () => <div>step5</div>
      }
    ]
  }

  onClick = (type) => {
    const { activeKey, stepData } = this.state
    let now
    let active 
    stepData.some((item, index) => {
        if (item.id === activeKey) {
            now = active = index
            return true
        } else {
            return false
        }
    })

    if (type === STEP_TYPE.PREV) {
        stepData[now - 1] && (active = now - 1)
    } else {
        stepData[now + 1] && (active = now + 1)
    }

    this.setState({
        activeKey: stepData[active].id
    })

  }

  onStepClick = (item) => {
    if (item.id == this.state.activeKey) {
        return
    }
    this.setState({
        activeKey: item.id
    })
  }

  renderStep = () => {
    const { stepData, activeKey } = this.state
    const data = stepData.filter(item => item.id === activeKey)[0]
    return (
        <div className={styles.container}>
            <div className={styles.stepContainer} style={{position: 'absolute', ...data.position, transition: 'all .5s'}}>
                <div className={styles.slotContainer}>
                    {data.slot()}
                </div>
                <div className={`${styles.popperContainer} ${styles.poperTopRight}`}>
                    <div className={`${styles.arrow} ${styles.arrowTopRight}`}></div>
                    <div className={styles.popperClose}>x</div>
                    <div className={styles.popperImg}>图片</div>
                    <div className={styles.popperContent}>
                        <h2>{data.title}</h2>
                        <div>{data.content}</div>
                        <div className={styles.popperStepContainer}>
                            <div className={styles.popperSteps}>
                                {
                                    this.state.stepData.map(item => {
                                        return <span onClick={() => this.onStepClick(item)} className={item.id === activeKey ? styles.active : null} />
                                    })
                                }
                            </div>
                            <div className={styles.popperButtonList}>
                                <Button type="primary" onClick={() => this.onClick(STEP_TYPE.PREV)} disabled={activeKey === stepData[0].id}>上一步</Button>
                                <Button type="primary" onClick={() => this.onClick(STEP_TYPE.NEXT)} disabled={activeKey === stepData[stepData.length - 1].id}>下一步</Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
  }
  render() {
    const content = (
      <Row>
        <Col span={3}>
          <h1 style={{ margin: 0 }}>Support</h1>
        </Col>
      </Row>
    );

    return (
      <PageHeaderWrapper content={content}>
        <Row style={{ marginTop: '10px' }}>
          <Col span={24}>
            {this.renderStep()}
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Support;
