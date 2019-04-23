/**
*
* @title 表格 Loading 加载
* @parent 基础 Basic
* @description loading可以传boolean或者object对象，object为bee-loading组件的参数类型
* demo0105
*/

import React, { Component } from "react";
import Table from "../../src";
import {Button,Tooltip} from "tinper-bee";

const columns05 = [
  { title: "员工编号", dataIndex: "a", key: "a", width: 300, className: "rowClassName",fixed:'left'},
  { title: "员工姓名", dataIndex: "b", key: "b", width: 500 },
  { title: "性别", dataIndex: "c", key: "c", width: 500 },
  { title: "部门", dataIndex: "d", key: "d", width: 200 }
];

const data05 = [
  { a: "ASVAL_201903280005", b: "小张", c: "男", d: "财务二科", key: "1" },
  { a: "ASVAL_201903200004", b: "小明", c: "男", d: "财务一科", key: "2" },
  { a: "ASVAL_201903120002", b: "小红", c: "女", d: "财务一科", key: "3" }
];

class Demo05 extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading : true
    }
  }
  changeLoading = () => {
    this.setState({
      loading : !this.state.loading
    })
  }
  render() {
    return (
      <div>
        <Button
          className="editable-add-btn"
          onClick={this.changeLoading}
        >
          切换loading
        </Button>
        <Table
          columns={columns05}
          data={data05}
          // loading={this.state.loading}或者是boolean
          loading={{show:this.state.loading}}
        />
      </div>
    );
  }
}

export default Demo05;
