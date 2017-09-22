/**
*
* @title 合计表格
* @description
*
*/

import React, { Component } from "react";
import Table from "../../src";

const columns14 = [
  { title: "用户名", dataIndex: "a", key: "a", width: 100 },
  { id: "123", title: "性别", dataIndex: "b", key: "b", width: 100 },
  {
    title: "年龄",
    dataIndex: "c",
    key: "c",
    width: 200,
    heji: true,
    render(data) {
      return <a href="#">一些操作</a>;
    }
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
const columns14_ = [
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
    key: "d"
  }
];

const data14 = [
  { a: "令狐冲", b: "男", c: 41, key: "1" },
  { a: "杨过", b: "男", c: 67, key: "2" },
  { a: "郭靖", b: "男", c: 25, key: "3" },
  { a: "合计", d: "11", key: "31" }
];

const data14_ = [
  { a: "郭靖", b: "男", c: 25,d:11, key: "3" }
];

class Demo14 extends Component {
  render() {
    return (
      <Table
        columns={columns14}
        data={data14}
        heji={true}
        title={currentData => <div>标题: 这是一个标题</div>}
        footer={currentData => (
          <Table
            showHeader={false}
            columns={columns14_}
            data={data14_}
            heji={true}
          />
        )}
      />
    );
  }
}

export default Demo14;
