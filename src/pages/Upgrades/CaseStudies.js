import React, { PureComponent } from 'react';
import { Row, Col, Card, Icon, Avatar } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './CaseStudies.less';

const { Meta } = Card;

class CaseStudies extends PureComponent {
  state = {};

  renderCardList = () => {
    let data = [];
    for (let i = 0; i < 10; i++)
      data.push(
        <Card
          key={i}
          className={styles.card}
          loading={false}
          hoverable
          cover={
            <img
              alt="example"
              style={{ height: '162px', width: '211px' }}
              src={require('../../assets/test.jpg')}
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
    return data;
  };
  render() {
    const content = (
      <Row>
        <Col span={3}>
          <h1 style={{ margin: 0, fontSize: '26px' }}> Case Studies </h1>
        </Col>
      </Row>
    );

    return (
      <PageHeaderWrapper content={content}>
        <div className={styles.container}>{this.renderCardList()}</div>
      </PageHeaderWrapper>
    );
  }
}

export default CaseStudies;
