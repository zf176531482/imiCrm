import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Utilities.less';

class Utilities extends PureComponent {
  state = {};

  render() {
    const content = (
      <Row>
        <Col span={3}>
          <h1 style={{ margin: 0, fontSize: '26px' }}>Utilities</h1>
        </Col>
      </Row>
    );

    return (
      <PageHeaderWrapper content={content}>
        <Row className={styles.topContainer}>
          <img src={require('../../assets/comingsoon.png')} alt="" />
          <h1>October&nbsp;&nbsp;2019</h1>
        </Row>
        <Row type="flex" align="bottom" className={styles.bottomContaier}>
          <Col span={12}>
            <ul className={styles.listInfo}>
              <li>Product Information / Catalogues</li>
              <li>Authorised Agent & Distributor List</li>
              <li>Promotional & Training Video</li>
              <li>Company Newsletters</li>
            </ul>
          </Col>
          <Col span={12}>
            <h1>But that&acute;s not all..</h1>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Utilities;
