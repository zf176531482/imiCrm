import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Icon, Button, Modal, Badge, Divider, Drawer, Table } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import HeaderSearch from '@/components/HeaderSearch';
import SelectCheckbox from '@/components/SelectCheckbox';

import styles from '../Contacts/Contacts.less';

const DRAWER_TYPE = {
  DOCUMENT: 0,
  MANUAL: 1,
  SPARE: 2,
  HISTORY: 3,
};

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
/* eslint react/no-multi-comp:0 */
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
class Product extends PureComponent {
  state = {
    visibleSpare: false,
    visibleDocuments: false,
    visibleManual: false,
    visibleHistory: false,
    selectedRows: [],
    selectDrawerRows: [],
    selectHistoryRows: [],
    formValues: {},
    filterOptions: [
      {
        name: 'Dept',
        data: [
          { id: 1, name: 'Executive', checked: true },
          { id: 2, name: 'Engineering', checked: false },
        ],
      },
      {
        name: 'Job Title',
        data: [{ id: 1, name: '22', checked: true }, { id: 2, name: '33', checked: true }],
      },
      {
        name: 'Location',
        data: [{ id: 1, name: '44', checked: false }, { id: 2, name: '55', checked: false }],
      },
    ],
  };

  columns = [
    {
      title: 'Serial',
      dataIndex: 'name',
    },
    {
      title: 'Product Type',
      dataIndex: 'desc',
    },
    {
      title: 'Model',
      dataIndex: 'callNo',
      // sorter: true,
      render: val => `${val} 万`,
      // mark to display a total number
      needTotal: true,
    },
    {
      title: 'Project Documents',
      dataIndex: 'status',
      render: (text, record) => (
        <a
          onClick={() => {
            this.showDrawer(DRAWER_TYPE.DOCUMENT, record);
          }}
        >
          <Icon type="snippets" className={styles.iconType} />
        </a>
      ),
    },
    {
      title: 'Product Manual',
      dataIndex: 'updatedAt',
      render: (text, record) => (
        <a
          onClick={() => {
            this.showDrawer(DRAWER_TYPE.MANUAL, record);
          }}
        >
          <Icon type="file-text" className={styles.iconType} />
        </a>
      ),
    },
    {
      title: 'Spare Parts Recommendation',
      dataIndex: 'owner',
      render: (text, record) => {
        return (
          <a
            onClick={() => {
              this.showDrawer(DRAWER_TYPE.SPARE, record);
            }}
          >
            <Icon type="calendar" className={styles.iconType} />
          </a>
        );
      },
    },
    {
      title: 'Order status & history',
      render: (text, record) => {
        return (
          <a
            onClick={() => {
              this.showDrawer(DRAWER_TYPE.HISTORY, record);
            }}
          >
            <Icon type="bars" className={styles.iconType} />
          </a>
        );
      },
    },
  ];

  componentDidMount() {
    console.log(this.props);
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

  showDrawer = (type, data) => {
    switch (type) {
      case DRAWER_TYPE.DOCUMENT:
        this.setState({ visibleDocuments: true });
        break;
      case DRAWER_TYPE.SPARE:
        this.setState({ visibleSpare: true });
        break;
      case DRAWER_TYPE.MANUAL:
        this.setState({ visibleManual: true });
        break;
      case DRAWER_TYPE.HISTORY:
        this.setState({ visibleHistory: true });
        break;
      default:
        break;
    }
  };

  onClose = () => {
    this.setState({
      visibleSpare: false,
      visibleDocuments: false,
      visibleHistory: false,
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  };
  checkChange = (index, list) => {
    let { filterOptions } = this.state;
    filterOptions[index].data = list;
    this.setState({ filterOptions: filterOptions }, () => {
      console.log(this.state.filterOptions);
    });
  };

  renderFilter = () => {
    let selects = [];
    this.state.filterOptions.map((item, index) => {
      selects.push(
        <SelectCheckbox
          key={index}
          data={item.data}
          title={item.name}
          onChange={list => {
            this.checkChange(index, list);
          }}
        />
      );
    });
    return selects;
  };

  renderForm() {
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={20} sm={24}>
            {this.renderFilter()}
          </Col>
          <Col md={4} sm={24}>
            <span className={styles.submitButtons} style={{ float: 'right' }}>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                Reset
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderDocuments = () => {
    let data = [];
    for (let i = 0; i < 10; i++) {
      data.push(
        <Row key={i} type="flex" justify="start" align="middle" style={{ marginBottom: '24px' }}>
          <Col span={14}>
            <a href="https://www.baidu.com" target="_blank">
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <img
                  style={{ height: '46px' }}
                  src={require('../../assets/ic_documents_pdf.png')}
                  alt=""
                />
                <div style={{ marginLeft: '10px' }}>
                  <div style={{ fontSize: '15px', color: '#000' }}>MDRB_Y14649CZ-01</div>
                  <div style={{ fontSize: '12px', color: '#8B999F', marginTop: '2px' }}>
                    ADOBE ACROBAT DOCUMENT
                  </div>
                </div>
              </div>
            </a>
          </Col>
          <Col span={8} style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '12px', color: '#8B999F' }}>59.8MB</span>
          </Col>
          <Col span={2} style={{ textAlign: 'right' }}>
            <a
              href="#"
              onClick={() => {
                window.location.href = 'https://www.baidu.com';
              }}
            >
              <Icon style={{ fontSize: '24px' }} type="download" />
            </a>
          </Col>
        </Row>
      );
    }
    return data;
  };

  renderSpare = () => {
    let data = {
      list: [
        {
          partNumber: 1094398428,
          partName: 'Cage',
          qty: 1,
          key: 1,
        },
        {
          partNumber: 1094398428,
          partName: 'Cage',
          qty: 2,
          key: 2,
        },
        {
          partNumber: 1094398428,
          partName: 'Cage',
          qty: 3,
          key: 3,
        },
      ],
    };

    let columns = [
      {
        title: 'Part Number',
        dataIndex: 'partNumber',
      },
      {
        title: 'Part Name',
        dataIndex: 'partName',
      },
      {
        title: 'Qty',
        dataIndex: 'qty',
      },
    ];

    let { selectDrawerRows } = this.state;
    return (
      <div>
        <StandardTable
          selectedRows={selectDrawerRows}
          // loading={loading}
          data={data}
          columns={columns}
          hasPagination={false}
          onSelectRow={rows => {
            this.setState({ selectDrawerRows: rows });
          }}
          // onChange={this.handleStandardTableChange}
        />
        <Button type="danger" block style={{ marginTop: '24px' }}>
          <Icon type="delete" /> Delete
        </Button>
      </div>
    );
  };

  renderHistory = () => {
    const expandedRowRender = () => {
      const columns = [
        { title: '', dataIndex: 'padding' },
        { title: 'Part Number', dataIndex: 'partNumber' },
        { title: 'Part Name', dataIndex: 'partName' },
        { title: 'Qty', dataIndex: 'qty' },
      ];

      const data = [];
      for (let i = 0; i < 3; ++i) {
        data.push({
          partNumber: '1094398428',
          partName: 'Cage',
          qty: 1,
          key: i,
          padding: '',
        });
      }
      return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    let data = {
      list: [
        {
          orderNumber: '1094398428',
          orderStatus: 'prodution',
          dispatchDate: '20/02/2029',
          key: 1,
        },
        {
          orderNumber: '1094398428',
          orderStatus: 'prodution',
          dispatchDate: '20/02/2029',
          key: 2,
        },
        {
          orderNumber: '1094398428',
          orderStatus: 'prodution',
          dispatchDate: '20/02/2029',
          key: 3,
        },
      ],
    };

    let columns = [
      {
        title: 'Order Number',
        dataIndex: 'orderNumber',
      },
      {
        title: 'Order Status',
        dataIndex: 'orderStatus',
      },
      {
        title: 'Dispatch Date',
        dataIndex: 'dispatchDate',
      },
    ];

    let { selectHistoryRows } = this.state;
    return (
      <div>
        <StandardTable
          selectedRows={selectHistoryRows}
          // loading={loading}
          data={data}
          columns={columns}
          hasPagination={false}
          onSelectRow={rows => {
            this.setState({ selectHistoryRows: rows });
          }}
          // onChange={this.handleStandardTableChange}
          expandedRowRender={expandedRowRender}
        />
        <Button type="danger" block style={{ marginTop: '24px' }}>
          <Icon type="delete" /> Delete
        </Button>
      </div>
    );
  };

  render() {
    const {
      rule: { data },
      loading,
    } = this.props;
    const { selectedRows, visibleSpare, visibleDocuments, visibleHistory } = this.state;

    const content = (
      <Row type="flex" align="middle">
        <Col span={12}>
          <h1 style={{ margin: 0, fontSize: '26px' }}>Product & Asset Information</h1>
        </Col>
        <Col
          span={12}
          style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
        >
          <Button
            className={styles.topBtns}
            style={{ marginLeft: '20px' }}
            type="primary"
            icon="printer"
          >
            Print
          </Button>
          <Button className={styles.topBtns} type="primary" icon="download">
            Export
          </Button>
        </Col>
      </Row>
    );
    return (
      <PageHeaderWrapper content={content}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Drawer
          width={500}
          title="Project Documents"
          placement="right"
          closable={true}
          onClose={this.onClose}
          visible={visibleDocuments}
        >
          {this.renderDocuments()}
        </Drawer>
        <Drawer
          width={500}
          title="Spare Parts Recommendation"
          placement="right"
          closable={true}
          onClose={this.onClose}
          visible={visibleSpare}
        >
          {this.renderSpare()}
        </Drawer>
        <Drawer
          width={700}
          title="Order status & history"
          placement="right"
          closable={true}
          onClose={this.onClose}
          visible={visibleHistory}
        >
          {this.renderHistory()}
        </Drawer>
      </PageHeaderWrapper>
    );
  }
}

export default Product;
