/**
*
* @title 列排序,后端排序
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
  },
  {
    title: "分数",
    dataIndex: "e",
    key: "e",
    sorter: (a, b) => a.c - b.c
  },
];

const data11 = [
  { a: "杨过", b: "男", c: 30,d:'内行', e:139,key: "2" },
  { a: "令狐冲", b: "男", c: 41,d:'大侠', e:109, key: "1" },
  { a: "郭靖", b: "男", c: 25,d:'大侠', e:159, key: "3" }
];

const defaultProps = {
  prefixCls: "bee-table"
};
class Demo28 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOrder: "",
      data: data11
    };
  }
  /**
   * 后端获取数据
   */
  sortFun = (sortParam)=>{
    console.info(sortParam);
    //将参数传递给后端排序
  }
  render() {
    let sortObj = {
      mode:'multiple',
      backSource:true,
      sortFun:this.sortFun
    }
    return <ComplexTable columns={columns11} data={this.state.data} sort={sortObj}/>;
  }
}
Demo28.defaultProps = defaultProps;


export default Demo28;