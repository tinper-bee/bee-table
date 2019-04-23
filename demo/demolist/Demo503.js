/**
 *
 * @title 全表编辑
 * @description 可以对全表进行编辑的表格
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
  { name: "全能法戒", quality: "远古传奇", level: 70, key: "1" },
  { name: "绝命", quality: "太古传奇", level: 70, key: "2" },
  { name: "蚀刻符印", quality: "太古传奇", level: 70, key: "3" },
  { name: "虹光", quality: "传奇", level: 70, key: "4" },
  { name: "复仇者护腕", quality: "传奇", level: 70, key: "5" }
];

class Demo503 extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      dataSource: dataSource,
      editAll: false
    };
    this.dataBuffer = [];
    this.CONST_COL = [
      {
        title: "装备名称",
        dataIndex: "name",
        key: "name",
        render: (text, record, index) => (
          <EditableCell
            editable={this.state.editAll}
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
            editable={this.state.editAll}
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
            editable={this.state.editAll}
            value={text}
            onChange={this.onCellChange(index, "level")}
          />
        )
      }
    ];
  }

  edit = () => {
    this.dataBuffer = [ ...this.state.dataSource ];
    this.setState({ editAll: true });
  };

  commitChange = () => {
    this.setState({
      editAll: false,
      dataSource: this.dataBuffer
    });
    this.dataBuffer = [];
  };

  onCellChange = (index, key) => value => {
    this.dataBuffer[index][key] = value;
  };

  render() {
    let columns = [];
    if (this.state.editAll) {
      columns.push({
        title: (
          <Icon
            type="uf-correct"
            className="editable-row-icon-check"
            onClick={this.commitChange}
          />
        ),
        key: "row_edit",
        width: "45px"
      });
    } else {
      columns.push({
        title: (
          <Icon
            type="uf-pencil"
            className="editable-row-icon"
            onClick={this.edit}
          />
        ),
        key: "row_edit",
        width: "45px"
      });
    }
    columns = columns.concat(this.CONST_COL);
    return (
      <div className="demo502">
        <Table data={this.state.dataSource} columns={columns} />
      </div>
    );
  }
}

export default Demo503;
