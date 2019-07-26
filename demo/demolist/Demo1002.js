/**
*
* @title 拖拽改变列宽度
* @parent 列操作-拖拽 Drag
* @description onDropBorder方法为调整列宽后触发的回调函数。注：不支持tree结构的表头、合并表头的table。
* demo1002
*/
import React, { Component } from 'react';
import {Icon} from "tinper-bee";

import Table from '../../src'; 
import dragColumn from '../../src/lib/dragColumn';

const columns23 = [
  {
    title: "订单编号",
    dataIndex: "a",
    key: "a",
    width: '200',
    fixed:'left'
  },
  {
    title: "单据日期",
    dataIndex: "b",
    key: "b",
    width: '600'
  },
  {
    title: "供应商",
    dataIndex: "c",
    key: "c",
    width: '200',
  }, 
  {
    title: "联系人",
    dataIndex: "d",
    key: "d",
    width: 500,
  }
];

const data23 = [
  { a: "NU0391001", b: "2019-03-01", c: "xx供应商",d:'Tom', key: "2" },
  { a: "NU0391002", b: "2018-11-02", c: "yy供应商",d:'Jack', key: "1" },
  { a: "NU0391003", b: "2019-05-03", c: "zz供应商",d:'Jane', key: "3" }
];

const DragColumnTable = dragColumn(Table);

class Demo23 extends Component {
  constructor(props) {
    super(props); 
  }

  render() {
    return <DragColumnTable 
            columns={columns23} 
            data={data23} 
            bordered
            scroll={{y:200}}
            dragborder={true} 
            onDropBorder ={(e,width)=>{
              console.log(width+"--调整列宽后触发事件",e.target);
            }}
            />;
  }
}

export default Demo23;