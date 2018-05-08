import React, { Component } from "react";
import Icon from "bee-icon"; 
import Checkbox from "bee-checkbox";
import ReactDOM from 'react-dom';
import Popover from 'bee-popover';
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
      });
      this.state = {
        columns:_column
      };
    }


    onDragStart=(event,data)=>{
      event.dataTransfer.setData("Text",data.key);
    }

    onDragOver=(event)=>{
      event.preventDefault();
    }

    onDrop=(event,data)=>{
      let {columns} = this.state;
      const id = event.dataTransfer.getData("Text");
      let objIndex =  columns.findIndex((_da,i)=>_da.key == id);
      let targetIndex = columns.findIndex((_da,i)=>_da.key == data.key);

      columns.forEach((da,i)=>{
        if(da.key == id){//obj
          da.dragIndex = targetIndex
        }
        if(da.key == data.key){//targetObj
          da.dragIndex = objIndex
        }
      });
     let _columns = sortBy(columns,(da)=>da.dragIndex);
      console.log("_columns--",_columns);
      this.setState({
        columns:_columns
      })
    }

    render() {
      const {data} = this.props;
      const {columns} = this.state;

      return (<Table {...this.props} columns={columns} data={data} 
          onDragStart={this.onDragStart} onDragOver={this.onDragOver} onDrop={this.onDrop} draggable={true} 
      />)
    }
  };
}