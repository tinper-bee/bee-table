/**
*
* @title 全选功能
* @description 全选功能
*
*/

import React, { Component } from "react";
import Table from "../../src";
import Checkbox from "bee-checkbox";
import multiTable from "../../src/lib/multiSelectFunc.js";
import sortTable from "../../src/lib/sortFunc.js";

const columns13 = [
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
    title: "操作",
    dataIndex: "",
    key: "d",
    render() {
      return <a href="#">一些操作</a>;
    }
  }
];

const data13 = [
  { a: "杨过", b: "男", c: 30, key: "2" },
  { a: "令狐冲", b: "男", c: 41, key: "1" },
  { a: "郭靖", b: "男", c: 25, key: "3" }
];
class Demo13 extends Component {
  setCheckedOjb = (data) =>{
    console.log(data)
  }
  render() {
    let multiObj = {
      type: "checkbox",
      param: "key"
    };
    let ComplexTable = multiTable(sortTable(Table));
    return (
      <div>
        <ComplexTable
          columns={columns13}
          data={data13}
          multiSelect={multiObj}
          prefixCls="bee-table"
          getSelectedDataFunc={this.setCheckedOjb}
        />
      </div>
    );
  }
}
export default Demo13;
