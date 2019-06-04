/**
*
* @title 自定义行、列合并
* @parent 扩展行 Expanded Row
* @description 表头只支持列合并，使用 column 里的 colSpan 进行设置。表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。
* demo1108
*/

import React, { Component } from "react";
import Button from 'bee-button';
import Table from "../../src";

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if (index === 4) {
    obj.props.colSpan = 0;
  }
  return obj;
};

const columns = [{
  title: '姓名',
  key: "name",
  dataIndex: 'name',
  render: (text, row, index) => {
    if (index < 4) {
      return <a href="#">{text}</a>;
    }
    return {
      children: <a href="#">{text}</a>,
      props: {
        colSpan: 5,
      },
    };
  },
}, {
  title: '年龄',
  key: "age",
  dataIndex: 'age',
  render: renderContent,
}, {
  title: '联系方式',
  colSpan: 2,
  key: "tel",
  dataIndex: 'tel',
  render: (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    if (index === 2) {
      obj.props.rowSpan = 2;
    }
    if (index === 3) {
      obj.props.rowSpan = 0;
    }
    if (index === 4) {
      obj.props.colSpan = 0;
    }
    return obj;
  },
}, {
  title: '手机号',
  colSpan: 0,
  key: "phone",
  dataIndex: 'phone',
  render: renderContent,
}, {
  title: '家庭住址',
  key: "address",
  dataIndex: 'address',
  render: renderContent,
}];


const columns1 =  [{
  title: '姓名',
  key: "name",
  dataIndex: 'name',
  render: (text, row, index) => {
    if (index < 4) {
      return <a href="#">{text}</a>;
    }
    return {
      children: <a href="#">{text}</a>,
      props: {
        colSpan: 5,
      },
    };
  },
}, {
  title: '年龄',
  key: "age",
  dataIndex: 'age',
  render: renderContent,
}, {
  title: '联系方式',
  colSpan: 2,
  key: "tel",
  dataIndex: 'tel',
  render: renderContent
}, {
  title: '手机号',
  colSpan: 0,
  key: "phone",
  dataIndex: 'phone',
  render: renderContent,
}, {
  title: '家庭住址',
  key: "address",
  dataIndex: 'address',
  render: renderContent,
}];
const data = [{
  key: '1',
  name: '小红',
  age: 32,
  tel: '0571-22098909',
  phone: 18889898989,
  address: '北京海淀',
}, {
  key: '2',
  name: '小明',
  tel: '0571-22098333',
  phone: 18889898888,
  age: 42,
  address: '河北张家口',
}, {
  key: '3',
  name: '张三',
  age: 32,
  tel: '0575-22098909',
  phone: 18900010002,
  address: '浙江杭州',
}, {
  key: '4',
  name: '李四',
  age: 18,
  tel: '0575-22098909',
  phone: 18900010002,
  address: '广州深圳',
}, {
  key: '5',
  name: '王五',
  age: 18,
  tel: '0575-22098909',
  phone: 18900010002,
  address: '北京昌平',
}];

class Demo15 extends Component {
  constructor(props){
    super(props);
    this.state={
      colFlag:false
    }
  }
  onChange=()=>{
    const colFlag = this.state.colFlag;
    this.setState({
      colFlag:!colFlag
    })
  }
  render() {
    let cols = this.state.colFlag?columns:columns1;
    return (
      <div>
        <Button onClick={this.onChange} colors="secondary" style={{marginBottom:'8px'}}>change列</Button>
        <Table columns={cols} data={data} bordered/>
      </div>
      
    );
  }
}


export default Demo15;
