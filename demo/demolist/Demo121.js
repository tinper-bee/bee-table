/**
*
* @title 多选表格
* @parent 行操作-选择
* @description 点击表格左列按钮即可选中，并且在选中的回调函数中能获取到选中的数据。支持多选、全选和禁止选择。
*
*/


import React, { Component } from 'react';
import {Checkbox} from "tinper-bee";

import Table from '../../src';
import multiSelect from "../../src/lib/multiSelect.js";

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
  { a: "令狐冲", b: "男", c: 41,d:'大侠', key: "1" ,_checked:false},
  { a: "郭靖", b: "男", c: 25,d:'大侠', key: "3" ,_checked:false},
  { a: "郭靖1", b: "男", c: 25,d:'大侠', key: "4" ,_disabled:true},
  { a: "郭靖2", b: "男", c: 25,d:'大侠', key: "5" ,_checked:false}
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
  /**
   *@param selectedList:当前选中的行数据
   *@param record 当前操作行数据
   *@param index 当前操作行索引
   * @memberof Demo12
   */
  getSelectedDataFunc = (selectedList,record,index) => {
    console.log("selectedList", selectedList,"index",index);
    // 如果在回调中增加setState逻辑，需要同步data中的_checked属性。即下面的代码
    // const allChecked = selectedList.length == 0?false:true;
    // record为undefind则为全选或者全不选
    // if(!record){
    //   data12.forEach(item=>{
    //     item._checked = allChecked;
    //   })
    // }else{
    //   data12[index]['_checked'] = record._checked;
    // } 

    
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
        rowClassName={(record,index,indent)=>{
          if (record._checked) {
              return 'selected';
          } else {
              return '';
          }
        }}
        getSelectedDataFunc={this.getSelectedDataFunc}/>
    );
  }
}

export default Demo12;