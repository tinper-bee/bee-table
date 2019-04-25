/**
*
* @title 树型表格数据展示
* @parent 扩展行 Expanded Row
* @description 通过在data中配置children数据，来自动生成树形表格
* demo1102
*/


import React, { Component } from 'react';
import Table from '../../src';


const columns4 = [
  {
    title: "订单编号",
    dataIndex: "name",
    key: "name",
    width: "40%"
  },
  {
    title: "单据日期",
    dataIndex: "age",
    key: "age",
    width: "30%"
  },
  {
    title: "供应商",
    dataIndex: "address",
    key: "address"
  }
];

const data4 = [
  {
    key: 1,
    name: "NU0391001",
    age: "2019-03-01",
    address: "供应商1",
    children: [
      {
        key: 11,
        name: "NU0391002",
        age: "2019-03-02",
        address: "供应商2"
      },
      {
        key: 12,
        name: "NU0391003",
        age: "2019-03-03",
        address: "供应商3",
        children: [
          {
            key: 121,
            name: "NU0391004",
            age: "2019-03-04",
            address: "供应商4"
          }
        ]
      },
      {
        key: 13,
        name: "NU0391005",
        age: "2019-03-05",
        address: "供应商5",
        children: [
          {
            key: 131,
            name: "NU0391006",
            age: "2019-03-06",
            address: "供应商6",
            children: [
              {
                key: 1311,
                name: "NU0391007",
                age: "2019-03-07",
                address: "供应商7"
              },
              {
                key: 1312,
                name: "NU0391008",
                age: "2019-03-08",
                address: "供应商8"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 2,
    name: "NU0391009",
    age: "2019-03-09",
    address: "供应商9"
  }
];
class Demo4 extends Component {

  constructor(props){
      super(props);
      this.state = {
        data: data4,
        factoryValue: 0,
        selectedRow: new Array(data4.length)//状态同步
      }
  }

  render() {
    return <Table 
    rowClassName={(record,index,indent)=>{
      if (this.state.selectedRow[index]) {
          return 'selected';
      } else {
          return '';
      }
    }}
    onRowClick={(record,index,indent)=>{
      let selectedRow = new Array(this.state.data.length);
      selectedRow[index] = true;
      this.setState({
          factoryValue: record,
          selectedRow: selectedRow
      });
    }}
    
    columns={columns4} data={data4} />;
  }
}


export default Demo4;