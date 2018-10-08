/**
*
* @title 组合过滤和其他功能使用
* @description 在过滤的基础上增加列拖拽、列排序等一系列功能
*
*/


import React, { Component } from 'react';
import Table from '../../src';
import dragColumn from '../../src/lib/dragColumn';


const columns27 = [
  { title: "姓名", width: 180, dataIndex: "name", key: "name", filterType: "text", filterDropdown: "show" },
  { title: "年龄", width: 150, dataIndex: "age", key: "age", filterType: "dropdown", filterDropdown: "show" },
  { title: "居住地址", width: 150, dataIndex: "address", key: "address", filterType: "dropdown", filterDropdown: "show" },
];

const data27 = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    date: "2018-09-19",
    address: "朝阳区",
    mark: "无"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 40,
    date: "2018-09-18",
    address: "朝阳区",
    mark: "无"
  },
  {
    key: "3",
    name: "Jim Green",
    age: 40,
    date: "2018-09-18",
    address: "东城区",
    mark: "无"
  },
  {
    key: "4",
    name: "Jim Green",
    age: 40,
    date: "2018-09-18",
    address: "东城区",
    mark: "无"
  }, {
    key: "5",
    name: "John Brown",
    age: 32,
    date: "2018-09-18",
    address: "海淀区",
    mark: "无"
  },
  {
    key: "6",
    name: "Jim Green",
    age: 48,
    date: "2018-09-18",
    address: "海淀区",
    mark: "无"
  },
  {
    key: "7",
    name: "Jim Green",
    age: 40,
    date: "2018-09-18",
    address: "海淀区",
    mark: "无"
  },
  {
    key: "8",
    name: "Jim Green",
    age: 38,
    date: "2018-09-18",
    address: "海淀区",
    mark: "无"
  }
];

const DragColumnTable = dragColumn(Table);

class Demo27 extends Component {
  handlerFilterRowsChange = (key, val) => {
    console.log('准备构建AJAX请求，接收参数：key=', key, ' value=', val);
  }
  handlerFilterRowsDropChange = (key, val) => {
    console.log('过滤条件类型:', key, val);
  }
  render() {
    return <DragColumnTable
      onFilterRowsDropChange={this.handlerFilterRowsDropChange}//下拉条件的回调(key,val)=>()
      onFilterRowsChange={this.handlerFilterRowsChange}//触发输入操作以及其他的回调(key,val)=>()
      filterDelay={500}//输入文本多少ms触发回调函数，默认300ms
      filterable={true}//是否开启过滤数据功能
      bordered
      draggable={true}
      columns={columns27}
      data={data27} />;
  }
}

export default Demo27;