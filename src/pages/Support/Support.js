import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

class Support extends PureComponent {
  state = {};

  componentDidMount() {
    // window.location.href = "skype:10086?call"
  }

  render() {
    const content = (
      <Row>
        <Col span={3}>
          <h1 style={{ margin: 0 }}>Support</h1>
        </Col>
      </Row>
    );

    return <PageHeaderWrapper content={content} />;
  }
}

export default Support;
