import React, { PureComponent } from 'react';
import { Checkbox, Icon, Button, Dropdown, Menu } from 'antd';
import styles from './index.less';

export default class SelectCheckbox extends React.Component {
  state = {
    visible: false,
    num: 0,
    indeterminate: false,
    checkAll: false,
    list: [],
    checkList: [],
  };

  componentDidMount() {
    document.addEventListener('click', this.toClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.toClick);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.list !== nextProps.data) {
      const { data } = nextProps;
      let checkList = this.setCheckList(data);
      this.setState({
        list: data,
        checkList: checkList,
        indeterminate: !(checkList.length == 0 || checkList.length == data.length),
        checkAll: checkList.length == data.length,
      });
    }
  }

  setCheckList = list => list.filter(item => item.checked == true);

  setList = checked => {
    const list = this.state.list.map(item => {
      item.checked = checked;
      return item;
    });
    return list;
  };

  toClick = () => {
    const { num } = this.state;
    this.setState({ num: num + 1 }, () => {
      if (this.state.num == 1) {
        this.setState({ visible: false, num: 0 });
      } else if (this.state.num == 2) {
        this.setState({ visible: true, num: 0 });
      }
    });
  };

  trigger = () => {
    if (this.state.visible) {
      this.setState({ num: 0 });
    } else {
      this.setState({ num: this.state.num + 1 });
    }
  };

  onChange = (e, index) => {
    let { list } = this.state;
    list[index].checked = e.target.checked;
    let checkList = this.setCheckList(list);
    this.setState({
      list: list,
      checkList: checkList,
      indeterminate: !(checkList.length == 0 || checkList.length == list.length),
      checkAll: checkList.length == list.length,
    });
    this.props.onChange(list);
  };

  onCheckAllChange = e => {
    let list = this.setList(e.target.checked);
    this.setState({
      indeterminate: false,
      checkAll: e.target.checked,
      list: list,
      checkList: e.target.checked ? list : [],
    });
    this.props.onChange(list);
  };

  renderMenu = () => {
    const items = this.state.list.map((item, index) => {
      return (
        <Menu.Item key={index}>
          <Checkbox
            value={index}
            checked={item.checked}
            onChange={e => {
              this.onChange(e, index);
            }}
          >
            {item.name}
          </Checkbox>
        </Menu.Item>
      );
    });

    return (
      <Menu
        onClick={() => {
          this.setState({ num: this.state.num + 1 });
        }}
        style={{ maxHeight: '300px', overflowY: 'auto' }}
      >
        <Menu.Item>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            Select All
          </Checkbox>
        </Menu.Item>
        <Menu.Divider />
        {items}
      </Menu>
    );
  };

  render() {
    return (
      <Dropdown overlay={this.renderMenu()} trigger={['click']} visible={this.state.visible}>
        <Button
          className={styles.filterCheckbox}
          style={this.state.visible ? { color: '#40a9ff', borderColor: '#40a9ff' } : {}}
          onClick={this.trigger}
        >
          <span>{this.props.title ? this.props.title : 'tmp'}</span>
          <Icon type="down" />
        </Button>
      </Dropdown>
    );
  }
}
