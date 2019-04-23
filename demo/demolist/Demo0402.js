/**
 *
 * @title 多列表头
 * @parent 列渲染 Custom Render
 * @description columns[n] 可以内嵌 children，以渲染分组表头。
 * 自定义表头高度需要传headerHeight，注：修改th的padding top和bottom置为0，否则会有影响
 * demo0402
 */

import React, { Component } from "react";
import Table from "../../src";
import {Button} from "tinper-bee";

const { ColumnGroup, Column } = Table;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 100,
    fixed: "left"
  },
  {
    title: "Other",
    width:600,
    children: [
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        width: 200
      },
      {
        title: "Address",
        children: [
          {
            title: "Street",
            dataIndex: "street",
            key: "street",
            width: 200
          },
          {
            title: "Block",
            children: [
              {
                title: "Building",
                dataIndex: "building",
                key: "building",
                width: 100
              },
              {
                title: "Door No.",
                dataIndex: "number",
                key: "number",
                width: 100
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Company",
    width:400,
    children: [
      {
        title: "Company Address",
        dataIndex: "companyAddress",
        key: "companyAddress",
        width:200,
      },
      {
        title: "Company Name",
        dataIndex: "companyName",
        key: "companyName",
        width:200,
      }
    ]
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    width: 60,
    fixed: "right"
  }
];

const data = [];
for (let i = 0; i < 20; i++) {
  data.push({
    key: i,
    name: "John Brown",
    age: i + 1,
    street: "Lake Park",
    building: "C",
    number: 2035,
    companyAddress: "Lake Street 42",
    companyName: "SoftLake Co",
    gender: "M"
  });
}

class Demo32 extends Component {
  render() {
    return (
      <Table
        className={'demo32'}
        columns={columns}
        data={data}
        headerHeight={40} //自定义表头高度
        bordered
        scroll={{ y: 240 }}
      />
    );
  }
}

export default Demo32;
