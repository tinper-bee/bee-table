import React, { Component } from "react";
import PropTypes from "prop-types";
import shallowequal from "shallowequal";
import { throttle, debounce } from "throttle-debounce";
import { tryParseInt, ObjectAssign } from "./utils";
import FilterType from "./FilterType";

const propTypes = {
  clsPrefix: PropTypes.string,
  rowStyle: PropTypes.object,
  rows: PropTypes.array
};

const grap = 16; //偏移数值

class TableHeader extends Component {
  constructor(props) {
    super(props);
    this.currentObj = null;
    this.state = {
      border: false,
      dragAbleOrBord:props.draggable?"able":"",  //border 拖拽列宽，able 交换列,
      dragAbleOrBordStart:"",    // borderStart 开始拖拽宽度 ableStart 开始交换列

      // draggable:props.draggable?props.draggable:false,
    };
    //拖拽宽度处理
    if (!props.dragborder) return;
    this.border = false;
    this.theadKey = new Date().getTime();
    this.drag = {
      initPageLeftX: 0,
      initLeft: 0,
      x: 0,
      width: 0
    };
    // let _da = {};
    // Object.assign(_da,this.props.rows[0]);
    // this.drag.data = JSON.parse(JSON.stringify(this.props.rows[0]));
    // let a = this.props.rows[0];

    let _row = [];
    this.props.rows[0] &&
      this.props.rows[0].forEach(item => {
        let newItem = item.key != "checkbox" ? ObjectAssign(item) : item;
        _row.push(newItem);
      });
    this.drag.data = _row; //JSON.parse(JSON.stringify(this.props.rows[0]));
  }
  static defaultProps = {
    contentWidthDiff: 0
  };

  componentWillReceiveProps(nextProps){
    if(this.props.draggable != nextProps.draggable){
      this.setState({
        dragAbleOrBord:nextProps.draggable?"able":"",  //border 拖拽列宽，able 交换列
        // draggable:nextProps.draggable,
      })
    }

    if(this.props.dragborder != nextProps.dragborder){
      this.setState({
        dragAbleOrBord:nextProps.dragborder?"border":"",  //border 拖拽列宽，able 交换列
      })
    }
  }

  // shouldComponentUpdate(nextProps) {
  //   return !shallowequal(nextProps, this.props);
  // }

  onDragStart = (event, data) => { 
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("Text", data.key);
    this.currentObj = data;
    event.dataTransfer.setDragImage(event.target, 0, 0);
    this.props.onDragStart(event, data);
  };

  onDragOver = (event, data) => {
    const {dragAbleOrBordStart} = this.state;
    this.setState({
      dragAbleOrBordStart:""
    })
    if (!this.currentObj || this.currentObj.key == data.key) return;
    event.preventDefault();
    this.props.onDragOver(event, data);
  };

  onDragEnter = (event, data) => {
    if (!this.currentObj || this.currentObj.key == data.key) return;
    this.props.onDragEnter(event, data);
  };

  onDrop = (event, data) => {
    if (!this.currentObj || this.currentObj.key == data.key) return;
    this.props.onDrop(event, data);
  };

  onMouseOver = (event, data) => {
    //如果是固定列没有拖拽功能
    if (this.border || data.fixed) return;
    const { clsPrefix } = this.props;
    if(event.target.id != 'th-online'){
      event.target.className = `${clsPrefix}-thead-th-drag-gap th-drag-gap-hover`;
    }
  };

  ableOnMouseMove = (event, data) => {
    let {dragAbleOrBord} = this.state;
    if(dragAbleOrBord === "borderStart" || dragAbleOrBord === "ableStart")return;
    if(dragAbleOrBord === "able")return;
    this.setState({
      dragAbleOrBord:"able"
    })
  };

  onMouseMove = (event, data) => {
    let {dragAbleOrBord} = this.state;
    if(dragAbleOrBord === "borderStart" || dragAbleOrBord === "ableStart")return;
    if(dragAbleOrBord != "border"){
      this.setState({
        dragAbleOrBord:"border"
      })
    }
    //如果是固定列没有拖拽功能
    if (this.border || data.fixed) return;
    // const {clsPrefix} = this.props;
    // event.target.className = `${clsPrefix}-thead-th-drag-gap th-drag-gap-hover`;
  };
  onMouseOut = (event, data) => {
    if (this.border) return;
    const { clsPrefix } = this.props;
    if(event.target.id != 'th-online'){
      event.target.className = `${clsPrefix}-thead-th-drag-gap th-drag-gap`; 
    }
  };
  onMouseDown = (event, data) => {
    let {dragAbleOrBord,dragAbleOrBordStart} = this.state;
    this.setState({
      dragAbleOrBordStart:dragAbleOrBord==="border"?"borderStart":"",
    })
    // console.log("-改变宽-----度--",dragAbleOrBordStart);
    this.border = true;
    const { clsPrefix, contentTable } = this.props;
    this.drag.initPageLeftX = event.pageX;
    this.drag.initLeft = tryParseInt(event.target.style.left);
    this.drag.x = this.drag.initLeft;
    this.drag.currIndex = this.props.rows[0].findIndex(
      da => da.key == data.key
    );

    let contentTableDom = document.getElementById(
      "u-table-drag-thead-" + this.theadKey
    ).parentNode;
    const styleWidth = contentTableDom.style.width;
    if (
      styleWidth &&
      (typeof styleWidth == "number" || styleWidth.includes("px"))
    ) {
      this.contentTableWidth = parseInt(styleWidth);
    } else {
      this.contentTableWidth = parseInt(contentTableDom.scrollWidth);
    }
    const dragColWidth = this.drag.data[this.drag.currIndex].width;
    if (typeof dragColWidth == "string" && dragColWidth.indexOf("%") > -1) {
      this.drag.width = (this.contentTableWidth * parseInt(dragColWidth)) / 100;
    } else {
      this.drag.width = parseInt(this.drag.data[this.drag.currIndex].width);
    }
  };
  onMouseUp = (event, data) => {
    this.setState({
      dragAbleOrBordStart:""
    })
    this.border = false;
    const { clsPrefix } = this.props;
    event.target.className = `${clsPrefix}-thead-th-drag-gap th-drag-gap`;
  };
  onThMouseUp = (event, data) => {
    this.border = false;
    const { clsPrefix, rows,columns } = this.props;
    let eventDom = event.target;
    let optDom;
    if (eventDom.classList.contains(".th-drag-gap-hover")) {
      optDom = eventDom;
    } else {
      optDom = eventDom.querySelector(`.${clsPrefix}-thead-th-drag-gap`);
    }
    if (optDom) {
      optDom.classList.remove("th-drag-gap-hover");
      optDom.classList.add("th-drag-gap");
    }
    // columns[this.drag.currIndex].width = data.width;
    //宽度拖拽后，增加回调函数，外部可以记录宽度
    if (
      typeof this.props.afterDragColWidth == "function" &&
      rows &&
      rows[0] &&
      this.drag.currIndex
    ) {
      this.props.afterDragColWidth(rows[0],this.drag.currIndex);
    }
  };

  onThMouseMove = (event, data) => {
    if (!this.border) return;
    //固定表头拖拽
  
    const { dragborderKey, contentTable,headerScroll ,contentDomWidth,scrollbarWidth,bordered,rows} = this.props;
    let x = event.pageX - this.drag.initPageLeftX + this.drag.initLeft - 0;
    let contentTableDom = document.getElementById(
      "u-table-drag-thead-" + this.theadKey
    ).parentNode;

    if (!this.contentTableWidth) {
      const styleWidth = contentTableDom.style.width;
      if (
        styleWidth &&
        (typeof styleWidth == "number" || styleWidth.includes("px"))
      ) {
        this.contentTableWidth = parseInt(styleWidth);
      } else {
        this.contentTableWidth = parseInt(contentTableDom.scrollWidth);
      }
    }
    const newTableWidth = this.contentTableWidth + x;
    const newWidth = this.drag.width + x;
    if (newWidth < this.props.minColumnWidth) {
      //清楚样式
      let moveDom = event.target.querySelector(".th-drag-gap-hover");
      moveDom && moveDom.classList.remove("th-drag-gap-hover");
      // event.target.classList.remove('th-drag-gap-hover');
      return;
    }
    //设置hiden的left
    //"u-table-drag-hide-table"
    let currentHideDom = document
      .getElementById("u-table-drag-hide-table-" + dragborderKey)
      .getElementsByTagName("div")[this.drag.currIndex];
    currentHideDom.style.left = this.drag.initPageLeftX + x - grap + "px";

    //获取最小宽度，不让拖动
    // let minWidth = 0;
    // for(let i=0;i<=this.drag.currIndex;i++){
    //   minWidth += this.drag.data[i].width;
    // }

    // //判断最小值后在赋值 todo
    // let currLeft = this.drag.initPageLeftX+x-grap;
    // console.log("currLeft minWidth ",currLeft + " "+minWidth);
    // if(currLeft <= minWidth){
    //   return;
    // }
    // currentHideDom.style.left =  currLeft+"px";

    //设置当前的宽度
    let currentData = this.drag.data[this.drag.currIndex];
    currentData.width = newWidth;
    let currentDom = document
      .getElementById("u-table-drag-thead-" + this.theadKey)
      .getElementsByTagName("th")[this.drag.currIndex];
    currentDom.style.width = newWidth + "px";
    // this.contentTableWidth = newTableWidth;
    contentTableDom.style.width = newTableWidth + "px";
    // data.width = newWidth;
    rows[0][this.drag.currIndex].width = newWidth;
    this.drag.x = x;
    let contentColDomArr = contentTableDom.querySelectorAll("colgroup col");
    contentColDomArr[this.drag.currIndex].style.width = newWidth + "px";
    //固定表头时，表头和表体分开，拖拽时表体的宽度也需要一起联动
    const siblingDom = contentTableDom.parentNode.nextElementSibling;
    if (siblingDom) {
      const bodyTableDom = siblingDom.querySelector("table");
      //2、是的话将表头对应的表格的宽度给表体对应的表格的宽度
      bodyTableDom.style.width = newTableWidth + "px";
      //3、对应的col也要跟这变
      let colDomArr = bodyTableDom.querySelectorAll("colgroup col");
      colDomArr[this.drag.currIndex].style.width = newWidth + "px";
      //4、设置overflow属性
    }

    //表头需要显示滚动条时，需兼容含有固定列
    if(headerScroll){

      let showScroll =  contentDomWidth - newTableWidth - scrollbarWidth ;
      if(bordered){
        showScroll = showScroll -1;
      }
      const fixedLeftTable = contentTable.querySelector('.u-table-fixed-left .u-table-header') ;
      const fixedRightTable = contentTable.querySelector('.u-table-fixed-rigth .u-table-header');
      const contentTableHeader  = contentTable.querySelector('.u-table-scroll .u-table-header');
      if(showScroll < 0){
        //找到固定列表格，设置表头的marginBottom值为scrollbarWidth;
        contentTableHeader.style.overflowX = 'scroll';
        fixedLeftTable && (fixedLeftTable.style.marginBottom = scrollbarWidth + "px");
        fixedRightTable && (fixedRightTable.style.marginBottom = scrollbarWidth + "px");
      }else{
        contentTableHeader.style.overflowX = 'hidden';
        fixedLeftTable && (fixedLeftTable.style.marginBottom = '0px');
        fixedRightTable && (fixedRightTable.style.marginBottom = '0px');
      }
    }
  };

  
  /**
   * 过滤输入后或下拉条件的回调函数
   */
  handlerFilterChange = (key, value, condition) => {
    let { onFilterChange } = this.props;
    if (onFilterChange) {
      onFilterChange(key, value, condition);
    }
  };

  /**
   * 过滤行清除回调
   */
  handlerFilterClear = (field) => {
    let { onFilterClear } = this.props;
    if (onFilterClear) {
      onFilterClear(field);
    }
  }

  /**
   * 过滤渲染的组件类型
   */
  filterRenderType = (type, dataIndex, index) => {
    const { clsPrefix, rows, filterDelay, locale } = this.props;
    switch (type) {
      //文本输入
      case "text":
        return (
          <FilterType
            locale={locale}//多语
            rendertype={type}//渲染类型
            clsPrefix={clsPrefix}//css前缀
            className={`${clsPrefix} filter-text`}
            dataIndex={dataIndex}//字段
            onFilterChange={this.handlerFilterChange}//输入框回调
            onFilterClear={this.handlerFilterClear}//清除回调
            filterDropdown={rows[1][index]["filterdropdown"]}//是否显示下拉条件
            filterDropdownType={rows[1][index]["filterdropdowntype"]}//下拉的条件类型为string,number
          />
        );
      //数值输入
      case "number":
        return (
          <FilterType
            locale={locale}
            rendertype={type}
            clsPrefix={clsPrefix}
            className={`${clsPrefix} filter-text`}
            dataIndex={dataIndex}//字段
            onFilterChange={debounce(filterDelay || 300, this.handlerFilterChange)}//输入框回调并且函数防抖动
            onFilterClear={this.handlerFilterClear}//清除回调
            filterDropdown={rows[1][index]["filterdropdown"]}
            filterDropdownType={rows[1][index]["filterdropdowntype"]}//下拉的条件类型为string,number
          />
        );
      //下拉框选择
      case "dropdown":
        let selectDataSource = [];
        //处理没有输入数据源的时候，系统自动查找自带的数据筛选后注入
        if (rows.length > 0 && (rows[1][index]["filterdropdownauto"] || "auto") == "auto") {
          let hash = {};
          //处理下拉重复对象组装dropdown
          selectDataSource = Array.from(rows[1][0].datasource, x => ({
            key: x[dataIndex],
            value: x[dataIndex]
          }));
          selectDataSource = selectDataSource.reduceRight((item, next) => {
            hash[next.key] ? "" : (hash[next.key] = true && item.push(next));
            return item;
          }, []);
        } else {
          //从外部数据源加载系统数据
          selectDataSource = rows[1][index]["filterdropdowndata"];
        }
        return (
          <FilterType
            locale={locale}
            rendertype={type}
            className={`${clsPrefix} filter-dropdown`}
            data={selectDataSource}
            dataIndex={dataIndex}//字段
            onFilterChange={this.handlerFilterChange}//输入框回调
            onFilterClear={this.handlerFilterClear}//清除回调
            filterDropdown={rows[1][index]["filterdropdown"]}
            onFocus={rows[1][index]["filterdropdownfocus"]}
            filterDropdownType={rows[1][index]["filterdropdowntype"]}//下拉的条件类型为string,number
          />
        );
      //日期
      case "date":
        return (
          <FilterType
            locale={locale}
            rendertype={type}
            className={`filter-date`}
            onClick={() => { }}
            format={rows[1][index]["format"] || "YYYY-MM-DD"}
            dataIndex={dataIndex}//字段
            onFilterChange={this.handlerFilterChange}//输入框回调
            onFilterClear={this.handlerFilterClear}//清除回调
            filterDropdown={rows[1][index]["filterdropdown"]}
            filterDropdownType={rows[1][index]["filterdropdowntype"]}//下拉的条件类型为string,number
          />
        );
      //日期范围
      case "daterange":
        return (
          <FilterType
            locale={locale}
            rendertype={type}
            className={`filter-date`}
            onClick={() => { }}
            format={rows[1][index]["format"] || "YYYY-MM-DD"}
            dataIndex={dataIndex}//字段
            onFilterChange={this.handlerFilterChange}//输入框回调
            onFilterClear={this.handlerFilterClear}//清除回调
            filterDropdown={rows[1][index]["filterdropdown"]}
            filterDropdownType={rows[1][index]["filterdropdowntype"]}//下拉的条件类型为string,number
          />
        );
      default:
        //不匹配类型默认文本输入
        return <div />;
    }
  };


  render() {
    const {dragAbleOrBord,dragAbleOrBordStart} = this.state;
    const {
      clsPrefix,
      rowStyle,
      onDragStart,
      onDragOver,
      onDrop,
      draggable,
      dragborder,
      rows,
      filterable,
      onFilterRowsChange,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseOut,
      contentWidthDiff,
      fixed,
      lastShowIndex,
      contentTable
    } = this.props;
    let attr = dragborder ? { id: `u-table-drag-thead-${this.theadKey}` } : {};

    return (
      <thead className={`${clsPrefix}-thead`} {...attr}>
        {rows.map((row, index) => (
          <tr key={index} style={rowStyle} className={(filterable && index == rows.length - 1)?'filterable':''}>
            {row.map((da, i, arr) => {
              let thHover = da.drgHover
                ? ` ${clsPrefix}-thead th-drag-hover`
                : "";
              delete da.drgHover;
              let fixedStyle = "";
              let canDotDrag = "";
              if (!fixed && da.fixed) {
                fixedStyle = `${clsPrefix}-row-fixed-columns-in-body`;
              }
           
              if (lastShowIndex == i) {
                canDotDrag = "th-can-not-drag";
              }
              if (filterable && index == rows.length - 1) {
                da.children = this.filterRenderType(
                  da["filtertype"],
                  da.dataindex,
                  i
                );
                delete da.filterdropdownfocus;
              }

              let thAbleObj = {},thBorObj = {},thDefaultObj = {},thLineObj = {};
              let thClassName = `${da.className}`;
              if (draggable || dragborder) {
                if (draggable && dragAbleOrBordStart != "borderStart") {
                  thAbleObj = {
                    ...da,
                    onDragStart:(e)=>{this.onDragStart(e, da)},
                    onDragOver:(e)=>{this.onDragOver(e, da)},
                    onDrop:(e)=>{this.onDrop(e, da)},
                    onDragEnter:(e)=>{this.onDragEnter(e, da)},
                    onMouseMove:(e)=>{this.ableOnMouseMove(e, da)},
                    onMouseDown:(e)=>{
                      //避免表头其他元素对其影响
                      const filterDom = contentTable.querySelector('.filterable');
                     //是否是过滤行元素，是的话不触发
                      const isFilterDom =filterDom ?filterDom.contains(e.target):false;
                      
                      if(e.target.classList.contains('uf') ||isFilterDom){
                        return;
                      }
                      if(e.target.classList.contains('uf')){
                        return;
                      }
                      let {dragAbleOrBord,dragAbleOrBordStart} = this.state;
                      this.setState({
                        dragAbleOrBordStart:dragAbleOrBord==="able"?"ableStart":""
                      })
                    }, 
                    draggable:draggable,
                    // className:thObj.className+`${clsPrefix}-thead th-drag ${thHover}`,
                    key:da.key
                  };
                  thClassName += `${clsPrefix}-thead th-drag ${thHover} `;
                }
                // if (dragborder && dragAbleOrBord === "border") {
                if (dragborder && dragAbleOrBordStart != "ableStart") {
                  thBorObj.style={'width': da.width }
                  // thObj.className= thObj.className+`${clsPrefix}-thead-th ${canDotDrag}`,
                  thBorObj.onMouseMove = (e)=>{ 
                    if(draggable){
                      this.ableOnMouseMove(e, da)
                    }
                    this.onThMouseMove(e, da)
                  }
                  thBorObj.onMouseUp = (e)=>{this.onThMouseUp(e, da)}

                  thClassName += `${clsPrefix}-thead-th ${canDotDrag}`;
                  thBorObj.style= { width: da.width }
                  // key:i
                }
                // thObj.className = thObj.className+`${fixedStyle}`;
                thClassName += `${fixedStyle}`;
                if(!da.fixed){
                  thLineObj = {
                    onMouseMove:(e)=>{ e.stopPropagation();this.onMouseMove(e, da)},
                    onMouseOut:(e)=>{this.onMouseOut(e, da)},
                    onMouseDown:(e)=>{ e.stopPropagation();this.onMouseDown(e, da)},
                    onMouseUp:(e)=>{this.onMouseUp(e, da)},
                    onMouseOver:(e)=>{this.onMouseOver(e, da)},
                    // className:`${clsPrefix}-thead-th-drag-gap th-drag-gap`,
                  };
                  if(dragAbleOrBordStart !== 'ableStart'){
                    thLineObj.className = `${clsPrefix}-thead-th-drag-gap th-drag-gap`;
                  }
                }
                return (<th key={Math.random()+new Date().getTime()} {...thAbleObj} {...thBorObj} className={thClassName}  >
                  {da.children}
                  {
                    da.fixed ? "":<div ref={el => (this.gap = el)}  {...thLineObj}  ><div id='th-online' className='online' /></div>
                  }
                </th>)
              }else{
                thDefaultObj = {
                  ...da,
                  className:`${da.className} ${fixedStyle}`,
                  key:i
                };
                da.onClick ?thDefaultObj.onClick = (e)=>{da.onClick(da, e)}:"";
                return (<th {...thDefaultObj} />)
              }
            })}
          </tr>
        ))}
      </thead>
    );
  }
}

TableHeader.propTypes = propTypes;

export default TableHeader;
