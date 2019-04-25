/**
*
* @title 多选功能
* @parent 行操作-选择
* @description 支持多选、全选和禁止选择。getSelectedDataFunc方法是选中行的回调函数，返回当前选中的数据数组。给data数据添加_checked参数可设置当前数据是否选中，添加_disabled参数可禁止选择当前数据。
* demo1301
*/


import React, { Component } from 'react';
import {Checkbox} from "tinper-bee";

import Table from '../../src';
import multiSelect from "../../src/lib/multiSelect.js";

const columns = [
  { title: "员工编号", dataIndex: "a", key: "a", width: 300, className: "rowClassName"},
  { title: "员工姓名", dataIndex: "b", key: "b", width: 500 },
  { title: "性别", dataIndex: "c", key: "c", width: 500 },
  { title: "部门", dataIndex: "d", key: "d", width: 200 }
];

const data = [
  { a: "ASVAL_201903280005", b: "小张", c: "男", d: "财务二科", key: "1",_checked:true },
  { a: "ASVAL_201903200004", b: "小明", c: "男", d: "财务一科", key: "2",_checked:false },
  { a: "ASVAL_201903120002", b: "小红", c: "女", d: "财务一科", key: "3",_checked:false },
  { a: "ASVAL_201903280010", b: "小王", c: "女", d: "财务二科", key: "4",_disabled:true },
  { a: "ASVAL_201903200021", b: "小李", c: "男", d: "财务一科", key: "5",_checked:false}
];
//拼接成复杂功能的table组件不能在render中定义，需要像此例子声明在组件的外侧，不然操作state会导致功能出现异常
let MultiSelectTable  = multiSelect(Table, Checkbox);

class Demo12 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data
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
        columns={columns} 
        data={data} 
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