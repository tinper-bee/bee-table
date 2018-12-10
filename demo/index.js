
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Button from 'bee-button';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';


const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


var Demo29 = require("./demolist/Demo29");var DemoArray = [{"example":<Demo29 />,"title":" 从弹出框内显示过滤行并且设置可选下拉条件","code":"/**\n*\n* @title 从弹出框内显示过滤行并且设置可选下拉条件\n* @description 通过Modal组件来展示表格的过滤相关能力，并且通过filterDropdownIncludeKeys设置可选条件\n*\n*/\n\n\nimport React, { Component } from 'react';\nimport { Table, Button, Modal } from 'tinper-bee';\n\n\nconst columns29 = [\n  { title: \"姓名\", width: 180, dataIndex: \"name\", key: \"name\", filterType: \"text\", filterDropdown: \"show\",filterDropdownIncludeKeys:['LIKE','EQ'] },\n  { title: \"年龄\", width: 150, dataIndex: \"age\", key: \"age\", filterType: \"dropdown\", filterDropdown: \"show\",filterDropdownType:\"number\",filterDropdownIncludeKeys:['EQ'] },\n  { title: \"日期\", width: 200, dataIndex: \"date\", key: \"date\", filterType: \"date\", filterDropdown: \"show\", format: \"YYYY-MM-DD\" }\n];\n\nconst data29 = [\n  {\n    key: \"1\",\n    name: \"John Brown\",\n    age: 32,\n    date: \"2018-09-19\",\n    address: \"朝阳区\",\n    mark: \"无\"\n  },\n  {\n    key: \"2\",\n    name: \"Jim Green\",\n    age: 40,\n    date: \"2018-09-18\",\n    address: \"朝阳区\",\n    mark: \"无\"\n  },\n  {\n    key: \"3\",\n    name: \"Jim Green\",\n    age: 40,\n    date: \"2018-09-18\",\n    address: \"东城区\",\n    mark: \"无\"\n  },\n  {\n    key: \"4\",\n    name: \"Jim Green\",\n    age: 40,\n    date: \"2018-09-18\",\n    address: \"东城区\",\n    mark: \"无\"\n  }, {\n    key: \"5\",\n    name: \"John Brown\",\n    age: 32,\n    date: \"2018-09-18\",\n    address: \"海淀区\",\n    mark: \"无\"\n  },\n  {\n    key: \"6\",\n    name: \"Jim Green\",\n    age: 48,\n    date: \"2018-09-18\",\n    address: \"海淀区\",\n    mark: \"无\"\n  },\n  {\n    key: \"7\",\n    name: \"Jim Green\",\n    age: 40,\n    date: \"2018-09-18\",\n    address: \"海淀区\",\n    mark: \"无\"\n  },\n  {\n    key: \"8\",\n    name: \"Jim Green\",\n    age: 38,\n    date: \"2018-09-18\",\n    address: \"海淀区\",\n    mark: \"无\"\n  }\n];\n\nclass Demo29 extends Component {\n  constructor() {\n    super();\n    this.state = {\n      show: false\n    }\n    this.close = this.close.bind(this);\n    this.open = this.open.bind(this);\n  }\n  handlerFilterChange = (key, val, condition) => {\n    console.log('参数：key=', key, ' value=', val, 'condition=', condition);\n  }\n\n  handlerFilterClear = (key) => {\n    console.log('清除条件', key);\n  }\n  close() {\n    this.setState({\n      show: false\n    });\n  }\n  open() {\n    this.setState({\n      show: true\n    });\n  }\n  render() {\n    return (<div><Modal\n      show={this.state.show}\n      onHide={this.close}\n      autoFocus={false}\n      enforceFocus={false}\n      >\n      <Modal.Header closeButton>\n        <Modal.Title>过滤行</Modal.Title>\n      </Modal.Header>\n      <Modal.Body>\n        <Table\n          onFilterChange={this.handlerFilterChange}//下拉条件的回调(key,val)=>()\n          onFilterClear={this.handlerFilterClear}//触发输入操作以及其他的回调(key,val)=>()\n          filterDelay={500}//输入文本多少ms触发回调函数，默认300ms\n          filterable={true}//是否开启过滤数据功能\n          bordered\n          columns={columns29}\n          data={data29} />\n      </Modal.Body>\n    </Modal>\n      <Button colors=\"primary\" onClick={this.open}>显示表格</Button>\n    </div>)\n  }\n}\n\n","desc":" 通过Modal组件来展示表格的过滤相关能力，并且通过filterDropdownIncludeKeys设置可选条件"}]


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
