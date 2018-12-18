/**
*
* @title 组合过滤和其他功能使用
* @description 在过滤数据行的基础上增加列拖拽、动态菜单显示、下拉条件动态传入自定义等
*
*/

/**
 * @description 
 */

import React, { Component } from 'react';
import Table from '../../src';
import multiSelect from '../../src/lib/MultiSelect';
import sort from '../../src/lib/sort';
import Checkbox from 'bee-checkbox';
import Icon from 'bee-icon';
import Menu from 'bee-menus';
import Dropdown from 'bee-dropdown';


const { Item } = Menu;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const dataList = [
  { "key": "1", value: "库存明细", id: "a" },
  { "key": "2", value: "订单明细", id: "v" },
  { "key": "3", value: "发货明细", id: "c" }
]

const data27 = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    date: "2018-09-19",
    address: "朝阳区",
    mark: "无"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 40,
    date: "2018-09-18",
    address: "朝阳区",
    mark: "无"
  },
  {
    key: "3",
    name: "Jim Green",
    age: 40,
    date: "2018-09-18",
    address: "东城区",
    mark: "无"
  },
  {
    key: "4",
    name: "Jim Green",
    age: 40,
    date: "2018-09-18",
    address: "东城区",
    mark: "无"
  }, {
    key: "5",
    name: "John Brown",
    age: 32,
    date: "2018-09-18",
    address: "海淀区",
    mark: "无"
  },
  {
    key: "6",
    name: "Jim Green",
    age: 48,
    date: "2018-09-18",
    address: "海淀区",
    mark: "无"
  },
  {
    key: "7",
    name: "Jim Green",
    age: 40,
    date: "2018-09-18",
    address: "海淀区",
    mark: "无"
  },
  {
    key: "8",
    name: "Jim Green",
    age: 38,
    date: "2018-09-18",
    address: "海淀区",
    mark: "无"
  }
];


const MultiSelectTable = multiSelect(Table, Checkbox);
const ComplexTable = sort(MultiSelectTable, Icon);
class Demo27 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownvalue: []
    }
  }
  handlerFilterChange = (key, val, condition) => {
    console.log('参数：key=', key, ' value=', val, 'condition=', condition);
  }

  handlerFilterClear = (key) => {
    console.log('清除条件', key);
  }
  getSelectedDataFunc = data => {
    console.log(data);
  }
  onClick = (item) => {
    console.log(item);
  }

  render() {
    const menu1 = (
      <Menu onClick={this.onClick} style={{ width: 240 }} mode="vertical" >
        <SubMenu key="sub1" title={<span><span>组织 1</span></span>}>
          <MenuItemGroup title="Item 1">
            <Menu.Item key="1">选项 1</Menu.Item>
            <Menu.Item key="2">选项 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Iteom 2">
            <Menu.Item key="3">选项 3</Menu.Item>
            <Menu.Item key="4">选项 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      </Menu>)
    let multiObj = {
      type: "checkbox"
    };
    let columns27 = [
      {
        title: "", width: 40, dataIndex: "key", key: "key", render: (text, record, index) => {
          return <Dropdown
            trigger={['click']}
            overlay={menu1}
            animation="slide-up"
          >
            <Icon style={{ "visibility": "hidden" }} type="uf-eye" />
          </Dropdown>
        }
      },
      {
        title: "姓名",
        width: 180,
        dataIndex: "name",
        key: "name",
        filterType: "text",//输入框类型
        filterDropdown: "show",//显示条件
        filterDropdownType: "string"//字符条件
      },
      {
        title: "年龄",
        width: 180,
        dataIndex: "age",
        key: "age",
        filterType: "number",//输入框类型
        filterDropdown: "show",//显示条件
        filterDropdownType: "number"//字符条件
      },
      {
        title: "日期",
        width: 190,
        dataIndex: "date",
        key: "date",
        filterType: "date",//输入框类型
        filterDropdown: "show",//显示条件
        filterDropdownType: "string"//字符条件
      },
      {
        title: "时间范围",
        width: 290,
        dataIndex: "mark",
        key: "mark",
        filterType: "daterange",//输入框类型
        filterDropdown: "show",//显示条件
        filterDropdownType: "number"//字符条件
      },
      {
        title: "地址",
        width: 100,
        dataIndex: "address",
        key: "address",
        filterType: "dropdown",//输入框类型
        filterDropdown: "show",//显示条件
        filterDropdownType: "number"//字符条件
      }
    ];
    return <ComplexTable
      onFilterChange={this.handlerFilterChange}//下拉条件的回调(key,val)=>()
      onFilterClear={this.handlerFilterClear}//触发输入操作以及其他的回调(key,val)=>()
      filterDelay={500}//输入文本多少ms触发回调函数，默认500ms
      filterable={true}//是否开启过滤数据功能
      getSelectedDataFunc={this.getSelectedDataFunc}
      bordered
      multiSelect={multiObj}
      columns={columns27}
      data={data27} />;
  }
}

export default Demo27;