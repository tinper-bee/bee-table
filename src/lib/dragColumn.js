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

    recursion(obj, data={}){
        for(key in obj){
            if( typeof obj[key] == 'object' && Object.keys(obj[key].length>0 )){
                data[key] = recursion(obj[key])
            }else{
                data[key] = obj[key]
            }
        }
        return data
    }

    onDrop=(event,data)=>{
      let {dragSource,dragTarg} = data;
      let {columns} = this.state; 
      let sourceIndex = -1,targetIndex = -1;
       
      sourceIndex =  columns.findIndex((da,i)=>da.key == dragSource.key);
      targetIndex = columns.findIndex((da,i)=>da.key == dragTarg.key);
      // 向前移动
     if(targetIndex < sourceIndex){
      targetIndex = targetIndex + 1;
     }
      columns.splice(
        targetIndex,
        0,
       columns.splice(sourceIndex, 1)[0]
      );
      let _newColumns = [];
      columns.forEach((da,i)=>{
        let newDate = Object.assign(da,{});
        newDate.title = da.title;
        _newColumns.push(newDate);
      });
      // console.log(" onDrop-------columns--- ",columns);
      this.setState({
        columns:_newColumns//cloneDeep(columns)
      });
      // console.log(" onDrop-------columns--- ",_newColumns);
      // console.log(columns === _newColumns);
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
          />)
    }
  };
}