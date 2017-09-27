/**
*
* @title 合计test
* @description
*
*/

import React, { Component } from "react";
import Table from "../../src";
import Sum from "../../src/lib/sum.js";

const columns14 = [
  { title: "用户名", dataIndex: "a", key: "a", width: 100 },
  { id: "123", title: "性别", dataIndex: "b", key: "b", width: 100 },
  {
    title: "年龄",
    dataIndex: "c",
    key: "c",
    width: 200,
    heji: true
  },
  {
    title: "操作",
    dataIndex: "d",
    key: "d",
    render(data) {
      return <a href="#">一些操作</a>;
    }
  }
];

//合计表头
// const columns14_ = [
//   { title: "用户名", dataIndex: "a", key: "a", width: 100 },
//   { id: "123", title: "性别", dataIndex: "b", key: "b", width: 100 },
//   {
//     title: "年龄",
//     dataIndex: "c",
//     key: "c",
//     width: 200,
//     heji: true
//   },
//   {
//     title: "操作",
//     dataIndex: "d",
//     key: "d"
//   }
// ];

const data14 = [
  { a: "令狐冲", b: "男", c: 41, key: "1" },
  { a: "杨过", b: "男", c: 67, key: "2" },
  { a: "郭靖", b: "男", c: 25, key: "3" },
];

//合计数据
// const data14_ = [
//   { a: "郭靖", b: "男", c: 25,d:11, key: "3" }
// ];

class Demo16 extends Component {
  
  render() {
    //使用高阶组件
    let SumTable  = Sum(Table);
    return (
      <SumTable
        columns={columns14}
        data={data14}
        title={"我是表头"}
      />
    );
  }
}

export default Demo16;
