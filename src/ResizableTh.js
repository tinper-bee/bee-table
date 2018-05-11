import React, { Component } from "react";
import Icon from "bee-icon"; 
import Checkbox from "bee-checkbox";
import ReactDOM from 'react-dom';
import Popover from 'bee-popover';
import {sortBy} from './util';


class ResizableTh extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width:0
    }
  }

 

  componentWillReceiveProps(nextProps){
    if(nextProps.columns != this.props.columns){
      
    }
  }
  

  onMouseDown=(event,data)=>{
    this.mouse = true;
    console.log(event.screenX);
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
    console.log("currObj.width--",currObj.width);
    this.setState({
      columns
    });
  }

  getTarget=(evt)=>{
      return evt.target || evt.srcElement;
  }

  onMouseUp=(event,data)=>{
    let endx = (event.screenX-this.dragBorderObj.startScreenX);
    console.log("onmouseup-",endx);
    this.mouse = false;
    
  }

  render() {
    const {className} = this.props;

    return (<th {...this.props} className={`${className} u-table-drag-border`}
        // onDragStart={this.onDragStart} onDragOver={this.onDragOver} onDrop={this.onDrop} 
        // onDragEnter={this.onDragEnter}
        // draggable={draggable}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
    />)
  } 
}