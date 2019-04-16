/**
*
* @title 纵向滚动条
* @description 设置`scroll`属性支持横向或纵向滚动，x/y的取值可以是正整数、百分比、布尔值
*/

import React, { Component } from "react";
import Table from "../../src";

const columns12 = [
    {
      title: "Full Name",
      width: 100,
      dataIndex: "name",
      key: "name"
    },
    { title: "Age", width: 100, dataIndex: "age", key: "age"},
    { title: "Address", dataIndex: "address", key: "1" }
];

const data12 = [
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
class Demo12 extends Component {
  render() {
    return (
        <Table bordered columns={columns12} data={data12} scroll={{y:150 }} />
    );
  }
}

export default Demo12;
