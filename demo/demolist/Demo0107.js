/**
*
* @title 带边框
* @parent 基础 Basic
* @description 设置 `bordered` 属性可添加表格边框线。
* demo0107
*/

import React, { Component } from "react";
import {Button,Tooltip} from "tinper-bee";
import Table from "../../src";

const columns = [
  { title: "员工编号", dataIndex: "a", key: "a", width: 150 },
  { title: "员工姓名", dataIndex: "b", key: "b", width:100},
  { title: "性别", dataIndex: "c", key: "c", width: 100},
  { title: "部门", dataIndex: "d", key: "d", width: 100 },
  { title: "职级", dataIndex: "e", key: "e", width: 100 }
];

const data = [
  { a: "ASVAL_20190328", b: "小张", c: "男", d: "财务二科", e: "M1", key: "1" },
  { a: "ASVAL_20190320", b: "小明", c: "男", d: "财务一科", e: "T1", key: "2" },
  { a: "ASVAL_20190312", b: "小红", c: "女", d: "财务一科", e: "T2", key: "3" }
];

class Demo06 extends Component {
  render() {
    return (
        <Table
          columns={columns}
          data={data}
          bordered
        />
    );
  }
}

export default Demo06;
