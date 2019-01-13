import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Icon, Button, Dropdown, Menu, Modal, message, Divider } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import HeaderSearch from '@/components/HeaderSearch';
import FilterBar from '@/components/FilterBar';
import { filterType, DATA_BASE } from '@/utils/constants';
import styles from './Contacts.less';

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
/* eslint react/no-multi-comp:0 */
@connect(({ contact, loading }) => ({
  contact,
  loading: loading.models.contact,
}))
@Form.create()
class Contacts extends React.Component {
  state = {
    selectedRows: [],
    filterOptions: {},
    searchOptions: {},
  };

  columns = [
    {
      title: 'Name',
      dataIndex: 'first_name',
      render: (text, record) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: 'Dept',
      dataIndex: 'dept',
      render: text => (text ? text : '-'),
    },
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      render: text => (text ? text : '-'),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phonenumber',
      render: text => (text ? text : '-'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: text => (text ? text : '-'),
    },
    {
      title: 'Cell Phone',
      dataIndex: 'cell_phone',
      render: text => (text ? text : '-'),
    },
    {
      title: 'Loaction',
      dataIndex: 'location',
      render: text => (text ? text : '-'),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'contact/fetch',
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
      type: 'contact/fetch',
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
      type: 'contact/fetch',
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
      type: 'contact/fetch',
      payload: {
        ...filterOptions,
        ...searchOptions,
      },
    });
  };

  changeFilter = filter => {
    this.setState({ filterOptions: filter });
  };
  // gutter={{ md: 8, lg: 24, xl: 48 }}
  renderForm() {
    return (
      <Form onSubmit={this.handleSearch} layout="inline" style={{ marginBottom: 10 }}>
        <Row>
          <Col lg={14} md={24} sm={24}>
            <FilterBar
              onRef={ref => (this.filterBar = ref)}
              data={filterType().contact}
              type={DATA_BASE.CONTACT}
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
              placeholder={'First Name'}
              onSearch={value => {
                this.setState({ searchOptions: value ? { first_name__icontains: value } : {} });
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
      contact: { data },
      loading,
    } = this.props;
    const { selectedRows } = this.state;

    const content = (
      <Row type="flex" align="middle">
        <Col span={24}>
          <h1 style={{ margin: 0, fontSize: '26px' }}>Contacts</h1>
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
      </PageHeaderWrapper>
    );
  }
}

export default Contacts;
