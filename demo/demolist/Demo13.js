/**
*
* @title 列排序、全选功能、合计
* @description 列排序、全选功能、合计（通过使用的封装好的功能方法实现复杂功能，简单易用！）
*
*/

import React, { Component } from "react";
import Table from "../../src";
import Checkbox from "bee-checkbox";
import multiSelect from "../../src/lib/multiSelect.js";
import sort from "../../src/lib/sort.js";
import sum from "../../src/lib/sum.js";

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
    sumCol:true,
    sorter: (a, b) => a.c - b.c
  },
  {
    title: "武功级别",
    dataIndex: "d",
    key: "d"
  }
];

const data13 = [
  { a: "杨过", b: "男", c: 30,d:'内行', key: "2" },
  { a: "令狐冲", b: "男", c: 41,d:'大侠', key: "1" },
  { a: "郭靖", b: "男", c: 25,d:'大侠', key: "3" }
];
class Demo13 extends Component {
  getSelectedDataFunc = (data) =>{
    console.log(data)
  }
  render() {
    let multiObj = {
      type: "checkbox",
    };
    let ComplexTable = multiSelect(sum(sort(Table)));
    return (
      <div>
        <ComplexTable
          columns={columns13}
          data={data13}
          multiSelect={multiObj}
          getSelectedDataFunc={this.getSelectedDataFunc}
        />
      </div>
    );
  }
}
export default Demo13;
