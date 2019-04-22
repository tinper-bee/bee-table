/**
*
* @title 隔行换色
* @parent 基础 Basic
* @description 可自定义斑马线颜色
*
*/


import React, { Component } from 'react';
import Table from '../../src';

const columns04 = [
  {
    title: "员工姓名",
    width: 100,
    dataIndex: "name",
    key: "name"
  },
  { title: "年龄", width: 100, dataIndex: "age", key: "age"},
  { title: "住址", dataIndex: "address", key: "1" }
];

const data04 = [
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

class Demo04 extends Component {
  render() {
    return <Table 
            className="demo04" 
            columns={columns04} 
            data={data04} />
  }
}

export default Demo04; 