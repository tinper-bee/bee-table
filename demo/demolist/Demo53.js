/**
*
* @title 动态设置列锁定、解除锁定
* @parent 列操作-锁定 Fixed
* @description 动态设置columns中数据的fixed属性值【fixed: "left"，fixed: "right"】。
*
*/
import React, { Component } from 'react';
import {Icon,Menu,Dropdown} from "tinper-bee";

import Table from '../../src';

const { Item } = Menu;

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
    width: 150 
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
    this.state = {
      columns:columns24
    }
  }
  
  onSelect = ({key,item})=>{ 
    console.log(`${key} selected`); //获取key
    let currentObject = item.props.data; //获取选中对象的数据
    let {columns} = this.state;
    let fixedCols = [];
    let nonColums = [];
    columns.find(da=>{
      if(da.key == key){
        da.fixed?delete da.fixed:da.fixed = 'left';
      }
      da.fixed?fixedCols.push(da):nonColums.push(da);
    });
  
    columns = [...fixedCols,...nonColums]

    this.setState({
      columns
    });
  }
  //表头增加下拉菜单
  renderColumnsDropdown(columns) {
    const icon ='uf-arrow-down';
    
    return columns.map((originColumn,index) => {
      let column = Object.assign({}, originColumn);
      let menuInfo = [], title='锁定';
      if(originColumn.fixed){
        title = '解锁'
      }
      menuInfo.push({
        info:title,
        key:originColumn.key,
        index:index
      });
      const menu = (
        <Menu onSelect={this.onSelect} >{
            menuInfo.map(da=>{ return <Item key={da.key} data={da} >{da.info}</Item> })
            }
        </Menu>)
      column.title = (
        <span className='title-con drop-menu'>
          {column.title}
          <Dropdown
            trigger={['click']} 
            overlay={menu}
            animation="slide-up"
          >
           <Icon type={icon}/>
          </Dropdown> 
          
        </span>
      );
      return column;
    });
    
  }

  render() {
    let {columns} = this.state;
    columns = this.renderColumnsDropdown(columns);
    return(
      <div className="demo24">
        <Table columns={columns} data={data24} scroll={{ x: "110%", y: 240 }}/>
      </div>
    )
  }
}

export default Demo24;