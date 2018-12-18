/**
*
* @title 按条件和值过滤
* @description 可以根据输入项目以及判断条件对表格内的数据进行过滤
*
*/


import React, { Component } from 'react';
import Table from '../../src';


const columns26 = [
  { title: "姓名", width: 180, dataIndex: "name", key: "name", filterType: "text", filterDropdown: "show" },
  { title: "年龄", width: 150, dataIndex: "age", key: "age", filterType: "dropdown", filterDropdown: "show" },
  { title: "日期", width: 200, dataIndex: "date", key: "date", filterType: "date", filterDropdown: "show", format: "YYYY-MM-DD" },
  { title: "居住地址", width: 150, dataIndex: "address", key: "address", filterType: "dropdown", filterDropdown: "show" },
  { title: "备注", dataIndex: "mark", key: "mark" }
];

const data26 = [
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

class Demo26 extends Component {
  handlerFilterChange = (key, val, condition) => {
    console.log('参数：key=', key, ' value=', val, 'condition=', condition);
  }

  handlerFilterClear = (key) => {
    console.log('清除条件', key);
  }
  render() {
    return <Table
      onFilterChange={this.handlerFilterChange}//下拉条件的回调(key,val)=>()
      onFilterClear={this.handlerFilterClear}//触发输入操作以及其他的回调(key,val)=>()
      filterDelay={500}//输入文本多少ms触发回调函数，默认300ms
      filterable={true}//是否开启过滤数据功能
      bordered
      columns={columns26}
      data={data26} />;
  }
}

export default Demo26;