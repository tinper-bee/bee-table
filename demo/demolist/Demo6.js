/**
*
* @title 固定表头
* @description 方便一页内展示大量数据。需要指定 column 的 width 属性，否则列头和内容可能不对齐。
*
*/


import React, { Component } from 'react';
import Table from '../../src';


const columns6 = [
  {
    title: "Full Name",
    width: 100,
    dataIndex: "name",
    key: "name"
  },
  { title: "Age", width: 100, dataIndex: "age", key: "age"},
  { title: "Column 1", dataIndex: "address", key: "1" },
  { title: "Column 2", dataIndex: "address", key: "2" },
  { title: "Column 3", dataIndex: "address", key: "3" },
  { title: "Column 4", dataIndex: "address", key: "4" },
  { title: "Column 5", dataIndex: "address", key: "5" },
  { title: "Column 6", dataIndex: "address", key: "6" },
  { title: "Column 7", dataIndex: "address", key: "7" },
  { title: "Column 8", dataIndex: "address", key: "8" }
];

const data6 = [
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

class Demo6 extends Component {
  render() {
    return <Table columns={columns6} data={data6} scroll={{ y: 150 }} />;
  }
}

export default Demo6;