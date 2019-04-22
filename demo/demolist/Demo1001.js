/**
*
* @title 拖拽改变列顺序
* @parent 列操作-拖拽 Drag
* @description 点击选择表头并左右拖拽，可以改变表格列顺序。onDrop方法是拖拽交换列后触发的回调函数。注意：固定列不可以交换。
*/
import React, { Component } from 'react';
import {Icon} from "tinper-bee";

import Table from '../../src'; 
import dragColumn from '../../src/lib/dragColumn';

const columns = [
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

const data = [
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
    return <DragColumnTable 
            columns={columns} 
            data={data} 
            bordered
            draggable={true} 
            onDrop ={(event,data,columns)=>{
              console.log("--拖拽交换列后触发事件");
              console.log("event.target:",event.target);
              console.log("data:",data);
              console.log("拖拽完成后的columns:",columns);
            }}
    />;
  }
}

Demo22.defaultProps = defaultProps22;
export default Demo22;