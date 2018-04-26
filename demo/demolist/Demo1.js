/**
*
* @title 简单表格，以及两种tip
* 一种是bee-popover实现
* 一种是标签本身的tooltip
* @description
*/

import React, { Component } from "react";
import Popover from 'bee-popover';
import Button from "bee-button";
import Table from "../../src";

function getTitleTip(text){
  return(<div>
      <h3>{text}</h3> 
  </div>)
}


const columns = [
  { id: "123", title: "性别", dataIndex: "b", key: "b", width: 100 },
  { title: "年龄", dataIndex: "c", key: "c", width: 200 },
  { title: "用户名", dataIndex: "a", key: "a", width:80 ,
  render(text, record, index) {
    return(<div style={{position: 'relative'}}>
        <Popover
            placement="leftTop"
            content={getTitleTip(text)}
            trigger="hover"
            id="leftTop"
        >
            <span
                style={{
                    position: 'absolute',
                    top: 5,
                    left: 0,
                    width: "80px",
                    textOverflow:"ellipsis",
                    overflow:"hidden",
                    whiteSpace:"nowrap"
                }}>{text}</span>
        </Popover>
    </div>);
  }},
  {
    title: "操作",
    dataIndex: "d",
    key: "d",
    render(text, record, index) {
      return (
        <div style={{position: 'relative'}} title={text} >
            <a
                href="#"
                tooltip={text}
                onClick={() => {
                  alert('这是第'+index+'列，内容为:'+text);
                }}
                style={{
                    position: 'absolute',
                    top: 5,
                    left: 0
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
  render() {
    return (
      <Table
        columns={columns}
        data={data}
        title={currentData => <div>标题: 这是一个标题</div>}
        footer={currentData => <div>表尾: 我是小尾巴</div>}
      /> 
    );
  }
}

export default Demo1;
