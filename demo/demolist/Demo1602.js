/**
 *
 * @title 表格+搜索
 * @parent 搜索 search
 * @description 搜索刷新表格数据
 * demo1602
 */

import React, { Component } from "react";
import {Icon,FormControl,InputGroup} from "tinper-bee";

import Table from "../../src";

class Search extends Component {
  state = {
    searchValue: "",
    empty: false
  };

  /**
     * 搜索
     */
  handleSearch = () => {
    let { onSearch } = this.props;
    this.setState({
      empty: true
    });
    onSearch && onSearch(this.state.searchValue);
  };

  /**
     * 捕获回车
     * @param e
     */
  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.handleSearch();
    }
  };

  /**
     * 输入框改变
     * @param e
     */
  handleChange = (e) => {
    this.setState({
      searchValue: e
    });
  };

  /**
     * 清空输入框
     */
  emptySearch = () => {
    let { onEmpty } = this.props;
    this.setState({
      searchValue: "",
      empty: false
    });
    onEmpty && onEmpty();
  };

  render() {
    return (
      <InputGroup simple className="search-component">
        <FormControl
          onChange={this.handleChange}
          value={this.state.searchValue}
          onKeyDown={this.handleKeyDown}
          placeholder="请输入用户名"
          type="text"
        />
        {this.state.empty ? (
          <Icon
            type="uf-close-c"
            onClick={this.emptySearch}
            className="empty-search"
          />
        ) : null}

        <InputGroup.Button onClick={this.handleSearch} shape="border">
          <Icon type="uf-search" />
        </InputGroup.Button>
      </InputGroup>
    );
  }
}

const columns = [
  { title: "员工编号", dataIndex: "a", key: "a", width: 300, className: "rowClassName"},
  { title: "员工姓名", dataIndex: "b", key: "b", width: 500 },
  { title: "性别", dataIndex: "c", key: "c", width: 500 },
  { title: "部门", dataIndex: "d", key: "d", width: 200 }
];

const userData = [
  { a: "ASVAL_201903280005", b: "小张", c: "男", d: "财务二科", key: "1" },
  { a: "ASVAL_201903200004", b: "小明", c: "男", d: "财务一科", key: "2" },
  { a: "ASVAL_201903120002", b: "小红", c: "女", d: "财务一科", key: "3" }
];

class Demo9 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: userData
    };
  }

  handleSearch = value => {
    if (value === "") {
      return this.setState({
        data: userData
      });
    }
    let regExp = new RegExp(value, "ig");
    let data = userData.filter(item => regExp.test(item.a));
    this.setState({
      data
    });
  };

  handleEmpty = () => {
    this.setState({
      data: userData
    });
  };

  render() {
    return (
      <div>
        <div className="clearfix">
          <Search onSearch={this.handleSearch} onEmpty={this.handleEmpty} />
        </div>
        <Table columns={columns} data={this.state.data} />
      </div>
    );
  }
}

export default Demo9;
