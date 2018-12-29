import React, { PureComponent } from 'react';
import {
  Checkbox,
  Icon,
  Button,
  Dropdown,
  Menu
} from 'antd';
import styles from './index.less';

export default class SelectCheckbox extends PureComponent {
  state = {
    visible: false,
    num: 0,
    indeterminate: false,
    checkAll: false,
    list: this.props.data,
    checkList: []
  }

  componentDidMount() {
    document.addEventListener("click", this.toClick);
    let list = this.setCheckList(this.props.data);
    this.setState({
      checkList: list,
      indeterminate: !(list.length == 0 || list.length == this.state.list.length),
      checkAll: list.length == this.state.list.length
    })
  }

  componentWillUnmount () {
    document.removeEventListener("click", this.toClick)
  }

  toClick = () => {
    const { num } = this.state;
    this.setState({num: num + 1}, ()=> {
      if(this.state.num == 1) {
        this.setState({visible: false, num: 0})
      }else if(this.state.num == 2) {
        this.setState({visible: true, num: 0})
      }
    })
  }

  trigger = () => {
    if(this.state.visible) {
      this.setState({num: 0})
    }else {
      this.setState({num: this.state.num + 1})
    }
  }

  setList = (checked) => {
    let { list } = this.state;
    list.map((item)=> {
      item.checked = checked;
      return item;
    })
    return list
  }

  setCheckList = (list) => {
    let tmp = list;
    let checkList = [];
    tmp.map((item)=> {
      if(item.checked) {
        checkList.push(item)
      }
    })
    return checkList
  }

  onChange = (e, index) => {
    let tmp = this.state.list;
    tmp[index].checked = e.target.checked;
    let checkList = this.setCheckList(tmp);
    this.setState({ 
      list: tmp, 
      checkList: checkList,
      indeterminate: !( checkList.length == 0 || checkList.length == tmp.length),
      checkAll: checkList.length == tmp.length
    }, ()=> {
      this.props.onChange(this.state.list)
    })
  }

  onCheckAllChange = (e) => {
    let { checkList } = this.state.checkList;
    let list = this.setList(e.target.checked);
    this.setState({
      indeterminate: false,
      checkAll: e.target.checked, 
      list: list, 
      checkList: e.target.checked ? list: []
    }, ()=> {
      this.props.onChange(this.state.list)
    })
  }

  renderMenu = () => {
    let items = [];

    this.state.list.map((item, index)=> {
      items.push(
        <Menu.Item key={index}>
          <Checkbox value={index} checked={item.checked} onChange={(e)=>{this.onChange(e, index)}}>{item.name}</Checkbox>
        </Menu.Item>
      )
    })

    return (
      <Menu
        onClick={()=>{
          this.setState({num: this.state.num + 1})}
        }>
        <Menu.Item>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}>
            Select All
          </Checkbox>
        </Menu.Item>
        <Menu.Divider />
        {items}
      </Menu>
    )
  }

  render() {

    return (
      <Dropdown overlay={this.renderMenu()} trigger={['click']} visible={this.state.visible}>
        <Button
          className={styles.filterCheckbox}
          style={this.state.visible ? {color: '#40a9ff', borderColor: '#40a9ff'}: {}}
          onClick={this.trigger}>
          <span>{this.props.title ? this.props.title : "tmp"}</span><Icon type="down" />
        </Button>
      </Dropdown>
    );
  }
}
