/**
*
* @title 固定表头
* @description 方便一页内展示大量数据。需要指定 column 的 width 属性，否则列头和内容可能不对齐。(还可以设置scroll来支持横向或纵向滚动)
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
  { title: "Address", dataIndex: "address", key: "1" }
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