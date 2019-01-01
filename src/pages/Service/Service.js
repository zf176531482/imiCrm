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
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import HeaderSearch from '@/components/HeaderSearch';
import SelectCheckbox from '@/components/SelectCheckbox';
import DrawerForm from '@/components/DrawerForm';
import DrawerDetail from '@/components/DrawerDetail';

import styles from './Service.less';

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
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
class Service extends PureComponent {
  state = {
    visibleAdd: false,
    visibleHistory: false,
    selectedRows: [],

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
      title: 'Plant Type',
      className: 'td-center',
      dataIndex: 'status',
    },
    {
      title: 'Add Report',
      className: 'td-center',
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
      className: 'td-center',
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
    // console.log(this.props);
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

  showDrawer = (type, data) => {
    switch (type) {
      case DRAWER_TYPE.ADD_REPORT:
        this.setState({ visibleAdd: true });
        break;
      case DRAWER_TYPE.VIEW_HISTORY:
        this.setState({ visibleHistory: true });
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

  render() {
    const {
      rule: { data },
      loading,
    } = this.props;
    const { selectedRows, visibleAdd, visibleHistory } = this.state;

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
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <DrawerForm visible={visibleAdd} onClose={this.onClose} />
        <DrawerDetail visible={visibleHistory} onClose={this.onClose} />
      </PageHeaderWrapper>
    );
  }
}

export default Service;
