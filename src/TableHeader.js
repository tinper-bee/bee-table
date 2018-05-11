import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import {tryParseInt} from './utils';
// import ResizableTh from './ResizableTh';

const propTypes = {
    clsPrefix: PropTypes.string,
    rowStyle: PropTypes.object,
    rows: PropTypes.array,
}

class TableHeader extends Component{

  constructor(props){
    super(props);
    this.currentObj = null;
    this.border = false;
    this.drag = {
      initPageLeftX:0,
      initLeft:0,
      x:0
    }
    this.state = {
      border:false
    }
  }

  shouldComponentUpdate(nextProps) {
    return !shallowequal(nextProps, this.props);
  }

  onDragStart=(event,data)=>{
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("Text",data.key);
    this.currentObj = data;
    event.dataTransfer.setDragImage(event.target, 0, 0);
    this.props.onDragStart(event,data);
  }
  
  onDragOver=(event,data)=>{
    if(this.currentObj.key == data.key)return;
    event.preventDefault();
    this.props.onDragOver(event,data);
  }

  onDragEnter=(event,data)=>{
    if(this.currentObj.key == data.key)return;
    this.props.onDragEnter(event,data);
  }

  onDrop=(event,data)=>{
    if(this.currentObj.key == data.key)return;
    this.props.onDrop(event,data);
  }


  onMouseMove=(event,data)=>{
    console.log("onMouseMove----" ,this.border);
    if(this.border)return; 
    const {clsPrefix} = this.props;
    // if(this.border){
    //   console.log("xxxx-------000");
    //   let x = (event.pageX - this.drag.initPageLeftX) + this.drag.initLeft;
    //   console.log("xxxx-------" ,x);
    // }else{
      event.target.className = `${clsPrefix}-thead-th-drag-gap th-drag-gap-hover`;
    // }
  }
  onMouseOut=(event,data)=>{
    if(this.border)return;
    const {clsPrefix} = this.props;
    event.target.className = `${clsPrefix}-thead-th-drag-gap th-drag-gap`;
  }
  onMouseDown=(event,data)=>{
    this.border = true;
    const {clsPrefix} = this.props;
    // event.target.className = `${clsPrefix}-thead-th-drag-gap th-drag-gap-hover`;
    
    this.drag.initPageLeftX = event.pageX;
    this.drag.initLeft = tryParseInt(event.target.style.left);
    this.drag.x = this.drag.initLeft;
    this.drag.currIndex = this.props.rows[0].findIndex(da=>da.key==data.key);
    console.log("--onThMouseMove---"+this.border);
  }
  onMouseUp=(event,data)=>{
    this.border = false;
    const {clsPrefix} = this.props;
    event.target.className = `${clsPrefix}-thead-th-drag-gap th-drag-gap`;
  }
  onThMouseUp=(event,data)=>{
    this.border = false;
    const {clsPrefix} = this.props;
    // event.target.className = `${clsPrefix}-thead-th-drag-gap th-drag-gap`;
  }
   
  onThMouseMove=(event,data)=>{ 
    if(!this.border)return;
    let x = (event.pageX - this.drag.initPageLeftX) + this.drag.initLeft-0;
    //设置hiden的left
    let currentHideDom = document.getElementById("u-table-drag-hide-table").getElementsByTagName("div")[this.drag.currIndex];
    currentHideDom.style.left =  (this.drag.initPageLeftX+x-15)+"px";
    //设置当前的宽度
    // event.target.style.width = (data.width+x)+"px";
    let  currentDom = document.getElementById("u-table-drag-thead").getElementsByTagName("th")[this.drag.currIndex];
    currentDom.style.width = (data.width+x)+"px";
    //设置他的后一个的宽度
    let  currentLastDom = document.getElementById("u-table-drag-thead").getElementsByTagName("div")[this.drag.currIndex+1];
    let _x = x<0?(-1*x):x;
    currentLastDom.style.left =  (this.drag.initPageLeftX+x)+"px";
  }
 
  render() {
    const { clsPrefix, rowStyle ,onDragStart,onDragOver,onDrop,draggable,rows,
      onMouseDown,onMouseMove,onMouseUp,dragborder,onMouseOut
      } = this.props;
    return (
      <thead className={`${clsPrefix}-thead`} id="u-table-drag-thead">
        {
          rows.map((row, index) => (
            <tr key={index} style={rowStyle}>
              {row.map((da, i) => {
                let thHover =  da.drgHover?` ${clsPrefix}-thead th-drag-hover`:""; 
                delete da.drgHover;
                if(draggable){
                  return ( <th {...da}
                    onDragStart={(event)=>{this.onDragStart(event,da)}} 
                    onDragOver={(event)=>{this.onDragOver(event,da)}}
                    onDrop={(event)=>{this.onDrop(event,da)}} 
                    onDragEnter={(event)=>{this.onDragEnter(event,da)}}
                    draggable={draggable}
                    className={`${da.className} ${clsPrefix}-thead th-drag ${thHover}`}
                    key={da.key} />)
                }else if(dragborder){
                    return(<th
                      // onDragStart={(event)=>{this.onDragGapStart(event,da)}} 
                      // onDragOver={(event)=>{this.onDragGapOver(event,da)}}
                      // onDrop={(event)=>{this.onDropGap(event,da)}} 
                      // onDragEnter={(event)=>{this.onDragGapEnter(event,da)}}

                    // onMouseDown={(event)=>{onMouseDown(event,da)}}
                    style={{width:da.width}}
                    onMouseMove={(event)=>{this.onThMouseMove(event,da)}}
                    onMouseUp={(event)=>{this.onThMouseUp(event,da)}} 
                    // onMouseUp={(event)=>{onMouseUp(event,da)}}
                    // {...da}
                    className={`${da.className} ${clsPrefix}-thead-th `}
                    key={i} >
                      {da.children}
                    <div ref={el=>this.gap = el }
                      onMouseMove={(event)=>{this.onMouseMove(event,da)}}
                      onMouseOut={(event)=>{this.onMouseOut(event,da)}}
                      onMouseDown={(event)=>{this.onMouseDown(event,da)}}
                      onMouseUp={(event)=>{this.onMouseUp(event,da)}} 
                      className={`${clsPrefix}-thead-th-drag-gap `}></div>
                    </th>)
                }else{
                  let th = da.onClick?(<th {...da} key={i} onClick={(event)=>{da.onClick(da,event)}}/>):(<th {...da} key={i} />);
                  return (th);
                }
            })}
            </tr>
          ))
        }
      </thead>
    );
  }
};

TableHeader.propTypes = propTypes;

export default TableHeader;
