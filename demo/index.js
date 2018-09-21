
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Button from 'bee-button';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';


const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


var Demo26 = require("./demolist/Demo26");var DemoArray = [{"example":<Demo26 />,"title":" 按条件和值过滤","code":"/**\n*\n* @title 按条件和值过滤\n* @description 可以根据输入项目以及判断条件对表格内的数据进行过滤\n*\n*/\n\n\nimport React, { Component } from 'react';\nimport { Table } from 'tinper-bee';\n\n\nconst columns26 = [\n  { title: \"姓名\", width: 180, dataIndex: \"name\", key: \"name\", filterType: \"text\", filterDropdown: \"show\" },\n  { title: \"年龄\", width: 120, dataIndex: \"age\", key: \"age\", filterType: \"dropdown\" },\n  { title: \"日期\", width: 200, dataIndex: \"date\", key: \"date\", filterType: \"date\" },\n  { title: \"居住地址\", width: 120, dataIndex: \"address\", key: \"address\", filterType: \"dropdown\" },\n  { title: \"备注\", dataIndex: \"mark\", key: \"mark\" }\n];\n\nconst data26 = [\n  {\n    key: \"1\",\n    name: \"John Brown\",\n    age: 32,\n    date: \"2018-09-18 09:46:44\",\n    address: \"朝阳区\",\n    mark: \"无\"\n  },\n  {\n    key: \"2\",\n    name: \"Jim Green\",\n    age: 40,\n    date: \"2018-09-18 09:46:44\",\n    address: \"朝阳区\",\n    mark: \"无\"\n  },\n  {\n    key: \"3\",\n    name: \"Jim Green\",\n    age: 40,\n    date: \"2018-09-18 09:46:44\",\n    address: \"东城区\",\n    mark: \"无\"\n  },\n  {\n    key: \"4\",\n    name: \"Jim Green\",\n    age: 40,\n    date: \"2018-09-18 09:46:44\",\n    address: \"东城区\",\n    mark: \"无\"\n  }, {\n    key: \"5\",\n    name: \"John Brown\",\n    age: 32,\n    date: \"2018-09-18 09:46:44\",\n    address: \"海淀区\",\n    mark: \"无\"\n  },\n  {\n    key: \"6\",\n    name: \"Jim Green\",\n    age: 48,\n    date: \"2018-09-18 09:46:44\",\n    address: \"海淀区\",\n    mark: \"无\"\n  },\n  {\n    key: \"7\",\n    name: \"Jim Green\",\n    age: 40,\n    date: \"2018-09-18 09:46:44\",\n    address: \"海淀区\",\n    mark: \"无\"\n  },\n  {\n    key: \"8\",\n    name: \"Jim Green\",\n    age: 38,\n    date: \"2018-09-18 09:46:44\",\n    address: \"海淀区\",\n    mark: \"无\"\n  }\n];\n\nclass Demo26 extends Component {\n  handlerFilterRowsChange = (key, val) => {\n    console.log('准备构建AJAX请求，接收参数：key=', key, ' value=', val);\n  }\n  handlerFilterRowsDropChange = (key, val) => {\n    console.log('过滤条件类型:', key, val);\n  }\n  render() {\n    return <Table\n      onFilterRowsDropChange={this.handlerFilterRowsDropChange}//下拉条件的回调(key,val)=>()\n      onFilterRowsChange={this.handlerFilterRowsChange}//触发输入操作以及其他的回调(key,val)=>()\n      filterDelay={500}//输入文本多少ms触发回调函数，默认300ms\n      filterable={true}//是否开启过滤数据功能\n      bordered\n      columns={columns26}\n      data={data26} />;\n  }\n}\n\n","desc":" 可以根据输入项目以及判断条件对表格内的数据进行过滤"}]


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
        const { title, example, code, desc, scss_code  } = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const header = (
            <div>
                {example}
                <Button style={{"marginTop": "10px"}} shape="block" onClick={ this.handleClick }>
                    { caret }
                    { text }
                </Button>
            </div>
        );
        return (
            <Col md={12} >
                <h3>{ title }</h3>
                <p>{ desc }</p>
                <Panel copyable collapsible headerContent expanded={ this.state.open } colors='bordered' header={ header } footerStyle = {{padding: 0}}>
                    <pre><code className="hljs javascript">{ code }</code></pre>
                    { !!scss_code ? <pre><code className="hljs css">{ scss_code }</code></pre> : null }
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
                            <Demo example= {child.example} title= {child.title} code= {child.code} scss_code= {child.scss_code} desc= {child.desc} key= {index}/>
                        )

                    })}
                </Row>
        )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
