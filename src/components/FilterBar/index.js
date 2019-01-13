/* eslint-disable */

import React from 'react';
import { connect } from 'dva';
import { Select, Row } from 'antd';

const Option = Select.Option;

@connect(({ filter, loading }) => ({
  filter,
  loading: loading.models.filter,
}))
class FilterBar extends React.Component {
  state = {
    filters: [],
    selectedRow: null,
  };

  componentDidMount() {
    const { data, onRef } = this.props;
    onRef && onRef(this);
    data && data.length && this.setState({ filters: data });
  }

  resetFilter = () => {
    const { filters } = this.state;
    const tmp = filters.map(item => {
      item.selectValue = '';
      return item;
    });
    this.setState({ filters: tmp });
  };

  handleChange = (value, index) => {
    const { onChange } = this.props;
    const { filters } = this.state;
    filters[index].selectValue = value ? value : '';
    this.setState({ filters: filters });

    if (onChange) {
      let tmp = {};
      filters.forEach(element => {
        element.selectValue && (tmp[element.key] = element.selectValue);
      });
      onChange && onChange(tmp);
    }
  };

  handleFocus = index => {
    this.setState({ selectedRow: index }, () => {
      const { dispatch, type } = this.props;
      const { filters } = this.state;

      if (!filters[index].options.length) {
        dispatch({
          type: 'filter/fetch',
          payload: {
            cls: type,
            param: filters[index].key,
          },
          callback: res => {
            filters[index].options = res.data;
            this.setState({ filters: filters });
          },
        });
      }
    });
  };

  renderOption = filter => {
    const options = filter.options.map((item, index) => {
      return (
        <Option key={item} value={item}>
          {item}
        </Option>
      );
    });
    return options;
  };

  renderFilter = () => {
    const { loading } = this.props;
    const { filters, selectedRow } = this.state;
    const data = filters.map((item, index) => {
      return (
        <Select
          dropdownMatchSelectWidth={false}
          style={{
            width: 150,
            marginBottom: 10,
            marginRight: index == filters.length - 1 ? 0 : 10,
          }}
          loading={selectedRow == index && loading}
          allowClear
          showSearch
          placeholder={item.name}
          value={item.selectValue ? item.selectValue : undefined}
          optionFilterProp="children"
          onChange={value => this.handleChange(value, index)}
          onFocus={this.handleFocus.bind(this, index)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {item.options.map((item, index) => {
            return (
              <Option key={item} value={item}>
                {item}
              </Option>
            );
          })}
        </Select>
      );
    });
    return data;
  };

  render() {
    return <Row>{this.renderFilter()}</Row>;
  }
}

export default FilterBar;
