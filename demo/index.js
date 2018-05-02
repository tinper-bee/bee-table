
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Button from 'bee-button';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';


const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


var Demo21 = require("./demolist/Demo21");var DemoArray = [{"example":<Demo21 />,"title":" 列排序","code":"/**\n*\n* @title 列排序\n* @description 点击列的上下按钮即可排序\n*\n*/\n\n\nimport React, { Component } from 'react';\nimport { Table, Icon } from 'tinper-bee';\nimport filterColumn from \"tinper-bee/lib/filterColumn\";;\n\nconst columns21 = [\n  {\n    title: \"名字\",\n    dataIndex: \"a\",\n    key: \"a\",\n    width: 100\n  },\n  {\n    title: \"性别\",\n    dataIndex: \"b\",\n    key: \"b\",\n    width: 100\n  },\n  {\n    title: \"年龄\",\n    dataIndex: \"c\",\n    key: \"c\",\n    width: 200,\n    sorter: (a, b) => a.c - b.c\n  },\n  {\n    title: \"武功级别\",\n    dataIndex: \"d\",\n    key: \"d\"\n  }\n];\n\nconst data21 = [\n  { a: \"杨过\", b: \"男\", c: 30,d:'内行', key: \"2\" },\n  { a: \"令狐冲\", b: \"男\", c: 41,d:'大侠', key: \"1\" },\n  { a: \"郭靖\", b: \"男\", c: 25,d:'大侠', key: \"3\" }\n];\n\nconst FilterColumnTable = filterColumn(Table);\n\nconst defaultProps21 = {\n  prefixCls: \"bee-table\"\n};\n\nclass Demo21 extends Component {\n  constructor(props) {\n    super(props);\n  }\n \n  render() {\n    \n    return <FilterColumnTable columns={columns21} data={data21} />;\n  }\n}\nDemo21.defaultProps = defaultProps21;\n\n\n","desc":" 点击列的上下按钮即可排序"}]


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
                <Panel collapsible headerContent expanded={ this.state.open } colors='bordered' header={ header } footerStyle = {{padding: 0}}>
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
