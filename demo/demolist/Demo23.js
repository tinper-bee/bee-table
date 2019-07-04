/**
 *
 * @title 主子表
 * @description 主表点击子表联动
 *
 */

import React, { Component } from "react";
import Table from "../../src";

const columns7 = [
  { title: "班级", dataIndex: "a", key: "a" },
  { title: "人数", dataIndex: "b", key: "b" },
  { title: "班主任", dataIndex: "c", key: "c" },
  {
    title: "武功级别",
    dataIndex: "d",
    key: "d"
  }
];

const data7 = [
  { a: "02级一班", b: "2", c: "欧阳锋", d: "大侠", key: "1" },
  { a: "03级二班", b: "3", c: "归海一刀", d: "大侠", key: "2" },
  { a: "05级三班", b: "1", c: "一拳超人", d: "愣头青", key: "3" }
];

const columns7_1 = [
  { title: "姓名", dataIndex: "a", key: "a" },
  { title: "班级", dataIndex: "b", key: "b" },
  { title: "系别", dataIndex: "c", key: "c" }
];

class Demo7 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children_data: []
    };
  }

  rowclick = (record, index) => {
    if (record.a === "02级一班") {
      this.setState({
        children_data: [
          { a: "郭靖", b: "02级一班", c: "文学系", key: "1" },
          { a: "黄蓉", b: "02级一班", c: "文学系", key: "2" }
        ]
      });
    } else if (record.a === "03级二班") {
      this.setState({
        children_data: [
          { a: "杨过", b: "03级二班", c: "外语系", key: "1" },
          { a: "小龙女", b: "03级二班", c: "外语系", key: "2" },
          { a: "傻姑", b: "03级二班", c: "外语系", key: "3" }
        ]
      });
    } else if (record.a === "05级三班") {
      this.setState({
        children_data: [{ a: "金圣叹", b: "05级三班", c: "美术系", key: "1" }]
      });
    }
  };

  render() {
    return (
      <div>
        <Table
          columns={columns7}
          data={data7}
          onRowClick={this.rowclick}
          title={currentData => <div>标题: 我是主表</div>}
        />
        <Table
          style={{ marginTop: 40 }}
          columns={columns7_1}
          data={this.state.children_data}
          title={currentData => <div>标题: 我是子表</div>}
        />
      </div>
    );
  }
}

export default Demo7;
