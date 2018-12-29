import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import router from 'umi/router';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import styles from './Home.less'
import IconFont from '@/components/Icon/icon';
// icon-kefu-copy

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))

export default class Home extends Component {
  state = {
    hover: false
  }
  componentDidMount() {
    // console.log(this.props);
  }

  handleClick = (link) => {
    if(link == '/support') {
      window.location.href = "skype:10086?call"
    } else {
      router.push(link);
    }
    
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.assist}>Remote Assist</div>
        <Row className={styles.row}>
          <Col xs={24} sm={12} className={`${styles.colContainer} ${styles.col}`} onClick={()=> {this.handleClick('/support')}}>
            <span className={`${styles.icon} icon-image2vector-1`}>
              <span className={"path1"}></span>
              <span className={"path2"}></span>
            </span>
            <div className={styles.text}>Support</div>
          </Col>
          <Col xs={24} sm={12} className={`${styles.colContainer} ${styles.col}`} onClick={()=> {this.handleClick('/contcts')}}>
            <span className={`${styles.icon} icon-image2vector-6`}></span>
            <div className={styles.text}>Contcts</div>
          </Col>
        </Row>
        <div className={styles.assist}>Assist Management</div>
        <Row className={styles.row}>
          <Col xs={24} sm={12} className={`${styles.colContainer} ${styles.col}`} onClick={()=> {this.handleClick('/product')}}>
            <span className={`${styles.icon} icon-image2vector-3`}></span>
            <div className={styles.text}>Product & Asset Info</div>
          </Col>
          <Col xs={24} sm={12} className={`${styles.colContainer} ${styles.col}`} onClick={()=> {this.handleClick('/upgrades')}}>
            <span className={`${styles.icon} icon-image2vector-4`}></span>
            <div className={styles.text}>Upgrades</div>
          </Col>
          <Col xs={24} sm={12} className={`${styles.colContainer} ${styles.col}`} onClick={()=> {this.handleClick('/service')}}>
            <span className={`${styles.icon} icon-image2vector-2`}></span>
            <div className={styles.text}>Service Report</div>
          </Col>
          <Col xs={24} sm={12} className={`${styles.colContainer} ${styles.col}`} onClick={()=> {this.handleClick('/utilities')}}>
            <span className={`${styles.icon} icon-image2vector-5`}></span>
            <div className={styles.text}>Utilities</div>
          </Col>
        </Row>
      </div>
    )
  }
}