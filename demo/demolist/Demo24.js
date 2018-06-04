/**
*
* @title 动态设置固、取消固定列
* @description 动态设置固、取消固定列
* @description 动态固定列设置 一个table动态设置一个方向【fixed: "left"，fixed: "right"】。
*
*/
import React, { Component } from 'react';
import Table from '../../src';

// const columns24 = [
//   {
//     title: "Full Name",
//     width: 100,
//     dataIndex: "name",
//     key: "name",
//     fixed: "left",
//   },
//   { title: "Age", width: 100, dataIndex: "age", key: "age", fixed: "left" },
//   { title: "Column 1", dataIndex: "address", key: "1"  },
//   { title: "Column 2", dataIndex: "address2", key: "2" },
//   { title: "Column 3", dataIndex: "address", key: "3" },
//   { title: "Column 4", dataIndex: "address", key: "4" },
//   { title: "Column 24", dataIndex: "address", key: "24" },
//   { title: "Column 6", dataIndex: "address", key: "6" },
//   { title: "Column 7", dataIndex: "address", key: "7" },
//   { title: "Column 8", dataIndex: "address", key: "8" }
// ];


const columns24 = [
  {
    title: "名字",
    dataIndex: "a",
    key: "a",
    width: 100,
    fixed: "left",
  },
  {
    title: "性别",
    dataIndex: "b",
    key: "b",
    width: 100,
    fixed: "left",
  },
  {
    title: "年龄",
    dataIndex: "c",
    key: "c",
    width: 100, 
  },
  {
    title: "武功级别",
    dataIndex: "d",
    key: "d",
    width: 150 
  },
  {
    title: "对手",
    dataIndex: "e",
    key: "e",
    width: 100 
  },
  {
    title: "帮派",
    dataIndex: "f",
    key: "f",
    width: 100 
  },
  {
    title: "武功类型",
    dataIndex: "g",
    key: "g",
    width: 100 
  },
  {
    title: "师傅",
    dataIndex: "k",
    key: "k",
    // width: 100 
  },
  {
    title: "攻击系数",
    dataIndex: "h",
    key: "h",
    width: 100 
  }
];


const data24 = [
  { a: "杨过", b: "男", c: 30,d:'内行',e:'黄荣',f:'古墓派',g:'剑术',k:'小龙女',h:'0.5', key: "1" },
  { a: "令狐冲", b: "男", c: 41,d:'剑客',e:'自己',f:'无',g:'剑术',k:'无',h:'0.5', key: "2" },
  { a: "郭靖", b: "男", c: 25,d:'大侠',e:'黄荣',f:'朝廷',g:'内容',k:'外侵势力',h:'0.6', key: "3" }
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
    let fixed = "left";
    let fixedIndex = 0;
    const {columns:_columns} = this.state;
    _columns.find((da,i)=>{
      da.fixed?fixed=da.fixed:"left";
      da.fixed?fixedIndex = i:"";
    });
    let columns = [];
    Object.assign(columns,_columns);
    let fixedCols = [];
    let nonColums = [];
    let currObj = columns.find(da=>{
      if(da.key == data.key){
        da.fixed?delete da.fixed:da.fixed = fixed;
      }
      da.fixed?fixedCols.push(da):nonColums.push(da);
    });
    columns = fixed=="left"?[...fixedCols,...nonColums]:[...nonColums,...fixedCols]
    console.log(columns);
    this.setState({
      columns
    });
  }

  render() {
    const {columns} = this.state;
    return <Table columns={columns} data={data24} scroll={{ x: "110%", y: 240 }}/>;
  }
}

export default Demo24;