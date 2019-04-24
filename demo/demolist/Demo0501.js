/**
 *
 * @title 行编辑
 * @description 可以对行进行编辑的表格
 *
 */
import React, { Component } from "react";
import Table from "../../src";
import { Button, FormControl } from "tinper-bee";

class EditableCell extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      value: this.props.value,
      editable: false
    };
  }

  handleChange = value => {
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  render() {
    return (
      <div className="editable-cell">
        <div className="editable-cell-input-wrapper">
          {this.props.editable ? (
            <FormControl
              value={this.state.value}
              onChange={this.handleChange}
            />
          ) : (
            this.state.value || " "
          )}
        </div>
      </div>
    );
  }
}

let dataSource = [
  { a: "ASVAL_201903280005", b: "小张", c: "男", d: "财务二科", key: "1" },
  { a: "ASVAL_201903200004", b: "小明", c: "男", d: "财务一科", key: "2" },
  { a: "ASVAL_201903120002", b: "小红", c: "女", d: "财务一科", key: "3" }
];

for (let i = 4; i < 10; i++) {
  dataSource.push({
    a: "ASVAL_201903120002",
    b: "小红",
    c: "女",
    d: "财务一科",
    key: i + ""
  });
}

class Demo0501 extends Component {
  constructor(props, context) {
    super(props);
    this.columns = [
      {
        title: "员工编号",
        dataIndex: "a",
        key: "a"
      },
      {
        title: "名字",
        dataIndex: "b",
        key: "b",
        render: (text, record, index) => (
          <EditableCell
            editable={this.state.editingRows.indexOf(index) > -1}
            value={text}
            onChange={this.onCellChange(index, "quality")}
          />
        )
      },
      {
        title: "性别",
        dataIndex: "c",
        key: "c",
        width: 100,
        render: (text, record, index) => (
          <EditableCell
            editable={this.state.editingRows.indexOf(index) > -1}
            value={text}
            onChange={this.onCellChange(index, "level")}
          />
        )
      },
      {
        titile: "部门",
        dataIndex: "d",
        key: "d",
        render: (text, record, index) => text
      }
    ];

    this.state = {
      dataSource: dataSource,
      editingRows: []
    };

    this.dataBuffer = {};
    this.currentIndex = null;
    this.currentRecord = null;
    this.__OPTS_BTN_GROUP__ = null;
  }

  createBtn = (text, props, event) => {
    let btn = document.createElement("button");
    btn.innerText = text;
    for (let pKey in props) {
      btn.setAttribute(pKey, props[pKey]);
    }
    for (let eKey in event) {
      btn.addEventListener(eKey, event[eKey]);
    }
    return btn;
  };

  edit = index => () => {
    if (index === null) return;
    let editingRows = [...this.state.editingRows];
    editingRows.push(index);
    this.dataBuffer[index] = Object.assign({}, dataSource[index]);
    this.setState({ editingRows });
  };

  abortEdit = () => {
    let editingRows = [...this.state.editingRows];
    editingRows.splice(index, 1);
    delete this.dataBuffer[index];
    this.setState({ editingRows });
  };

  commitChange = index => () => {
    let editingRows = [...this.state.editingRows];
    let dataSource = [...this.state.dataSource];
    editingRows.splice(editingRows.indexOf(index), 1);
    dataSource[index] = this.dataBuffer[index];
    delete this.dataBuffer[index];
    this.setState({ editingRows, dataSource });
  };

  onCellChange = (index, key) => value => {
    this.dataBuffer[index][key] = value;
  };

  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div className="demo0501">
        <Table
          data={dataSource}
          columns={columns}
          onRowHover={this.handleRowHover}
          hoverContent={this.renderRowHover}
        />
      </div>
    );
  }
}

export default Demo0501;
