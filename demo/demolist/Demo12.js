/**
*
* @title 全选功能
* @description 点击表格左列按钮即可选中，并且在选中的回调函数中能获取到选中的数据（未使用封装好的全选功能）
*
*/


import React, { Component } from 'react';
import Table from '../../src';
import multiSelect from "../../src/lib/multiSelect.js";
import Checkbox from 'bee-checkbox';

const columns12 = [
  {
    title: "名字",
    dataIndex: "a",
    key: "a",
    width: 100
  },
  {
    title: "性别",
    dataIndex: "b",
    key: "b",
    width: 100
  },
  {
    title: "年龄",
    dataIndex: "c",
    key: "c",
    width: 200,
    sorter: (a, b) => a.c - b.c
  },
  {
    title: "武功级别",
    dataIndex: "d",
    key: "d"
  }
];

const data12 = [
  { a: "杨过", b: "男", c: 30,d:'内行', key: "2",_checked:true },
  { a: "令狐冲", b: "男", c: 41,d:'大侠', key: "1" ,_checked:true},
  { a: "郭靖", b: "男", c: 25,d:'大侠', key: "3" ,_checked:true}
];
//拼接成复杂功能的table组件不能在render中定义，需要像此例子声明在组件的外侧，不然操作state会导致功能出现异常
let MultiSelectTable  = multiSelect(Table, Checkbox);

class Demo12 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data12
    };
  }
  getSelectedDataFunc = data => {
    console.log(data);
  };
  
  render() {
    let multiObj = {
      type: "checkbox"
    };
    return (
      <MultiSelectTable 
        columns={columns12} 
        data={data12} 
        multiSelect={multiObj}
        getSelectedDataFunc={this.getSelectedDataFunc}/>
    );
  }
}

export default Demo12;