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
    if(this.border)return; 
    const {clsPrefix} = this.props;
    if(this.border){
      let x = (event.pageX - this.drag.initPageLeftX) + this.drag.initLeft;
    }else{
      event.target.className = `${clsPrefix}-thead-th-drag-gap th-drag-gap-hover`;
    }
  }

  onMouseOut=(event,data)=>{
    if(this.border)return;
    const {clsPrefix} = this.props;
    event.target.className = `${clsPrefix}-thead-th-drag-gap th-drag-gap`;
  }
 
  onMouseDown=(event,data)=>{
    this.border = true;
    const {clsPrefix} = this.props;
    event.target.className = `${clsPrefix}-thead-th-drag-gap th-drag-gap-hover`;
    
    this.drag.initPageLeftX = event.pageX;
    this.drag.initLeft = tryParseInt(event.target.style.left);
    this.drag.x = this.drag.initLeft;
  }

  onMouseUp=(event,data)=>{
    this.border = false;
    const {clsPrefix} = this.props;
    event.target.className = `${clsPrefix}-thead-th-drag-gap th-drag-gap`;
    let endx = (event.pageX-this.dragBorderObj.initPageLeftX);
    // event.target.offsetWidth
  }
 
  render() {
    const { clsPrefix, rowStyle ,onDragStart,onDragOver,onDrop,draggable,rows,
      onMouseDown,onMouseMove,onMouseUp,dragborder,onMouseOut
      } = this.props;
    return (
      <thead className={`${clsPrefix}-thead`}>
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
