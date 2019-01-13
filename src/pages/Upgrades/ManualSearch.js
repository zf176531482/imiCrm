import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Button, Divider, Modal, Select, Drawer, Input } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import HeaderSearch from '@/components/HeaderSearch';
import DrawerUpgrades from '@/components/DrawerUpgrades';
import FilterBar from '@/components/FilterBar';
import { filterType, DATA_BASE, trim, VALUE_TYPE } from '@/utils/constants';

import styles from '../Contacts/Contacts.less';

const { Option } = Select;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
/* eslint react/no-multi-comp:0 */
@connect(({ upgrade, loading }) => ({
  upgrade,
  loading: loading.models.upgrade,
}))
@Form.create()
class ManualSearch extends PureComponent {
  state = {
    visibleDetail: false,
    selectedRows: [],
    filterOptions: {},
    searchOptions: {},
    selectedRecord: {},
  };

  columns = [
    {
      title: 'Manufacturer',
      dataIndex: 'maker',
      render: text => (text && text.trim() ? text : '-'),
    },
    {
      title: 'Product Type',
      dataIndex: 'product_type',
      render: text => (text && text.trim() ? text : '-'),
    },
    {
      title: 'Model',
      dataIndex: 'model',
      render: text => (text && text.trim() ? text : '-'),
    },
    {
      title: 'Application',
      dataIndex: 'application',
      render: text => (text && text.trim() ? text : '-'),
    },
    {
      title: 'Success Case No',
      dataIndex: 'success_case_no',
      render: text => (text && text.trim() ? text : '-'),
    },
    {
      title: 'Typical Problem',
      dataIndex: 'typical_problem',
      render: text => (text && text.trim() ? text : '-'),
    },
    {
      title: 'Operation',
      render: (text, record) => (
        <a
          onClick={() => {
            this.setState({ visibleDetail: true, selectedRecord: record });
          }}
        >
          Detail
        </a>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'upgrade/completeValues',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { filterOptions, searchOptions } = this.state;
    const params = {
      offset: (pagination.current - 1) * pagination.pageSize,
      limit: pagination.pageSize,
      ...filterOptions,
      ...searchOptions,
    };

    dispatch({
      type: 'upgrade/completeValues',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { dispatch } = this.props;
    this.setState({
      filterOptions: {},
      searchOptions: {},
    });
    this.filterBar.resetFilter();
    this.filterInput.resetInput();
    dispatch({
      type: 'upgrade/completeValues',
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
    const { dispatch } = this.props;
    const { filterOptions, searchOptions } = this.state;
    dispatch({
      type: 'upgrade/completeValues',
      payload: {
        ...filterOptions,
        ...searchOptions,
      },
    });
  };

  onClose = () => {
    this.setState({ visibleDetail: false });
  };

  changeFilter = filter => {
    this.setState({ filterOptions: filter });
  };

  renderRecord = () => {
    const { selectedRecord } = this.state;
    const list = Object.keys(selectedRecord)
      .filter(item => item != 'id' && item != 'resource_uri')
      .map(item => {
        return (
          <Col span={24}>
            <Form.Item label={VALUE_TYPE[item]}>
              <Input disabled={true} value={selectedRecord[item]} />
            </Form.Item>
          </Col>
        );
      });

    return (
      <Form layout="vertical" hideRequiredMark className={styles.detailForm}>
        <Row>{list}</Row>
      </Form>
    );
  };

  renderForm() {
    return (
      <Form onSubmit={this.handleSearch} layout="inline" style={{ marginBottom: 10 }}>
        <Row>
          <Col lg={16} md={24} sm={24}>
            <FilterBar
              onRef={ref => (this.filterBar = ref)}
              data={filterType().values}
              type={DATA_BASE.VALUES}
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
              placeholder={'Model'}
              onSearch={value => {
                this.setState({ searchOptions: value ? { model__icontains: value } : {} });
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
      upgrade: { completeValues },
      loading,
    } = this.props;
    const { selectedRows, visibleDetail, selectedRecord } = this.state;

    const content = (
      <Row type="flex" align="middle">
        <Col span={24}>
          <h1 style={{ margin: 0, fontSize: '26px' }}>Manual Search</h1>
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
              data={completeValues}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Drawer
          width={500}
          title={selectedRecord.product_type}
          placement="right"
          closable={true}
          onClose={this.onClose}
          visible={visibleDetail}
        >
          {this.renderRecord()}
        </Drawer>
      </PageHeaderWrapper>
    );
  }
}

export default ManualSearch;
