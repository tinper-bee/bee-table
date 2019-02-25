/**
*
* @title 简单表格、文字过长，两种tip
* 【Tooltip】
* @description
*/

import React, { Component } from "react";
import Button from "bee-button";
import Tooltip from "bee-tooltip";
import Table from "../../src";

const columns = [
  {
    title: "用户名", dataIndex: "a", key: "a", width: 300, className: "rowClassName",
    fixed:'left',
    render: (text, record, index) => {
      return (
        <Tooltip inverse overlay={text}>
          <span tootip={text} style={{
            display: "inline-block",
            width: "60px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            verticalAlign: "middle",
          }}>{text}</span>
        </Tooltip>
      );
    }
  },
  { id: "123", title: "性别", dataIndex: "b", key: "b", width: 500},
  { title: "年龄", dataIndex: "c", key: "c", width: 200 },
  {
    title: "操作",
    dataIndex: "d",
    key: "d",
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

const data = [
  { a: "令狐冲", b: "男", c: 41, d: "操作", key: "1" },
  { a: "杨过叔叔的女儿黄蓉", b: "男", c: 67, d: "操作", key: "2" },
  { a: "郭靖", b: "男", c: 25, d: "操作", key: "3" }
];

class Demo1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: data,
      selectedRowIndex: 0
    }
  }

  render() {
    return (
   
        <Table
          columns={columns}
          data={data}
          parentNodeId='parent'
          height={43}
          headerHeight={42}
          onRowClick={(record, index, indent) => {
            this.setState({
              selectedRowIndex: index
            });
          }}
        />

     
    );
  }
}

export default Demo1;
