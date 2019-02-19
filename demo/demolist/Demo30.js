/**
*
* @title 大数据加载
* 【Tooltip】
* @description
*/

import React, { Component } from "react";
import Tooltip from "bee-tooltip";
import Table from "../../src";
import BigData from "../../src/lib/bigData";
const BigDataTable = BigData(Table);
const columns = [
    {
        title:'序号',
        dataIndex:'index',
        width:'50',
        render:(text,record,index)=>{
            return index
        },
        fixed:'left'
    },
    {
    title: "用户名", dataIndex: "a", key: "a", width: 580, className: "rowClassName",
    render: (text, record, index) => {
      return (
        <Tooltip inverse overlay={text}>
          <span tootip={text} style={{
            display: "inline-block",
            width: "80px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            verticalAlign: "middle",
          }}>{text}</span>
        </Tooltip>
      );
    }
  },
  { id: "123", title: "性别", dataIndex: "b", key: "b", width: 80},
  { title: "年龄", dataIndex: "c", key: "c", width: 200 },
  {
    title: "操作",
    dataIndex: "d",
    key: "d",
    fixed:'right',
    render(text, record, index) {
      return (
        <div style={{ position: 'relative' }} title={text} >
          <a
            href="javascript:;"
            tooltip={text}
            onClick={() => {
              alert('这是第' + index + '列，内容为:' + text);
            }}
          >
            一些操作
              </a>
        </div>
      );
    }
  }
];

const data = [ ...new Array(10000) ].map((e, i) => {
    const rs = { a: i + 'a', b: i + 'b', c: i + 'c', d: i + 'd', key: i };
    if(i%3==0){
        rs.b = '女';
    }
    return rs;
   })


class Demo30 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: data,
      selectedRowIndex: 0
    }
  }

  render() {
    return (
        <BigDataTable
          columns={columns}
          data={data}
          scroll={{y:300}}
          height={40}
          onRowClick={(record, index, indent) => {
            console.log('currentIndex--'+index);
          }}
        />

     
    );
  }
}

export default Demo30;