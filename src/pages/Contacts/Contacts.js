import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Icon, Button, Dropdown, Menu, Modal, message, Divider } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import HeaderSearch from '@/components/HeaderSearch';
import SelectCheckbox from '@/components/SelectCheckbox';
import { contactFilter } from '@/utils/constants';
import { formatFilter } from '@/utils/utils';
import { FormattedMessage, formatMessage } from 'umi/locale';
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
    modalVisible: false,
    updateModalVisible: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    filterOptions: contactFilter(),
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
      render: text => (text ? text : '--'),
    },
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      render: text => (text ? text : '--'),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phonenumber',
      render: text => (text ? text : '--'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: text => (text ? text : '--'),
    },
    {
      title: 'Cell Phone',
      dataIndex: 'cell_phone',
      render: text => (text ? text : '--'),
    },
    {
      title: 'Loaction',
      dataIndex: 'location',
      render: text => (text ? text : '--'),
    },
    // {
    //   title: 'Operation',
    //   render: (text, record) => (
    //     <a>
    //       <Icon type="ellipsis" style={{ transform: 'rotate(90deg)', fontSize: '18px' }} />
    //     </a>
    //     // <Fragment>
    //     //   {/* <a onClick={() => this.handleUpdateModalVisible(true, record)}>Edit</a> */}
    //     //   <a onClick={() => {}}>Edit</a>
    //     //   <Divider type="vertical" />
    //     //   <a
    //     //     onClick={() => {
    //     //       Modal.confirm({
    //     //         title: 'Do you want to delete these items?',
    //     //         content: 'When clicked the OK button, this dialog will be closed after 1 second',
    //     //         onOk() {
    //     //           return new Promise((resolve, reject) => {
    //     //             setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
    //     //           }).catch(() => console.log('Oops errors!'));
    //     //         },
    //     //         onCancel() {},
    //     //       });
    //     //     }}
    //     //   >
    //     //     Delete
    //     //   </a>
    //     // </Fragment>
    //   ),
    // },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'contact/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = formatFilter(this.state.filterOptions);

    const params = {
      offset: (pagination.current - 1) * pagination.pageSize,
      limit: pagination.pageSize,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'contact/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { dispatch } = this.props;
    this.setState({ filterOptions: contactFilter() });
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

    const { dispatch, form } = this.props;

    const fileters = formatFilter(this.state.filterOptions);

    dispatch({
      type: 'contact/fetch',
      payload: {
        ...fileters,
      },
    });
  };

  checkChange = (index, list) => {
    let { filterOptions } = this.state;
    filterOptions[index].data = list;
    this.setState({ filterOptions: filterOptions });
  };

  renderFilter = () => {
    let { filterOptions } = this.state;
    let selects = filterOptions.map((item, index) => {
      return (
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
          <Col md={12} sm={24}>
            {this.renderFilter()}
          </Col>
          <Col
            md={12}
            sm={24}
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}
          >
            <HeaderSearch
              defaultOpen={true}
              style={{ marginRight: '20px' }}
              placeholder={'First Name'}
              onSearch={value => {
                console.log('input', value); // eslint-disable-line
              }}
              onPressEnter={value => {
                console.log('enter', value); // eslint-disable-line
              }}
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
        <Col span={12}>
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
