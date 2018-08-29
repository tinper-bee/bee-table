/**
 *
 * @title 表格+搜索
 * @description 搜索刷新表格数据
 *
 *
 * import {Table} from 'tinper-bee';
 */

import React, { Component } from "react";

import Table from "../../src";
import Icon from "bee-icon";
import InputGroup from "bee-input-group";
import FormControl from "bee-form-control";

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

const columns9 = [
  {
    title: "姓名",
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
    width: 200
  },
  {
    title: "武功级别",
    dataIndex: "d",
    key: "d"
  }
];

const userData = [
  { a: "杨过", b: "男", c: 30, d: "内行", key: "2" },
  { a: "令狐冲", b: "男", c: 41, d: "大侠", key: "1" },
  { a: "郭靖", b: "男", c: 25, d: "大侠", key: "3" }
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
        <Table columns={columns9} data={this.state.data} />
      </div>
    );
  }
}

export default Demo9;
