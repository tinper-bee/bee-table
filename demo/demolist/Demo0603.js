/**
*
* @title 动态设置列锁定、解除锁定
* @parent 列操作-锁定 Fixed
* @description 动态设置columns中数据的fixed属性值【fixed: "left"，fixed: "right"】。
* demo0603
*/
import React, { Component } from 'react';
import {Icon,Menu,Dropdown} from "tinper-bee";

import Table from '../../src';

const { Item } = Menu;

const columns = [
  {
      title: "序号",
      dataIndex: "index",
      key: "index",
      width: 80, 
      fixed: 'left',
      render(text, record, index){return index + 1}
  },
  {
      title: "订单编号",
      dataIndex: "orderCode",
      key: "orderCode",
      width: 100, 
      fixed: 'left',
  },
  {
      title: "供应商名称",
      dataIndex: "supplierName",
      key: "supplierName",
      width: 150
  },
  {
      title: "类型",
      dataIndex: "type_name",
      key: "type_name",
      width: 100
  },
  {
      title: "采购组织",
      dataIndex: "purchasing",
      key: "purchasing",
      width: 100
  },
  {
      title: "采购组",
      dataIndex: "purchasingGroup",
      key: "purchasingGroup",
       width: 100
  },
  {
      title: "凭证日期",
      dataIndex: "voucherDate",
      key: "voucherDate",
      width: 200,
      
  },
  {
      title: "审批状态",
      dataIndex: "approvalState_name",
      key: "approvalState_name",
      width: 100
  },
  {
      title: "确认状态",
      dataIndex: "confirmState_name",
      key: "confirmState_name",
       width: 100
  }, 
  {
      title: "关闭状态",
      dataIndex: "closeState_name",
      key: "closeState_name",
      width: 100
  }
];

const data = [
  { 
    orderCode:"NU0391025", 
    supplierName: "xx供应商",
    type_name: "1",
    purchasing:'组织c', 
    purchasingGroup:"aa",
    voucherDate:"2018年03月18日",
    approvalState_name:"已审批",
    confirmState_name:"执行中",
    closeState_name:"未关闭",
    key: "1"
  }, 
  { 
    orderCode:"NU0391026", 
    supplierName: "xx供应商",
    type_name: "2",
    purchasing:'组织a', 
    purchasingGroup:"bb",
    voucherDate:"2018年02月05日",
    approvalState_name:"已审批",
    confirmState_name:"待确认",
    closeState_name:"未关闭",
    key: "2"
  },
  { 
    orderCode:"NU0391027", 
    supplierName: "xx供应商",
    type_name: "3",
    purchasing:'组织b', 
    purchasingGroup:"aa",
    voucherDate:"2018年07月01日",
    approvalState_name:"已审批",
    confirmState_name:"终止",
    closeState_name:"已关闭",
    key: "3"
  }
];
 
class Demo24 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns:columns
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
        <Table columns={columns} data={data} scroll={{ x: "110%", y: 240 }}/>
      </div>
    )
  }
}

export default Demo24;