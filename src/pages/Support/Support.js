import React, { PureComponent } from 'react';
import { Row, Col, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Support.less';

class Support extends PureComponent {
  state = {
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
            {/* {this.renderStep()} */}
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Support;
