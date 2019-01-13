import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Button, Divider, Modal, Select } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import HeaderSearch from '@/components/HeaderSearch';
import DrawerUpgrades from '@/components/DrawerUpgrades';
import FilterBar from '@/components/FilterBar';
import { filterType, DATA_BASE, trim } from '@/utils/constants';

import styles from '../Contacts/Contacts.less';

const { Option } = Select;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
/* eslint react/no-multi-comp:0 */
@connect(({ upgrade, loading }) => ({
  upgrade,
  loading: loading.effects['upgrade/opportunity'],
}))
@Form.create()
class FindUpgrades extends PureComponent {
  state = {
    visibleEdit: false,
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
    {
      title: 'Plant Name',
      dataIndex: 'plant_name',
      render: text => (text && text.trim() ? text : '-'),
    },
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
      title: 'Upgrade Type',
      dataIndex: 'upgrade_type',
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
          Detail
        </a>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'upgrade/opportunity',
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
      type: 'upgrade/opportunity',
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
      type: 'upgrade/opportunity',
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
      type: 'upgrade/opportunity',
      payload: {
        ...filterOptions,
        ...searchOptions,
      },
    });
  };

  onClose = () => {
    this.setState({ visibleEdit: false });
  };

  changeFilter = filter => {
    this.setState({ filterOptions: filter });
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
    const { selectedRows, visibleEdit, selectedItem } = this.state;

    const content = (
      <Row type="flex" align="middle">
        <Col span={24}>
          <h1 style={{ margin: 0, fontSize: '26px' }}>Find Upgrade Opportunities</h1>
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
              data={opportunity}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <DrawerUpgrades data={selectedItem} visible={visibleEdit} onClose={this.onClose} />
      </PageHeaderWrapper>
    );
  }
}

export default FindUpgrades;
