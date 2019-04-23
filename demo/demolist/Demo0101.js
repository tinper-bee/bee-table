/**
*
* @title 基本表格
* @parent 基础 Basic
* @description 单元格数据过长时，可结合Tooltip组件使用。
* demo0101
*/

import React, { Component } from "react";
import {Button,Tooltip} from "tinper-bee";
import Table from "../../src";

const columns = [
  {
    title: "员工编号", dataIndex: "a", key: "a", width: 120, className: "rowClassName",
    fixed:'left',
    render: (text, record, index) => {
      return (
        <Tooltip inverse overlay={text}>
          <span tootip={text} style={{
            display: "inline-block",
            width: "80px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            verticalAlign: "middle",
          }}>{text}</span>
        </Tooltip>
      );
    }
  },
  { title: "员工姓名", dataIndex: "b", key: "b", width:100 },
  { title: "性别", dataIndex: "c", key: "c", width: 100 },
  { title: "部门", dataIndex: "d", key: "d", width: 100 },
  { title: "职级", dataIndex: "e", key: "e", width: 100 }
];

const data = [
  { a: "ASVAL_201903280005", b: "小张", c: "男", d: "财务二科", e: "M1", key: "1" },
  { a: "ASVAL_201903200004", b: "小明", c: "男", d: "财务一科", e: "T1", key: "2" },
  { a: "ASVAL_201903120002", b: "小红", c: "女", d: "财务一科", e: "T2", key: "3" }
];

class Demo01 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: data
    }
  }
  handleClick = () => {
    console.log('这是第' , this.currentIndex , '行');
    console.log('内容：' , this.currentRecord);
  }

  render() {
    return (
        <Table
          columns={columns}
          data={data}
        />
    );
  }
}

export default Demo01;
