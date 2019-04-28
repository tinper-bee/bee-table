/**
*
* @title 单选功能
* @parent 行操作-选择
* @description 表格支持单选行操作，可自定义选中行背景色。
* Demo1304
*/

import React, { Component } from "react";
import {Button,Tooltip,Radio} from "tinper-bee";

import Table from "../../src";

const data = [
  { check: "ASVAL_201903280005",a: "ASVAL_201903280005", b: "小张", c: "男", d: "财务二科", key: "1" },
  { check: "ASVAL_201903200004",a: "ASVAL_201903200004", b: "小明", c: "男", d: "财务一科", key: "2" },
  { check: "ASVAL_201903120002",a: "ASVAL_201903120002", b: "小红", c: "女", d: "财务一科", key: "3" }
];

class Demo1304 extends Component {

  constructor(props){
      super(props);
      this.state = {
        data: data,
        selectedRowIndex: 0,
        selectedValue:"ASVAL_201903280005"
      }
  }

  render() {
    let {selectedValue} = this.state;
    let columns = [
      { title: "单选", dataIndex: "check", key: "check", width: 80,render(text, record, index){
        return(
          <Radio.RadioGroup name="fruits"  selectedValue={selectedValue}>
          <Radio value={record.check} />
        </Radio.RadioGroup>)
      }},  
      { title: "员工编号", dataIndex: "a", key: "a", width: 300},
      { title: "员工姓名", dataIndex: "b", key: "b", width: 500 },
      { title: "性别", dataIndex: "c", key: "c", width: 500 },
      { title: "部门", dataIndex: "d", key: "d", width: 200 }
    ];

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
              selectedRowIndex: index,
              selectedValue:record.check
          });
        }}
        title={currentData => <div>员工信息统计表</div>}
        footer={currentData => <div>合计: 共{data.length}条数据</div>}
      /> 
    );
  }
}

export default Demo1304;
