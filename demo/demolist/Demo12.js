/**
*
* @title 全选功能
* @description 全选功能
*
*/


import React, { Component } from 'react';
import Table from '../../src';
import Checkbox from "bee-checkbox";

const columns12 = [
  {
    title: "名字",
    dataIndex: "a",
    key: "a",
    width: 100
  },
  {
    title: "性别",
    dataIndex: "b",
    key: "b",
    width: 100
  },
  {
    title: "年龄",
    dataIndex: "c",
    key: "c",
    width: 200,
    sorter: (a, b) => a.c - b.c
  },
  {
    title: "操作",
    dataIndex: "",
    key: "d",
    render() {
      return <a href="#">一些操作</a>;
    }
  }
];

const data12 = [
  { a: "杨过", b: "男", c: 30, key: "2" },
  { a: "令狐冲", b: "男", c: 41, key: "1" },
  { a: "郭靖", b: "男", c: 25, key: "3" }
];

const defaultProps12 = {
  prefixCls: "bee-table",
  multiSelect: {
    type: "checkbox",
    param: "key"
  }
};
class Demo12 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedAll:false,
      checkedArray: [
        false,
        false,
        false,
      ],
      data: data12
    };
  }
  onAllCheckChange = () => {
    let self = this;
    let checkedArray = [];
    let listData = self.state.data.concat();
    let selIds = [];
    // let id = self.props.multiSelect.param;
    for (var i = 0; i < self.state.checkedArray.length; i++) {
      checkedArray[i] = !self.state.checkedAll;
    }
    // if (self.state.checkedAll) {
    //   selIds = [];
    // } else {
    //   for (var i = 0; i < listData.length; i++) {
    //     selIds[i] = listData[i][id];
    //   }
    // }
    self.setState({
      checkedAll: !self.state.checkedAll,
      checkedArray: checkedArray,
      // selIds: selIds
    });
    // self.props.onSelIds(selIds);
  };
  onCheckboxChange = (text, record, index) => {
    let self = this;
    let allFlag = false;
    // let selIds = self.state.selIds;
    // let id = self.props.postId;
    let checkedArray = self.state.checkedArray.concat();
    // if (self.state.checkedArray[index]) {
      // selIds.remove(record[id]);
    // } else {
      // selIds.push(record[id]);
    // }
    debugger;
    checkedArray[index] = !self.state.checkedArray[index];
    for (var i = 0; i < self.state.checkedArray.length; i++) {
      if (!checkedArray[i]) {
        allFlag = false;
        break;
      } else {
        allFlag = true;
      }
    }
    self.setState({
      checkedAll: allFlag,
      checkedArray: checkedArray,
      // selIds: selIds
    });
    // self.props.onSelIds(selIds);
  };
  renderColumnsMultiSelect(columns) {
    const { data,checkedArray } = this.state;
    const { multiSelect } = this.props;
    let select_column = {};
    let indeterminate_bool = false;
    // let indeterminate_bool1 = true;
    if (multiSelect && multiSelect.type === "checkbox") {
      let i = checkedArray.length;
      while(i--){
          if(checkedArray[i]){
            indeterminate_bool = true;
            break;
          }
      }
      let defaultColumns = [
        {
          title: (
            <Checkbox
              className="table-checkbox"
              checked={this.state.checkedAll}
              indeterminate={indeterminate_bool&&!this.state.checkedAll}
              onHandleChange={this.onAllCheckChange}
            />
          ),
          key: "checkbox",
          dataIndex: "checkbox",
          width: "5%",
          render: (text, record, index) => {
            return (
              <Checkbox
                className="table-checkbox"
                checked={this.state.checkedArray[index]}
                onHandleChange={this.onCheckboxChange.bind(this, text, record, index)}
              />
            );
          }
        }
      ];
      columns = defaultColumns.concat(columns);
    }
    return columns;
  }
  render() {
    let columns = this.renderColumnsMultiSelect(columns12);
    return <Table columns={columns} data={data12} />;
  }
}
Demo12.defaultProps = defaultProps12;

export default Demo12;