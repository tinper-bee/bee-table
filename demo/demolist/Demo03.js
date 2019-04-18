/**
*
* @title 固定表头
* @parent 基础 Basic
* @description 设置`scroll.y`指定滚动区域的高度，达到固定表头效果
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
    orderCode:"2343", 
    supplierName: "xxx",
    type_name: "123",
    purchasing:'内行', 
    purchasingGroup:"323",
    voucherDate:"kkkk",
    approvalState_name:"vvvv",
    confirmState_name:"aaaa",
    closeState_name:"vnnnnn",
    key: "1"
  }, 
  { 
    orderCode:"222", 
    supplierName: "22xxx",
    type_name: "1223",
    purchasing:'内行2', 
    purchasingGroup:"3223",
    voucherDate:"222kk",
    approvalState_name:"22vvvv",
    confirmState_name:"2aaaa",
    closeState_name:"2vnnnnn",
    key: "2"
  },
  { 
    orderCode:"222", 
    supplierName: "22xxx",
    type_name: "1223",
    purchasing:'内行2', 
    purchasingGroup:"3223",
    voucherDate:"222kk",
    approvalState_name:"22vvvv",
    confirmState_name:"2aaaa",
    closeState_name:"2vnnnnn",
    key: "3"
  },
  { 
    orderCode:"222", 
    supplierName: "22xxx",
    type_name: "1223",
    purchasing:'内行2', 
    purchasingGroup:"3223",
    voucherDate:"222kk",
    approvalState_name:"22vvvv",
    confirmState_name:"2aaaa",
    closeState_name:"2vnnnnn",
    key: "4"
  },
  { 
    orderCode:"222", 
    supplierName: "22xxx",
    type_name: "1223",
    purchasing:'内行2', 
    purchasingGroup:"3223",
    voucherDate:"222kk",
    approvalState_name:"22vvvv",
    confirmState_name:"2aaaa",
    closeState_name:"2vnnnnn",
    key: "5"
  },
  { 
    orderCode:"222", 
    supplierName: "22xxx",
    type_name: "1223",
    purchasing:'内行2', 
    purchasingGroup:"3223",
    voucherDate:"222kk",
    approvalState_name:"22vvvv",
    confirmState_name:"2aaaa",
    closeState_name:"2vnnnnn",
    key: "6"
  },
  { 
    orderCode:"222", 
    supplierName: "22xxx",
    type_name: "1223",
    purchasing:'内行2', 
    purchasingGroup:"3223",
    voucherDate:"222kk",
    approvalState_name:"22vvvv",
    confirmState_name:"2aaaa",
    closeState_name:"2vnnnnn",
    key: "7"
  },
  { 
    orderCode:"222", 
    supplierName: "22xxx",
    type_name: "1223",
    purchasing:'内行2', 
    purchasingGroup:"3223",
    voucherDate:"222kk",
    approvalState_name:"22vvvv",
    confirmState_name:"2aaaa",
    closeState_name:"2vnnnnn",
    key: "8"
  },
];

class Demo03 extends Component {
  render() {
    return <Table columns={columns03} data={data03} scroll={{y: 150 }} />;
  }
}

export default Demo03; 