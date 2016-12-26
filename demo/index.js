
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Button from 'bee-button';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Table from '../src';
import Animate from 'bee-animate';
import Menu, { Item, Divider } from 'bee-menus';
import DropDown from 'bee-dropdown';


const CARET = <i className="uf uf-chevronarrowdown"></i>;

const CARETUP = <i className="uf uf-chevronarrowup"></i>;


/**
*
* @title 这是标题
* @description 这是描述
*
*/
class Demo1 extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      { title: 'title1', dataIndex: 'a', key: 'a', width: 100 },
      { id: '123', title: 'title2', dataIndex: 'b', key: 'b', width: 100 },
      { title: 'title3', dataIndex: 'c', key: 'c', width: 200 },
      {
        title: 'Operations', dataIndex: '', key: 'd', render: (text, record) =>
        <a onClick={e => this.onDelete(record.key, e)} href="#">Delete</a>,
      },
    ];
    this.state = {
      data: [
        { a: '123', key: '1' },
        { a: 'cdd', b: 'edd', key: '2' },
        { a: '1333', c: 'eee', key: '3' },
      ],
    };
  }

  onDelete(key, e) {
    console.log('Delete', key);
    e.preventDefault();
    const data = this.state.data.filter(item => item.key !== key);
    this.setState({ data });
  }

  onAdd() {
    const data = [...this.state.data];
    data.push({
      a: 'new data',
      b: 'new data',
      c: 'new data',
      key: Date.now(),
    });
    this.setState({ data });
  }

  getBodyWrapper(body) {
    return (
      <Animate transitionName="move" component="tbody" className={body.props.className}>
        {body.props.children}
      </Animate>
    );
  }

  render() {
    return (
      <div style={{ margin: 20 }}>
        <h2>Table row with animation</h2>
        <button onClick={() => this.onAdd()}>添加</button>
        <Table
          columns={this.columns}
          data={this.state.data}
          getBodyWrapper={this.getBodyWrapper}
        />
      </div>
    );
  }
}
/**
*
* @title 这是标题
* @description 这是描述
*
*/

const columns1 = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: 400,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
  width: 100,
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
  width: 200,
}, {
  title: 'Operations',
  dataIndex: 'operation',
  key: 'x',
  width: 150,
}];

const data1 = [{
  key: 1,
  name: 'a',
  age: 32,
  address: 'I am a',
  children: [{
    key: 11,
    name: 'aa',
    age: 33,
    address: 'I am aa',
  }, {
    key: 12,
    name: 'ab',
    age: 33,
    address: 'I am ab',
    children: [{
      key: 121,
      name: 'aba',
      age: 33,
      address: 'I am aba',
    }],
  }, {
    key: 13,
    name: 'ac',
    age: 33,
    address: 'I am ac',
    children: [{
      key: 131,
      name: 'aca',
      age: 33,
      address: 'I am aca',
      children: [{
        key: 1311,
        name: 'acaa',
        age: 33,
        address: 'I am acaa',
      }, {
        key: 1312,
        name: 'acab',
        age: 33,
        address: 'I am acab',
      }],
    }],
  }],
}, {
  key: 2,
  name: 'b',
  age: 32,
  address: 'I am b',
}];

function onExpand(expanded, record) {
  console.log('onExpand', expanded, record);
}
class Demo2 extends Component {
    render () {
        return (
            <Table defaultExpandAllRows columns={columns1} data={data1} indentSize={30} onExpand={onExpand} />
        )
    }
}
/**
*
* @title 这是标题
* @description 这是描述
*
*/

const columns2 = [
  { title: 'title1', dataIndex: 'a',
    className: 'a',
    key: 'a', width: 100 },
  { id: '123', title: 'title2', dataIndex: 'b',
    className: 'b',
    key: 'b', width: 100 },
  { title: 'title3', dataIndex: 'c',
    className: 'c',
    key: 'c', width: 200 },
  {
    title: 'Operations', dataIndex: '',
    className: 'd',
    key: 'd', render() {
      return <a href="#">Operations</a>;
    },
  },
];

const data2 = [
  { a: '123', key: '1' },
  { a: 'cdd', b: 'edd', key: '2' },
  { a: '1333', c: 'eee', d: 2, key: '3' },
];

class Demo3 extends Component {
    render () {
        return (
            <div>
              <h2>rowClassName and className</h2>
              <Table
                columns={columns2}
                rowClassName={(record, i) => `row-${i}`}
                expandedRowRender={record => <p>extra: {record.a}</p>}
                expandedRowClassName={(record, i) => `ex-row-${i}`}
                data={data2}
                className="table"
              />
            </div>
        )
    }
}
/**
*
* @title 这是标题
* @description 这是描述
*
*/

const columns3 = [
  { title: '手机号', dataIndex: 'a', colSpan: 2, width: 100, key: 'a', render(o, row, index) {
    const obj = {
      children: o,
      props: {},
    };
    // 设置第一行为链接
    if (index === 0) {
      obj.children = <a href="#">{o}</a>;
    }
    // 第5行合并两列
    if (index === 4) {
      obj.props.colSpan = 2;
    }

    if (index === 5) {
      obj.props.colSpan = 6;
    }
    return obj;
  } },
  { title: '电话', dataIndex: 'b', colSpan: 0, width: 100, key: 'b', render(o, row, index) {
    const obj = {
      children: o,
      props: {},
    };
    // 列合并掉的表格设置colSpan=0，不会去渲染
    if (index === 4 || index === 5) {
      obj.props.colSpan = 0;
    }
    return obj;
  } },
  { title: 'Name', dataIndex: 'c', width: 100, key: 'c', render(o, row, index) {
    const obj = {
      children: o,
      props: {},
    };

    if (index === 5) {
      obj.props.colSpan = 0;
    }
    return obj;
  } },
  { title: 'Address', dataIndex: 'd', width: 200, key: 'd', render(o, row, index) {
    const obj = {
      children: o,
      props: {},
    };
    if (index === 0) {
      obj.props.rowSpan = 2;
    }
    if (index === 1 || index === 5) {
      obj.props.rowSpan = 0;
    }

    return obj;
  } },
  { title: 'Gender', dataIndex: 'e', width: 200, key: 'e', render(o, row, index) {
    const obj = {
      children: o,
      props: {},
    };
    if (index === 5) {
      obj.props.colSpan = 0;
    }
    return obj;
  } },
  {
    title: 'Operations', dataIndex: '', key: 'f',
    render(o, row, index) {
      if (index === 5) {
        return {
          props: {
            colSpan: 0,
          },
        };
      }
      return <a href="#">Operations</a>;
    },
  },
];

const data3 = [
  { a: '13812340987', b: '0571-12345678', c: '张三', d: '文一西路', e: 'Male', key: '1' },
  { a: '13812340986', b: '0571-98787658', c: '张夫人', d: '文一西路', e: 'Female', key: '2' },
  { a: '13812988888', b: '0571-099877', c: '李四', d: '文二西路', e: 'Male', key: '3' },
  { a: '1381200008888', b: '0571-099877', c: '王五', d: '文二西路', e: 'Male', key: '4' },
  { a: '0571-88888110', c: '李警官', d: '武林门', e: 'Male', key: '5' },
  { a: '资料统计完毕于xxxx年xxx月xxx日', key: '6' },
];


class Demo4 extends Component {
    render () {
        return (
            <div>
              <h2>colSpan & rowSpan</h2>
              <Table
                columns={columns3}
                data={data3}
                className="table"
              />
            </div>
        )
    }
}
/**
*
* @title 这是标题
* @description 这是描述
*
*/


const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    a: `a${i}`,
    b: `b${i}`,
    c: `c${i}`,
  });
}

const Demo5 = React.createClass({
  getInitialState() {
    this.filters = [];
    return {
      visible: false,
    };
  },

  handleVisibleChange(visible) {
    this.setState({ visible });
  },

  handleSelect(selected) {
    this.filters.push(selected);
  },

  handleDeselect(key) {
    const index = this.filters.indexOf(key);
    if (index !== -1) {
      this.filters.splice(index, 1);
    }
  },

  confirmFilter() {
    console.log(this.filters.join(','));
    this.setState({
      visible: false,
    });
  },

  render() {
    const menu = (
      <Menu
        style={{ width: 200 }}
        multiple
        onSelect={this.handleSelect}
        onDeselect={this.handleDeselect}
      >
        <Item key="1">one</Item>
        <Item key="2">two</Item>
        <Item key="3">three</Item>
        <Divider />
        <Item disabled>
          <button
            style={{
              cursor: 'pointer',
              color: '#000',
              pointerEvents: 'visible',
            }}
            onClick={this.confirmFilter}
          >确定</button>
        </Item>
      </Menu>
    );

    const columns = [
      {
        title: (
          <div>
            title1
            <DropDown
              trigger={['click']}
              onVisibleChange={this.handleVisibleChange}
              visible={this.state.visible}
              overlay={menu}
            >
              <a href="#">filter</a>
            </DropDown>
          </div>
        ), key: 'a', dataIndex: 'a', width: 100,
      },
      { title: 'title2', key: 'b', dataIndex: 'b', width: 100 },
      { title: 'title3', key: 'c', dataIndex: 'c', width: 200 },
    ];

    return (
      <Table
        columns={columns}
        data={data}
        rowKey={record => record.key}
      />
    );
  },
});
var DemoArray = [{"example":<Demo1 />,"title":" 这是标题","code":"/**\n*\n* @title 这是标题\n* @description 这是描述\n*\n*/\nclass Demo1 extends React.Component {\n  constructor(props) {\n    super(props);\n    this.columns = [\n      { title: 'title1', dataIndex: 'a', key: 'a', width: 100 },\n      { id: '123', title: 'title2', dataIndex: 'b', key: 'b', width: 100 },\n      { title: 'title3', dataIndex: 'c', key: 'c', width: 200 },\n      {\n        title: 'Operations', dataIndex: '', key: 'd', render: (text, record) =>\n        <a onClick={e => this.onDelete(record.key, e)} href=\"#\">Delete</a>,\n      },\n    ];\n    this.state = {\n      data: [\n        { a: '123', key: '1' },\n        { a: 'cdd', b: 'edd', key: '2' },\n        { a: '1333', c: 'eee', key: '3' },\n      ],\n    };\n  }\n\n  onDelete(key, e) {\n    console.log('Delete', key);\n    e.preventDefault();\n    const data = this.state.data.filter(item => item.key !== key);\n    this.setState({ data });\n  }\n\n  onAdd() {\n    const data = [...this.state.data];\n    data.push({\n      a: 'new data',\n      b: 'new data',\n      c: 'new data',\n      key: Date.now(),\n    });\n    this.setState({ data });\n  }\n\n  getBodyWrapper(body) {\n    return (\n      <Animate transitionName=\"move\" component=\"tbody\" className={body.props.className}>\n        {body.props.children}\n      </Animate>\n    );\n  }\n\n  render() {\n    return (\n      <div style={{ margin: 20 }}>\n        <h2>Table row with animation</h2>\n        <button onClick={() => this.onAdd()}>添加</button>\n        <Table\n          columns={this.columns}\n          data={this.state.data}\n          getBodyWrapper={this.getBodyWrapper}\n        />\n      </div>\n    );\n  }\n}\n","desc":" 这是描述"},{"example":<Demo2 />,"title":" 这是标题","code":"/**\r\n*\r\n* @title 这是标题\r\n* @description 这是描述\r\n*\r\n*/\r\n\r\nconst columns1 = [{\r\n  title: 'Name',\r\n  dataIndex: 'name',\r\n  key: 'name',\r\n  width: 400,\r\n}, {\r\n  title: 'Age',\r\n  dataIndex: 'age',\r\n  key: 'age',\r\n  width: 100,\r\n}, {\r\n  title: 'Address',\r\n  dataIndex: 'address',\r\n  key: 'address',\r\n  width: 200,\r\n}, {\r\n  title: 'Operations',\r\n  dataIndex: 'operation',\r\n  key: 'x',\r\n  width: 150,\r\n}];\r\n\r\nconst data1 = [{\r\n  key: 1,\r\n  name: 'a',\r\n  age: 32,\r\n  address: 'I am a',\r\n  children: [{\r\n    key: 11,\r\n    name: 'aa',\r\n    age: 33,\r\n    address: 'I am aa',\r\n  }, {\r\n    key: 12,\r\n    name: 'ab',\r\n    age: 33,\r\n    address: 'I am ab',\r\n    children: [{\r\n      key: 121,\r\n      name: 'aba',\r\n      age: 33,\r\n      address: 'I am aba',\r\n    }],\r\n  }, {\r\n    key: 13,\r\n    name: 'ac',\r\n    age: 33,\r\n    address: 'I am ac',\r\n    children: [{\r\n      key: 131,\r\n      name: 'aca',\r\n      age: 33,\r\n      address: 'I am aca',\r\n      children: [{\r\n        key: 1311,\r\n        name: 'acaa',\r\n        age: 33,\r\n        address: 'I am acaa',\r\n      }, {\r\n        key: 1312,\r\n        name: 'acab',\r\n        age: 33,\r\n        address: 'I am acab',\r\n      }],\r\n    }],\r\n  }],\r\n}, {\r\n  key: 2,\r\n  name: 'b',\r\n  age: 32,\r\n  address: 'I am b',\r\n}];\r\n\r\nfunction onExpand(expanded, record) {\r\n  console.log('onExpand', expanded, record);\r\n}\r\nclass Demo2 extends Component {\r\n    render () {\r\n        return (\r\n            <Table defaultExpandAllRows columns={columns1} data={data1} indentSize={30} onExpand={onExpand} />\r\n        )\r\n    }\r\n}\r\n","desc":" 这是描述"},{"example":<Demo3 />,"title":" 这是标题","code":"/**\r\n*\r\n* @title 这是标题\r\n* @description 这是描述\r\n*\r\n*/\r\n\r\nconst columns2 = [\r\n  { title: 'title1', dataIndex: 'a',\r\n    className: 'a',\r\n    key: 'a', width: 100 },\r\n  { id: '123', title: 'title2', dataIndex: 'b',\r\n    className: 'b',\r\n    key: 'b', width: 100 },\r\n  { title: 'title3', dataIndex: 'c',\r\n    className: 'c',\r\n    key: 'c', width: 200 },\r\n  {\r\n    title: 'Operations', dataIndex: '',\r\n    className: 'd',\r\n    key: 'd', render() {\r\n      return <a href=\"#\">Operations</a>;\r\n    },\r\n  },\r\n];\r\n\r\nconst data2 = [\r\n  { a: '123', key: '1' },\r\n  { a: 'cdd', b: 'edd', key: '2' },\r\n  { a: '1333', c: 'eee', d: 2, key: '3' },\r\n];\r\n\r\nclass Demo3 extends Component {\r\n    render () {\r\n        return (\r\n            <div>\r\n              <h2>rowClassName and className</h2>\r\n              <Table\r\n                columns={columns2}\r\n                rowClassName={(record, i) => `row-${i}`}\r\n                expandedRowRender={record => <p>extra: {record.a}</p>}\r\n                expandedRowClassName={(record, i) => `ex-row-${i}`}\r\n                data={data2}\r\n                className=\"table\"\r\n              />\r\n            </div>\r\n        )\r\n    }\r\n}\r\n","desc":" 这是描述"},{"example":<Demo4 />,"title":" 这是标题","code":"/**\r\n*\r\n* @title 这是标题\r\n* @description 这是描述\r\n*\r\n*/\r\n\r\nconst columns3 = [\r\n  { title: '手机号', dataIndex: 'a', colSpan: 2, width: 100, key: 'a', render(o, row, index) {\r\n    const obj = {\r\n      children: o,\r\n      props: {},\r\n    };\r\n    // 设置第一行为链接\r\n    if (index === 0) {\r\n      obj.children = <a href=\"#\">{o}</a>;\r\n    }\r\n    // 第5行合并两列\r\n    if (index === 4) {\r\n      obj.props.colSpan = 2;\r\n    }\r\n\r\n    if (index === 5) {\r\n      obj.props.colSpan = 6;\r\n    }\r\n    return obj;\r\n  } },\r\n  { title: '电话', dataIndex: 'b', colSpan: 0, width: 100, key: 'b', render(o, row, index) {\r\n    const obj = {\r\n      children: o,\r\n      props: {},\r\n    };\r\n    // 列合并掉的表格设置colSpan=0，不会去渲染\r\n    if (index === 4 || index === 5) {\r\n      obj.props.colSpan = 0;\r\n    }\r\n    return obj;\r\n  } },\r\n  { title: 'Name', dataIndex: 'c', width: 100, key: 'c', render(o, row, index) {\r\n    const obj = {\r\n      children: o,\r\n      props: {},\r\n    };\r\n\r\n    if (index === 5) {\r\n      obj.props.colSpan = 0;\r\n    }\r\n    return obj;\r\n  } },\r\n  { title: 'Address', dataIndex: 'd', width: 200, key: 'd', render(o, row, index) {\r\n    const obj = {\r\n      children: o,\r\n      props: {},\r\n    };\r\n    if (index === 0) {\r\n      obj.props.rowSpan = 2;\r\n    }\r\n    if (index === 1 || index === 5) {\r\n      obj.props.rowSpan = 0;\r\n    }\r\n\r\n    return obj;\r\n  } },\r\n  { title: 'Gender', dataIndex: 'e', width: 200, key: 'e', render(o, row, index) {\r\n    const obj = {\r\n      children: o,\r\n      props: {},\r\n    };\r\n    if (index === 5) {\r\n      obj.props.colSpan = 0;\r\n    }\r\n    return obj;\r\n  } },\r\n  {\r\n    title: 'Operations', dataIndex: '', key: 'f',\r\n    render(o, row, index) {\r\n      if (index === 5) {\r\n        return {\r\n          props: {\r\n            colSpan: 0,\r\n          },\r\n        };\r\n      }\r\n      return <a href=\"#\">Operations</a>;\r\n    },\r\n  },\r\n];\r\n\r\nconst data3 = [\r\n  { a: '13812340987', b: '0571-12345678', c: '张三', d: '文一西路', e: 'Male', key: '1' },\r\n  { a: '13812340986', b: '0571-98787658', c: '张夫人', d: '文一西路', e: 'Female', key: '2' },\r\n  { a: '13812988888', b: '0571-099877', c: '李四', d: '文二西路', e: 'Male', key: '3' },\r\n  { a: '1381200008888', b: '0571-099877', c: '王五', d: '文二西路', e: 'Male', key: '4' },\r\n  { a: '0571-88888110', c: '李警官', d: '武林门', e: 'Male', key: '5' },\r\n  { a: '资料统计完毕于xxxx年xxx月xxx日', key: '6' },\r\n];\r\n\r\n\r\nclass Demo4 extends Component {\r\n    render () {\r\n        return (\r\n            <div>\r\n              <h2>colSpan & rowSpan</h2>\r\n              <Table\r\n                columns={columns3}\r\n                data={data3}\r\n                className=\"table\"\r\n              />\r\n            </div>\r\n        )\r\n    }\r\n}\r\n","desc":" 这是描述"},{"example":<Demo5 />,"title":" 这是标题","code":"/**\r\n*\r\n* @title 这是标题\r\n* @description 这是描述\r\n*\r\n*/\r\n\r\n\r\nconst data = [];\r\nfor (let i = 0; i < 10; i++) {\r\n  data.push({\r\n    key: i,\r\n    a: `a${i}`,\r\n    b: `b${i}`,\r\n    c: `c${i}`,\r\n  });\r\n}\r\n\r\nconst Demo5 = React.createClass({\r\n  getInitialState() {\r\n    this.filters = [];\r\n    return {\r\n      visible: false,\r\n    };\r\n  },\r\n\r\n  handleVisibleChange(visible) {\r\n    this.setState({ visible });\r\n  },\r\n\r\n  handleSelect(selected) {\r\n    this.filters.push(selected);\r\n  },\r\n\r\n  handleDeselect(key) {\r\n    const index = this.filters.indexOf(key);\r\n    if (index !== -1) {\r\n      this.filters.splice(index, 1);\r\n    }\r\n  },\r\n\r\n  confirmFilter() {\r\n    console.log(this.filters.join(','));\r\n    this.setState({\r\n      visible: false,\r\n    });\r\n  },\r\n\r\n  render() {\r\n    const menu = (\r\n      <Menu\r\n        style={{ width: 200 }}\r\n        multiple\r\n        onSelect={this.handleSelect}\r\n        onDeselect={this.handleDeselect}\r\n      >\r\n        <Item key=\"1\">one</Item>\r\n        <Item key=\"2\">two</Item>\r\n        <Item key=\"3\">three</Item>\r\n        <Divider />\r\n        <Item disabled>\r\n          <button\r\n            style={{\r\n              cursor: 'pointer',\r\n              color: '#000',\r\n              pointerEvents: 'visible',\r\n            }}\r\n            onClick={this.confirmFilter}\r\n          >确定</button>\r\n        </Item>\r\n      </Menu>\r\n    );\r\n\r\n    const columns = [\r\n      {\r\n        title: (\r\n          <div>\r\n            title1\r\n            <DropDown\r\n              trigger={['click']}\r\n              onVisibleChange={this.handleVisibleChange}\r\n              visible={this.state.visible}\r\n              overlay={menu}\r\n            >\r\n              <a href=\"#\">filter</a>\r\n            </DropDown>\r\n          </div>\r\n        ), key: 'a', dataIndex: 'a', width: 100,\r\n      },\r\n      { title: 'title2', key: 'b', dataIndex: 'b', width: 100 },\r\n      { title: 'title3', key: 'c', dataIndex: 'c', width: 200 },\r\n    ];\r\n\r\n    return (\r\n      <Table\r\n        columns={columns}\r\n        data={data}\r\n        rowKey={record => record.key}\r\n      />\r\n    );\r\n  },\r\n});\r\n","desc":" 这是描述"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ open: !this.state.open })
    }

    render () {
        const { title, example, code, desc  } = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const footer = (
            <Button shape="block" onClick={ this.handleClick }>
                { caret }
                { text }
            </Button>
        );
        const header = (
            <Row>
                <Col md={11}>
                { example }
                </Col>
                <Col md={1}>
                <Button shape="icon" onClick={ this.handleClick }>
                    { caret }
                </Button>
                </Col>
            </Row>
        );
        return (
            <Col md={12} >
                <h3>{ title }</h3>
                <p>{ desc }</p>
                <Panel collapsible headerContent expanded={ this.state.open } colors='bordered' header={ header } footer={footer} footerStyle = {{padding: 0}}>
                    <pre><code className="hljs javascript">{ code }</code></pre>
                </Panel>
            </Col>
        )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
                <Row>
                    {DemoArray.map((child,index) => {

                        return (
                            <Demo example= {child.example} title= {child.title} code= {child.code} desc= {child.desc} key= {index}/>
                        )

                    })}
                </Row>
        )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
