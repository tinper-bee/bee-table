/**
*
* @title 固定列
* @description 固定列到表格的某侧
*
*/



import React, { Component } from 'react';
import Table from '../../src';



const columns5 = [
  {
    title: "Full Name",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left"
  },
  { title: "Age", width: 100, dataIndex: "age", key: "age", fixed: "left" },
  { title: "Column 1", dataIndex: "c1", key: "1" },
  { title: "Column 2", dataIndex: "c2", key: "2" },
  { title: "Column 3", dataIndex: "c3", key: "3" },
  { title: "Column 4", dataIndex: "c4", key: "4" },
  { title: "Column 5", dataIndex: "c5", key: "5" },
  { title: "Column 6", dataIndex: "c6", key: "6" },
  { title: "Column 7", dataIndex: "c7", key: "7" },
  { title: "Column 8", dataIndex: "c8", key: "8" }
];

const data5 = [
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
  }
];

class Demo5 extends Component {
  render() {
    return <Table columns={columns5} data={data5}scroll={{ x: "130%", y: 140 }}/>;
  }
}

export default Demo5;