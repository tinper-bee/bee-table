/**
*
* @title 悬浮列
* @parent 列渲染 Custom Render
* @description 鼠标hover行时呼出操作按钮。
* demo0401
*/

import React, { Component } from "react";
import {Button,Popconfirm} from "tinper-bee";
import Table from "../../src";

const columns = [
  { title: "员工编号", dataIndex: "a", key: "a", width: 150 },
  { title: "员工姓名", dataIndex: "b", key: "b", width: 100 },
  { title: "性别", dataIndex: "c", key: "c", width: 100 },
  { title: "部门", dataIndex: "d", key: "d", width: 100 }
];

const data = [
  { a: "ASVAL_201903280005", b: "小张", c: "男", d: "财务二科", key: "1" },
  { a: "ASVAL_201903200004", b: "小明", c: "男", d: "财务一科", key: "2" },
  { a: "ASVAL_201903120002", b: "小红", c: "女", d: "财务一科", key: "3" }
];

class Demo11 extends Component {
  constructor(props) {
    super(props);
  }

  deleteRow=()=>{
    console.log('删除第' , this.currentIndex , '行');
  }

  onRowHover=(index,record)=>{
    this.currentIndex = index;
    this.currentRecord = record;
  }

  getHoverContent=(record, index)=>{
    return (
      <div className="opt-btns">
          <Popconfirm key={index} trigger="click" placement="left" content="是否删除当前行？" onClose={this.deleteRow}>
            <Button size="sm">删除</Button> 
          </Popconfirm>
      </div>
    )
  }

  render() {
    return (
        <Table
          columns={columns}
          data={data}
          onRowHover={this.onRowHover}
          hoverContent={this.getHoverContent}
        />
    );
  }
}

export default Demo11;
