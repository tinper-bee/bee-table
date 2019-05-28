/**
*
* @title 单选功能
* @parent 行操作-选择
* @description 表格支持单选行操作，可自定义选中行背景色。getSelectedDataFunc方法是选中行的回调函数。
* Demo1302
*/

import React, { Component } from "react";
import Radio from "bee-radio";

import Table from "../../src";
import singleSelect from "../../src/lib/singleSelect.js";

const columns = [
    { title: "员工编号", dataIndex: "a", key: "a", width: 300 },
    { title: "员工姓名", dataIndex: "b", key: "b", width: 500 },
    { title: "性别", dataIndex: "c", key: "c", width: 500 },
    { title: "部门", dataIndex: "d", key: "d", width: 200 }
  ];
  
  const data = [
    { a: "ASVAL_201903280005", b: "小张", c: "男", d: "财务二科", key: "1" },
    { a: "ASVAL_201903200004", b: "小明", c: "男", d: "财务一科", key: "2" },
    { a: "ASVAL_201903120002", b: "小红", c: "女", d: "财务一科", key: "3" },
    { a: "ASVAL_201903280010", b: "小王", c: "女", d: "财务二科", key: "4" },
    { a: "ASVAL_201903200021", b: "小李", c: "男", d: "财务一科", key: "5" }
  ];

//拼接成复杂功能的table组件不能在render中定义，需要像此例子声明在组件的外侧，不然操作state会导致功能出现异常
let SingleSelectTable = singleSelect(Table, Radio);

class Demo1302 extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: data,
            selectedRowIndex: 0,
        }
    }

    /**
     *@param selected 当前选中的行数据(当前操作行数据)
     *@param index 当前操作行索引
     * @memberof Demo12
     */
    getSelectedDataFunc = (record,index) => {
        console.log("record", record, "index",index);

        this.setState({
            selectedRowIndex:index
        })
    };

    render() {
        let {selectedRowIndex} = this.state;

        return (
            <SingleSelectTable
                className="demo1302"
                bordered
                columns={columns}
                data={data}
                selectedRowIndex={selectedRowIndex}
                rowClassName={(record,index,indent)=>{
                    if (index === selectedRowIndex) {
                        return 'selected';
                    } else {
                        return '';
                    }
                }}
                getSelectedDataFunc={this.getSelectedDataFunc}
            /> 
        );
    }
}

export default Demo1302;
