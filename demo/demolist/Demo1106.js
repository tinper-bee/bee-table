/**
*
* @title 自定义行高
* @parent 扩展行 Expanded Row
* @description 设置`height`属性自定义表体行高，设置`headerHeight`属性自定义表头高度。鼠标hover行时呼出操作按钮。
* demo1106
*/

import React, { Component } from "react";
import {Button,Tooltip} from "tinper-bee";
import Table from "../../src";

const columns = [
  { title: "员工编号", dataIndex: "a", key: "a", width: 150, className: "rowClassName"},
  { title: "员工姓名", dataIndex: "b", key: "b", width: 100 },
  { title: "性别", dataIndex: "c", key: "c", width: 100 },
  { title: "部门", dataIndex: "d", key: "d", width: 100 }
];

const data = [
  { a: "ASVAL_201903280005", b: "小张", c: "男", d: "财务二科", key: "1" },
  { a: "ASVAL_201903200004", b: "小明", c: "男", d: "财务一科", key: "2" },
  { a: "ASVAL_201903120002", b: "小红", c: "女", d: "财务一科", key: "3" }
];

class Demo1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: data,
      selectedRowIndex: 0
    }
  }
  handleClick = () => {
    console.log('这是第' , this.currentIndex , '行');
    console.log('内容：' , this.currentRecord);
  }

  onRowHover=(index,record)=>{
    this.currentIndex = index;
    this.currentRecord = record;
  }

  getHoverContent=()=>{
    return <div className="opt-btns"><Button size="sm" onClick={this.handleClick}>一些操作</Button> </div>
  }

  render() {
    return (
        <Table
          columns={columns}
          data={data}
          parentNodeId='parent'
          height={40}
          headerHeight={40}
          hoverContent={this.getHoverContent}
          onRowHover={this.onRowHover}
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
