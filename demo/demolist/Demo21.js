/**
*
* @title 渲染本地数据
* @description 
*/

import React, { Component } from "react";
import {Button,Tooltip} from "tinper-bee";
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
  { title: "年龄", dataIndex: "c", key: "c", width: 200 }
];

const data = [
  { a: "令狐冲", b: "男", c: 41, key: "1" },
  { a: "杨过叔叔的女儿黄蓉", b: "男", c: 67, key: "2" },
  { a: "郭靖", b: "男", c: 25, key: "3" }
];

class Demo21 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: data
    }
  }

  render() {
    return (
        <Table
          columns={columns}
          data={data}
        />
    );
  }
}

export default Demo21;
