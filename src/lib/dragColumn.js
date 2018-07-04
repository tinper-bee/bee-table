import React, { Component } from "react";
import {sortBy} from './util';
/**
 * 参数: 列拖拽
 * @param {*} Table
 */
 
export default function dragColumn(Table) {

  return class DragColumn extends Component {

    constructor(props) {
      super(props);
      const {columns} = props;
      this.setColumOrderByIndex(columns);
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.columns != this.props.columns){
        this.setColumOrderByIndex();
      }
    }
 
    setColumOrderByIndex = (columns)=>{
      let _column = [];
      Object.assign(_column,columns); 
      _column.forEach((da,i) => {
          da.dragIndex = i;
          da.drgHover = false;
      });
      this.state = {
        columns:_column
      };
    }


    onDragStart=(event,data)=>{
      this.props.onDragStart(event,data)
    }

    onDragOver=(event,data)=>{
     this.props.onDragOver(event,data)
    }

    onDragEnter=(event,data)=>{
      const {columns:_columns} = this.state;
      let columns = [];
      Object.assign(columns,_columns);
      columns.forEach((da)=>da.drgHover = false)
      let current = columns.find((da)=>da.key == data.key);
      current.drgHover = true;
      this.setState({
        columns
      });
      this.props.onDragEnter(event,data);
    }

    onDrop=(event,data)=>{
      let {columns} = this.state;
      const id = event.dataTransfer.getData("Text");
      let objIndex =  columns.findIndex((_da,i)=>_da.key == id);
      let targetIndex = columns.findIndex((_da,i)=>_da.key == data.key);

      columns.forEach((da,i)=>{
        da.drgHover = false;
        if(da.key == id){//obj
          da.dragIndex = targetIndex
        }
        if(da.key == data.key){//targetObj
          da.dragIndex = objIndex;
        }
      });
     let _columns = sortBy(columns,(da)=>da.dragIndex);
      this.setState({
        columns:_columns,
      });
      this.props.onDrop(event,data);
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
              // dragborder={dragborder}
              dragborder={false}
              dragborderKey={key}
          />)
    }
  };
}