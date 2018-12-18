import React, { Component } from "react";
import PropTypes from 'prop-types';

const propTypes = {
    rowsInView: PropTypes.number.isRequired,
}
const defaultProps = {
    data: undefined,
    height: 40,//默认行高
    rowsInView:25
}

export default function bigData(Table) {
  return class BigData extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentIndex: 0,
        scrollLeft: 0,
        scrollTop: 0
      };

      this.cachedRowHeight = [];
      this.lastScrollTop = 0;
    }
    /**
     *获取数据区高度 
     * 
     * 
    **/

    getContentHeight() {
      if (!this.props.data) return 0;
      return this.getSumHeight(0, this.props.data.length);
    }

    getSumHeight(start, end) {
      const { rowHeight } = this.props;
      let height = 0;
      for (let i = start; i < end; i++) {
        height += this.cachedRowHeight[i] || rowHeight;
      }
      return height;
    }

    getData(){
        
    }
    render(){
        return <Table {...this.props}  data={this.getData}/>
    }
  };
  BigData.defaultProps = defaultProps;
  BigData.propTypes = propTypes;
}
