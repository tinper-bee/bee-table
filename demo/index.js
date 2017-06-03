
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Button from 'bee-button';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Table from '../src';
import Animate from 'bee-animate';
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
              title={currentData => <div>标题: 这是一个标题</div>}
              footer={currentData => <div>表尾: 我是小尾巴</div>}
              />
        )
    }
}
/**
*
* @title 增删改表格
* @description 这是带有增删改功能的表格
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
      console.log(event.keyCode);
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
/**
*
* @title 更灵活的表格
* @description 手写表格的头组件来达到更灵活的配置表格
*
*/

const { ColumnGroup, Column } = Table;

const data3 = [
  { a: '北京', b: '北京', c: '250', d: 2, key: '1' },
];

class Demo3 extends Component {
    render () {
        return (

  <Table data={data3}>
    <ColumnGroup title="地址">
      <Column
        title="省"
        dataIndex="a"
        key="a"
        width={100}
      />
      <Column
        id="123"
        title="市"
        dataIndex="b"
        key="b"
        width={100}
      />
    </ColumnGroup>
    <Column
      title="数量"
      dataIndex="c"
      key="c"
      width={200}
    />
    <Column
      title="操作"
      dataIndex=""
      key="d"
      render={(text, record, index) => {
        return (
            <Button size="sm" colors="info" style={{ minWidth: 50 }}>增加</Button>
        );
      }}
    />
  </Table>
        )
    }
}
var DemoArray = [{"example":<Demo1 />,"title":" 简单表格","code":"/**\n*\n* @title 简单表格\n* @description\n*\n*/\n\nconst columns = [\n  { title: '用户名', dataIndex: 'a', key: 'a', width: 100 },\n  { id: '123', title: '性别', dataIndex: 'b', key: 'b', width: 100 },\n  { title: '年龄', dataIndex: 'c', key: 'c', width: 200 },\n  {\n    title: '操作', dataIndex: '', key: 'd', render() {\n      return <a href=\"#\">一些操作</a>;\n    },\n  },\n];\n\nconst data = [\n  { a: '令狐冲', b: '男', c: 41, key: '1' },\n  { a: '杨过', b: '男', c: 67, key: '2' },\n  { a: '郭靖', b: '男', c: 25, key: '3' },\n];\n\nclass Demo1 extends Component {\n    render () {\n        return (\n              <Table\n              columns={columns}\n              data={data}\n              title={currentData => <div>标题: 这是一个标题</div>}\n              footer={currentData => <div>表尾: 我是小尾巴</div>}\n              />\n        )\n    }\n}\n","desc":""},{"example":<Demo2 />,"title":" 增删改表格","code":"/**\n*\n* @title 增删改表格\n* @description 这是带有增删改功能的表格\n*\n*/\n\nclass EditableCell extends React.Component {\n  state = {\n    value: this.props.value,\n    editable: false,\n  }\n  handleChange = (e) => {\n    const value = e.target.value;\n    this.setState({ value });\n  }\n  check = () => {\n    this.setState({ editable: false });\n    if (this.props.onChange) {\n      this.props.onChange(this.state.value);\n    }\n  }\n  edit = () => {\n    this.setState({ editable: true });\n  }\n  handleKeydown = (event) => {\n      console.log(event.keyCode);\n      if(event.keyCode == 13){\n          this.check();\n      }\n\n  }\n  render() {\n    const { value, editable } = this.state;\n    return (<div className=\"editable-cell\">\n      {\n        editable ?\n        <div className=\"editable-cell-input-wrapper\">\n          <Input\n            value={value}\n            onChange={this.handleChange}\n            onKeyDown = {this.handleKeydown}\n          />\n          <Icon\n            type=\"uf-correct\"\n            className=\"editable-cell-icon-check\"\n            onClick={this.check}\n          />\n        </div>\n        :\n        <div className=\"editable-cell-text-wrapper\">\n          {value || ' '}\n          <Icon\n            type=\"uf-pencil\"\n            className=\"editable-cell-icon\"\n            onClick={this.edit}\n          />\n        </div>\n      }\n    </div>);\n  }\n}\n\nclass Demo2 extends React.Component {\n  constructor(props) {\n    super(props);\n    this.columns = [{\n      title: '姓名',\n      dataIndex: 'name',\n      key:'name',\n      width: '30%',\n      render: (text, record, index) => (\n        <EditableCell\n          value={text}\n          onChange={this.onCellChange(index, 'name')}\n        />\n      ),\n    }, {\n      title: '年龄',\n      dataIndex: 'age',\n       key:'age',\n    }, {\n      title: '你懂的',\n      dataIndex: 'address',\n       key:'address',\n    }, {\n      title: '操作',\n      dataIndex: 'operation',\n      key: 'operation',\n      render: (text, record, index) => {\n        return (\n          this.state.dataSource.length > 1 ?\n          (\n            <Popconfirm content=\"确认删除?\" id='aa' onClose={this.onDelete(index)}>\n              <Icon type=\"uf-del\"></Icon>\n            </Popconfirm>\n          ) : null\n        );\n      },\n    }];\n\n    this.state = {\n      dataSource: [{\n        key: '0',\n        name: '沉鱼',\n        age: '18',\n        address: '96, 77, 89',\n      }, {\n        key: '1',\n        name: '落雁',\n        age: '16',\n        address: '90, 70, 80',\n      }, {\n        key: '2',\n        name: '闭月',\n        age: '17',\n        address: '80, 60, 80',\n      }, {\n        key: '3',\n        name: '羞花',\n        age: '20',\n        address: '120, 60, 90',\n      }],\n      count: 4,\n    };\n  }\n  onCellChange = (index, key) => {\n    return (value) => {\n      const dataSource = [...this.state.dataSource];\n      dataSource[index][key] = value;\n      this.setState({ dataSource });\n    };\n  }\n  onDelete = (index) => {\n    return () => {\n      const dataSource = [...this.state.dataSource];\n      dataSource.splice(index, 1);\n      this.setState({ dataSource });\n    };\n  }\n  handleAdd = () => {\n    const { count, dataSource } = this.state;\n    const newData = {\n      key: count,\n      name: `凤姐 ${count}`,\n      age: 32,\n      address: `100 100 100`,\n    };\n    this.setState({\n      dataSource: [...dataSource, newData],\n      count: count + 1,\n    });\n  }\n\n  getBodyWrapper = (body) => {\n    return (\n      <Animate transitionName=\"move\" component=\"tbody\" className={body.props.className}>\n        {body.props.children}\n      </Animate>\n    );\n  }\n  render() {\n    const { dataSource } = this.state;\n    const columns = this.columns;\n    return (<div>\n      <Button className=\"editable-add-btn\" type=\"ghost\" onClick={this.handleAdd}>添加</Button>\n      <Table bordered data={dataSource} columns={columns} getBodyWrapper={this.getBodyWrapper} />\n    </div>);\n  }\n}\n","desc":" 这是带有增删改功能的表格"},{"example":<Demo3 />,"title":" 更灵活的表格","code":"/**\n*\n* @title 更灵活的表格\n* @description 手写表格的头组件来达到更灵活的配置表格\n*\n*/\n\nconst { ColumnGroup, Column } = Table;\n\nconst data3 = [\n  { a: '北京', b: '北京', c: '250', d: 2, key: '1' },\n];\n\nclass Demo3 extends Component {\n    render () {\n        return (\n\n  <Table data={data3}>\n    <ColumnGroup title=\"地址\">\n      <Column\n        title=\"省\"\n        dataIndex=\"a\"\n        key=\"a\"\n        width={100}\n      />\n      <Column\n        id=\"123\"\n        title=\"市\"\n        dataIndex=\"b\"\n        key=\"b\"\n        width={100}\n      />\n    </ColumnGroup>\n    <Column\n      title=\"数量\"\n      dataIndex=\"c\"\n      key=\"c\"\n      width={200}\n    />\n    <Column\n      title=\"操作\"\n      dataIndex=\"\"\n      key=\"d\"\n      render={(text, record, index) => {\n        return (\n            <Button size=\"sm\" colors=\"info\" style={{ minWidth: 50 }}>增加</Button>\n        );\n      }}\n    />\n  </Table>\n        )\n    }\n}\n","desc":" 手写表格的头组件来达到更灵活的配置表格"}]


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
