/**
 *
 * @title 多列排序
 * @parent 列操作-排序 Sort
 * @description 结合多列排序、全选功能、合计功能的表格示例。新增排序后触发的回调函数sorterClick。
 * demo0903
 */

import React, { Component } from "react";
import {Checkbox,Button,Icon} from "tinper-bee";
import Table from "../../src";
import multiSelect from "../../src/lib/multiSelect.js";
import sort from "../../src/lib/sort.js";
import sum from "../../src/lib/sum.js";

const columns13 = [
  {
    title: "订单编号",
    dataIndex: "a",
    key: "a",
    className:'dfasd',
    width: 200,
    sorter: (pre, after) => {return pre.a.localeCompare(after.a)},
    sorterClick:(data,type)=>{//排序的回调函数
      //type value is up or down
      console.log("data",data);
    }
  },
  {
    title: "金额",
    dataIndex: "b",
    key: "b",
    width: 200,
    sumCol: true,
    sorter: (pre, after) => pre.b - after.b,
    sorterClick:(data,type)=>{//排序的回调函数
      //type value is up or down
      console.log("data",data);
    }
  },
  {
    title: "整单数量",
    dataIndex: "c",
    key: "c",
    width: 200,
    sumCol: true,
    sorter: (pre, after) => pre.c - after.c,
    sorterClick:(data,type)=>{//排序的回调函数
      //type value is up or down
      console.log("data",data);
    }
  },
  {
    title: "日销售量",
    dataIndex: "e",
    key: "e",
    width: 200,
    sumCol: true,
    sorter: (pre, after) => pre.e - after.e,
  },
  {
    title: "供应商",
    dataIndex: "d",
    key: "d",
    width: 200
  }
];

const data13 = [
  { a: "NU0391001", b: 675, c: 30, d: "xx供应商",e:100, key: "2" },
  { a: "NU0391002", b: 43, c: 41, d: "yy供应商",e:90, key: "1" },
  { a: "NU0391003", b: 43, c: 81, d: "zz供应商", e:120,key: "4" },
  { a: "NU0391004", b: 43, c: 81, d: "aa供应商", e:130,key: "5" },
  { a: "NU0391005", b: 153, c: 25, d: "bb供应商",e:90, key: "3" }
];


//拼接成复杂功能的table组件不能在render中定义，需要像此例子声明在组件的外侧，不然操作state会导致功能出现异常
let ComplexTable = multiSelect(sort(sum(Table, Icon)), Checkbox);

class Demo13 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data13: data13,
      selectedRow: this.selectedRow,
      selectDisabled: this.selectDisabled
    };
  }
  getSelectedDataFunc = data => {
    console.log(data);
  };
  selectDisabled = (record, index) => {
    // console.log(record);
    if (index === 1) {
      return true;
    }
    return false;
  };
  selectedRow = (record, index) => {
    // console.log(record);
    if (index === 0) {
      return true;
    }
    return false;
  };
  onClick = () => {
    this.setState({
      selectedRow: function() {}
    });
  };

  render() {
    let multiObj = {
      type: "checkbox"
    };
    let sortObj = {
      mode:'multiple'
    }
   
    return (
      <div>
        <Button className="editable-add-btn" onClick={this.onClick}>
          清空已选
        </Button>
        <ComplexTable
          bordered
          selectDisabled={this.state.selectDisabled}
          selectedRow={this.state.selectedRow}
          columns={columns13}
          data={this.state.data13}
          multiSelect={multiObj}
          sort={sortObj}
          getSelectedDataFunc={this.getSelectedDataFunc}
        />
      </div>
    );
  }
}
export default Demo13;