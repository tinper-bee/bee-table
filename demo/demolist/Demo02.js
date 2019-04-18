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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "40%"
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "30%"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
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