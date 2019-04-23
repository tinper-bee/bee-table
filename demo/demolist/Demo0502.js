/**
 *
 * @title 单元格编辑
 * @description 可以对单元格进行编辑的表格，示例中给出输入框+必填校验、下拉框编辑模式，以及输入模式的必填校验。
 * demo0502
 */
import React, { Component } from "react";
import Table from "../../src";
import { Icon, Select, Tooltip } from "tinper-bee";
const Option = Select.Option;

class StringEditCell extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      value: this.props.value,
      editable: false
    };
  }

  commitChange = () => {
    if (this.state.value === "") return;
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  };

  edit = () => {
    this.setState({ editable: true });
  };

  handleKeydown = event => {
    if (event.keyCode == 13) {
      this.commitChange();
    }
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {editable ? (
          <div className="editable-cell-input-wrapper">
            <input
              className="u-form-control"
              autoFocus
              defaultValue={this.props.value}
              value={value}
              onKeyDown={this.handleKeydown}
              onChange={this.handleChange}
              onBlur={this.commitChange}
            />
            {value === "" ? (
              <Tooltip
                inverse
                className="tp-501"
                placement="bottom"
                overlay={
                  <div className="help-tip">
                    {"请输入" + this.props.colName}
                  </div>
                }
              >
                <Icon className="uf-exc-t require" />
              </Tooltip>
            ) : null}
          </div>
        ) : (
          <div className="editable-cell-text-wrapper" onClick={this.edit}>
            {value || " "}
          </div>
        )}
      </div>
    );
  }
}

const SELECT_SOURCE = ["xx供应商", "yy供应商", "zz供应商", "aa供应商", "bb供应商"];

class SelectEditCell extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      value: this.props.value,
      editable: false
    };
  }

  handleSelect = (value) => {
    this.setState({ value });
  }

  commitChange = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  };

  edit = () => {
    this.setState({ editable: true });
  };

  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {editable ? (
          <div className="editable-cell-input-wrapper">
            <Select
              defaultValue={this.props.value}
              value={value}
              onSelect={this.handleSelect}
              onBlur={this.commitChange}
              autoFocus
            >
              {SELECT_SOURCE.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>
        ) : (
          <div className="editable-cell-text-wrapper" onClick={this.edit}>
            {value || " "}
          </div>
        )}
      </div>
    );
  }
}

const dataSource = [
  { name: "NU03910001", quality: "xx供应商", level: 70, key: "1" },
  { name: "NU03910002", quality: "yy供应商", level: 75, key: "2" },
  { name: "NU03910003", quality: "zz供应商", level: 50, key: "3" },
  { name: "NU03910004", quality: "aa供应商", level: 70, key: "4" },
  { name: "NU03910005", quality: "bb供应商", level: 60, key: "5" }
];

class Demo501 extends Component {
  constructor(props, context) {
    super(props);
    this.columns = [
      {
        title: "订单编号",
        dataIndex: "name",
        key: "name",
        render: (text, record, index) => (
          <StringEditCell
            value={text}
            colName={"订单编号"}
            onChange={this.onCellChange(index, "name")}
          />
        )
      },
      {
        title: "供应商名称",
        dataIndex: "quality",
        key: "quality",
        render: (text, record, index) => (
          <SelectEditCell
            value={text}
            onChange={this.onCellChange(index, "quality")}
          />
        )
      },
      {
        title: "采购数量",
        dataIndex: "level",
        key: "level"
      }
    ];

    this.state = {
      dataSource: dataSource
    };
  }

  onCellChange = (index, key) => {
    return value => {
      const { dataSource } = this.state;
      dataSource[index][key] = value;
      this.setState({ dataSource }, () => console.dir(this.state.dataSource));
    };
  };

  render() {
    return (
      <div className="demo501">
        <Table data={this.state.dataSource} columns={this.columns} />
      </div>
    );
  }
}

export default Demo501;
