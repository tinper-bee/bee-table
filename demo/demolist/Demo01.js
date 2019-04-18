/**
*
* @title 基本表格
<<<<<<< HEAD
* 【Tooltip】
* @description 鼠标hover行时呼出操作按钮
=======
* @parent 基础 Basic
* @description 鼠标hover行时呼出操作按钮。单元格数据过长时，可结合Tooltip组件使用。
>>>>>>> 6d25e1a2d12f9b9603a4aaf6461eedd5387ae0be
*/

import React, { Component } from "react";
import {Button,Tooltip} from "tinper-bee";
import Table from "../../src";

const columns = [
  {
    title: "员工编号", dataIndex: "a", key: "a", width: 300, className: "rowClassName",
    fixed:'left',
    textAlign:'center',
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
  { title: "员工姓名", dataIndex: "b", key: "b", width: 500,textAlign:'center'},
  { title: "性别", dataIndex: "c", key: "c", width: 500,textAlign:'center'},
  { title: "部门", dataIndex: "d", key: "d", width: 200,textAlign:'center' }
];

const data = [
  { a: "ASVAL_201903280005", b: "小张", c: "男", d: "财务二科", key: "1" },
  { a: "ASVAL_201903200004", b: "小明", c: "男", d: "财务一科", key: "2" },
  { a: "ASVAL_201903120002", b: "小红", c: "女", d: "财务一科", key: "3" }
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

  onRowHover=(index,record)=>{
    this.currentIndex = index;
    this.currentRecord = record;
  }

  getHoverContent=()=>{
    return <div className="opt-btns"><Button size="sm" onClick={this.handleClick}>一些操作</Button> </div>
  }

  render() {
    return (
        <Table
          columns={columns}
          data={data}
          height={40}
          hoverContent={this.getHoverContent}
          onRowHover={this.onRowHover}
        />
    );
  }
}

export default Demo01;
