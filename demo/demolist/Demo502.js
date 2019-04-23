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
  { name: "全能法戒", quality: "远古传奇", level: 70, key: "1" },
  { name: "绝命", quality: "太古传奇", level: 70, key: "2" },
  { name: "蚀刻符印", quality: "太古传奇", level: 70, key: "3" },
  { name: "虹光", quality: "传奇", level: 70, key: "4" },
  { name: "复仇者护腕", quality: "传奇", level: 70, key: "5" }
];

for (let i = 5; i < 10; i++) {
  dataSource.push({
    name: "复仇者护腕",
    quality: "传奇",
    level: 70,
    key: i + 1 + ""
  });
}

class Demo502 extends Component {
  constructor(props, context) {
    super(props);
    this.columns = [
      {
        title: "装备名称",
        dataIndex: "name",
        key: "name",
        render: (text, record, index) => (
          <EditableCell
            editable={this.state.editingRows.indexOf(index) > -1}
            value={text}
            onChange={this.onCellChange(index, "name")}
          />
        )
      },
      {
        title: "品质",
        dataIndex: "quality",
        key: "quality",
        render: (text, record, index) => (
          <EditableCell
            editable={this.state.editingRows.indexOf(index) > -1}
            value={text}
            onChange={this.onCellChange(index, "quality")}
          />
        )
      },
      {
        title: "需求等级",
        dataIndex: "level",
        key: "level",
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
        key: "placeholder",
        dataIndex: "undefined"
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
    return btn
  }

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
      <div className="demo502">
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

export default Demo502;
