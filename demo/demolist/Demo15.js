/**
*
* @title edittype表格
* @description 这是带有增删改功能的表格
*
*/

import Button from "bee-button";
import React, { Component } from "react";
import Table from "../../src";
import Animate from "bee-animate";
import Icon from "bee-icon";
import Input from "bee-form-control";
import Checkbox from "bee-checkbox";
import Select from 'bee-select';
import Popconfirm from "bee-popconfirm";
import InputRender from "../../src/render/InputRender.js";

class Demo15 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          key: "0",
          name: "沉鱼",
          age: "y",
          address: "96, 77, 89"
        },
        {
          key: "1",
          name: "落雁",
          age: "y",
          address: "90, 70, 80"
        },
        {
          key: "2",
          name: "闭月",
          age: "n",
          address: "80, 60, 80"
        },
        {
          key: "3",
          name: "羞花",
          age: "y",
          address: "120, 60, 90"
        }
      ],
      count: 4
    };
    this.columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        width: "30%",
        render: (text, record, index) => (
          <InputRender
            value={text}
            isclickTrigger={true}
            onChange={this.onCellChange(index, "name")}
          />
        )
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age",
        render: (text, record, index) => (
          <Checkbox
            checked={record.age}
            onChange={this.onCheckChange(index, "age")}
          />
        )
      },
      {
        title: "你懂的",
        dataIndex: "address",
        key: "address",
        render: (text, record, index) => {
          return (
            <Select
              defaultValue="lucy"
              style={{ width: 200, marginRight: 6 }}
              onChange={this.handleChange}
            >
              <Option value="jack">boyuzhou</Option>
              <Option value="lucy">renhualiu</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="yiminghe">yuzhao</Option>
            </Select>
          );
        }
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
  }
  handleChange = value => {
    console.log(`selected ${value}`);
  };
  onCheckChange = (index, key) => {
    return value => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  };
  onCellChange = (index, key) => {
    return value => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  };
  onDelete = index => {
    return () => {
      const dataSource = [...this.state.dataSource];
      dataSource.splice(index, 1);
      this.setState({ dataSource });
    };
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
          bordered
          data={dataSource}
          columns={columns}
          getBodyWrapper={this.getBodyWrapper}
        />
      </div>
    );
  }
}

export default Demo15;
