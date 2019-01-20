import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Icon,
  Button,
  Modal,
  Badge,
  Divider,
  Drawer,
  Table,
  Spin,
  message,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import HeaderSearch from '@/components/HeaderSearch';
import FilterBar from '@/components/FilterBar';
import { filterType, DATA_BASE } from '@/utils/constants';
import { getFileSize, getHost } from '@/utils/utils';
import styles from '../Contacts/Contacts.less';

const DRAWER_TYPE = {
  DOCUMENT: 0,
  MANUAL: 1,
  SPARE: 2,
  HISTORY: 3,
};

const ORDER_STATUS = {
  '0': 'Close',
  '1': 'Open',
};
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
/* eslint react/no-multi-comp:0 */
@connect(({ login, asset, loading }) => ({
  currentUser: login.user,
  asset,
  loading: loading.effects['asset/fetch'],
  fileloading: loading.effects['asset/files'],
  productloading: loading.effects['asset/products'],
  orderloading: loading.effects['asset/orders'] || loading.effects['asset/products'],
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
    checkRow: null,
    filterOptions: {},
    searchOptions: {},
  };

  columns = [
    {
      title: 'Serial',
      dataIndex: 'serial',
    },
    {
      title: 'Product Type',
      dataIndex: 'product_type',
    },
    {
      title: 'Model',
      dataIndex: 'model',
    },
    {
      title: 'Project Documents',
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
      dataIndex: 'manual',
      render: (text, record) => (
        <a
          onClick={() => {
            if (text) {
              window.open(getHost() + text);
            } else {
              message.warning('No such file');
            }
          }}
        >
          <Icon type="file-text" className={styles.iconType} />
        </a>
      ),
    },
    {
      title: 'Spare Parts Recommendation',
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
    const { dispatch, currentUser } = this.props;
    const user = currentUser.sfdc_account ? { sfdc_account: currentUser.sfdc_account } : {};
    dispatch({
      type: 'asset/fetch',
      payload: {
        ...user,
      },
    });
  }

  showDrawer = (type, data) => {
    const { dispatch } = this.props;
    this.setState({ checkRow: data });
    switch (type) {
      case DRAWER_TYPE.DOCUMENT:
        this.setState({ visibleDocuments: true });
        dispatch({
          type: 'asset/files',
          payload: { asset__id: data.id },
        });
        break;
      case DRAWER_TYPE.SPARE:
        this.setState({ visibleSpare: true });
        dispatch({
          type: 'asset/products',
          payload: { asset__id: data.id },
        });
        break;
      case DRAWER_TYPE.MANUAL:
        this.setState({ visibleManual: true });
        break;
      case DRAWER_TYPE.HISTORY:
        this.setState({ visibleHistory: true });
        dispatch({
          type: 'asset/orders',
          payload: { asset__id: data.id },
        });
        dispatch({
          type: 'asset/products',
          payload: { asset__id: data.id },
        });
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
    const { dispatch, currentUser } = this.props;
    const { filterOptions, searchOptions } = this.state;
    const user = currentUser.sfdc_account ? { sfdc_account: currentUser.sfdc_account } : {};
    const params = {
      offset: (pagination.current - 1) * pagination.pageSize,
      limit: pagination.pageSize,
      ...filterOptions,
      ...searchOptions,
      ...user,
    };

    dispatch({
      type: 'asset/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { dispatch, currentUser } = this.props;
    const user = currentUser.sfdc_account ? { sfdc_account: currentUser.sfdc_account } : {};
    this.setState({
      filterOptions: {},
      searchOptions: {},
    });
    this.filterBar.resetFilter();
    this.filterInput.resetInput();
    dispatch({
      type: 'asset/fetch',
      payload: {
        ...user,
      },
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, currentUser } = this.props;
    const { filterOptions, searchOptions } = this.state;
    const user = currentUser.sfdc_account ? { sfdc_account: currentUser.sfdc_account } : {};

    dispatch({
      type: 'asset/fetch',
      payload: {
        ...filterOptions,
        ...searchOptions,
        ...user,
      },
    });
  };

  changeFilter = filter => {
    this.setState({ filterOptions: filter }, () => {
      const { dispatch, currentUser } = this.props;
      const { filterOptions, searchOptions } = this.state;
      const user = currentUser.sfdc_account ? { sfdc_account: currentUser.sfdc_account } : {};
      dispatch({
        type: 'asset/fetch',
        payload: {
          ...filterOptions,
          ...searchOptions,
          ...user,
        },
      });
    });
  };

  renderForm() {
    return (
      <Form onSubmit={this.handleSearch} layout="inline" style={{ marginBottom: 10 }}>
        <Row>
          <Col lg={16} md={24} sm={24}>
            <FilterBar
              onRef={ref => (this.filterBar = ref)}
              data={filterType().asset}
              type={DATA_BASE.ASSET}
              onChange={this.changeFilter}
            />
          </Col>
          <Col
            lg={8}
            md={24}
            sm={24}
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}
          >
            <HeaderSearch
              ref={ref => (this.filterInput = ref)}
              defaultOpen={true}
              style={{ marginRight: '20px' }}
              placeholder={'Serial'}
              onSearch={value => {
                this.setState({ searchOptions: value ? { serial__icontains: value } : {} });
              }}
              // onPressEnter={value => {
              //   console.log('enter', value); // eslint-disable-line
              // }}
            />
            <span className={styles.submitButtons}>
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

  renderDocuments = files => {
    let data = [];
    data = files.map((item, index) => {
      return (
        <Row
          key={index}
          type="flex"
          justify="start"
          align="middle"
          style={{ marginBottom: '24px' }}
        >
          <Col span={14}>
            <a href={`${getHost() + item.file}`} target="_blank">
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <img
                  style={{ height: '42px' }}
                  src={require('../../assets/ic_documents_pdf.png')}
                  alt=""
                />
                <div style={{ marginLeft: '15px' }}>
                  <div style={{ fontSize: '14px', color: '#000' }}>{item.file_name}</div>
                  <div style={{ fontSize: '12px', color: '#8B999F', marginTop: '2px' }}>
                    {moment(item.date).format('MM/DD/YYYY , HH:MM')}
                  </div>
                </div>
              </div>
            </a>
          </Col>
          <Col span={8} style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '12px', color: '#8B999F' }}>{getFileSize(item.size)}</span>
          </Col>
          <Col span={2} style={{ textAlign: 'right' }}>
            <a href={`http://valveexpertise.com${item.file}`} target="_blank">
              <Icon style={{ fontSize: '24px' }} type="download" />
            </a>
          </Col>
        </Row>
      );
    });
    return data;
  };

  renderSpare = data => {
    let columns = [
      {
        title: 'Part Number',
        dataIndex: 'part_number',
      },
      {
        title: 'Part Name',
        dataIndex: 'part_name',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
      },
    ];

    let { selectDrawerRows } = this.state;
    return (
      <div>
        <StandardTable
          selectedRows={selectDrawerRows}
          rowKey={record => record.id}
          // loading={loading}
          data={data}
          columns={columns}
          hasPagination={false}
          onSelectRow={rows => {
            this.setState({ selectDrawerRows: rows });
          }}
          // onChange={this.handleStandardTableChange}
        />
        {/* <Button type="danger" block style={{ marginTop: '24px' }}>
          <Icon type="delete" /> Delete
        </Button> */}
      </div>
    );
  };

  renderHistory = (data, products) => {
    const expandedRowRender = () => {
      const columns = [
        {
          title: '',
          dataIndex: 'id',
          render: () => {},
        },
        {
          title: 'Part Number',
          dataIndex: 'part_number',
        },
        {
          title: 'Part Name',
          dataIndex: 'part_name',
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
        },
      ];

      return (
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={products.list}
          pagination={false}
        />
      );
    };

    let columns = [
      {
        title: 'Order Number',
        dataIndex: 'sfdc_account',
      },
      {
        title: 'Order Status',
        dataIndex: 'order_status',
        render: (text, record) => ORDER_STATUS[text],
      },
      {
        title: 'Dispatch Date',
        dataIndex: 'dispatched_date',
        render: (text, record) => moment(text).format('MM/DD/YYYY'),
      },
    ];

    let { selectHistoryRows } = this.state;
    return (
      <div>
        <StandardTable
          selectedRows={selectHistoryRows}
          // loading={loading}
          rowKey={record => record.id}
          data={data}
          columns={columns}
          hasPagination={false}
          onSelectRow={rows => {
            this.setState({ selectHistoryRows: rows });
          }}
          // onChange={this.handleStandardTableChange}
          expandedRowRender={expandedRowRender}
        />
        {/* <Button type="danger" block style={{ marginTop: '24px' }}>
          <Icon type="delete" /> Delete
        </Button> */}
      </div>
    );
  };

  render() {
    const {
      asset: { data, files, products, orders },
      loading,
      fileloading,
      productloading,
      orderloading,
    } = this.props;
    const { selectedRows, visibleSpare, visibleDocuments, visibleHistory } = this.state;

    const content = (
      <Row type="flex" align="middle">
        <Col span={24}>
          <h1 style={{ margin: 0, fontSize: '26px' }}>Product & Asset Information</h1>
        </Col>
        {/* <Col
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
        </Col> */}
      </Row>
    );
    return (
      <PageHeaderWrapper content={content}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
              rowKey={record => record.id}
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
          <Spin spinning={fileloading}>{this.renderDocuments(files)}</Spin>
        </Drawer>
        <Drawer
          width={700}
          title="Spare Parts Recommendation"
          placement="right"
          closable={true}
          onClose={this.onClose}
          visible={visibleSpare}
        >
          <Spin spinning={productloading}>{this.renderSpare(products)}</Spin>
        </Drawer>
        <Drawer
          width={700}
          title="Order status & history"
          placement="right"
          closable={true}
          onClose={this.onClose}
          visible={visibleHistory}
        >
          <Spin spinning={orderloading}>{this.renderHistory(orders, products)}</Spin>
        </Drawer>
      </PageHeaderWrapper>
    );
  }
}

export default Product;
