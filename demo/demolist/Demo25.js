/**
*
* @title 根据列进行过滤、拖拽综合使用案例
* @description 根据列进行过滤、拖拽综合使用案例
*
*/

import React, { Component } from 'react';
import Table from '../../src';
import multiSelect from '../../src/lib/newMultiSelect';
import filterColumn from '../../src/lib/filterColumn';
import dragColumn from "../../src/lib/dragColumn";

import sum from '../../src/lib/sum';
import Icon from "bee-icon";
import Checkbox from 'bee-checkbox';
import Popover from 'bee-popover';

const columns25 = [
  {
    title: "名字",
    dataIndex: "a",
    key: "a",
    width: 100,
    fixed: "left"
  },
  {
    title: "性别",
    dataIndex: "b",
    key: "b",
    width: 100
  },
  {
    title: "年龄",
    dataIndex: "c",
    key: "c",
    width: 100,
    sumCol: true,
    sorter: (a, b) => a.c - b.c
  },
  {
    title: "年龄1",
    dataIndex: "c1",
    key: "c1",
    width: 100,
    sumCol: true,
    sorter: (a, b) => a.c - b.c
  },
  {
    title: "年龄2",
    dataIndex: "c2",
    key: "c2",
    width: 100,
    sumCol: true,
    sorter: (a, b) => a.c - b.c
  },
  {
    title: "武功级别",
    dataIndex: "d",
    width: 100,
    key: "d",
   
  },
  {
    title: "操作",
    dataIndex: "e",
    key: "e",
    fixed: "right",
    width: 100,
    render(text, record, index) {
      return (
        <div style={{position: 'relative'}} title={text} >
            <a
                href="#"
                tooltip={text}
                onClick={() => {
                  alert('这是第'+index+'列，内容为:'+text);
                }}
                style={{
                    position: 'absolute',
                    top: 5,
                    left: 0
                }}
              >
                操作
              </a>
        </div>
      );
    }
  }
];

const data25 = [
  { a: "杨过rrrrr", b: "男", c: 30, c1: 30, c2: 30,d:'内行',e: "操作", key: "2" },
  { a: "令狐冲", b: "男", c: 41, c1: 30, c2: 30,d:'大侠',e: "操作", key: "1" },
  { a: "郭靖", b: "男", c: 25, c1: 30, c2: 30,d:'大侠',e: "操作", key: "3" }
];

// const FilterColumnTable = filterColumn(Table, Popover);
// const MultiSelectTable = multiSelect(Table, Checkbox);
// let ComplexTable = multiSelect(Table, Checkbox);

// const DragColumnTable = multiSelect(Table, Checkbox);
const DragColumnTable = dragColumn(filterColumn(multiSelect(Table, Checkbox), Popover)); 
// const DragColumnTable = dragColumn(filterColumn(Table, Popover));

const defaultProps25 = {
  prefixCls: "bee-table"
};

class Demo25 extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return <DragColumnTable columns={columns25} data={data25} 
    bordered
    dragborder={true}
    scroll={{x:700}}
    multiSelect={{type: "checkbox"}}
    />;
  }
}
Demo25.defaultProps = defaultProps25;


export default Demo25;