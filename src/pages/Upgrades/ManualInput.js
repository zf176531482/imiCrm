import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

class ManualInput extends PureComponent {
  state = {};

  render() {
    const content = (
      <Row>
        <Col span={3}>
          <h1 style={{ margin: 0, fontSize: '26px' }}>Manual Input</h1>
        </Col>
      </Row>
    );

    return (
      <PageHeaderWrapper content={content}>
        <div>表单项</div>
      </PageHeaderWrapper>
    );
  }
}

export default ManualInput;
