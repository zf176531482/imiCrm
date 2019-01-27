import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

class Support extends PureComponent {
  state = {
    tree: [
      {
        name: 'RootVDC',
        id: '1',
        closeIcon: null,
        openIcon: null,
        slot: null,
        active: true,
        open: true,
        children: [
          {
            name: '华云数据集团',
            id: '2',
            closeIcon: null,
            openIcon: null,
            slot: null,
            active: false,
            open: true,
            children: [
              {
                name: '研发部门',
                id: '3',
                closeIcon: null,
                openIcon: null,
                slot: null,
                active: false,
                open: true,
                children: [
                  {
                    name: '研发分部门',
                    id: '4',
                    closeIcon: null,
                    openIcon: null,
                    slot: null,
                    active: false,
                    open: true,
                    children: null,
                  },
                ],
              },
            ],
          },
          {
            name: '华云上海分公司',
            id: '5',
            closeIcon: null,
            openIcon: null,
            slot: null,
            active: false,
            open: false,
            children: [
              {
                name: '市场部',
                id: '6',
                closeIcon: null,
                openIcon: null,
                slot: null,
                active: false,
                open: true,
                children: null,
              },
            ],
          },
        ],
      },
    ],
  };

  componentDidMount() {
    // window.location.href = "skype:10086?call"
  }

  handleLaunchCilck = id => {
    const { tree } = this.state;
    const data = this.changeSwitch(tree, id);
    this.setState({ tree: data });
  };

  changeSwitch = (source, id) => {
    const data = source.map(item => {
      if (item.id === id) {
        item.open = !item.open;
      }
      if (item.children && item.children.length) {
        this.changeSwitch(item.children, id);
      }
      return item;
    });

    return data;
  };

  renderTree = (data, left = 16) => {
    let tree = data.map(item => {
      return (
        <li>
          <div style={{ padding: '10px 20px 10px 0', borderBottom: '1px solid #ddd' }}>
            <a
              style={{ paddingLeft: left, paddingRight: 6 }}
              onClick={() => {
                this.handleLaunchCilck(item.id);
              }}
            >
              {item.children ? (item.open ? '-' : '+') : '·'}
            </a>
            <a
              style={{ color: 'black' }}
              onClick={() => {
                this.handleItemClick(item.id);
              }}
            >
              {item.name}
            </a>
            <a style={{ float: 'right' }}>···</a>
          </div>
          <div
            style={{
              maxHeight: item.open ? '100vh' : 0,
              overflow: 'hidden',
              transition: 'all .3s ease',
            }}
          >
            {item.children ? this.renderTree(item.children, left + 16) : null}
          </div>
        </li>
      );
    });

    return <ul style={{ margin: 0, padding: 0 }}>{tree}</ul>;
  };

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
          <Col span={4}>{this.renderTree(this.state.tree)}</Col>
          <Col span={20} style={{ background: '#fff', height: '100vh' }} />
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Support;
