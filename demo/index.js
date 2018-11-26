
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Button from 'bee-button';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';


const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


var Demo26 = require("./demolist/Demo26");var Demo27 = require("./demolist/Demo27");var DemoArray = [{"example":<Demo26 />,"title":" 按条件和值过滤","code":"/**\n*\n* @title 按条件和值过滤\n* @description 可以根据输入项目以及判断条件对表格内的数据进行过滤\n*\n*/\n\n\nimport React, { Component } from 'react';\nimport { Table } from 'tinper-bee';\n\n\nconst columns26 = [\n  { title: \"姓名\", width: 180, dataIndex: \"name\", key: \"name\", filterType: \"text\", filterDropdown: \"show\" },\n  { title: \"年龄\", width: 150, dataIndex: \"age\", key: \"age\", filterType: \"dropdown\", filterDropdown: \"show\" },\n  { title: \"日期\", width: 200, dataIndex: \"date\", key: \"date\", filterType: \"date\", filterDropdown: \"show\", format: \"YYYY-MM-DD\" },\n  { title: \"居住地址\", width: 150, dataIndex: \"address\", key: \"address\", filterType: \"dropdown\", filterDropdown: \"show\" },\n  { title: \"备注\", dataIndex: \"mark\", key: \"mark\" }\n];\n\nconst data26 = [\n  {\n    key: \"1\",\n    name: \"John Brown\",\n    age: 32,\n    date: \"2018-09-19\",\n    address: \"朝阳区\",\n    mark: \"无\"\n  },\n  {\n    key: \"2\",\n    name: \"Jim Green\",\n    age: 40,\n    date: \"2018-09-18\",\n    address: \"朝阳区\",\n    mark: \"无\"\n  },\n  {\n    key: \"3\",\n    name: \"Jim Green\",\n    age: 40,\n    date: \"2018-09-18\",\n    address: \"东城区\",\n    mark: \"无\"\n  },\n  {\n    key: \"4\",\n    name: \"Jim Green\",\n    age: 40,\n    date: \"2018-09-18\",\n    address: \"东城区\",\n    mark: \"无\"\n  }, {\n    key: \"5\",\n    name: \"John Brown\",\n    age: 32,\n    date: \"2018-09-18\",\n    address: \"海淀区\",\n    mark: \"无\"\n  },\n  {\n    key: \"6\",\n    name: \"Jim Green\",\n    age: 48,\n    date: \"2018-09-18\",\n    address: \"海淀区\",\n    mark: \"无\"\n  },\n  {\n    key: \"7\",\n    name: \"Jim Green\",\n    age: 40,\n    date: \"2018-09-18\",\n    address: \"海淀区\",\n    mark: \"无\"\n  },\n  {\n    key: \"8\",\n    name: \"Jim Green\",\n    age: 38,\n    date: \"2018-09-18\",\n    address: \"海淀区\",\n    mark: \"无\"\n  }\n];\n\nclass Demo26 extends Component {\n  handlerFilterRowsChange = (key, val) => {\n    console.log('准备构建AJAX请求，接收参数：key=', key, ' value=', val);\n  }\n  handlerFilterRowsDropChange = (key, val) => {\n    console.log('过滤条件类型:', key, val);\n  }\n  render() {\n    return <Table\n      onFilterRowsDropChange={this.handlerFilterRowsDropChange}//下拉条件的回调(key,val)=>()\n      onFilterRowsChange={this.handlerFilterRowsChange}//触发输入操作以及其他的回调(key,val)=>()\n      filterDelay={500}//输入文本多少ms触发回调函数，默认300ms\n      filterable={true}//是否开启过滤数据功能\n      bordered\n      columns={columns26}\n      data={data26} />;\n  }\n}\n\n","desc":" 可以根据输入项目以及判断条件对表格内的数据进行过滤"},{"example":<Demo27 />,"title":" 组合过滤和其他功能使用","code":"/**\n*\n* @title 组合过滤和其他功能使用\n* @description 在过滤数据行的基础上增加列拖拽、动态菜单显示、下拉条件动态传入自定义等\n*\n*/\n\n/**\n * @description \n */\n\nimport React, { Component } from 'react';\nimport { Table, Dropdown, Menu, Icon, Checkbox } from 'tinper-bee';\nimport multiSelect from \"tinper-bee/lib/MultiSelect\";;\nimport sort from \"tinper-bee/lib/sort\";;\n\n\nconst { Item } = Menu;\nconst SubMenu = Menu.SubMenu;\nconst MenuItemGroup = Menu.ItemGroup;\n\n\nconst dataList = [\n  { \"key\": \"1\", value: \"库存明细\", id: \"a\" },\n  { \"key\": \"2\", value: \"订单明细\", id: \"v\" },\n  { \"key\": \"3\", value: \"发货明细\", id: \"c\" }\n]\n\nconst data27 = [\n  {\n    key: \"1\",\n    name: \"John Brown\",\n    age: 32,\n    date: \"2018-09-19\",\n    address: \"朝阳区\",\n    mark: \"无\"\n  },\n  {\n    key: \"2\",\n    name: \"Jim Green\",\n    age: 40,\n    date: \"2018-09-18\",\n    address: \"朝阳区\",\n    mark: \"无\"\n  },\n  {\n    key: \"3\",\n    name: \"Jim Green\",\n    age: 40,\n    date: \"2018-09-18\",\n    address: \"东城区\",\n    mark: \"无\"\n  },\n  {\n    key: \"4\",\n    name: \"Jim Green\",\n    age: 40,\n    date: \"2018-09-18\",\n    address: \"东城区\",\n    mark: \"无\"\n  }, {\n    key: \"5\",\n    name: \"John Brown\",\n    age: 32,\n    date: \"2018-09-18\",\n    address: \"海淀区\",\n    mark: \"无\"\n  },\n  {\n    key: \"6\",\n    name: \"Jim Green\",\n    age: 48,\n    date: \"2018-09-18\",\n    address: \"海淀区\",\n    mark: \"无\"\n  },\n  {\n    key: \"7\",\n    name: \"Jim Green\",\n    age: 40,\n    date: \"2018-09-18\",\n    address: \"海淀区\",\n    mark: \"无\"\n  },\n  {\n    key: \"8\",\n    name: \"Jim Green\",\n    age: 38,\n    date: \"2018-09-18\",\n    address: \"海淀区\",\n    mark: \"无\"\n  }\n];\n\n\nconst MultiSelectTable = multiSelect(Table, Checkbox);\nconst ComplexTable = sort(MultiSelectTable, Icon);\nclass Demo27 extends Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      dropdownvalue: []\n    }\n  }\n  handlerFilterRowsChange = (key, val) => {\n    console.log('准备构建AJAX请求，接收参数：key=', key, ' value=', val);\n  }\n\n  handlerFilterRowsDropChange = (key, val) => {\n    console.log('过滤条件类型:', key, val);\n  }\n  getSelectedDataFunc = data => {\n    console.log(data);\n  }\n  onClick = (item) => {\n    console.log(item);\n  }\n\n  render() {\n    const menu1 = (\n      <Menu onClick={this.onClick} style={{ width: 240 }} mode=\"vertical\" >\n        <SubMenu key=\"sub1\" title={<span><span>组织 1</span></span>}>\n          <MenuItemGroup title=\"Item 1\">\n            <Menu.Item key=\"1\">选项 1</Menu.Item>\n            <Menu.Item key=\"2\">选项 2</Menu.Item>\n          </MenuItemGroup>\n          <MenuItemGroup title=\"Iteom 2\">\n            <Menu.Item key=\"3\">选项 3</Menu.Item>\n            <Menu.Item key=\"4\">选项 4</Menu.Item>\n          </MenuItemGroup>\n        </SubMenu>\n      </Menu>)\n    let multiObj = {\n      type: \"checkbox\"\n    };\n    let columns27 = [\n      {\n        title: \"\", width: 40, dataIndex: \"key\", key: \"key\", render: (text, record, index) => {\n          return <Dropdown\n            trigger={['click']}\n            overlay={menu1}\n            animation=\"slide-up\"\n          >\n            <Icon style={{ \"visibility\": \"hidden\" }} type=\"uf-eye\" />\n          </Dropdown>\n        }\n      },\n      {\n        title: \"姓名\",\n        width: 180,\n        dataIndex: \"name\",\n        key: \"name\",\n        filterType: \"text\",//输入框类型\n        filterDropdown: \"show\",//显示条件\n        filterDropdownType: \"string\"//字符条件\n      },\n      {\n        title: \"区间\",\n        width: 200,\n        dataIndex: \"mark\",\n        key: \"mark\",\n        filterType: \"number\",//输入框类型\n        filterDropdownType: \"number\"//数值类条件\n      },\n      {\n        title: \"年龄\",\n        width: 180,\n        sorter: (a, b) => a.age - b.age,\n        dataIndex: \"age\",\n        key: \"age\",\n        filterType: \"dropdown\",\n        filterDropdown: \"hide\",//不显示条件\n        filterDropdownAuto: \"manual\",//切换手动传入模式\n        filterDropdownData: this.state.dropdownvalue,\n        filterDropdownFocus: () => {\n          this.setState({\n            dropdownvalue: [{ key: \"自定义数据1\", value: \"1\" }, { key: \"自定义数据2\", value: \"2\" }]\n          });\n        }\n      },\n      { title: \"居住地址\", width: 150, dataIndex: \"address\", key: \"address\", filterType: \"dropdown\", filterDropdown: \"hide\" },\n    ];\n    return <ComplexTable\n      onFilterRowsDropChange={this.handlerFilterRowsDropChange}//下拉条件的回调(key,val)=>()\n      onFilterRowsChange={this.handlerFilterRowsChange}//触发输入操作以及其他的回调(key,val)=>()\n      filterDelay={500}//输入文本多少ms触发回调函数，默认300ms\n      filterable={true}//是否开启过滤数据功能\n      getSelectedDataFunc={this.getSelectedDataFunc}\n      bordered\n      multiSelect={multiObj}\n      columns={columns27}\n      data={data27} />;\n  }\n}\n\n","desc":" 在过滤数据行的基础上增加列拖拽、动态菜单显示、下拉条件动态传入自定义等"}]


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
