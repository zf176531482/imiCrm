import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

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

    return <PageHeaderWrapper content={content} />;
  }
}

export default Utilities;
