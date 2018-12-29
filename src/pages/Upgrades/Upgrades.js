import React, {PureComponent} from 'react';
import {
  Row,
  Col,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

class Upgrades extends PureComponent {
  state = {

  }

  render() {
    const content = (
      <Row>
        <Col span={3}>
          <h1 style={{margin: 0}}>Upgrades</h1>
        </Col>
      </Row>
    )

    return (
      <PageHeaderWrapper content={content}>
      </PageHeaderWrapper>
    );
  }
}

export default Upgrades;
