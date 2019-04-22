import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import Button from '../src';



var Demo92 = require("./demolist/Demo92");var DemoArray = [{"example":<Demo92 />,"title":" 拖拽改变列宽度","code":"/**\n*\n* @title 拖拽改变列宽度\n* @parent 列操作-拖拽 Drag\n* @description 注：不支持tree结构的表头、合并表头的table\n*/\nimport React, { Component } from 'react';\nimport {Icon} from \"tinper-bee\";\n\nimport { Table } from 'tinper-bee'; \nimport dragColumn from \"tinper-bee/lib/dragColumn\";;\n\nconst columns23 = [\n  {\n    title: \"名字\",\n    dataIndex: \"a\",\n    key: \"a\",\n    width: '200',\n    fixed:'left'\n  },\n  {\n    title: \"性别\",\n    dataIndex: \"b\",\n    key: \"b\",\n    width: '600'\n  },\n  {\n    title: \"年龄\",\n    dataIndex: \"c\",\n    key: \"c\",\n    width: '200',\n    sumCol: true,\n    sorter: (a, b) => a.c - b.c\n  }, \n  {\n    title: \"武功级别\",\n    dataIndex: \"d\",\n    key: \"d\",\n    width: 500,\n  }\n];\n\nconst data23 = [\n  { a: \"杨过\", b: \"男\", c: 30,d:'内行', key: \"2\" },\n  { a: \"令狐冲\", b: \"男\", c: 41,d:'大侠', key: \"1\" },\n  { a: \"郭靖\", b: \"男\", c: 25,d:'大侠', key: \"31\" } , { a: \"杨过\", b: \"男\", c: 30,d:'内行', key: \"21\" },\n  { a: \"令狐冲\", b: \"男\", c: 41,d:'大侠', key: \"11\" },\n  { a: \"郭靖\", b: \"男\", c: 25,d:'大侠', key: \"32\" } , { a: \"杨过\", b: \"男\", c: 30,d:'内行', key: \"22\" },\n  { a: \"令狐冲\", b: \"男\", c: 41,d:'大侠', key: \"12\" },\n  { a: \"郭靖\", b: \"男\", c: 25,d:'大侠', key: \"3\" }\n];\n\nconst DragColumnTable = dragColumn(Table);\n\nconst defaultProps23 = {\n  prefixCls: \"bee-table\"\n};\n\nclass Demo23 extends Component {\n  constructor(props) {\n    super(props); \n  }\n\n  render() {\n    return <DragColumnTable columns={columns23} data={data23} bordered\n    dragborder={true} \n    draggable={true} \n    scroll={{y:200}}\n    bordered={true}\n    onDropBorder ={(e,width)=>{\n      // console.log(width+\"--调整列宽后触发事件\",e.target);\n    }}\n    />;\n  }\n}\nDemo23.defaultProps = defaultProps23;\n\n\n","desc":" 注：不支持tree结构的表头、合并表头的table"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    handleClick=()=> {
        this.setState({ open: !this.state.open })
    }
    fCloseDrawer=()=>{
        this.setState({
            open: false
        })
    }

    render () {
        const { title, example, code, desc, scss_code  } = this.props;

        const header = (
            <div>
                <p className='component-title'>{ title }</p>
                <p>{ desc }</p>
                <span className='component-code' onClick={this.handleClick}> 查看源码 <i className='uf uf-arrow-right'/> </span>
            </div>
        );
        return (
            <Col md={12} id={title.trim()} className='component-demo'>
            <Panel header={header}>
                {example}
            </Panel>
           
            <Drawer className='component-drawerc' title={title} show={this.state.open} placement='right' onClose={this.fCloseDrawer}>
            <div className='component-code-copy'> JS代码 
                <Clipboard action="copy" text={code}/>
            </div>
            <pre className="pre-js">
                <code className="hljs javascript">{ code }</code>
            </pre >
            {!!scss_code ?<div className='component-code-copy copy-css'> SCSS代码 
                <Clipboard action="copy" text={scss_code}/>
            </div>:null }
                { !!scss_code ? <pre className="pre-css">
                 <code className="hljs css">{ scss_code }</code>
                 </pre> : null }
            </Drawer>
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
