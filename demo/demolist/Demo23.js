/**
*
* @title 动态调整列的宽度
* @description 点击列的表头，进行左右拖拽
*/
import React, { Component } from 'react';
import Table from '../../src'; 
import dragColumn from '../../src/lib/dragColumn';

import Icon from "bee-icon";

const columns23 = [
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
    width: 200
  },
  {
    title: "年龄",
    dataIndex: "c",
    key: "c",
    width: 200,
    sumCol: true,
    sorter: (a, b) => a.c - b.c
  },
  {
    title: "武功级别",
    dataIndex: "d",
    key: "d",
    width: 200,
  }
];

const data23 = [
  { a: "杨过", b: "男", c: 30,d:'内行', key: "2" },
  { a: "令狐冲", b: "男", c: 41,d:'大侠', key: "1" },
  { a: "郭靖", b: "男", c: 25,d:'大侠', key: "3" }
];

const DragColumnTable = dragColumn(Table);

const defaultProps23 = {
  prefixCls: "bee-table"
};

class Demo23 extends Component {
  constructor(props) {
    super(props); 
  }

  render() {
    return <DragColumnTable columns={columns23} data={data23} bordered
    dragborder={true}
    />;
  }
}
Demo23.defaultProps = defaultProps23;


export default Demo23;