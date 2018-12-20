/**
 *
 * @title 多列排序、全选功能、合计
 * @description 多列排序、全选功能、合计（通过使用的封装好的功能方法实现复杂功能，简单易用！）新增回调函数(sorterClick)
 *
 */

import React, { Component } from "react";
import Table from "../../src";
import Checkbox from "bee-checkbox";
import Button from "bee-button";
import Icon from "bee-icon";
import multiSelect from "../../src/lib/multiSelect.js";
import sort from "../../src/lib/sort.js";
import sum from "../../src/lib/sum.js";

const columns13 = [
  {
    title: "名字",
    dataIndex: "a",
    key: "a",
    className:'dfasd',
    width: 200
  },
  {
    title: "功力指数",
    dataIndex: "b",
    key: "b",
    width: 200,
    sumCol: true,
    sorter: (a, b) => a.c - b.c,
    sorterClick:(data,type)=>{//排序的回调函数
      //type value is up or down
      console.log("data",data);
    }
  },
  {
    title: "年龄",
    dataIndex: "c",
    key: "c",
    width: 200,
    sumCol: true,
    sorter: (a, b) => a.c - b.c,
    sorterClick:(data,type)=>{//排序的回调函数
      //type value is up or down
      console.log("data",data);
    }
  },
  {
    title: "成绩",
    dataIndex: "e",
    key: "e",
    width: 200,
    sumCol: true,
    sorter: (a, b) => a.c - b.c,
  },
  {
    title: "武功级别",
    dataIndex: "d",
    key: "d",
    fixed:'right',
    width: 200
  }
];

const data13 = [
  { a: "令狐冲", b: 43, c: 41, d: "大侠",e:90.52, key: "1" },

];

//拼接成复杂功能的table组件不能在render中定义，需要像此例子声明在组件的外侧，不然操作state会导致功能出现异常
let ComplexTable = multiSelect(sum(sort(Table, Icon)), Checkbox);

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
          change selectedRow
        </Button>
        <ComplexTable
          selectDisabled={this.state.selectDisabled}
          selectedRow={this.state.selectedRow}
          columns={columns13}
          data={this.state.data13}
          multiSelect={multiObj}
          sort={sortObj}
          scroll={{x:'100%',y:100}}
          getSelectedDataFunc={this.getSelectedDataFunc}
        />
      </div>
    );
  }
}
export default Demo13;
