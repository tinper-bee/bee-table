/**
*
* @title 根据列进行过滤、拖拽综合使用案例
* @description 根据列进行过滤、拖拽综合使用案例
*
*/

import React, { Component } from 'react';
import Table from '../../src';
import multiSelect from '../../src/lib/newMultiSelect';
import filterColumn from '../../src/lib/filterColumn';
import dragColumn from "../../src/lib/dragColumn";

import sum from '../../src/lib/sum';
import Icon from "bee-icon";
import Checkbox from 'bee-checkbox';
import Popover from 'bee-popover';

const columns25 = [
  {
    title: "名字",
    dataIndex: "a",
    key: "a",
    width: 100,
    fixed: "left"
  },
  {
    title: "性别",
    dataIndex: "b",
    key: "b",
    width: 100
  },
  {
    title: "年龄",
    dataIndex: "c",
    key: "c",
    width: 100,
    sumCol: true,
    sorter: (a, b) => a.c - b.c
  },
  {
    title: "年龄1",
    dataIndex: "c1",
    key: "c1",
    width: 100,
    sumCol: true,
    sorter: (a, b) => a.c - b.c
  },
  {
    title: "年龄2",
    dataIndex: "c2",
    key: "c2",
    width: 100,
    sumCol: true,
    sorter: (a, b) => a.c - b.c
  },
  {
    title: "武功级别",
    dataIndex: "d",
    width: 100,
    key: "d",
   
  },
  {
    title: "操作",
    dataIndex: "e",
    key: "e",
    width: 100,
    fixed: "right",
    render(text, record, index) {
      return (
        <div style={{position: 'relative'}} title={text} >
            <a
                href="#"
                tooltip={text}
                onClick={() => {
                  alert('这是第'+index+'列，内容为:'+text);
                }}
              >
                操作
              </a>
        </div>
      );
    }
  }
];

const data25 = [
  { a: "杨过rrrrr", b: "男", c: 30, c1: 30, c2: 30,d:'内行',e: "操作", key: "2" },
  { a: "令狐冲", b: "男", c: 41, c1: 30, c2: 30,d:'大侠',e: "操作", key: "1" },
  { a: "郭靖", b: "男", c: 25, c1: 30, c2: 30,d:'大侠',e: "操作", key: "3" }
];

function getCloumns(){
  const column = [
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
          width: 250, 
      },
      {
          title: "供应商名称",
          dataIndex: "supplierName",
          key: "supplierName",
          width: 300
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
          width: 100
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
                    <a href="#"
                      tooltip={text}
                      onClick={() => {
                        alert('这是第'+index+'列，内容为:'+text);
                      }}
                    >
                      一些操作
                    </a>
                  </div>
              )
          }
      }
  ];
  return column;
}

const dataList = [ 
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
      key: "2"
  }, 
]

// const FilterColumnTable = filterColumn(Table, Popover);
// const MultiSelectTable = multiSelect(Table, Checkbox);
// let ComplexTable = multiSelect(Table, Checkbox);

// const DragColumnTable = multiSelect(Table, Checkbox);
const DragColumnTable = dragColumn(filterColumn(multiSelect(Table, Checkbox), Popover)); 
// const DragColumnTable = dragColumn(filterColumn(Table, Popover));

const defaultProps25 = {
  prefixCls: "bee-table"
};

class Demo25 extends Component {
  constructor(props) {
    super(props);
  }

  getSelectedDataFunc=(data)=>{
      console.log("data",data);
  }
 
  getCloumnsScroll=(columns)=>{
    let sum = 0;
    columns.forEach((da)=>{
        sum += da.width;
    })
    console.log("sum",sum);
    return (sum);
  }

  render() {
    let columns = getCloumns();

    return <div className="demo25"><DragColumnTable 
    columns={columns}
    data={dataList} 
    getSelectedDataFunc={this.getSelectedDataFunc}
    bordered
    dragborder={true}
    scroll={{x:this.getCloumnsScroll(columns)}}
    multiSelect={{type: "checkbox"}}
    /></div>
  }
}
Demo25.defaultProps = defaultProps25;


export default Demo25;