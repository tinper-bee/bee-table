/**
*
* @title 根据内容自动撑开行高
* @parent 扩展行 Expanded Row
* @description 表格行含有图片时的展示
*/

import React, { Component } from "react";
import {Button,Tooltip} from "tinper-bee";
import Table from "../../src";

const columns = [
    {
        title: "序号",
        dataIndex: "index",
        key: "index",
        width: 80,
        render(record, text, index) {
            return index + 1;
        }
    },
    {
        title: "组织部门",
        dataIndex: "orgDept",
        key: "orgDept",
        width: 100,
    },
    {
        title: "设施管理部门",
        dataIndex: "facilityManageUnit",
        key: "facilityManageUnit",
        width: 100,
    },
    {
        title: "案卷编号",
        dataIndex: "docketnum",
        key: "docketnum",
        width: 100,
    },
    {
        title: "数量",
        dataIndex: "num",
        key: "num",
        width: 100,
    },
    {
        title: "首次发现时间",
        dataIndex: "discoveryTime",
        key: "discoveryTime",
        width: 100,
    },
    {
        title: "实际修复时间",
        dataIndex: "repairTime",
        key: "repairTime",
        width: 100,
    },
    {
        title: "图样",
        dataIndex: "picture",
        key: "picture",
        width: 100,
    },
    {
        title: "申请单号",
        dataIndex: "billcode",
        key: "billcode",
        width: 100,
    },
    {
        title: "设施名称",
        dataIndex: "facilityName",
        key: "facilityName",
        width: 100,
    }
];

const data = [
  { orgDept: "", facilityManageUnit: "", docketnum: 41, num: "1", discoveryTime: "", repairTime: "", picture: "", billcode: "", facilityName:""},
  { orgDept: "", facilityManageUnit: "", docketnum: 41, num: "1", discoveryTime: "", repairTime: "", picture: "", billcode: "", facilityName:""},
  { orgDept: "", facilityManageUnit: "", docketnum: 41, num: "1", discoveryTime: "", repairTime: "", picture: "", billcode: "", facilityName:""}
];

class Demo105 extends Component {

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
          hoverContent={this.getHoverContent}
          onRowHover={this.onRowHover}
        />
    );
  }
}

export default Demo105;
