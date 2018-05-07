import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import { DragSource } from 'react-dnd';

const propTypes = {
    clsPrefix: PropTypes.string,
    rowStyle: PropTypes.object,
    rows: PropTypes.array,
}

class TableHeader extends Component{
  constructor(props){
    super(props);

    this.drag = {};
    drag.ondragstart = this.ondragstart;
    drag.ondragenter = this.ondragenter;
    drag.ondragover = this.ondragover;
  }
  shouldComponentUpdate(nextProps) {
    return !shallowequal(nextProps, this.props);
  }

  ondragstart=()=>{
    console.log();
  }

  ondragenter=()=>{

  }

  ondragover=()=>{

  }

  
  render() {
    const { clsPrefix, rowStyle, rows } = this.props;
    return (
      <thead className={`${clsPrefix}-thead`}>
        {
          rows.map((row, index) => (
            <tr key={index} style={rowStyle}>
              {row.map((cellProps, i) => (<th {...this.drag} draggable="true" {...cellProps} key={i} />))}
            </tr>
          ))
        }
      </thead>
    );
  }
};

TableHeader.propTypes = propTypes;

export default TableHeader;
