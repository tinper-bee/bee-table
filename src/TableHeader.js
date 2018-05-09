import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';

const propTypes = {
    clsPrefix: PropTypes.string,
    rowStyle: PropTypes.object,
    rows: PropTypes.array,
}

class TableHeader extends Component{

  constructor(props){
    super(props);
    this.currentObj = null;
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
  
  render() {
    const { clsPrefix, rowStyle ,onDragStart,onDragOver,onDrop,draggable,rows} = this.props;
    return (
      <thead className={`${clsPrefix}-thead`}>
        {
          rows.map((row, index) => (
            <tr key={index} style={rowStyle}>
              {row.map((da, i) => {
                let thHover =  da.drgHover?` ${clsPrefix}-thead th-drag-hover`:"";
                return draggable?(
                <th
                  onDragStart={(event)=>{this.onDragStart(event,da)}} 
                  onDragOver={(event)=>{this.onDragOver(event,da)}}
                  onDrop={(event)=>{this.onDrop(event,da)}} 
                  onDragEnter={(event)=>{this.onDragEnter(event,da)}}
                  draggable={draggable}
                  className={`${da.className} ${clsPrefix}-thead th-drag ${thHover}`}
                  key={i}
                  >{da.children}</th>):(<th {...da} key={i} />);
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
