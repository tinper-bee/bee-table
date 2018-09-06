import React, { Component } from "react";
import {compare} from './util';
import {ObjectAssign} from './util';
/**
 * 参数: 列拖拽
 * @param {*} Table
 */
// 0、定义一个拖拽dom
// 1、当移动到表头可以显示当前操作列的move图标。
//  2、添加start、move事件、drop事件
export default function dragWidthColumn(Table) {

  return class DragWidthColumn extends Component {

    constructor(props) {
      super(props);
      this.state = {
        columns:this.setColumOrderByIndex(props.columns)
      };
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.columns != this.props.columns){
        this.setState({
          columns:this.setColumOrderByIndex(nextProps.columns)
        })
      }
    }
 
    setColumOrderByIndex = (_column)=>{
      _column.forEach((da,i) => {
          da.dragIndex = i;
          da.drgHover = false;
      });
      return _column; 
    }


    onDragStart=(event,data)=>{
      if(this.props.onDragStart){
        this.props.onDragStart(event,data)
      }
    }

    onDragOver=(event,data)=>{
      if(this.props.onDragOver){
       this.props.onDragOver(event,data)
      }
    }

    onDragEnter=(event,data)=>{
     
    }

    onDrop=(event,data)=>{
    
    }
 
    getTarget=(evt)=>{
        return evt.target || evt.srcElement;
    }

    render() {
      const {
          data,
          dragborder,
          draggable,
          className,
          columns,
          onDragStart,
          onDragEnter,
          onDragOver,
          onDrop,
          ...others
      } = this.props;
      let key = new Date().getTime();
      return (
          <Table
              {...others}
              columns={this.state.columns}
              data={data}
              className={`${className} u-table-drag-border`}
              onDragStart={this.onDragWidthStart}
              onDragOver={this.onDragWidthOver}
              onDrop={this.onDropWidth}
              onDragEnter={this.onDragWidthEnter}
              draggable={draggable}
              // dragborder={dragborder}
              dragborder={false}
              dragborderKey={key}
          />)
    }
  };
}