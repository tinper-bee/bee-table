/**
 * @title 表格+分页
 * @parent 分页 Pagination
 * @description 点击分页联动表格
 * demo1601
 */

import React, { Component } from "react";
import {Pagination} from "tinper-bee";

import Table from "../../src";

const columns = [
  { title: "员工编号", dataIndex: "a", key: "a", width: 300, className: "rowClassName"},
  { title: "员工姓名", dataIndex: "b", key: "b", width: 500 },
  { title: "性别", dataIndex: "c", key: "c", width: 500 },
  { title: "部门", dataIndex: "d", key: "d", width: 200 }
];

const pageData = {
  1: [
    { a: "ASVAL_201903280005", b: "小张", c: "男", d: "财务二科", key: "1" },
    { a: "ASVAL_201903200004", b: "小明", c: "男", d: "财务一科", key: "2" },
    { a: "ASVAL_201903120002", b: "小红", c: "女", d: "财务一科", key: "3" }
  ],
  2: [
    { a: "ASVAL_201903280010", b: "小王", c: "女", d: "财务二科", key: "4" },
    { a: "ASVAL_201903200021", b: "小李", c: "男", d: "财务一科", key: "5" },
  ]
};

class Demo8 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: pageData[1],
      activePage: 1
    };
  }

  handleSelect(eventKey) {
    this.setState({
      data: pageData[eventKey],
      activePage: eventKey
    });
  }

  render() {
    return (
      <div className="demo8">
        <Table columns={columns} data={this.state.data} />
        <Pagination
          first
          last
          prev
          next
          maxButtons={5}
          boundaryLinks
          activePage={this.state.activePage}
          onSelect={this.handleSelect.bind(this)}
          onDataNumSelect={this.dataNumSelect}
          showJump={true}
          noBorder={true}
          total={100}
          dataNum={2}
        />
      </div>
    );
  }
}
export default Demo8;
