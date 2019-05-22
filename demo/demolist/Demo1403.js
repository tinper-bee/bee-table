/**
*
* @title 多功能表格滚动加载
* @parent 无限滚动 Infinite-scroll
* @description
* demo1403
*/

import React, { Component } from "react";
import {Tooltip,Checkbox,Icon,Popover} from "tinper-bee";
import Table from "../../src";
import BigData from "../../src/lib/bigData";
import multiSelect from '../../src/lib/multiSelect';
import filterColumn from '../../src/lib/filterColumn';

let  ComplexTable = filterColumn(multiSelect(BigData(Table), Checkbox), Popover, Icon);

const columns = [
    {
        title:'序号',
        dataIndex:'index',
        width:'80',
        key:'index',
        render:(text,record,index)=>{
            return index
        }
    },
    {
    title: "用户名", dataIndex: "a", key: "a", width: 580, className: "rowClassName",
    render: (text, record, index) => {
      return (
        <Tooltip inverse overlay={text}>
          <span tootip={text} style={{
            display: "block",
            width: "40px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            verticalAlign: "bottom",
          }}>{text}</span>
        </Tooltip>
      );
    }
  },
  { id: "123", title: "性别", dataIndex: "b", key: "b", width: 80},
  { title: "年龄", dataIndex: "c", key: "c", width: 200 }
];

const data = [ ...new Array(10000) ].map((e, i) => {
    const rs = { a: i + 'a', b: i + 'b', c: i + 'c', d: i + 'd', key: i };
    if(i%3==0){
        rs.b = '女';
    }
    return rs;
   })


class Demo32 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: data,
      selectedRowIndex: 0
    }
  }
  getSelectedDataFunc = data => {
    console.log(data);
  };

  render() {
    return (
        <ComplexTable
          columns={columns}
          data={data}
          parentNodeId='parent'
          scroll={{y:300}}
          bordered
          onRowClick={(record, index, indent) => {
            this.setState({
              selectedRowIndex: index
            });
          }}
          getSelectedDataFunc={this.getSelectedDataFunc}/>

    );
  }
}

export default Demo32;
