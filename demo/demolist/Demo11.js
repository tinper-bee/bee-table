/**
* @description  column中增加sorter: (a, b) => a.c - b.c 这里的a,b代表前后两个数据，c代表比较当前对象的字段名称
* @title 列排序
*
*/


import React, { Component } from 'react';
import Table from '../../src';
import Icon from "bee-icon";
import sort from "../../src/lib/sort.js";
let ComplexTable = sort(Table, Icon);
const columns11 = [
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

const data11 = [
  { a: "杨过", b: "男", c: 30,d:'内行', key: "2" },
  { a: "令狐冲", b: "男", c: 41,d:'大侠', key: "1" },
  { a: "郭靖", b: "男", c: 25,d:'大侠', key: "3" }
];

const defaultProps11 = {
  prefixCls: "bee-table"
};
class Demo11 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOrder: "",
      data: data11
    };
  }
  render() {

    return <ComplexTable columns={columns11} data={this.state.data} />;
  }
}
Demo11.defaultProps = defaultProps11;


export default Demo11;