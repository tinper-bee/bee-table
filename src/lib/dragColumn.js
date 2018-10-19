import React, { Component } from "react";
import {compare,ObjectAssign} from './util';
/**
 * 参数: 列拖拽
 * @param {*} Table
 */
 
export default function dragColumn(Table) {

  return class DragColumn extends Component {

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
      if(data.key == "checkbox")return;
      const {columns:_columns} = this.state;
      let columns = [];
      Object.assign(columns,_columns);
      columns.forEach((da)=>da.drgHover = false)
      let current = columns.find((da)=>da.key == data.key);
      if(current.fixed)return;
      current.drgHover = true;
      this.setState({
        columns
      });
      if(this.props.onDragEnter){
        this.props.onDragEnter(event,data);
      }
    }

    onDrop=(event,data)=>{
      if(data.key == "checkbox")return;
      let {columns} = this.state;
      const id = event.dataTransfer.getData("Text");
      let objIndex =  columns.findIndex((_da,i)=>_da.key == id);
      let targetIndex = columns.findIndex((_da,i)=>_da.key == data.key);
      if(columns[objIndex].fixed)return;//固定列不让拖拽
      if(columns[targetIndex].fixed)return;//固定列不让拖拽
      columns.forEach((da,i)=>{
        da.drgHover = false;
        if(da.key == id){//obj
          da.dragIndex = targetIndex
        }
        if(da.key == data.key){//targetObj
          da.dragIndex = objIndex;
        }
      });
     let _columns =  columns.sort(compare('dragIndex'));
      this.setState({
        columns:_columns.slice()
      });
      if(this.props.onDrop){
        this.props.onDrop(event,data,columns);
      }
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
              onDragStart={this.onDragStart}
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
              onDragEnter={this.onDragEnter}
              draggable={draggable}
              dragborder={dragborder}
              // dragborder={false}
              dragborderKey={key}
          />)
    }
  };
}