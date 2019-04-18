/**
*
* @title 表格 Loading 加载
* @parent 基础 Basic
* @description  loading可以传boolean或者object对象，object为bee-loading组件的参数类型
*
*/

import React, { Component } from "react";
import Table from "../../src";
import {Button,Popconfirm} from "tinper-bee";

const columns05 = [
  { title: "用户名", dataIndex: "a", key: "a", width: 100 },
  { id: "123", title: "性别", dataIndex: "b", key: "b", width: 100 },
  { title: "年龄", dataIndex: "c", key: "c", width: 200 },
  {
    title: "操作",
    dataIndex: "d",
    key: "d",
    render(text, record, index) {
      return (
        <Popconfirm trigger="click" placement="right" content={'这是第' + index + '行，内容为:' + text}>
          <a href="javascript:;">
            一些操作
          </a>
        </Popconfirm>
      );
    }
  }
];

const data05 = [
  { a: "令狐冲", b: "男", c: 41, d: "操作", key: "1" },
  { a: "杨过", b: "男", c: 67, d: "操作", key: "2" },
  { a: "郭靖", b: "男", c: 25, d: "操作", key: "3" }
];

class Demo05 extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading : true
    }
  }
  changeLoading = () => {
    this.setState({
      loading : !this.state.loading
    })
  }
  render() {
    return (
      <div>
        <Button
          className="editable-add-btn"
          onClick={this.changeLoading}
        >
          切换loading
        </Button>
        <Table
          columns={columns05}
          data={data05}
          title={currentData => <div>标题: 这是一个标题</div>}
          footer={currentData => <div>表尾: 我是小尾巴</div>}
          // loading={this.state.loading}或者是boolean
          loading={{show:this.state.loading}}
        />
      </div>
    );
  }
}

export default Demo05;
