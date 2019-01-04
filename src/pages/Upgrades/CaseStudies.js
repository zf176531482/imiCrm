import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Icon, Avatar, Spin } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './CaseStudies.less';
import { getHost } from '@/utils/utils';

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
      payload: { limit: 0 },
    });
  }

  renderCardList = cases => {
    let data = cases.map((item, index) => {
      return (
        <Card
          key={index}
          className={styles.card}
          loading={false}
          hoverable
          cover={
            <img
              alt="example"
              style={{ height: '162px', width: '211px' }}
              src={`${getHost() + item.icon}`}
            />
          }
        >
          <div className={styles.title}>Ulsan TPP</div>
          <div className={styles.date}>5 Jan 2018</div>
          <div className={styles.detail} style={{ boxOrient: 'vertical' }}>
            {`IMI CCI solves recurring maintenance issues at South American petrochemical plant. IMI
            CCI solves recurring maintenance issues at South American petrochemical plant. IMI CCI
            solves recurring maintenance issues at South American petrochemical plant IMI CCI solves
            recurring maintenance issues at South American petrochemical plant. IMI CCI solves
            recurring maintenance issues at South American petrochemical plant. IMI CCI solves
            recurring maintenance issues at South American petrochemical plant IMI CCI solves
            recurring maintenance issues at South American petrochemical plant recurring maintenance
            issues at South American petrochemical plant recurring maintenance issues at South
            American petrochemical plant recurring maintenance issues at South American
            petrochemical plant recurring maintenance issues at South American petrochemical plant
            recurring maintenance issues at South American petrochemical plant recurring maintenance
            issues at South American petrochemical plant`}
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
