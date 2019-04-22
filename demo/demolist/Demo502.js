/**
 *
 * @title 行编辑
 * @description 可以对行进行编辑的表格
 *
 */
import React, { Component } from "react";
import { Table } from "tinper-bee";
import { Icon, FormControl } from "tinper-bee";

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

const dataSource = [
  { name: "全能法戒", quality: "远古传奇", level: 70 },
  { name: "绝命", quality: "太古传奇", level: 70 },
  { name: "蚀刻符印", quality: "太古传奇", level: 70 },
  { name: "虹光", quality: "传奇", level: 70 },
  { name: "复仇者护腕", quality: "传奇", level: 70 }
];

class Demo502 extends Component {
  constructor(props, context) {
    super(props);
    this.columns = [
      {
        key: "row_edit",
        width: "45px",
        render: (text, record, index) => {
          return this.state.editingRows.indexOf(index) > -1 ? (
            <Icon
              type="uf-correct"
              className="editable-row-icon-check"
              onClick={this.commitChange(index)}
            />
          ) : (
            <Icon
              type="uf-pencil"
              className="editable-row-icon"
              onClick={this.edit(index)}
            />
          );
        }
      },
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
        render: (text, record, index) => (
          <EditableCell
            editable={this.state.editingRows.indexOf(index) > -1}
            value={text}
            onChange={this.onCellChange(index, "level")}
          />
        )
      }
    ];

    this.state = {
      dataSource: dataSource,
      editingRows: []
    };

    this.dataBuffer = {};
  }

  edit = index => () => {
    let editingRows = [...this.state.editingRows];
    editingRows.push(index);
    this.dataBuffer[index] = Object.assign({}, dataSource[index]);
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
        <Table data={dataSource} columns={columns} />
      </div>
    );
  }
}

export default Demo502;
