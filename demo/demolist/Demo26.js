/**
*
* @title 按条件和值过滤
* @description 可以根据输入项目以及判断条件对表格内的数据进行过滤
*
*/


import React, { Component } from 'react';
import Table from '../../src';


const columns26 = [
  { title: "姓名", width: 150, dataIndex: "name", key: "name", filterType: "text" },
  { title: "年龄", width: 100, dataIndex: "age", key: "age", filterType: "dropdown" },
  { title: "日期", width: 200, dataIndex: "date", key: "date", filterType: "date" },
  { title: "居住地址", width: 150, dataIndex: "address", key: "address", filterType: "text" },
  { title: "备注", dataIndex: "mark", key: "mark" }
];

const data26 = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    date: "2018-09-18 09:46:44",
    address: "朝阳区",
    mark: "无"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 40,
    date: "2018-09-18 09:46:44",
    address: "朝阳区",
    mark: "无"
  },
  {
    key: "3",
    name: "Jim Green",
    age: 40,
    date: "2018-09-18 09:46:44",
    address: "东城区",
    mark: "无"
  },
  {
    key: "4",
    name: "Jim Green",
    age: 40,
    date: "2018-09-18 09:46:44",
    address: "东城区",
    mark: "无"
  }, {
    key: "5",
    name: "John Brown",
    age: 32,
    date: "2018-09-18 09:46:44",
    address: "海淀区",
    mark: "无"
  },
  {
    key: "6",
    name: "Jim Green",
    age: 48,
    date: "2018-09-18 09:46:44",
    address: "海淀区",
    mark: "无"
  },
  {
    key: "7",
    name: "Jim Green",
    age: 40,
    date: "2018-09-18 09:46:44",
    address: "海淀区",
    mark: "无"
  },
  {
    key: "8",
    name: "Jim Green",
    age: 38,
    date: "2018-09-18 09:46:44",
    address: "海淀区",
    mark: "无"
  }
];

class Demo6 extends Component {
  handlerFilterRowsChange = (key, val) => {
    console.log('准备构建AJAX请求，接收参数：key=', key, ' value=', val);
  }
  handlerFilterRowsDropChange = (key, val) => {
    console.log('过滤条件类型:', key, val);
  }
  render() {
    return <Table onFilterRowsDropChange={this.handlerFilterRowsDropChange} onFilterRowsChange={this.handlerFilterRowsChange} filterable={true} bordered columns={columns26} data={data26} />;
  }
}

export default Demo6;