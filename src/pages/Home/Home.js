import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import router from 'umi/router';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import styles from './Home.less';
import IconFont from '@/components/Icon/icon';
// icon-kefu-copy

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class Home extends Component {
  componentDidMount() {
    // console.log(this.props);
  }

  handleClick = link => {
    if (link == '/support') {
      // window.location.href = `sip:`;
      router.push(link);
    } else {
      router.push(link);
    }
  };
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.assist}>Remote Assist</div>
        <Row className={styles.row}>
          <Col
            xs={24}
            sm={12}
            className={`${styles.colContainer} ${styles.col}`}
            onClick={() => {
              this.handleClick('/support');
            }}
          >
            <span className={`${styles.icon} icon-image2vector-3`} />
            <div className={styles.text}>Support</div>
          </Col>
          <Col
            xs={24}
            sm={12}
            className={`${styles.colContainer} ${styles.col}`}
            onClick={() => {
              this.handleClick('/contacts');
            }}
          >
            <span className={`${styles.icon} icon-image2vector`} />
            <div className={styles.text}>Contacts</div>
          </Col>
        </Row>
        <div className={styles.assist}>Assist Management</div>
        <Row className={styles.row}>
          <Col
            xs={24}
            sm={12}
            md={6}
            className={`${styles.colContainer} ${styles.col}`}
            onClick={() => {
              this.handleClick('/product');
            }}
          >
            <span className={`${styles.icon} icon-image2vector-1`} />
            <div className={styles.text}>Product & Asset Info</div>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={6}
            className={`${styles.colContainer} ${styles.col}`}
            onClick={() => {
              this.handleClick('/upgrades');
            }}
          >
            <span className={`${styles.icon} icon-image2vector-4`} />
            <div className={styles.text}>Upgrades</div>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={6}
            className={`${styles.colContainer} ${styles.col}`}
            onClick={() => {
              this.handleClick('/service');
            }}
          >
            <span className={`${styles.icon} icon-image2vector-2`} />
            <div className={styles.text}>Service Report</div>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={6}
            className={`${styles.colContainer} ${styles.col}`}
            onClick={() => {
              this.handleClick('/utilities');
            }}
          >
            <span className={`${styles.icon} icon-image2vector-6`} />
            <div className={styles.text}>Utilities</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
