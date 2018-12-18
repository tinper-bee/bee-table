/**
*
* @title 简单表格选中行的背景色、表头表尾
* @description
*/

import React, { Component } from "react";
import Button from "bee-button";
import Tooltip from "bee-tooltip";
import Table from "../../src";

const columns = [
  { title: "用户名", dataIndex: "a", key: "a", width:80 , className:"rowClassName"},
  { id: "123", title: "性别", dataIndex: "b", key: "b", width: 100 },
  { title: "年龄", dataIndex: "c", key: "c", width: 200 },
];

const data = [
  { a: "令狐冲", b: "男", c: 41, key: "1" },
  { a: "杨过叔叔的女儿黄蓉", b: "男", c: 67, key: "2" },
  { a: "郭靖", b: "男", c: 25, key: "3" }
];

class Demo26 extends Component {

  constructor(props){
      super(props);
      this.state = {
        data: data,
        selectedRowIndex: 0
      }
  }

  render() {
    return (
      <Table
        columns={columns}
        data={data}
        rowClassName={(record,index,indent)=>{
          if (this.state.selectedRowIndex == index) {
              return 'selected';
          } else {
              return '';
          }
        }}
        onRowClick={(record,index,indent)=>{
          this.setState({ 
              selectedRowIndex: index
          });
        }}
        title={currentData => <div>标题: 这是一个标题</div>}
        footer={currentData => <div>表尾: 我是小尾巴</div>}
      /> 
    );
  }
}

export default Demo26;
