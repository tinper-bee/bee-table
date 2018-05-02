/**
*
* @title 列排序
* @description 点击列的上下按钮即可排序
*
*/


import React, { Component } from 'react';
import Table from '../../src';
import filterColumn from '../../src/lib/filterColumn';
import Icon from "bee-icon";

const columns21 = [
  {
    title: "名字",
    dataIndex: "a",
    key: "a",
    width: 100
  },
  {
    title: "性别",
    dataIndex: "b",
    key: "b",
    width: 100
  },
  {
    title: "年龄",
    dataIndex: "c",
    key: "c",
    width: 200,
    sorter: (a, b) => a.c - b.c
  },
  {
    title: "武功级别",
    dataIndex: "d",
    key: "d"
  }
];

const data21 = [
  { a: "杨过", b: "男", c: 30,d:'内行', key: "2" },
  { a: "令狐冲", b: "男", c: 41,d:'大侠', key: "1" },
  { a: "郭靖", b: "男", c: 25,d:'大侠', key: "3" }
];

const FilterColumnTable = filterColumn(Table);

const defaultProps21 = {
  prefixCls: "bee-table"
};

class Demo21 extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    
    return <FilterColumnTable columns={columns21} data={data21} />;
  }
}
Demo21.defaultProps = defaultProps21;


export default Demo21;