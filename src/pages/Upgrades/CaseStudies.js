import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Icon, Avatar, Spin } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './CaseStudies.less';
import { getFileSize, getHost } from '@/utils/utils';

const { Meta } = Card;

@connect(({ upgrade, loading }) => ({
  upgrade,
  loading: loading.effects['upgrade/cases'],
}))
class CaseStudies extends PureComponent {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'upgrade/cases',
      payload: { limit: 0, order_by: 'id' },
    });
  }

  linkFile = item => {
    console.log(item);
    if (!item.link_file) {
      return;
    }

    window.open(getHost() + item.link_file);
  };

  renderCardList = cases => {
    let data = cases.map((item, index) => {
      return (
        <Card
          onClick={() => {
            this.linkFile(item);
          }}
          key={index}
          className={styles.card}
          loading={false}
          hoverable
          cover={
            <img
              alt="example"
              style={{ height: '162px', width: '260px' }}
              src={`${getHost() + item.icon}`}
            />
          }
        >
          <div className={styles.title}>
            {item.link_file ? item.link_file.split('/').pop() : '--'}
          </div>
          <div className={styles.date}>{getFileSize(item.size)}</div>
          <div className={styles.detail} style={{ boxOrient: 'vertical' }}>
            {item.header}
          </div>
        </Card>
      );
    });
    return data;
  };
  render() {
    const {
      upgrade: { cases },
      loading,
    } = this.props;
    const content = (
      <Row>
        <Col span={3}>
          <h1 style={{ margin: 0, fontSize: '26px' }}> Case Studies </h1>
        </Col>
      </Row>
    );

    return (
      <PageHeaderWrapper content={content}>
        <div className={styles.container}>
          <Spin spinning={loading}>{this.renderCardList(cases)}</Spin>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default CaseStudies;
