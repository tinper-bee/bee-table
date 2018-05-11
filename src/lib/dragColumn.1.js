import React, { Component } from "react";
import Icon from "bee-icon"; 
import Checkbox from "bee-checkbox";
import ReactDOM from 'react-dom';
import Popover from 'bee-popover';
import {sortBy} from './util';
import createColResizable from '../resiztable'
// import Table from './Table';
/**
 * 参数: 列拖拽
 * @param {*} Table
 */
 
export default function dragColumn(Table) {

  return class dragColumn extends Component {

    constructor(props) {
      super(props);
      const {columns} = props; 
      this.dragBorderObj = {startScreenX:0,endScreenX:0};
      this.mouse = false;
      this.setColumOrderByIndex(columns);
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.columns != this.props.columns){
        this.setColumOrderByIndex();
      }
    }

    componentDidMount() {
      const domElemTableList = document.querySelectorAll('table');
       createColResizable(domElemTableList[0], {
        liveDrag: true
      });
      createColResizable(domElemTableList[1], {
        liveDrag: false,
        headerOnly: false
      });
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

    onMouseDown=(event,data)=>{
      this.mouse = true; 
      this.dragBorderObj.startScreenX = event.screenX;
    }
    onMouseMove=(event,data)=>{
      if(!this.mouse)return;
      let endx = (event.screenX-this.dragBorderObj.startScreenX);
      let {columns:_columns} = this.state;
      let columns = [];
      Object.assign(columns,_columns); 
      // let currentIndex = columns.findIndex((_da,i)=>_da.key == data.key);
      // currentIndex = currentIndex==0?currentIndex:(currentIndex-1);

      let currObj =  columns.find((_da,i)=>_da.key == data.key);
      if(!currObj)return;
      currObj.width = currObj.width?(currObj.width+endx):endx; 
      this.setState({
        columns
      });
    }

    getTarget=(evt)=>{
        return evt.target || evt.srcElement;
    }

    onMouseUp=(event,data)=>{
      let endx = (event.screenX-this.dragBorderObj.startScreenX); 
      this.mouse = false;
      
    }

    render() {
      const {data,dragborder,draggable,className} = this.props;
      const {columns} = this.state;

      
      return (<Table {...this.props} columns={columns} data={data} className={`${className} u-table-drag-border`}
          onDragStart={this.onDragStart} onDragOver={this.onDragOver} onDrop={this.onDrop} 
          onDragEnter={this.onDragEnter}
          draggable={draggable}

          dragborder={true}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
      />)
    }
  };
}