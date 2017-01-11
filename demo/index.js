
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Button from 'bee-button';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Table from '../src';
import Animate from 'bee-animate';
import Menu, { Item, Divider } from 'bee-menus';
import DropDown from 'bee-dropdown';
import Icon from "bee-icon";
import Input from 'bee-form-control';
import Popconfirm from 'bee-popconfirm';

const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


/**
*
* @title 简单表格
* @description
*
*/

const columns = [
  { title: '用户名', dataIndex: 'a', key: 'a', width: 100 },
  { id: '123', title: '性别', dataIndex: 'b', key: 'b', width: 100 },
  { title: '年龄', dataIndex: 'c', key: 'c', width: 200 },
  {
    title: '操作', dataIndex: '', key: 'd', render() {
      return <a href="#">一些操作</a>;
    },
  },
];

const data = [
  { a: '令狐冲', b: '男', c: 41, key: '1' },
  { a: '杨过', b: '男', c: 67, key: '2' },
  { a: '郭靖', b: '男', c: 25, key: '3' },
];

class Demo1 extends Component {
    render () {
        return (
              <Table
              columns={columns}
              data={data}
              title={currentData => <div>标题: {currentData.length} 个元素</div>}
              footer={currentData => <div>表尾: {currentData.length} 个元素</div>}
              />
        )
    }
}
/**
*
* @title 这是标题
* @description 这是描述
*
*/

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  handleKeydown = (event) => {
      console.log(event);
      if(event.keyCode == 13){
          this.check();
      }

  }
  render() {
    const { value, editable } = this.state;
    return (<div className="editable-cell">
      {
        editable ?
        <div className="editable-cell-input-wrapper">
          <Input
            value={value}
            onChange={this.handleChange}
            onKeyDown = {this.handleKeydown}
          />
          <Icon
            type="uf-correct"
            className="editable-cell-icon-check"
            onClick={this.check}
          />
        </div>
        :
        <div className="editable-cell-text-wrapper">
          {value || ' '}
          <Icon
            type="uf-pencil"
            className="editable-cell-icon"
            onClick={this.edit}
          />
        </div>
      }
    </div>);
  }
}

class Demo2 extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '姓名',
      dataIndex: 'name',
      key:'name',
      width: '30%',
      render: (text, record, index) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(index, 'name')}
        />
      ),
    }, {
      title: '年龄',
      dataIndex: 'age',
       key:'age',
    }, {
      title: '你懂的',
      dataIndex: 'address',
       key:'address',
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record, index) => {
        return (
          this.state.dataSource.length > 1 ?
          (
            <Popconfirm content="确认删除?" id='aa' onClose={this.onDelete(index)}>
              <Icon type="uf-del"></Icon>
            </Popconfirm>
          ) : null
        );
      },
    }];

    this.state = {
      dataSource: [{
        key: '0',
        name: '沉鱼',
        age: '18',
        address: '96, 77, 89',
      }, {
        key: '1',
        name: '落雁',
        age: '16',
        address: '90, 70, 80',
      }, {
        key: '2',
        name: '闭月',
        age: '17',
        address: '80, 60, 80',
      }, {
        key: '3',
        name: '羞花',
        age: '20',
        address: '120, 60, 90',
      }],
      count: 4,
    };
  }
  onCellChange = (index, key) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  }
  onDelete = (index) => {
    return () => {
      const dataSource = [...this.state.dataSource];
      dataSource.splice(index, 1);
      this.setState({ dataSource });
    };
  }
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `凤姐 ${count}`,
      age: 32,
      address: `100 100 100`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

  getBodyWrapper = (body) => {
    return (
      <Animate transitionName="move" component="tbody" className={body.props.className}>
        {body.props.children}
      </Animate>
    );
  }
  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (<div>
      <Button className="editable-add-btn" type="ghost" onClick={this.handleAdd}>添加</Button>
      <Table bordered data={dataSource} columns={columns} getBodyWrapper={this.getBodyWrapper} />
    </div>);
  }
}
var DemoArray = [{"example":<Demo1 />,"title":" 简单表格","code":"/**\r\n*\r\n* @title 简单表格\r\n* @description\r\n*\r\n*/\r\n\r\nconst columns = [\r\n  { title: '用户名', dataIndex: 'a', key: 'a', width: 100 },\r\n  { id: '123', title: '性别', dataIndex: 'b', key: 'b', width: 100 },\r\n  { title: '年龄', dataIndex: 'c', key: 'c', width: 200 },\r\n  {\r\n    title: '操作', dataIndex: '', key: 'd', render() {\r\n      return <a href=\"#\">一些操作</a>;\r\n    },\r\n  },\r\n];\r\n\r\nconst data = [\r\n  { a: '令狐冲', b: '男', c: 41, key: '1' },\r\n  { a: '杨过', b: '男', c: 67, key: '2' },\r\n  { a: '郭靖', b: '男', c: 25, key: '3' },\r\n];\r\n\r\nclass Demo1 extends Component {\r\n    render () {\r\n        return (\r\n              <Table\r\n              columns={columns}\r\n              data={data}\r\n              title={currentData => <div>标题: {currentData.length} 个元素</div>}\r\n              footer={currentData => <div>表尾: {currentData.length} 个元素</div>}\r\n              />\r\n        )\r\n    }\r\n}\r\n","desc":""},{"example":<Demo2 />,"title":" 这是标题","code":"/**\r\n*\r\n* @title 这是标题\r\n* @description 这是描述\r\n*\r\n*/\r\n\r\nclass EditableCell extends React.Component {\r\n  state = {\r\n    value: this.props.value,\r\n    editable: false,\r\n  }\r\n  handleChange = (e) => {\r\n    const value = e.target.value;\r\n    this.setState({ value });\r\n  }\r\n  check = () => {\r\n    this.setState({ editable: false });\r\n    if (this.props.onChange) {\r\n      this.props.onChange(this.state.value);\r\n    }\r\n  }\r\n  edit = () => {\r\n    this.setState({ editable: true });\r\n  }\r\n  handleKeydown = (event) => {\r\n      console.log(event);\r\n      if(event.keyCode == 13){\r\n          this.check();\r\n      }\r\n\r\n  }\r\n  render() {\r\n    const { value, editable } = this.state;\r\n    return (<div className=\"editable-cell\">\r\n      {\r\n        editable ?\r\n        <div className=\"editable-cell-input-wrapper\">\r\n          <Input\r\n            value={value}\r\n            onChange={this.handleChange}\r\n            onKeyDown = {this.handleKeydown}\r\n          />\r\n          <Icon\r\n            type=\"uf-correct\"\r\n            className=\"editable-cell-icon-check\"\r\n            onClick={this.check}\r\n          />\r\n        </div>\r\n        :\r\n        <div className=\"editable-cell-text-wrapper\">\r\n          {value || ' '}\r\n          <Icon\r\n            type=\"uf-pencil\"\r\n            className=\"editable-cell-icon\"\r\n            onClick={this.edit}\r\n          />\r\n        </div>\r\n      }\r\n    </div>);\r\n  }\r\n}\r\n\r\nclass Demo2 extends React.Component {\r\n  constructor(props) {\r\n    super(props);\r\n    this.columns = [{\r\n      title: '姓名',\r\n      dataIndex: 'name',\r\n      key:'name',\r\n      width: '30%',\r\n      render: (text, record, index) => (\r\n        <EditableCell\r\n          value={text}\r\n          onChange={this.onCellChange(index, 'name')}\r\n        />\r\n      ),\r\n    }, {\r\n      title: '年龄',\r\n      dataIndex: 'age',\r\n       key:'age',\r\n    }, {\r\n      title: '你懂的',\r\n      dataIndex: 'address',\r\n       key:'address',\r\n    }, {\r\n      title: '操作',\r\n      dataIndex: 'operation',\r\n      key: 'operation',\r\n      render: (text, record, index) => {\r\n        return (\r\n          this.state.dataSource.length > 1 ?\r\n          (\r\n            <Popconfirm content=\"确认删除?\" id='aa' onClose={this.onDelete(index)}>\r\n              <Icon type=\"uf-del\"></Icon>\r\n            </Popconfirm>\r\n          ) : null\r\n        );\r\n      },\r\n    }];\r\n\r\n    this.state = {\r\n      dataSource: [{\r\n        key: '0',\r\n        name: '沉鱼',\r\n        age: '18',\r\n        address: '96, 77, 89',\r\n      }, {\r\n        key: '1',\r\n        name: '落雁',\r\n        age: '16',\r\n        address: '90, 70, 80',\r\n      }, {\r\n        key: '2',\r\n        name: '闭月',\r\n        age: '17',\r\n        address: '80, 60, 80',\r\n      }, {\r\n        key: '3',\r\n        name: '羞花',\r\n        age: '20',\r\n        address: '120, 60, 90',\r\n      }],\r\n      count: 4,\r\n    };\r\n  }\r\n  onCellChange = (index, key) => {\r\n    return (value) => {\r\n      const dataSource = [...this.state.dataSource];\r\n      dataSource[index][key] = value;\r\n      this.setState({ dataSource });\r\n    };\r\n  }\r\n  onDelete = (index) => {\r\n    return () => {\r\n      const dataSource = [...this.state.dataSource];\r\n      dataSource.splice(index, 1);\r\n      this.setState({ dataSource });\r\n    };\r\n  }\r\n  handleAdd = () => {\r\n    const { count, dataSource } = this.state;\r\n    const newData = {\r\n      key: count,\r\n      name: `凤姐 ${count}`,\r\n      age: 32,\r\n      address: `100 100 100`,\r\n    };\r\n    this.setState({\r\n      dataSource: [...dataSource, newData],\r\n      count: count + 1,\r\n    });\r\n  }\r\n\r\n  getBodyWrapper = (body) => {\r\n    return (\r\n      <Animate transitionName=\"move\" component=\"tbody\" className={body.props.className}>\r\n        {body.props.children}\r\n      </Animate>\r\n    );\r\n  }\r\n  render() {\r\n    const { dataSource } = this.state;\r\n    const columns = this.columns;\r\n    return (<div>\r\n      <Button className=\"editable-add-btn\" type=\"ghost\" onClick={this.handleAdd}>添加</Button>\r\n      <Table bordered data={dataSource} columns={columns} getBodyWrapper={this.getBodyWrapper} />\r\n    </div>);\r\n  }\r\n}\r\n","desc":" 这是描述"}]


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
                <Col md={12}>
                { example }
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
