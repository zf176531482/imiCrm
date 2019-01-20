import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
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
  Input,
  Select,
  DatePicker,
  Upload,
  message,
  Checkbox,
} from 'antd';
import DrawerForm from '@/components/DrawerForm';
import DrawerDetail from '@/components/DrawerDetail';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import HeaderSearch from '@/components/HeaderSearch';
import FilterBar from '@/components/FilterBar';
import { filterType, DATA_BASE } from '@/utils/constants';

import styles from '../Contacts/Contacts.less';

const { Option } = Select;

const DRAWER_TYPE = {
  ADD_REPORT: 0,
  VIEW_HISTORY: 1,
};

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ login, asset, loading }) => ({
  currentUser: login.user,
  asset,
  loading: loading.models.asset,
}))
@Form.create()
class Service extends PureComponent {
  state = {
    visibleAdd: false,
    visibleHistory: false,
    selectedRows: [],
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
      title: 'Plant Type',
      dataIndex: 'plant_type',
    },
    {
      title: 'Add Report',
      dataIndex: 'updatedAt',
      render: (text, record) => (
        <a
          onClick={() => {
            this.showDrawer(DRAWER_TYPE.ADD_REPORT, record);
          }}
        >
          <Icon type="plus" className={styles.iconType} />
        </a>
      ),
    },
    {
      title: 'View History',
      dataIndex: 'owner',
      render: (text, record) => {
        return (
          <a
            onClick={() => {
              this.showDrawer(DRAWER_TYPE.VIEW_HISTORY, record);
            }}
          >
            <Icon type="calendar" className={styles.iconType} />
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
    switch (type) {
      case DRAWER_TYPE.ADD_REPORT:
        this.setState({ visibleAdd: true, checkRow: data });
        break;
      case DRAWER_TYPE.VIEW_HISTORY:
        this.setState({ visibleHistory: true, checkRow: data });
        break;
      default:
        break;
    }
  };

  onClose = () => {
    this.setState({
      visibleAdd: false,
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
          <Col lg={14} md={24} sm={24}>
            <FilterBar
              onRef={ref => (this.filterBar = ref)}
              data={filterType().report}
              type={DATA_BASE.REPORT}
              onChange={this.changeFilter}
            />
          </Col>
          <Col
            lg={10}
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

  render() {
    const {
      asset: { data },
      loading,
    } = this.props;
    const { selectedRows, visibleAdd, visibleHistory, checkRow } = this.state;

    const content = (
      <Row type="flex" align="middle">
        <Col span={24}>
          <h1 style={{ margin: 0, fontSize: '26px' }}>Service Report</h1>
        </Col>
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
        <DrawerForm visible={visibleAdd} onClose={this.onClose} data={checkRow} />
        <DrawerDetail visible={visibleHistory} onClose={this.onClose} data={checkRow} />
      </PageHeaderWrapper>
    );
  }
}

export default Service;
