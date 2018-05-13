import React, { Component } from "react";
import Icon from "bee-icon"; 
import ReactDOM from 'react-dom';
import {sortBy} from './util';
/**
 * 参数: 列拖拽
 * @param {*} Table
 */
 
export default function dragColumn(Table) {

  return class dragColumn extends Component {

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
    }

    onDragOver=(event,data)=>{
     
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
      })
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
    }
 
    getTarget=(evt)=>{
        return evt.target || evt.srcElement;
    }

    render() {
      const {data,dragborder,draggable,className} = this.props;
      let key = new Date().getTime();
      const {columns} = this.state;
      return (<Table {...this.props} columns={columns} data={data} className={`${className} u-table-drag-border`}
          onDragStart={this.onDragStart} onDragOver={this.onDragOver} onDrop={this.onDrop} 
          onDragEnter={this.onDragEnter}
          draggable={draggable}
      
          dragborder={true}
          dragborderKey={key}
          />)
    }
  };
}