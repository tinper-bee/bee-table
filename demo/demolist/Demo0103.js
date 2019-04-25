/**
*
* @title 固定表头
* @parent 基础 Basic
* @description 设置`scroll.y`指定滚动区域的高度，达到固定表头效果。
* demo0103
*/

import React, { Component } from 'react';
import Table from '../../src';

const columns03 = [
  {
      title: "序号",
      dataIndex: "index",
      key: "index",
      width: 80, 
      render(text, record, index) {
          return index + 1;
      }
  },
  {
      title: "订单编号",
      dataIndex: "orderCode",
      key: "orderCode",
      width: 200, 
  },
  {
      title: "供应商名称",
      dataIndex: "supplierName",
      key: "supplierName",
      width: 200
  },
  {
      title: "类型",
      dataIndex: "type_name",
      key: "type_name",
      width: 200
  },
  {
      title: "采购组织",
      dataIndex: "purchasing",
      key: "purchasing",
      width: 200
  },
  {
      title: "采购组",
      dataIndex: "purchasingGroup",
      key: "purchasingGroup",
      width: 200
  },
  {
      title: "凭证日期",
      dataIndex: "voucherDate",
      key: "voucherDate",
      width: 200,
  },
  {
      title: "审批状态",
      dataIndex: "approvalState_name",
      key: "approvalState_name",
      width: 200
  },
  {
      title: "确认状态",
      dataIndex: "confirmState_name",
      key: "confirmState_name",
       width: 200
  }, 
  {
      title: "关闭状态",
      dataIndex: "closeState_name",
      key: "closeState_name",
      width: 100
  }
];

const data03 = [
  { 
    orderCode:"NU0391025", 
    supplierName: "xx供应商",
    type_name: "1",
    purchasing:'组织c', 
    purchasingGroup:"aa",
    voucherDate:"2018年03月18日",
    approvalState_name:"已审批",
    confirmState_name:"执行中",
    closeState_name:"未关闭",
    key: "1"
  }, 
  { 
    orderCode:"NU0391026", 
    supplierName: "xx供应商",
    type_name: "2",
    purchasing:'组织a', 
    purchasingGroup:"bb",
    voucherDate:"2018年02月05日",
    approvalState_name:"已审批",
    confirmState_name:"待确认",
    closeState_name:"未关闭",
    key: "2"
  },
  { 
    orderCode:"NU0391027", 
    supplierName: "xx供应商",
    type_name: "3",
    purchasing:'组织b', 
    purchasingGroup:"aa",
    voucherDate:"2018年07月01日",
    approvalState_name:"已审批",
    confirmState_name:"终止",
    closeState_name:"已关闭",
    key: "3"
  },
  { 
    orderCode:"NU0391028", 
    supplierName: "xx供应商",
    type_name: "4",
    purchasing:'组织c', 
    purchasingGroup:"cc",
    voucherDate:"2019年03月01日",
    approvalState_name:"未审批",
    confirmState_name:"待确认",
    closeState_name:"未关闭",
    key: "4"
  },
  { 
    orderCode:"NU0391029", 
    supplierName: "xx供应商",
    type_name: "5",
    purchasing:'组织d', 
    purchasingGroup:"ss",
    voucherDate:"2019年02月14日",
    approvalState_name:"未审批",
    confirmState_name:"待确认",
    closeState_name:"未关闭",
    key: "5"
  },
  { 
    orderCode:"NU0391030", 
    supplierName: "xx供应商",
    type_name: "1",
    purchasing:'组织e', 
    purchasingGroup:"zz",
    voucherDate:"2019年02月18日",
    approvalState_name:"已审批",
    confirmState_name:"终止",
    closeState_name:"已关闭",
    key: "6"
  },
  { 
    orderCode:"NU0391031", 
    supplierName: "xx供应商",
    type_name: "2",
    purchasing:'组织f', 
    purchasingGroup:"qq",
    voucherDate:"2019年01月01日",
    approvalState_name:"已审批",
    confirmState_name:"执行中",
    closeState_name:"未关闭",
    key: "7"
  },
  { 
    orderCode:"NU0391032", 
    supplierName: "xx供应商",
    type_name: "3",
    purchasing:'组织g', 
    purchasingGroup:"pp",
    voucherDate:"2019年01月31日",
    approvalState_name:"未审批",
    confirmState_name:"待确认",
    closeState_name:"未关闭",
    key: "8"
  },
];

class Demo03 extends Component {
  render() {
    return <Table columns={columns03} data={data03} scroll={{y: 150 }} />;
  }
}

export default Demo03; 