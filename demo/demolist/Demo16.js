/**
*
* @title 嵌套子表格
* @description 通过expandedRowRender参数来实现子表格
*
*/

import React, { Component } from "react";
import Table from "../../src";

const columns16 = [
  {
    title: "操作",
    dataIndex: "d",
    key: "d", 
    width:200,
    render(text, record, index) {
      return (
        <a
          href="#"
          onClick={() => {
            alert("这是第" + index + "列，内容为:" + text);
          }}
        >
          一些操作
        </a>
      );
    }
  },
  { title: "用户名", dataIndex: "a", key: "a", width: 250 },
  { id: "123", title: "性别", dataIndex: "b", key: "b", width: 100 },
  { title: "年龄", dataIndex: "c", key: "c", width: 200 },
  
];
const columns17 = [
  {
    title: "操作",
    dataIndex: "d",
    key: "d",
    width:200,
    render(text, record, index) {
      return (
        <a
          href="#"
          onClick={() => {
            alert("这是第" + index + "列，内容为:" + text);
          }}
        >
          一些操作
        </a>
      );
    }
  },
  { title: "用户名", dataIndex: "a", key: "a", width: 100 },
  { id: "123", title: "性别", dataIndex: "b", key: "b", width: 100 },
  { title: "年龄", dataIndex: "c", key: "c", width: 200 },
  
];

const data16 = [
  { a: "令狐冲", b: "男", c: 41, d: "操作", key: "1" },
  { a: "杨过", b: "男", c: 67, d: "操作", key: "2" },
  { a: "郭靖", b: "男", c: 25, d: "操作", key: "3" }
];


class Demo16 extends Component {
  constructor(props){
    super(props);
    this.state={
      data_obj:{}
    }
  }
  expandedRowRender = (record, index, indent) => {
    let height = 42 * (this.state.data_obj[record.key].length+ 2);
    
    return (
      <Table
        columns={columns17}
        style={{height:height}}
        data={this.state.data_obj[record.key]} 

      />
    );
  };
  getData=(expanded, record)=>{
    //当点击展开的时候才去请求数据
    let new_obj = Object.assign({},this.state.data_obj);
    if(expanded){
      if(record.key==='1'){
        new_obj[record.key] = [
          { a: "令狐冲", b: "男", c: 41, d: "操作", key: "1" },
          { a: "杨过", b: "男", c: 67, d: "操作", key: "2" }
        ]
        this.setState({
          data_obj:new_obj
        })
      }else{
        new_obj[record.key] = [
          { a: "令狐冲", b: "男", c: 41, d: "操作", key: "1" }
        ]
        this.setState({
          data_obj:new_obj
        })
      }
    }
  }
  haveExpandIcon=(record, index)=>{
    //控制是否显示行展开icon，该参数只有在和expandedRowRender同时使用才生效
    if(index == 0){
      return true;
    }
    return false;
  }
  render() {
    return (
      <Table
        columns={columns16}
        data={data16}
        onExpand={this.getData}
        expandedRowRender={this.expandedRowRender}
        scroll={{x:true}}
        title={currentData => <div>标题: 这是一个标题</div>}
        footer={currentData => <div>表尾: 我是小尾巴</div>}
      />
    );
  }
}

export default Demo16;
