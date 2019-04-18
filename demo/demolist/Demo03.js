/**
*
* @title 固定表头
* @parent 基础 Basic
* @description 设置`scroll.y`指定滚动区域的高度，添加纵向滚动条，达到固定表头效果
*/

import React, { Component } from 'react';
import Table from '../../src';

const columns03 = [
  {
    title: "Full Name",
    width: 100,
    dataIndex: "name",
    key: "name"
  },
  { title: "Age", width: 100, dataIndex: "age", key: "age"},
  { title: "Address", dataIndex: "address", key: "1" }
];

const data03 = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York Park"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 40,
    address: "London Park"
  },
  {
    key: "3",
    name: "Jim Green",
    age: 40,
    address: "London Park"
  },
  {
    key: "4",
    name: "Jim Green",
    age: 40,
    address: "London Park"
  },{
    key: "11",
    name: "John Brown",
    age: 32,
    address: "New York Park"
  },
  {
    key: "12",
    name: "Jim Green",
    age: 40,
    address: "London Park"
  },
  {
    key: "13",
    name: "Jim Green",
    age: 40,
    address: "London Park"
  },
  {
    key: "14",
    name: "Jim Green",
    age: 40,
    address: "London Park"
  }
];

class Demo03 extends Component {
  render() {
    return <Table columns={columns03} data={data03} scroll={{y: 150 }} />;
  }
}

export default Demo03; 