/**
*
* @title 默认无数据展示
* @parent 基础 Basic
* @description 无数据时显示效果展示（可自定义）
*
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

const emptyFunc = () => <Icon type="uf-nodata"></Icon>
  
class Demo02 extends Component {
  render() {
    return <Table className="demo02" columns={columns02} data={data02} emptyText={emptyFunc} />;
  }
}

export default Demo02;