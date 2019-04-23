/**
* @title 列排序
* @parent 列操作-排序 Sort
* @description  column中增加sorter: (a, b) => a.c - b.c 这里的a,b代表前后两个数据，c代表比较当前对象的字段名称
* demo0901
*/


import React, { Component } from 'react';
import {Icon} from "tinper-bee";
import Table from '../../src';
import sort from "../../src/lib/sort.js";

let ComplexTable = sort(Table, Icon);
const columns11 = [
  {
    title: "单据编号",
    dataIndex: "num",
    key: "num",
    width: 120,
    fixed: "left"
  },
  {
    title: "单据日期",
    dataIndex: "date",
    key: "date",
    width: 200,
  },
  {
    title: "供应商",
    dataIndex: "supplier",
    key: "supplier",
    width: 100
  },
  {
    title: "联系人",
    dataIndex: "contact",
    key: "contact",
  },
  {
    title: "整单数量",
    dataIndex: "total",
    key: "total",
    width: 150,
    sorter: (a, b) => a.total - b.total
  }
];

const data11 = [
  { num: "NU0391001", date: "2019-03-01", supplier: 'xx供应商',contact:'Tom', total:30 ,key: "1" },
  { num: "NU0391002", date: "2018-11-02", supplier: 'yy供应商',contact:'Jack', total:41 ,key: "2" },
  { num: "NU0391003", date: "2019-05-03", supplier: 'zz供应商',contact:'Jane', total:25 ,key: "3" }
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