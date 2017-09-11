/**
*
* @title 表格+搜索
* @description 搜索刷新表格数据
*
*/



import React, { Component } from 'react';
import Table from '../../src';
import Icon from "bee-icon";
import InputGroup from 'bee-input-group';
import FormControl from 'bee-form-control';


class Search extends Component {
  state = {
    searchValue: "",
    empty: false
  };

  /**
   * 搜索
   */
  handleSearch = () => {
    let { onSearch,handleToChange } = this.props;
    handleToChange && handleToChange();
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
  handleChange = e => {
    this.setState({
      searchValue: e.target.value
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
          type="text"
        />
        {this.state.empty
          ? <Icon
              type="uf-close-c"
              onClick={this.emptySearch}
              className="empty-search"
            />
          : null}

        <InputGroup.Button onClick={this.handleSearch} shape="border">
          <Icon type="uf-search" />
        </InputGroup.Button>
      </InputGroup>
    );
  }
}

const columns9 = [
  { title: "用户名", dataIndex: "a", key: "a", width: 100 },
  { id: "123", title: "性别", dataIndex: "b", key: "b", width: 100 },
  { title: "年龄", dataIndex: "c", key: "c", width: 200 },
  {
    title: "操作",
    dataIndex: "",
    key: "d",
    render() {
      return <a href="#">一些操作</a>;
    }
  }
];

class Demo9 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { a: "令狐冲", b: "男", c: 41, key: "1" },
        { a: "杨过", b: "男", c: 67, key: "2" },
        { a: "郭靖", b: "男", c: 25, key: "3" }
      ]
    };
  }
  handleSearchToTable=()=>{
    this.setState({
      data: [
        { a: "令狐冲", b: "男", c: 41, key: "1" }
      ]
    })
  }
  render() {
    return (
      <div>
        <div className="clearfix">
          <Search handleToChange={this.handleSearchToTable}/>
        </div>
        <Table columns={columns9} data={this.state.data} />
      </div>
    );
  }
}

export default Demo9;