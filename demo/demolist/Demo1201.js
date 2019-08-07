/**
*
* @title 拖拽改变行顺序
* @parent 行操作-拖拽
* @description `rowDraggAble`参数设置是否使用行交换顺序功能，`onDropRow` 是拖拽行后的回调函数。注意：表格行数据必须有唯一标识，可以通过 `data.key` 或 `rowKey` 两种方式传入。
* Demo1201
*/

import React, { Component } from "react";
import Table from "../../src";
import Switch from 'bee-switch';

const columns = [
  { title: "员工编号", dataIndex: "a", key: "a", width: 150 },
  { title: "员工姓名", dataIndex: "b", key: "b", width:200 },
  { title: "系统权限", dataIndex: "c", key: "c", width: 200,render:()=>{return(<Switch size="sm" />)}},
  { title: "部门", dataIndex: "d", key: "d", width: 100 },
  { title: "职级", dataIndex: "e", key: "e", width: 100 }
];

const data = [
  { a: "ASVAL_201903280005", b: "小张", c: "男", d: "财务二科", e: "M1", key: "1001" },
  { a: "ASVAL_201903200004", b: "小明", c: "男", d: "财务一科", e: "T1", key: "1002" },
  { a: "ASVAL_201903120001", b: "小红", c: "女", d: "财务四科", e: "T3", key: "1003" },
  { a: "ASVAL_201903120002", b: "小姚", c: "女", d: "财务一科", e: "T2", key: "1004" },
  { a: "ASVAL_201903120003", b: "小岳", c: "男", d: "财务五科", e: "T2", key: "1005" },
  { a: "ASVAL_201903120004", b: "小王", c: "男", d: "财务一科", e: "T5", key: "1006" },
  { a: "ASVAL_201903120005", b: "小绍", c: "男", d: "财务七科", e: "T2", key: "1007" },
  { a: "ASVAL_201903120006", b: "小郭", c: "男", d: "财务一科", e: "T3", key: "1008" },
  { a: "ASVAL_201903120007", b: "小杨", c: "女", d: "财务四科", e: "T2", key: "1009" }
];

class Demo1201 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: data
    }
  }
  handleClick = () => {
    console.log('这是第' , this.currentIndex , '行');
    console.log('内容：' , this.currentRecord);
  }

  /**
   * 行拖拽开始时触发
   * @param record 拖拽行的数据
   * @param index 拖拽行的下标序号
   */
  onDragRowStart = (record,index) => {
    console.log('拖拽的行数据：', record);
    console.log('拖拽的行序号：', index);
  }

  /**
   * 行拖拽结束时触发
   * @param data 拖拽改变顺序后的新data数组
   * @param record 拖拽行的数据
   */
  onDropRow = (data, record) => {
    console.log('重排序后的data： ', data);
    console.log('拖拽的行数据： ', record);
  }

  render() {
    return (
        <Table
          columns={columns}
          data={data}
          rowDraggAble={true}
          onDragRowStart={this.onDragRowStart}
          onDropRow={this.onDropRow}
        />
    );
  }
}

export default Demo1201;
