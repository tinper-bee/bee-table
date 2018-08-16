/**
 *
 * @title 表格+分页
 * @description 点击分页联动表格
 */

import React, { Component } from "react";

import Table from "../../src";
import Pagination from "bee-pagination";

const columns8 = [
  { title: "姓名", dataIndex: "a", key: "a", width: 100 },
  { id: "123", title: "性别", dataIndex: "b", key: "b", width: 100 },
  { title: "年龄", dataIndex: "c", key: "c", width: 200 },
  {
    title: "武功级别",
    dataIndex: "d",
    key: "d"
  }
];

const pageData = {
  1: [
    { a: "杨过", b: "男", c: 30, d: "内行", key: "2" },
    { a: "令狐冲", b: "男", c: 41, d: "大侠", key: "1" },
    { a: "郭靖", b: "男", c: 25, d: "大侠", key: "3" }
  ],
  2: [
    { a: "芙蓉姐姐", b: "女", c: 23, d: "大侠", key: "1" },
    { a: "芙蓉妹妹", b: "女", c: 23, d: "内行", key: "2" }
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
      <div>
        <Table columns={columns8} data={this.state.data} />
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
          total={100}
          dataNum={2}
        />
      </div>
    );
  }
}
export default Demo8;
