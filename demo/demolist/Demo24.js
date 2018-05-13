/**
*
* @title 动态设置固、取消固定列
* @description 动态设置固、取消固定列
*
*/
import React, { Component } from 'react';
import Table from '../../src';

const columns24 = [
  {
    title: "Full Name",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  { title: "Age", width: 100, dataIndex: "age", key: "age", fixed: "left" },
  { title: "Column 1", dataIndex: "address", key: "1" , fixed: "left" },
  { title: "Column 2", dataIndex: "address", key: "2" },
  { title: "Column 3", dataIndex: "address", key: "3" },
  { title: "Column 4", dataIndex: "address", key: "4" },
  { title: "Column 24", dataIndex: "address", key: "24" },
  { title: "Column 6", dataIndex: "address", key: "6" },
  { title: "Column 7", dataIndex: "address", key: "7" },
  { title: "Column 8", dataIndex: "address", key: "8" }
];


const data24 = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York Park"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 40,
    address: "London Park"
  },
  {
    key: "3",
    name: "Jim Green",
    age: 40,
    address: "London Park"
  },
  {
    key: "4",
    name: "Jim Green",
    age: 40,
    address: "London Park"
  }
];

class Demo24 extends Component {

  constructor(props) {
    super(props);
    let columns = [];
    Object.assign(columns,columns24);
    columns.forEach(da=>da.onHeadCellClick=this.onHeadCellClick);
    this.state = {
      columns
    }
  }

  onHeadCellClick=(data,event)=>{
    const {columns:_columns} = this.state;
    let columns = [];
    Object.assign(columns,_columns);
    let currObj = columns.find(da=>da.key == data.key);
    currObj.fixed?delete currObj.fixed:currObj.fixed = "left";
    this.setState({
      columns
    });
  }

  render() {
    const {columns} = this.state;
    return <Table columns={columns} data={data24} scroll={{ x: "130%", y: 140 }}/>;
  }
}

export default Demo24;