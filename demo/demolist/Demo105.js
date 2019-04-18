/**
*
* @title 图片在表格中的展示
* @parent 扩展行 Expanded Row
* @description 根据图片高度自动撑开行高，可结合图片查看器使用 http://design.yonyoucloud.com/tinper-bee/bee-viewer
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
        render(text, record, index) {
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
        width: 150,
    },
    {
        title: "实际修复时间",
        dataIndex: "repairTime",
        key: "repairTime",
        width: 150,
    },
    {
        title: "图样",
        dataIndex: "picture",
        key: "picture",
        render(text, record, index) {
            return <img style={{height:'50px'}} src={text} alt="Picture"/>
        }
    }
];

const data = [
  { key: "1", orgDept: "组织1", facilityManageUnit: "部门1", docketnum: 41, num: "1", discoveryTime: "2018-10-17", repairTime: "2018-10-30", picture: "http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-1-min.jpg"},
  { key: "2", orgDept: "组织2", facilityManageUnit: "部门2", docketnum: 30, num: "2", discoveryTime: "2019-01-15", repairTime: "2019-01-20", picture: "http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-2-min.jpg"},
  { key: "3", orgDept: "组织3", facilityManageUnit: "部门3", docketnum: 35, num: "3", discoveryTime: "2019-04-10", repairTime: "2019-04-17", picture: "http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-3-min.jpg"}
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
