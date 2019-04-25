/**
 *
 * @title 列合计（总计）
 * @parent 列渲染 Custom Render
 * @description 给需要计算合计的列（columns），设置sumCol值为true即可，支持动态设置数据源。
 * demo0405
 */

import React, { Component } from "react";
import {Checkbox} from "tinper-bee";
import Table from "../../src"; 
import sum from "../../src/lib/sum.js";
import multiSelect from "../../src/lib/multiSelect.js";
 
let ComplexTable = multiSelect(sum(Table), Checkbox);
let _sum = 0;
const columns = [
  {
    title: "单据编号",
    dataIndex: "num",
    key: "num",
    width: 120,
    fixed: "left"
  },
  {
    title: "单据日期",
    dataIndex: "date",
    key: "date",
    width: 200,
  },
  {
    title: "业务类型",
    dataIndex: "type",
    key: "type",
    width: 200
  },
  {
    title: "供应商",
    dataIndex: "supplier",
    key: "supplier",
    width: 100
  },
  {
    title: "联系人",
    dataIndex: "contact",
    key: "contact",
  },
  {
    title: "仓库",
    dataIndex: "warehouse",
    key: "warehouse",
    width: 80,
  },
  {
    title: "整单数量",
    dataIndex: "total",
    key: "total",
    width: 100,
    sumCol: true
  },
  {
    title: "金额",
    dataIndex: "money",
    key: "money",
    width: 100,
    sumCol: true
  }
];

function getData(){
  const data = [];
  for (let i = 0; i < 5; i++) {
    data.push({
      key: i,
      num: "NU039100"+i,
      date: "2019-03-01",
      type: "普通采购",
      supplier: "gys"+i,
      contact: "Tom",
      warehouse: "普通仓",
      total: i + Math.floor(Math.random()*10),
      money: 20 *  Math.floor(Math.random()*10)
    });
    _sum += data[i].total;
    _sum += data[i].money;
  }
  return data;
}

class Demo35 extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: getData(),
      sum:_sum
    };
  }

  render() {
    const {data} = this.state;
    return (
      <div>
         <ComplexTable 
          columns={columns}
          data={data}
          bordered
          footer={currentData => <div>总计: {_sum}</div>}
        />
      </div>
    );
  }
}
export default Demo35;
