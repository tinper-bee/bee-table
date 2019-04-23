/**
*
* @title 默认无数据展示
* @parent 基础 Basic
* @description 无数据时默认展示图标，可在`emptyText`方法中自定义展示内容。
* demo0102
*/


import React, { Component } from 'react';
import Table from '../../src';
import Icon from 'bee-icon';

const columns02 = [
    {
      title: "员工编号",
      dataIndex: "num",
      key: "num",
      width: "40%"
    },
    {
      title: "员工姓名",
      dataIndex: "name",
      key: "name",
      width: "30%"
    },
    {
      title: "部门",
      dataIndex: "department",
      key: "department"
    }
];
  
const data02 = [];

// 在此自定义无数据时的展示内容
const emptyFunc = () => 'No Data';
  
class Demo02 extends Component {
  render() {
    return (
      <Table 
      columns={columns02} 
      data={data02} 
      // emptyText={emptyFunc} 
      />
    )
  }
}

export default Demo02;