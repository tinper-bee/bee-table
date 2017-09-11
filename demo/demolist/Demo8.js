/**
*
* @title 表格+分页
* @description 点击分页联动表格
*
*/


import React, { Component } from 'react';
import Table from '../../src';
import Pagination from "bee-pagination";


const columns8 = [
  { title: "用户名", dataIndex: "a", key: "a", width: 100 },
  { id: "123", title: "性别", dataIndex: "b", key: "b", width: 100 },
  { title: "年龄", dataIndex: "c", key: "c", width: 200 },
  {
    title: "操作",
    dataIndex: "",
    key: "d",
    render() {
      return <a href="#">一些操作</a>;
    }
  }
];

class Demo8 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data8: [
        { a: "令狐冲", b: "男", c: 41, key: "1" },
        { a: "杨过", b: "男", c: 67, key: "2" },
        { a: "郭靖", b: "男", c: 25, key: "3" }
      ],
      activePage: 1
    };
  }
  handleSelect(eventKey) {
    if(eventKey === 1){
      this.setState({
        data8: [
          { a: "令狐冲", b: "男", c: 41, key: "1" },
          { a: "杨过", b: "男", c: 67, key: "2" },
          { a: "郭靖", b: "男", c: 25, key: "3" }
        ],
        activePage: eventKey
      });
    }else{
      this.setState({
        data8: [
          { a: "芙蓉姐姐", b: "女", c: 23, key: "1" }
        ],
        activePage: eventKey
      });
    }
    
  }
  render() {
    return (
      <div>
        <Table columns={columns8} data={this.state.data8} />
       <Pagination
	        	first
	        	last
	        	prev
	        	next
	        	boundaryLinks
		        items={2}
		        maxButtons={5}
		        activePage={this.state.activePage}
		        onSelect={this.handleSelect.bind(this)} />
      </div>
    );
  }
}
export default Demo8;