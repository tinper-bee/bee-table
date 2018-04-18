/**
 *
 * @title 合并标题后的合计,且支持多字段统计
 * @description 合计（通过使用的封装好的功能方法实现复杂功能，简单易用！）
 *
 */

import React, { Component } from "react";
import Table from "../../src"; 
import sum from "../../src/lib/sum.js";
 
let ComplexTable = sum(Table);

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
    children: [
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        width: 200,
        sumCol: true,
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
                width: 100,
                sumCol: true,
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Company",
    children: [
      {
        title: "Company Address",
        dataIndex: "companyAddress",
        key: "companyAddress"
      },
      {
        title: "Company Name",
        dataIndex: "companyName",
        key: "companyName"
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
for (let i = 0; i < 5; i++) {
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

class Demo18 extends Component {
   
  render() {
    let multiObj = {
      type: "checkbox"
    };
    return (
      <div>
         <ComplexTable 
          columns={columns}
          data={data}
          bordered
        />
      </div>
    );
  }
}
export default Demo18;
