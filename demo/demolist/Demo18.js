/**
 *
 * @title 合并标题后的合计,且支持多字段统计
 * @description 合计（通过使用的封装好的功能方法实现复杂功能，简单易用！）
 *
 */

import React, { Component } from "react";
import Button from "bee-button";
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
                // width: 100,
                sumCol: true,
              }
            ]
          }
        ]
      }
    ]
  },
  // {
  //   title: "Company",
  //   children: [
  //     {
  //       title: "Company Address",
  //       dataIndex: "companyAddress",
  //       key: "companyAddress",
  //       width: 100,
  //     },
  //     {
  //       title: "Company Name",
  //       dataIndex: "companyName",
  //       key: "companyName",
  //       width: 100,
  //     }
  //   ]
  // },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    width: 80,
    fixed: "right"
  }
];

function getData(){
  const data = [];
  for (let i = 0; i < 5; i++) {
    data.push({
      key: i,
      name: "John Brown"+i,
      age: i + Math.floor(Math.random()*10),
      street: "Lake Park",
      building: "C",
      number: 20 *  Math.floor(Math.random()*10),
      companyAddress: "Lake Street 42",
      companyName: "SoftLake Co",
      gender: "M"
    });
  }
  return data;
}

class Demo18 extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: getData()
    };
  }

  changeData = ()=>{
    this.setState({
      data: getData()
    });
  }

  render() {
    const {data} = this.state;
    return (
      <div>
        <Button 
          className="editable-add-btn"
          type="ghost"
          onClick={this.changeData}
        >
          动态设置数据源
        </Button>

         <ComplexTable 
          columns={columns}
          data={data}
          bordered
          // scroll={{ x: "130%", y: 140 }}
        />
      </div>
    );
  }
}
export default Demo18;
