/**
*
* @title 基本表格
* 【Tooltip】
* @description
*/

import React, { Component } from "react";
import {Button,Tooltip} from "tinper-bee";
import Table from "../../src";

const columns = [
  {
    title: "用户名", dataIndex: "a", key: "a", width: 300, className: "rowClassName",
    fixed:'left',
    render: (text, record, index) => {
      return (
        <Tooltip inverse overlay={text}>
          <span tootip={text} style={{
            display: "inline-block",
            width: "60px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            verticalAlign: "middle",
          }}>{text}</span>
        </Tooltip>
      );
    }
  },
  { id: "123", title: "性别", dataIndex: "b", key: "b", width: 500},
  { title: "年龄", dataIndex: "c", key: "c", width: 200 }
];

const data = [
  { a: "令狐冲", b: "男", c: 41, key: "1" },
  { a: "杨过叔叔的女儿黄蓉", b: "男", c: 67, key: "2" },
  { a: "郭靖", b: "男", c: 25, key: "3" }
];

class Demo1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: data,
      selectedRowIndex: 0
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
          parentNodeId='parent'
          height={40}
          headerHeight={40}
          hoverContent={this.getHoverContent}
          onRowHover={this.onRowHover}
          onRowClick={(record, index, indent) => {
            this.setState({
              selectedRowIndex: index
            });
          }}
        />

     
    );
  }
}

export default Demo1;
