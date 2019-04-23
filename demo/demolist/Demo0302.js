/**
*
* @title 渲染远程数据
* @parent 数据操作 Data Opetation
* @description 可通过 ajax 请求方式，从服务端读取并展现数据。也可自行接入其他数据处理方式。
* demo0302
*/

import React, { Component } from "react";
import {Button} from "tinper-bee";
import reqwest from 'reqwest';
import Table from "../../src";

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  sorter: true,
  render: name => `${name.first} ${name.last}`,
  width: '20%',
}, {
  title: 'Gender',
  dataIndex: 'gender',
  filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
  ],
  width: '20%',
}, {
  title: 'Email',
  dataIndex: 'email',
}];

class Demo22 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    }
  }

  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ loading: true });
    reqwest({
      url: 'https://randomuser.me/api',
      method: 'get',
      data: {
        results: 10,
        ...params,
      },
      type: 'json',
    }).then((data) => {
      this.setState({
        loading: false,
        data: data.results,
      });
    });
  }

  render() {
    return (
      <div className="demo22">
        <Button className="opt-btns" colors="secondary" onClick={() => this.fetch()}>点击加载远程数据</Button>
        <Table
          columns={columns}
          data={this.state.data}
          loading={this.state.loading}
          scroll={{y:200}}
        />
      </div>
    );
  }
}

export default Demo22;
