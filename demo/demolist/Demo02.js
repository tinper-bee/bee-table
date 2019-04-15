/**
*
* @title 默认无数据展示
* @description 无数据时显示效果展示（可自定义）
 *
* import {Table} from 'tinper-bee';
*/


import React, { Component } from 'react';
import Table from '../../src';
import Icon from 'bee-icon';


const columns10 = [
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
  
  const data10 = [
    
  ];

  const emptyFunc = () => <Icon type="uf-nodata"></Icon>
  
  class Demo10 extends Component {
    render() {
      return <Table className="demo02" columns={columns10} data={data10} emptyText={emptyFunc} />;
    }
  }

export default Demo10;