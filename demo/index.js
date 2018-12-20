
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Button from 'bee-button';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';


const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


var Demo30 = require("./demolist/Demo30");var DemoArray = [{"example":<Demo30 />,"title":" 大数据加载","code":"/**\n*\n* @title 大数据加载\n* 【Tooltip】\n* @description\n*/\n\nimport React, { Component } from \"react\";\nimport { Table, Tooltip } from 'tinper-bee';\nimport BigData from \"tinper-bee/lib/bigData\";;\nconst BigDataTable = BigData(Table);\nconst columns = [\n    {\n        title:'序号',\n        dataIndex:'index',\n        width:'50',\n        render:(text,record,index)=>{\n            return index\n        },\n        fixed:'left'\n    },\n    {\n    title: \"用户名\", dataIndex: \"a\", key: \"a\", width: 580, className: \"rowClassName\",\n    render: (text, record, index) => {\n      return (\n        <Tooltip inverse overlay={text}>\n          <span tootip={text} style={{\n            display: \"inline-block\",\n            width: \"80px\",\n            textOverflow: \"ellipsis\",\n            overflow: \"hidden\",\n            whiteSpace: \"nowrap\",\n            verticalAlign: \"middle\",\n          }}>{text}</span>\n        </Tooltip>\n      );\n    }\n  },\n  { id: \"123\", title: \"性别\", dataIndex: \"b\", key: \"b\", width: 80},\n  { title: \"年龄\", dataIndex: \"c\", key: \"c\", width: 200 },\n  {\n    title: \"操作\",\n    dataIndex: \"d\",\n    key: \"d\",\n    fixed:'right',\n    render(text, record, index) {\n      return (\n        <div style={{ position: 'relative' }} title={text} >\n          <a\n            href=\"javascript:;\"\n            tooltip={text}\n            onClick={() => {\n              alert('这是第' + index + '列，内容为:' + text);\n            }}\n          >\n            一些操作\n              </a>\n        </div>\n      );\n    }\n  }\n];\n\nconst data = [ ...new Array(10000) ].map((e, i) => {\n    const rs = { a: i + 'a', b: i + 'b', c: i + 'c', d: i + 'd', key: i };\n    if(i%3==0){\n        rs.b = '女';\n    }\n    return rs;\n   })\n\n\nclass Demo1 extends Component {\n\n  constructor(props) {\n    super(props);\n    this.state = {\n      data: data,\n      selectedRowIndex: 0\n    }\n  }\n\n  render() {\n    return (\n        <BigDataTable\n          columns={columns}\n          data={data}\n          parentNodeId='parent'\n          scroll={{y:400}}\n          height={40}\n          onRowClick={(record, index, indent) => {\n            this.setState({\n              selectedRowIndex: index\n            });\n          }}\n        />\n\n     \n    );\n  }\n}\n\n\n","desc":""}]


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
