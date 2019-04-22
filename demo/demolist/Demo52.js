/**
*
* @title 右侧固定列
* @parent 列操作-锁定 Fixed
* @description 固定列到表格的右侧
*
*/



import React, { Component } from 'react';
import {Popconfirm} from 'tinper-bee';
import Table from '../../src';

const columns5 = [
    {
        title: "序号",
        dataIndex: "index",
        key: "index",
        width: 100, 
    },
    {
        title: "订单编号",
        dataIndex: "orderCode",
        key: "orderCode",
        width: 100, 
    },
    {
        title: "供应商名称",
        dataIndex: "supplierName",
        key: "supplierName",
        width: 100
    },
    {
        title: "类型",
        dataIndex: "type_name",
        key: "type_name",
        width: 100
    },
    {
        title: "采购组织",
        dataIndex: "purchasing",
        key: "purchasing",
        width: 100
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
        width: 100,
        
    },
    {
        title: "审批状态",
        dataIndex: "approvalState_name",
        key: "approvalState_name",
        width: 100
    },
    {
        title: "确认状态",
        dataIndex: "confirmState_name",
        key: "confirmState_name",
         width: 100
    }, 
    {
        title: "关闭状态",
        dataIndex: "closeState_name",
        key: "closeState_name",
        width: 100
    },
    {
        title: "操作",
        dataIndex: "d",
        key: "d",
        width:100,
        fixed: "right",
        render(text, record, index) {
            return (
                <div className='operation-btn'>
                  <Popconfirm trigger="click" placement="right" content={'这是第' + index + '行，内容为:' + text}>
                      <a href="javascript:;" tooltip={text} >
                      一些操作
                      </a>
                  </Popconfirm>
                </div>
            )
        }
    }
];

const data5 = [
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
        d:"操作",
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
      d:"2操作",
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
      d:"3操作",
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
      d:"4操作",
      key: "4"
    },
];

class Demo52 extends Component {
  render() {
    return <Table columns={columns5} data={data5} scroll={{ x:true, y: 200 }}  />;
  }
}

export default Demo52;