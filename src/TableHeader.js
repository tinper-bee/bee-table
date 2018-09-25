import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import { throttle, debounce } from 'throttle-debounce';
import { tryParseInt, ObjectAssign } from './utils';
import FilterType from './FilterType';

const propTypes = {
  clsPrefix: PropTypes.string,
  rowStyle: PropTypes.object,
  rows: PropTypes.array,
}

const grap = 16;//偏移数值

class TableHeader extends Component {

  constructor(props) {
    super(props);
    this.currentObj = null;
    this.state = {
      border: false
    }
    //拖拽宽度处理
    if (!props.dragborder) return;
    this.border = false;
    this.theadKey = new Date().getTime();
    this.drag = {
      initPageLeftX: 0,
      initLeft: 0,
      x: 0,
      width: 0,
    }
    // let _da = {};
    // Object.assign(_da,this.props.rows[0]);
    // this.drag.data = JSON.parse(JSON.stringify(this.props.rows[0]));
    // let a = this.props.rows[0];

    let _row = [];
    this.props.rows[0].forEach(item => {
      let newItem = item.key != "checkbox" ? ObjectAssign(item) : item;
      _row.push(newItem);
    });
    this.drag.data = _row;//JSON.parse(JSON.stringify(this.props.rows[0]));

  }
  static defaultProps = {
    contentWidthDiff: 0
  }

  shouldComponentUpdate(nextProps) {
    return !shallowequal(nextProps, this.props);
  }

  onDragStart = (event, data) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("Text", data.key);
    this.currentObj = data;
    event.dataTransfer.setDragImage(event.target, 0, 0);
    this.props.onDragStart(event, data);
  }

  onDragOver = (event, data) => {
    if (!this.currentObj || this.currentObj.key == data.key) return;
    event.preventDefault();
    this.props.onDragOver(event, data);
  }

  onDragEnter = (event, data) => {
    if (!this.currentObj || this.currentObj.key == data.key) return;
    this.props.onDragEnter(event, data);
  }

  onDrop = (event, data) => {
    if (!this.currentObj || this.currentObj.key == data.key) return;
    this.props.onDrop(event, data);
  }

  onMouseOver = (event, data) => {
    //如果是固定列没有拖拽功能
    if (this.border || data.fixed) return;
    const { clsPrefix } = this.props;
    event.target.className = `${clsPrefix}-thead-th-drag-gap th-drag-gap-hover`;
  }

  onMouseMove = (event, data) => {
    //如果是固定列没有拖拽功能
    if (this.border || data.fixed) return;
    // const {clsPrefix} = this.props; 
    // event.target.className = `${clsPrefix}-thead-th-drag-gap th-drag-gap-hover`;
  }
  onMouseOut = (event, data) => {
    if (this.border) return;
    const { clsPrefix } = this.props;
    event.target.className = `${clsPrefix}-thead-th-drag-gap th-drag-gap`;
  }
  onMouseDown = (event, data) => {
    this.border = true;
    const { clsPrefix, contentTable } = this.props;
    this.drag.initPageLeftX = event.pageX;
    this.drag.initLeft = tryParseInt(event.target.style.left);
    this.drag.x = this.drag.initLeft;
    this.drag.currIndex = this.props.rows[0].findIndex(da => da.key == data.key);
    this.drag.width = this.drag.data[this.drag.currIndex].width;
    let contentTableDom = document.getElementById("u-table-drag-thead-" + this.theadKey).parentNode;
    const styleWidth = contentTableDom.style.width;
    if (styleWidth && (typeof (styleWidth) == 'number' || styleWidth.includes('px'))) {
      this.contentTableWidth = parseInt(styleWidth);
    } else {
      this.contentTableWidth = parseInt(contentTableDom.scrollWidth)
    }
  }
  onMouseUp = (event, data) => {
    this.border = false;
    const { clsPrefix } = this.props;
    event.target.className = `${clsPrefix}-thead-th-drag-gap th-drag-gap`;
  }
  onThMouseUp = (event, data) => {
    this.border = false;
    const { clsPrefix } = this.props;
    let eventDom = event.target;
    let optDom;
    if (eventDom.classList.contains('.th-drag-gap-hover')) {

      optDom = eventDom;

    } else {
      optDom = eventDom.querySelector(`.${clsPrefix}-thead-th-drag-gap`);
    }
    if (optDom) {
      optDom.classList.remove('th-drag-gap-hover');
      optDom.classList.add('th-drag-gap');
    }


  }

  onThMouseMove = (event, data) => {
    if (!this.border) return;
    //固定表头拖拽

    const { dragborderKey, contentTable } = this.props;
    let x = (event.pageX - this.drag.initPageLeftX) + this.drag.initLeft - 0;
    let contentTableDom = document.getElementById("u-table-drag-thead-" + this.theadKey).parentNode;

    if (!this.contentTableWidth) {
      const styleWidth = contentTableDom.style.width;
      if (styleWidth && (typeof (styleWidth) == 'number' || styleWidth.includes('px'))) {
        this.contentTableWidth = parseInt(styleWidth);
      } else {
        this.contentTableWidth = parseInt(contentTableDom.scrollWidth)
      }
    }
    const newTableWidth = this.contentTableWidth + x;
    const newWidth = this.drag.width + x;
    if (newWidth < this.props.minColumnWidth) {
      //清楚样式
      let moveDom = event.target.querySelector('.th-drag-gap-hover');
      moveDom && moveDom.classList.remove('th-drag-gap-hover');
      // event.target.classList.remove('th-drag-gap-hover');
      return
    }
    //设置hiden的left
    //"u-table-drag-hide-table"
    let currentHideDom = document.getElementById("u-table-drag-hide-table-" + dragborderKey).getElementsByTagName("div")[this.drag.currIndex];
    currentHideDom.style.left = (this.drag.initPageLeftX + x - grap) + "px";

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
    let currentDom = document.getElementById("u-table-drag-thead-" + this.theadKey).getElementsByTagName("th")[this.drag.currIndex];
    currentDom.style.width = newWidth + "px";
    // this.contentTableWidth = newTableWidth;
    contentTableDom.style.width = newTableWidth + 'px';
    this.drag.x = x;
    //固定表头时，表头和表体分开，拖拽时表体的宽度也需要一起联动
    const siblingDom = contentTableDom.parentNode.nextElementSibling;
    if (siblingDom) {
      const bodyTableDom = siblingDom.querySelector('table')
      //2、是的话将表头对应的表格的宽度给表体对应的表格的宽度
      bodyTableDom.style.width = newTableWidth + 'px';
      //3、对应的col也要跟这变
      let colDomArr = bodyTableDom.querySelectorAll('colgroup col')
      colDomArr[this.drag.currIndex].style.width = newWidth + "px";
      //4、设置overflow属性

    }
  }

  /**
   * @description 过滤输入后的回调函数
   */
  handlerFilterTextChange = (key, val) => {
    let { onFilterRowsChange } = this.props;
    if (onFilterRowsChange) {
      onFilterRowsChange(key, val);
    }
  }
  /**
   * @description 过滤输入后的回调函数
   */
  handlerFilterDropChange = (key, val) => {
    let { onFilterRowsDropChange } = this.props;
    if (onFilterRowsDropChange) {
      onFilterRowsDropChange(key, val.key);
    }
  }
  /**
   * @description 过滤渲染的组件类型
   */
  filterRenderType = (type, dataIndex, index) => {
    const { clsPrefix, rows, filterDelay } = this.props;
    switch (type) {
      //文本输入
      case 'text':
        return <FilterType
          rendertype={type}
          clsPrefix={clsPrefix}
          className={`${clsPrefix} filter-text`}
          onChange={debounce(filterDelay || 300, this.handlerFilterTextChange.bind(this, dataIndex))}
          onSelectDropdown={this.handlerFilterDropChange.bind(this, dataIndex)}
          filterDropdown={rows[1][index]['filterdropdown']}
        />
      //下拉框选择
      case 'dropdown':
        let selectDataSource = [];
        if (rows.length > 0) {
          let hash = {};
          //处理下拉重复对象组装dropdown
          selectDataSource = Array.from(rows[1][0].datasource, x => ({ key: x[dataIndex], value: x[dataIndex] }));
          selectDataSource = selectDataSource.reduceRight((item, next) => {
            hash[next.key] ? '' : hash[next.key] = true && item.push(next);
            return item
          }, []);
        }
        return <FilterType
          rendertype={type}
          className={`${clsPrefix} filter-dropdown`}
          data={selectDataSource}
          onChange={this.handlerFilterTextChange.bind(this, dataIndex)}
          onSelectDropdown={this.handlerFilterDropChange.bind(this, dataIndex)}
          filterDropdown={rows[1][index]['filterdropdown']}
        />
      //日期
      case 'date':
        return <FilterType
          rendertype={type}
          className={`${clsPrefix} filter-date`}
          onClick={() => { }}
          onChange={this.handlerFilterTextChange.bind(this, dataIndex)}
          onSelectDropdown={this.handlerFilterDropChange.bind(this, dataIndex)}
          filterDropdown={rows[1][index]['filterdropdown']}
        />
      default:
        //不匹配类型默认文本输入
        return <div></div>
    }
  }

  render() {
    const { clsPrefix, rowStyle, onDragStart, onDragOver, onDrop, draggable, rows, filterable, onFilterRowsChange,
      onMouseDown, onMouseMove, onMouseUp, dragborder, onMouseOut, contentWidthDiff, fixed, lastShowIndex
    } = this.props;
    let attr = dragborder ? { id: `u-table-drag-thead-${this.theadKey}` } : {}
    return (
      <thead className={`${clsPrefix}-thead`} {...attr}>
        {
          rows.map((row, index) => (
            <tr key={index} style={rowStyle}>
              {row.map((da, i, arr) => {
                let thHover = da.drgHover ? ` ${clsPrefix}-thead th-drag-hover` : "";
                delete da.drgHover;
                let fixedStyle = '';
                if (!fixed && da.fixed) {
                  fixedStyle = `${clsPrefix}-row-fixed-columns-in-body`;
                }
                if (lastShowIndex == i) {
                  da.width = parseInt(da.width) + contentWidthDiff;
                }
                if (draggable) {
                  return (<th {...da}
                    onDragStart={(event) => { this.onDragStart(event, da) }}
                    onDragOver={(event) => { this.onDragOver(event, da) }}
                    onDrop={(event) => { this.onDrop(event, da) }}
                    onDragEnter={(event) => { this.onDragEnter(event, da) }}
                    draggable={draggable}
                    className={`${da.className} ${clsPrefix}-thead th-drag ${thHover} ${fixedStyle}`}
                    key={da.key} />)
                } else if (dragborder) {

                  return (<th
                    style={{ width: da.width }}
                    onMouseMove={(event) => { this.onThMouseMove(event, da) }}
                    onMouseUp={(event) => { this.onThMouseUp(event, da) }}
                    className={`${da.className} ${clsPrefix}-thead-th  ${fixedStyle}`}
                    key={i} >
                    {da.children}
                    <div ref={el => this.gap = el}
                      onMouseMove={(event) => { this.onMouseMove(event, da) }}
                      onMouseOut={(event) => { this.onMouseOut(event, da) }}
                      onMouseDown={(event) => { this.onMouseDown(event, da) }}
                      onMouseUp={(event) => { this.onMouseUp(event, da) }}
                      onMouseOver={(event) => { this.onMouseOver(event, da) }}
                      className={`${clsPrefix}-thead-th-drag-gap `}></div>
                  </th>)
                } else {
                  let th;
                  if (filterable && index == rows.length - 1) {
                    da.children = this.filterRenderType(da['filtertype'], da.dataindex, i);
                    th = <th {...da} key={i} className={` ${fixedStyle}`} />;
                  } else {
                    th = da.onClick ? (<th {...da} className={` ${fixedStyle}`} key={i} onClick={(event) => { da.onClick(da, event) }} />) : (<th {...da} key={i} className={` ${fixedStyle}`} />);
                  }
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
