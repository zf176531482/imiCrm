/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Button, Divider, Modal, Select } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import HeaderSearch from '@/components/HeaderSearch';
import DrawerUpgrades from '@/components/DrawerUpgrades';
import DrawerInput from '@/components/DrawerInput';
import FilterBar from '@/components/FilterBar';
import { filterType, DATA_BASE, trim } from '@/utils/constants';

import styles from '../Contacts/Contacts.less';

const { Option } = Select;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
/* eslint react/no-multi-comp:0 */
@connect(({ login, upgrade, loading }) => ({
  login,
  upgrade,
  loading: loading.effects['upgrade/opportunity'],
}))
@Form.create()
class MyUpgrades extends PureComponent {
  state = {
    visibleEdit: false,
    visibleInput: false,
    selectedItem: {},
    selectedRows: [],
    filterOptions: {},
    searchOptions: {},
  };

  columns = [
    {
      title: 'Industry',
      dataIndex: 'industry',
      render: text => (text && text.trim() ? text : '-'),
    },
    {
      title: 'Application',
      dataIndex: 'application',
      render: text => (text && text.trim() ? text : '-'),
    },
    // {
    //   title: 'Plant Name',
    //   dataIndex: 'plant_name',
    //   render: text => (text && text.trim() ? text : '-'),
    // },
    {
      title: 'Plant Type',
      dataIndex: 'plant_type',
      render: text => (text && text.trim() ? text : '-'),
    },
    {
      title: 'Product Type',
      dataIndex: 'product_type',
      render: text => (text && text.trim() ? text : '-'),
    },
    {
      title: 'Maker',
      dataIndex: 'maker',
      render: text => (text && text.trim() ? text : '-'),
    },
    {
      title: 'Upgrade Type ',
      dataIndex: 'upgrade_type',
      render: text => (text && text.trim() ? text : '-'),
    },
    {
      title: 'Upgrade Status',
      dataIndex: 'upgrade_status',
      render: text => (text && text.trim() ? text : '-'),
    },
    {
      title: 'Operation',
      render: (text, record) => (
        <a
          onClick={() => {
            this.setState({ visibleEdit: true, selectedItem: record });
          }}
        >
          Edit
        </a>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch, login } = this.props;

    dispatch({
      type: 'upgrade/opportunity',
      payload: {
        contact_email: login.user.email,
      },
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch, login } = this.props;
    const { filterOptions, searchOptions } = this.state;
    const params = {
      offset: (pagination.current - 1) * pagination.pageSize,
      limit: pagination.pageSize,
      contact_email: login.user.email,
      ...filterOptions,
      ...searchOptions,
    };

    dispatch({
      type: 'upgrade/opportunity',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { dispatch, login } = this.props;
    this.setState({
      filterOptions: {},
      searchOptions: {},
    });
    this.filterBar.resetFilter();
    this.filterInput.resetInput();
    dispatch({
      type: 'upgrade/opportunity',
      payload: {
        contact_email: login.user.email,
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
    const { dispatch, login } = this.props;
    const { filterOptions, searchOptions } = this.state;
    dispatch({
      type: 'upgrade/opportunity',
      payload: {
        contact_email: login.user.email,
        ...filterOptions,
        ...searchOptions,
      },
    });
  };

  onClose = () => {
    this.setState({ visibleEdit: false, visibleInput: false });
  };

  changeFilter = filter => {
    this.setState({ filterOptions: filter }, () => {
      const { dispatch, login } = this.props;
      const { filterOptions, searchOptions } = this.state;
      dispatch({
        type: 'upgrade/opportunity',
        payload: {
          contact_email: login.user.email,
          ...filterOptions,
          ...searchOptions,
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
              data={filterType().opportunity}
              type={DATA_BASE.OPP}
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
              placeholder={'Plant Name'}
              onSearch={value => {
                this.setState({ searchOptions: value ? { plant_name__icontains: value } : {} });
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
      upgrade: { opportunity },
      loading,
    } = this.props;
    const { selectedRows, visibleEdit, selectedItem, visibleInput } = this.state;

    const content = (
      <Row type="flex" align="middle">
        <Col span={24}>
          <h1 style={{ margin: 0, fontSize: '26px' }}>My Upgrade List & Status</h1>
        </Col>
      </Row>
    );
    return (
      <PageHeaderWrapper content={content}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div style={{ marginBottom: '15px' }}>
              <Button
                icon="plus"
                type="primary"
                onClick={() => {
                  this.setState({ visibleInput: true });
                }}
              >
                Input
              </Button>
            </div>
            <StandardTable
              rowKey={record => record.id}
              selectedRows={selectedRows}
              loading={loading}
              data={opportunity}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <DrawerUpgrades
          my={true}
          data={selectedItem}
          visible={visibleEdit}
          onClose={this.onClose}
        />
        <DrawerInput visible={visibleInput} onClose={this.onClose} />
      </PageHeaderWrapper>
    );
  }
}

export default MyUpgrades;
