/**
*
* @title 多功能表格滚动加载
* @parent 无限滚动 Infinite-scroll
* @description
* demo1403
*/

import React, { Component } from "react";
import {Tooltip,Checkbox,Icon,Popover} from "tinper-bee";
import Table from "../../src";
import BigData from "../../src/lib/bigData";
import multiSelect from '../../src/lib/multiSelect';
import filterColumn from '../../src/lib/filterColumn';

let  ComplexTable = filterColumn(BigData(Table), Popover, Icon);

const columns = [
    {
      className: 'u-table-multiSelect-column',
      title: (
        <Checkbox
          className="table-checkbox"
        />
      ),
      key: "checkbox",
      dataIndex: "checkbox",
      fixed:"left",
      width: 49, 
      render: (text, record, index) => {
        const obj = {
          children: <Checkbox
                      key={index}
                      className="table-checkbox"
                    />,
          props: {},
        };
        if (index === 0) {
          obj.props.rowSpan = 100;
        } else {
          obj.props.rowSpan = 0;
        }
        obj.props.mergeEndIndex = 100;
        // if (index < 50 ) {
        //   obj.props.mergeEndIndex = 50;
        // } else if (index > 50 && index < 100) {
        //   obj.props.mergeEndIndex = 100;
        // } else if (index > 100) {
        //   obj.props.mergeEndIndex = 150;
        // }
        return obj;
      }
    },
    {
        title:'序号',
        dataIndex:'index',
        width:'80',
        key:'index',
        fixed:'left',
        render:(text,record,index)=>{
            // return index
            const obj = {
              children: index,
              props: {},
            };
            if (index === 0) {
              obj.props.rowSpan = 100;
            } else {
              obj.props.rowSpan = 0;
            }
            obj.props.mergeEndIndex = 100;
            // if (index < 50 ) {
            //   obj.props.mergeEndIndex = 50;
            // } else if (index > 50 && index < 100) {
            //   obj.props.mergeEndIndex = 100;
            // } else if (index > 100) {
            //   obj.props.mergeEndIndex = 150;
            // }
            // mergeEndIndex: 滚动加载场景，合并表行时，设置合并结束位置的行 index 值
            return obj;
        }
    },
    {
    title: "用户名", dataIndex: "a", key: "a", width: 580, className: "rowClassName",
    render: (text, record, index) => {
      return (
        <Tooltip inverse overlay={text}>
          <span tootip={text} style={{
            display: "block",
            width: "40px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            verticalAlign: "bottom",
          }}>{text}</span>
        </Tooltip>
      );
    }
  },
  { id: "123", title: "性别", dataIndex: "b", key: "b", width: 80},
  { title: "年龄", dataIndex: "c", key: "c", width: 200 }
];

const data = [ ...new Array(100) ].map((e, i) => {
    const rs = { a: i + 'a', b: i + 'b', c: i + 'c', d: i + 'd', key: i };
    if(i%3==0){
        rs.b = '女';
    }
    return rs;
   })


class Demo32 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: data,
      selectedRowIndex: 0
    }
  }
  getSelectedDataFunc = data => {
    console.log(data);
  };

  render() {
    return (
        <ComplexTable
          columns={columns}
          data={data}
          parentNodeId='parent'
          scroll={{y:300}}
          bordered
          onRowClick={(record, index, indent) => {
            this.setState({
              selectedRowIndex: index
            });
          }}
          getSelectedDataFunc={this.getSelectedDataFunc}/>

    );
  }
}

export default Demo32;
