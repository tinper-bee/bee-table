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
  }

  shouldComponentUpdate(nextProps) {
    return !shallowequal(nextProps, this.props);
  }
 
  render() {
    const { clsPrefix, rowStyle ,onDragStart,onDragOver,onDrop,draggable,rows} = this.props;
    return (
      <thead className={`${clsPrefix}-thead`}>
        {
          rows.map((row, index) => (
            <tr key={index} style={rowStyle}>
              {row.map((da, i) => {
                return draggable?(<th 
                  onDragStart={(event)=>{this.props.onDragStart(event,da)}} onDragOver={this.props.onDragOver} onDrop={(event)=>{this.props.onDrop(event,da)}} draggable={draggable}
                {...da} key={i} />):(<th {...da} key={i} />);
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
