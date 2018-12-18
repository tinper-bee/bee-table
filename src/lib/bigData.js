import React, { Component } from "react";
import PropTypes from "prop-types";


const defaultHeight = 40;
export default function bigData(Table) {
  return class BigData extends Component {
    
    static  defaultProps = {
        data: undefined,
        // height: 40, //默认行高
    };

    constructor(props) {
      super(props);
      this.state = {
        currentIndex: 0,
        scrollLeft: 0,
        scrollTop: 0
      };
      const rowHeight = this.props.height?this.props.height:defaultHeight
      //默认显示25条，rowsInView根据定高算的。在非固定高下，这个只是一个大概的值。
      this.rowsInView = this.props.scroll.y?Math.ceil(this.props.scroll.y/rowHeight):25 ;
      this.cachedRowHeight = [];
      this.lastScrollTop = 0;

      this.setRowHeight = this.setRowHeight.bind(this);
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
      const { height } = this.props;
      const rowHeight = height?height:defaultHeight;
      let sumHeight = 0;
      for (let i = start; i < end; i++) {
        sumHeight += this.cachedRowHeight[i] || rowHeight;
      }
      return sumHeight;
    }

    // getIndex(scrollTop = this.state.scrollTop) {
    //     const { data } = this.props
    //     const {rowsInView} = this;
    //     const max = data.length
    //     const mcf = scrollTop > 0.5 ? Math.ceil : Math.floor
    //     let index = mcf((scrollTop * max) - (rowsInView * scrollTop))
    //     if (index > max - rowsInView) index = max - rowsInView
    //     if (index < 0) index = 0
    //     return index
    // }


    // getLastRowHeight = (index) =>{
    //     const { height, data } = this.props
    //     const {rowsInView} = this;
    //     if (index + rowsInView >= data.length) return 0

    //     let lastRowHeight = 0
    //     if (index >= 1 && index < data.length / 2) {
    //     lastRowHeight = this.cachedRowHeight[index - 1] || height
    //     }
    //     return lastRowHeight
    // }
    handleScroll = (scrollTop)=> {
        console.log('scrollTop----'+scrollTop)
        const {data,height} = this.props;
        const rowHeight = height?height:defaultHeight;
        const {rowsInView} = this;
        const {currentIndex} = this.state;
        let index = 0;
        let temp = scrollTop;
        while (temp > 0) {
          temp -= this.cachedRowHeight[index] || rowHeight
          if(temp > 0){
            index += 1
          }
        }
  
        // offset last row
        // index -= 1
        console.log(index);
  
        if (data.length - rowsInView < index) index = data.length - rowsInView
        if (index < 0) index = 0
        
        if(currentIndex !== index){
            this.setState({ currentIndex: index ,scrollTop:scrollTop})
        }
       
    }
    
    setRowHeight(height, index) {
        this.cachedRowHeight[index] = height
    }
    render() {
      const { data } = this.props;
      const { currentIndex,scrollTop } = this.state;
      const {rowsInView} = this;
      const lazyLoad = {
        preHeight: this.getSumHeight(0, currentIndex),
        sufHeight: this.getSumHeight(currentIndex + rowsInView , data.length),
        currentIndex:currentIndex
      };

      return (
        <Table
          {...this.props}
          data={data.slice(currentIndex, currentIndex + rowsInView)}
          lazyLoad={lazyLoad}
          handleScroll={this.handleScroll}
          scrollTop={scrollTop}
          setRowHeight={this.setRowHeight}
        //   className={'lazy-table'}
        />
      );
    }
  };

}
