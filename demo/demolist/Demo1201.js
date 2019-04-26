/**
*
* @title 拖拽改变行顺序
* @parent 行操作-拖拽
* @description 拖拽改变行顺序
* Demo1201
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
            display: "block",
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
  { title: "员工姓名", dataIndex: "b", key: "b", width:200 },
  { title: "性别", dataIndex: "c", key: "c", width: 500 },
  { title: "部门", dataIndex: "d", key: "d", width: 100 },
  { title: "职级", dataIndex: "e", key: "e", width: 100,fixed:'right'}
];

const data = [
  { a: "ASVAL_201903280005", b: "小张", c: "男", d: "财务二科", e: "M1", key: "1001" },
  { a: "ASVAL_201903200004", b: "小明", c: "男", d: "财务一科", e: "T1", key: "1002" },
  { a: "ASVAL_201903120001", b: "小红", c: "女", d: "财务四科", e: "T3", key: "1003" },
  { a: "ASVAL_201903120002", b: "小姚", c: "女", d: "财务一科", e: "T2", key: "1004" },
  { a: "ASVAL_201903120003", b: "小岳", c: "男", d: "财务五科", e: "T2", key: "1005" },
  { a: "ASVAL_201903120004", b: "小王", c: "男", d: "财务一科", e: "T5", key: "1006" },
  { a: "ASVAL_201903120005", b: "小绍", c: "男", d: "财务七科", e: "T2", key: "1007" },
  { a: "ASVAL_201903120006", b: "小郭", c: "男", d: "财务一科", e: "T3", key: "1008" },
  { a: "ASVAL_201903120007", b: "小杨", c: "女", d: "财务四科", e: "T2", key: "1009" }
];

class Demo1201 extends Component {

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
          rowDraggAble={true}
        />
    );
  }
}

export default Demo1201;
