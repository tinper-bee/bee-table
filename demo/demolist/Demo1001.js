/**
*
* @title 拖拽改变列顺序
* @parent 列操作-拖拽 Drag
* @description 点击选择表头并左右拖拽，可以改变表格列顺序。 onDragEnd 方法是拖拽交换列后触发的回调函数。注意：固定列不可以交换。
* demo1001
*/
import React, { Component } from 'react';
import {Icon} from "tinper-bee";

import Table from '../../src'; 
import dragColumn from '../../src/lib/dragColumn';

const columns = [
  {
    title: "订单编号",
    dataIndex: "a",
    key: "a",
    width: 100
  },
  {
    title: "单据日期",
    dataIndex: "b",
    key: "b",
    width: 200
  },
  {
    title: "供应商",
    dataIndex: "c",
    key: "c",
    width: 200,
    sumCol: true,
    sorter: (a, b) => a.c - b.c
  },
  {
    title: "联系人",
    dataIndex: "d",
    key: "d",
    width: 500,
  },
  {
    title: "操作",
    dataIndex: "e",
    key: "e",
    width: 200,
    fixed: 'right',
  }
];

const data = [
  { a: "NU0391001", b: "2019-03-01", c: 'xx供应商',d:'Tom',e:'...', key: "2" },
  { a: "NU0391002", b: "2018-11-02", c: 'yy供应商',d:'Jack',e:'...', key: "1" },
  { a: "NU0391003", b: "2019-05-03", c: 'zz供应商',d:'Jane',e:'...', key: "3" }
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
              console.log("--拖拽交换列onDrop触发事件");
              console.log("event.target:",event.target);
              console.log("data:",data);
              console.log("拖拽完成后的columns:",columns);
            }}

            onDragEnd ={(event,data,columns)=>{
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