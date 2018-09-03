/**
*
* @title 增删改表格
* @description 这是带有增删改功能的表格（此编辑功能未使用render组件）
*
*/

import Button from "bee-button";
import React, { Component } from "react";
import Table from "../../src";
import Animate from "bee-animate";
import Icon from "bee-icon";
import Input from "bee-form-control";
import Popconfirm from "bee-popconfirm";

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false
  };
  handleChange = e => {
    const value = e;
    this.setState({ value });
  };
  check = () => {
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
      this.check();
    }
  };
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {editable ? (
          <div className="editable-cell-input-wrapper">
            <Input
              value={value}
              onChange={this.handleChange}
              onKeyDown={this.handleKeydown}
            />
            <Icon
              type="uf-correct"
              className="editable-cell-icon-check"
              onClick={this.check}
            />
          </div>
        ) : (
          <div className="editable-cell-text-wrapper">
            {value || " "}
            <Icon
              type="uf-pencil"
              className="editable-cell-icon"
              onClick={this.edit}
            />
          </div>
        )}
      </div>
    );
  }
}

class Demo2 extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        width: "30%",
        render: (text, record, index) => (
          <EditableCell
            value={text}
            onChange={this.onCellChange(index, "name")}
          />
        )
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age"
      },
      {
        title: "你懂的",
        dataIndex: "address",
        key: "address"
      },
      {
        title: "操作",
        dataIndex: "operation",
        key: "operation",
        render: (text, record, index) => {
          return this.state.dataSource.length > 1 ? (
            <Popconfirm content="确认删除?" id="aa" onClose={this.onDelete(index)}>
              <Icon type="uf-del" />
            </Popconfirm>
          ) : null;
        }
      }
    ];

    this.state = {
      dataSource: [
        {
          key: "0",
          name: "沉鱼",
          age: "18",
          address: "96, 77, 89"
        },
        {
          key: "1",
          name: "落雁",
          age: "16",
          address: "90, 70, 80"
        },
        {
          key: "2",
          name: "闭月",
          age: "17",
          address: "80, 60, 80"
        },
        {
          key: "3",
          name: "羞花",
          age: "20",
          address: "120, 60, 90"
        }
      ],
      count: 4
    };
  }
  onCellChange = (index, key) => {
    return value => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  };
  onDelete = (index) => {
    return () => {
      const dataSource = [...this.state.dataSource];
      dataSource.splice(index, 1);
      this.setState({ dataSource });
    }
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `凤姐 ${count}`,
      age: 32,
      address: `100 100 100`
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1
    });
  };

  getBodyWrapper = body => {
    return (
      <Animate
        transitionName="move"
        component="tbody"
        className={body.props.className}
      >
        {body.props.children}
      </Animate>
    );
  };
  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div>
        <Button
          className="editable-add-btn"
          type="ghost"
          onClick={this.handleAdd}
        >
          添加
        </Button>
        <Table
          data={dataSource}
          columns={columns}
          getBodyWrapper={this.getBodyWrapper}
        />
      </div>
    );
  }
}

export default Demo2;
