import React, { Component } from "react";


const defaultHeight = 40;
const rowDiff = 3;//行差值

export default function bigData(Table) {
  return class BigData extends Component {
    
    static  defaultProps = {
        data: []
    };
    constructor(props) {
      super(props);
      this.state = {
        scrollLeft: 0,
        scrollTop: 0
      };
      const rowHeight = this.props.height?this.props.height:defaultHeight
      //默认显示25条，rowsInView根据定高算的。在非固定高下，这个只是一个大概的值。
      this.rowsInView =  this.props.scroll.y?Math.ceil(this.props.scroll.y/rowHeight):25 ;
      this.currentIndex = 0;
      this.loadCount = 30;//一次加载多少数据
      this.cachedRowHeight = [];//缓存每行的高度
      this.lastScrollTop = 0;
      this.startIndex = this.currentIndex;//数据开始位置
      this.endIndex = this.currentIndex + this.loadCount//数据结束位置 
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

    handleScroll = (nextScrollTop)=> {
        const _this = this;
        
        const {data,height,scroll={}} = _this.props;
        const rowHeight = height?height:defaultHeight;
        const {currentIndex = 0 ,loadCount,scrollTop} = _this;
        let {endIndex,startIndex} = _this;
        const {needRender} = _this.state;
        let index = 0;//记录下次当前位置
        let temp = nextScrollTop ;
        const viewHeight = parseInt(scroll.y);
        const isOrder = nextScrollTop > scrollTop?true:false;//true为向下滚动、false为向上滚动
        //根据scrollTop计算下次当前索引的位置
        while (temp > 0) {
          temp -= this.cachedRowHeight[index] || rowHeight
          if(temp > 0){
            index += 1
          }
        }
       
        // if (data.length - loadCount < index) index = data.length - loadCount
        if (index < 0) index = 0
        
        //如果之前的索引和下一次的不一样则重置索引和滚动的位置
        if(currentIndex !== index){
            _this.currentIndex = index;
            _this.scrollTop = nextScrollTop;
            let rowsInView = 0 ; //可视区域显示多少行
            let rowsHeight = 0; //可视区域内容高度

            //如果可视区域中需要展示的数据已经在缓存中则不重现render。
            if(viewHeight){
               //有时滚动过快时this.cachedRowHeight[rowsInView + index]为undifined
                while(rowsHeight < viewHeight && this.cachedRowHeight[rowsInView + index] ){
                    rowsHeight += this.cachedRowHeight[rowsInView + index];
                    rowsInView++;
                } 
                // 如果rowsInView 小于 缓存的数据则重新render 
                // 向下滚动 下临界值超出缓存的endIndex则重新渲染
                if(rowsInView+index > endIndex - rowDiff && isOrder){
                
                    this.startIndex = index;
                    endIndex = this.startIndex  + loadCount
                    if(endIndex > data.length){
                        endIndex = data.length 
                    }
                    this.endIndex = endIndex;
                    this.setState({needRender: !needRender });
                }
                // 向上滚动，当前的index是否已经加载（currentIndex），若干上临界值小于startIndex则重新渲染
                if(!isOrder && index < startIndex + rowDiff){
                    startIndex = index - this.loadCount/2;
                    if(startIndex<0){
                        startIndex = 0;
                    }
                    this.startIndex = startIndex;
                    this.endIndex = this.startIndex  + loadCount
                    this.setState({needRender: !needRender });
                }
            }
            console.log('**index**'+index,"**startIndex**"+this.startIndex,"**endIndex**"+this.endIndex);
        }
       
    }
    
    setRowHeight(height, index) {
        this.cachedRowHeight[index] = height
    }
    render() {
      const { data } = this.props;
      const { scrollTop } = this;
      const {endIndex,startIndex} = this;
      const lazyLoad = {
        preHeight: this.getSumHeight(0, startIndex),
        sufHeight: this.getSumHeight(endIndex , data.length),
        startIndex:startIndex
      };
      return (
        <Table
          {...this.props}
          data={data.slice(startIndex, endIndex)}
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
