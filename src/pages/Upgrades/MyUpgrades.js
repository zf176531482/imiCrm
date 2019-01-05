import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Button, Divider, Modal } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import HeaderSearch from '@/components/HeaderSearch';
import SelectCheckbox from '@/components/SelectCheckbox';
import DrawerUpgrades from '@/components/DrawerUpgrades';
import DrawerInput from '@/components/DrawerInput';

import styles from '../Service/Service.less';

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
class MyUpgrades extends PureComponent {
  state = {
    visibleEdit: false,
    visibleInput: false,
    selectedItem: {},
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
      title: 'Plant Name',
      dataIndex: 'plant_name',
    },
    {
      title: 'Application',
      dataIndex: 'application',
    },
    {
      title: 'Product Type',
      dataIndex: 'product_type',
    },
    {
      title: 'Maker',
      dataIndex: 'maker',
      render: text => (text ? text : '--'),
    },
    {
      title: 'Upgrade Type ',
      dataIndex: 'upgrade_type',
    },
    {
      title: 'Upgrade Status',
      dataIndex: 'upgrade_status',
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
    // console.log(this.props);
    const { dispatch } = this.props;
    dispatch({
      type: 'upgrade/opportunity',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      offset: (pagination.current - 1) * pagination.pageSize,
      limit: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'upgrade/opportunity',
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
        type: 'upgrade/opportunity',
        payload: values,
      });
    });
  };

  onClose = () => {
    this.setState({ visibleEdit: false, visibleInput: false });
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
            <div style={{ marginTop: '-10px', marginBottom: '15px' }}>
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
        <DrawerUpgrades data={selectedItem} visible={visibleEdit} onClose={this.onClose} />
        <DrawerInput visible={visibleInput} onClose={this.onClose} />
      </PageHeaderWrapper>
    );
  }
}

export default MyUpgrades;
