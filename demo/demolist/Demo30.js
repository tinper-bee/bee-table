/**
*
* @title 大数据加载
* 【Tooltip】
* @description
*/

import React, { Component } from "react";
import Tooltip from "bee-tooltip";
import Table from "../../src";
import BigData from "../../src/lib/bigData";
const BigDataTable = BigData(Table);


const data = [ ...new Array(10000) ].map((e, i) => {
    const rs = { a: i + 'a', b: i + 'b', c: i + 'c', d: i + 'd', key: i };
    if(i%3==0){
        rs.b = '女';
    }
    return rs;
   })


class Demo30 extends Component {
  
  constructor(props) {
    super(props);
    const _this = this;
    this.state = {
      data: data,
      selectedRowIndex: 0,
      currentIndex:-1
    }
    this.columns = [
      {
          title:'序号',
          dataIndex:'index',
          width:'50',
          render:(text,record,index)=>{
              return index
          },
          fixed:'left'
      },
      {
      title: "用户名", dataIndex: "a", key: "a", width: 580, className: "rowClassName",
      render: (text, record, index) => {
        return (
          <Tooltip inverse overlay={text}>
            <span tootip={text} style={{
              display: "inline-block",
              width: "80px",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              verticalAlign: "middle",
            }}>{text}</span>
          </Tooltip>
        );
      }
    },
    { id: "123", title: "性别", dataIndex: "b", key: "b", width: 80},
    { title: "年龄", dataIndex: "c", key: "c", width: 200 },
    {
      title: "操作",
      dataIndex: "d",
      key: "d",
      fixed:'right',
      render(text, record, index) {
      
        return (
          <div style={{ position: 'relative' }} title={text} >
            <a
              href="javascript:;"
              tooltip={text}
              onClick={() => {
                alert(record.key+'这是第' + index + '列，内容为:' + text);
              }}
            >
             {record.key+'这是第' + index}
                </a>
                <button onClick={_this.del(record,index) }>删除</button>
          </div>
        );
      }
    }
  ];
  }
 
  add=()=>{
    let {currentIndex} = this.state;
    let data = this.state.data;
    const key = data.length;
    
    data.push({a: key + 'a', b: key + 'b', c: key + 'c', d: key + 'd', key: key});
    currentIndex = data.length
    this.setState({data,currentIndex});
  }
  del=(record,index)=>(record,index)=>{
    
    let data = this.state.data;
    data.splice(index,1);

    this.setState(data);
  }
  render() {
   const {currentIndex} = this.state;
    return (
      <div>
        <button onClick = {this.add}>增加</button>
        <BigDataTable
          columns={this.columns}
          data={data}
          parentNodeId='parent'
          scroll={{y:300}}
          currentIndex = {currentIndex}
          height={40}
          onRowClick={(record, index, indent) => {
            console.log('currentIndex--'+index);
          }}
        />
</div>
     
    );
  }
}

export default Demo30;
