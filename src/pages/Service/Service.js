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
import { assetFilter } from '@/utils/constants';
import { formatFilter } from '@/utils/utils';

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
@connect(({ asset, loading }) => ({
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
    formValues: {},
    filterOptions: assetFilter(),
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
    const { dispatch } = this.props;
    dispatch({
      type: 'asset/fetch',
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
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = formatFilter(this.state.filterOptions);

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
      type: 'asset/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { dispatch } = this.props;
    this.setState({ filterOptions: assetFilter() });
    dispatch({
      type: 'asset/fetch',
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

    const fileters = formatFilter(this.state.filterOptions);

    dispatch({
      type: 'asset/fetch',
      payload: {
        ...fileters,
      },
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
          <Col md={12} sm={24}>
            {/* {this.renderFilter()} */}
            <Row gutter={16}>
              <Col span={24}>
                <Select
                  style={{ width: 120, marginRight: '10px' }}
                  showSearch
                  placeholder="Industry"
                  optionFilterProp="children"
                  // onChange={handleChange}
                  // onFocus={handleFocus}
                  // onBlur={handleBlur}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
                <Select
                  style={{ width: 120, marginRight: '10px' }}
                  showSearch
                  placeholder="Plant Type"
                  optionFilterProp="children"
                  // onChange={handleChange}
                  // onFocus={handleFocus}
                  // onBlur={handleBlur}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
                <Select
                  style={{ width: 120, marginRight: '10px' }}
                  showSearch
                  placeholder="Plant Name"
                  optionFilterProp="children"
                  // onChange={handleChange}
                  // onFocus={handleFocus}
                  // onBlur={handleBlur}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </Col>
            </Row>
          </Col>
          <Col
            md={12}
            sm={24}
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}
          >
            <HeaderSearch
              defaultOpen={true}
              style={{ marginRight: '20px' }}
              placeholder={'Serial'}
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
