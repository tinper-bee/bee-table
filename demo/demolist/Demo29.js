/**
*
* @title 从弹出框内显示过滤行并且设置可选下拉条件
* @description 通过Modal组件来展示表格的过滤相关能力，并且通过filterDropdownIncludeKeys设置可选条件
*
*/


import React, { Component } from 'react';
import Table from '../../src';
import Modal from 'bee-modal';
import Button from 'bee-button';


const columns29 = [
  {
    title: "姓名",
    width: 180,
    dataIndex: "name",
    key: "name",
    filterType: "text",
    filterDropdown: "show",
    filterDropdownIncludeKeys: ['LIKE', 'EQ']
  },
  {
    title: "年龄",
    width: 170,
    dataIndex: "age",
    key: "age",
    filterType: "number",
    filterDropdown: "show",
    filterDropdownType: "number",
    filterDropdownIncludeKeys: ['EQ'],
    filterInputNumberOptions: {
      max: 200,
      min: 0,
      step: 1,
      precision: 0
    }
  },
  {
    title: "日期",
    width: 200,
    dataIndex: "date",
    key: "date",
    filterType: "date",
    filterDropdown: "show",
    format: "YYYY-MM-DD"
  }
];

const data29 = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    date: "2018-09-19",
    address: "朝阳区",
    mark: "无"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 40,
    date: "2018-09-18",
    address: "朝阳区",
    mark: "无"
  },
  {
    key: "3",
    name: "Jim Green",
    age: 40,
    date: "2018-09-18",
    address: "东城区",
    mark: "无"
  },
  {
    key: "4",
    name: "Jim Green",
    age: 40,
    date: "2018-09-18",
    address: "东城区",
    mark: "无"
  }, {
    key: "5",
    name: "John Brown",
    age: 32,
    date: "2018-09-18",
    address: "海淀区",
    mark: "无"
  },
  {
    key: "6",
    name: "Jim Green",
    age: 48,
    date: "2018-09-18",
    address: "海淀区",
    mark: "无"
  },
  {
    key: "7",
    name: "Jim Green",
    age: 40,
    date: "2018-09-18",
    address: "海淀区",
    mark: "无"
  },
  {
    key: "8",
    name: "Jim Green",
    age: 38,
    date: "2018-09-18",
    address: "海淀区",
    mark: "无"
  }
];

class Demo29 extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    }
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  handlerFilterChange = (key, val, condition) => {
    console.log('参数：key=', key, ' value=', val, 'condition=', condition);
  }

  handlerFilterClear = (key) => {
    console.log('清除条件', key);
  }
  close() {
    this.setState({
      show: false
    });
  }
  open() {
    this.setState({
      show: true
    });
  }
  render() {
    return (<div><Modal
      show={this.state.show}
      onHide={this.close}
      autoFocus={false}
      enforceFocus={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>过滤行</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table
          onFilterChange={this.handlerFilterChange}//下拉条件的回调(key,val)=>()
          onFilterClear={this.handlerFilterClear}//触发输入操作以及其他的回调(key,val)=>()
          filterDelay={500}//输入文本多少ms触发回调函数，默认300ms
          filterable={true}//是否开启过滤数据功能
          bordered
          columns={columns29}
          data={data29} />
      </Modal.Body>
    </Modal>
      <Button colors="primary" onClick={this.open}>显示表格</Button>
    </div>)
  }
}

export default Demo29;