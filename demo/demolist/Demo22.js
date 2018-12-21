/**
*
* @title 列的拖拽，交换表头的顺序
* @description 点击列的表头，进行左右拖拽
*/
import React, { Component } from 'react';
import Table from '../../src'; 
import dragColumn from '../../src/lib/dragColumn';

import Icon from "bee-icon";

const columns22 = [
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

const data22 = [
  { a: "杨过", b: "男", c: 30,d:'内行', key: "2" },
  { a: "令狐冲", b: "男", c: 41,d:'大侠', key: "1" },
  { a: "郭靖", b: "男", c: 25,d:'大侠', key: "3" }
];

const DragColumnTable = dragColumn(Table);

const defaultProps22 = {
  prefixCls: "bee-table"
};

class Demo22 extends Component {
  constructor(props) {
    super(props); 
  }
 
  render() {
    return <DragColumnTable columns={columns22} data={data22} bordered
    
    draggable={true} 
    />;
  }
}
Demo22.defaultProps = defaultProps22;


export default Demo22;