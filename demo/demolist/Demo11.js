/**
*
* @title 横向滚动条
* @parent 滚动 Scroll View
* @description 设置`scroll`属性支持横向或纵向滚动，x/y的取值可以是正整数、百分比、布尔值
*/

import React, { Component } from "react";
import Table from "../../src";

const columns11 = [
    {
        title: "序号",
        dataIndex: "index",
        key: "index",
        width: 200, 
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
         width: 300
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
        width: 200
    }
];

const data11 = [
    { 
        index: 1, 
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
      index: 2, 
      _checked:true,
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
      index: 3, 
      orderCode:"222", 
      supplierName: "22xxx",
      _disabled:true,
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
      index: 4, 
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
];

class Demo11 extends Component {
  render() {
    return (
        <Table columns={columns11} data={data11} scroll={{x:true}} />
    );
  }
}

export default Demo11;
