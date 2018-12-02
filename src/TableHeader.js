import React, { Component } from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import shallowequal from "shallowequal";
import { throttle, debounce } from "throttle-debounce";
import { tryParseInt, ObjectAssign ,Event} from "./utils";
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
    //拖拽宽度处理
    if (!props.dragborder) return;
    this.border = false;
    this.theadKey = new Date().getTime();
    this.drag = {
      initPageLeftX: 0,
      initLeft: 0,
      x: 0,
      width: 0,
      option:''
    };
    this.table = null;
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
 
  /**
   * 动态绑定th line 事件
   * type 为false 为增加事件
   * eventSource 为false 给 th 内部的div增加事件
   */
  thEventListen(events,type,eventSource){
    let {ths,cols} = this.table;
    for (let index = 0; index < ths.length; index++) {
      const element = ths[index];//.getAttribute('data-type');
      if(!element.getAttribute('data-th-fixed')){
        const colLine =  element.children.length > 1?element.lastElementChild:element.children[0];
        // const colLine = element.children[0];
        for (let i = 0; i < events.length; i++) {
          const _event = events[i];
          let _dataSource = eventSource?element:colLine;
          if(type === "remove"){
            _dataSource.removeEventListener(_event.key,_event.fun);  
          }else{
            _dataSource.addEventListener(_event.key,_event.fun);
          }
        }
      }
    }
  }

 
  bodyEventListen(events,type){
    for (let i = 0; i < events.length; i++) {
      const _event = events[i];
      if(type == "remove"){
        document.removeEventListener(_event.key,_event.fun);  
      }else{
        document.addEventListener(_event.key,_event.fun);
      }
    }
  }

  componentDidUpdate(){
    this.initTable(); 
    this.initEvent();
  }

  componentDidMount(){
    this.initTable();
    this.initEvent();
  } 
  
  /**
   * 拖拽列宽的事件处理
   */
  initEvent(){
    let  events = [
      {key:'mouseup', fun:this.onLineMouseUp},
      {key:'mousemove', fun:this.onLineMouseMove}
    ];

    if(this.props.dragborder){
      this.thEventListen(events,'',true);//表示把事件添加到th元素上
      this.thEventListen([{key:'mousedown',fun:this.onLineMouseDown}]);//表示把事件添加到竖线
      this.bodyEventListen([{key:'mouseup',fun:this.bodyonLineMouseMove}]);
    }
    if(!this.props.draggable)return;
    //拖拽交换列事件
    this.thEventListen([{key:'mousedown',fun:this.dragAbleMouseDown}],'',true);//表示把事件添加到竖线
  }

  /**
   * 移除拖拽宽度的事件
   */
  removeDragBorderEvent(){
    let  events = [
      {key:'mouseup', fun:this.onLineMouseUp},
      {key:'mousemove', fun:this.onLineMouseMove}
    ];
    this.thEventListen(events,'remove',true);//表示把事件添加到th元素上
    this.thEventListen([{key:'mousedown',fun:this.onLineMouseDown}],'remove');//表示把事件添加到竖线
    this.bodyEventListen([{key:'mouseup',fun:this.bodyonLineMouseMove}],'remove');
  }

  /**
   * 获取table的属性存放在this.table 中。(公用方法)
   */
  initTable(){
    if(!this.props.dragborder && !this.props.draggable)return;
    let el = ReactDOM.findDOMNode(this);
    let tableDome = el.parentNode;
    let table = {};
    if(tableDome && tableDome.nodeName && tableDome.nodeName.toUpperCase() == "TABLE"){
      table.table = tableDome;
      table.cols = tableDome.getElementsByTagName("col");
      table.ths = tableDome.getElementsByTagName("th");
    }
    this.table = table;

    if(!this.props.dragborder)return;
    if(document.getElementById("u-table-drag-thead-" + this.theadKey)){
        //hao 固定列table
      this.fixedTable = {};
      let _fixedParentContext =  document.getElementById("u-table-drag-thead-" + this.theadKey).parentNode;
      let siblingDom = _fixedParentContext.parentNode.nextElementSibling;
      if (siblingDom) {
        let fixedTable = siblingDom.querySelector("table"); 
        this.fixedTable.table = fixedTable
        this.fixedTable.cols = fixedTable.getElementsByTagName("col");
        // this.fixedTable.ths = fixedTable.tableDome.getElementsByTagName("th");
      }
    }
  }

  //---拖拽列宽代码逻辑----start-----
  onLineMouseMove = (e) => {
      const { clsPrefix ,dragborder,contentDomWidth,scrollbarWidth,contentTable,headerScroll} = this.props;
      Event.stopPropagation(e); 
      let event = Event.getEvent(e);
      if (!this.props.dragborder) return;
      if(this.drag.option != "border"){
        return false;
      }
      //移动改变宽度
      let currentCols = this.table.cols[this.drag.currIndex];
      let diff = (event.x - this.drag.oldLeft); 
      let newWidth = this.drag.oldWidth + diff;
      if(newWidth > this.drag.minWidth){
        currentCols.style.width = newWidth +'px';
        //hao 支持固定表头拖拽 修改表体的width
        if(this.fixedTable.cols){
            this.fixedTable.cols[this.drag.currIndex].style.width = newWidth + "px";
        }
        
        //表头滚动条处理
        if(headerScroll){
            let oldTableWidth = parseInt(this.table.table.style.width ?this.table.table.style.width:this.table.table.scrollWidth);
            const newTableWidth = oldTableWidth + diff ;
            this.table.table.style.width  = newTableWidth;//改变table的width

            let showScroll =  contentDomWidth - newTableWidth - scrollbarWidth ;
            // if(bordered){
            //     showScroll = showScroll -1;
            // }
            const fixedLeftHeaderTable = contentTable.querySelector('.u-table-fixed-left .u-table-header') ;
            const fixedRighHeadertTable = contentTable.querySelector('.u-table-fixed-right .u-table-header');
            const contentTableHeader  = contentTable.querySelector('.u-table-scroll .u-table-header');
            if(showScroll < 0){
                //找到固定列表格，设置表头的marginBottom值为scrollbarWidth;
                contentTableHeader.style.overflowX = 'scroll';
                fixedLeftHeaderTable && (fixedLeftHeaderTable.style.marginBottom = scrollbarWidth + "px");
                fixedRighHeadertTable && (fixedRighHeadertTable.style.marginBottom = scrollbarWidth + "px");
            }else{
                contentTableHeader.style.overflowX = 'hidden';
                fixedLeftHeaderTable && (fixedLeftHeaderTable.style.marginBottom = '0px');
                fixedRighHeadertTable && (fixedRighHeadertTable.style.marginBottom = '0px');
            }
        }
        
      }
      
      
  };

  onLineMouseDown = (e) => {
    Event.stopPropagation(e); 
    let event = Event.getEvent(e);
    const { clsPrefix, contentTable } = this.props;
    if (!this.props.dragborder) return;
    let currentIndex = parseInt(Event.getTarget(event).getAttribute("data-line-index"));
    let defaultWidth = Event.getTarget(event).getAttribute("data-th-width");
    let currentObj = this.table.cols[currentIndex];
    this.drag.option = "border";//拖拽操作
    this.drag.currIndex = currentIndex;
    this.drag.oldLeft = event.x;
    this.drag.oldWidth = parseInt((currentObj).style.width);
    this.drag.minWidth = currentObj.style.minWidth != ""?parseInt(currentObj.style.minWidth):defaultWidth;
  };

  onLineMouseUp = (event) => {
    this.clearDragBorder(event);
  };
  bodyonLineMouseMove = (event) => {
    this.clearDragBorder(event);
  };

  clearDragBorder(){
    if (!this.props.dragborder) return;
    let {rows} = this.props;
    let data = {rows:rows[0],cols:this.table.cols,currIndex:this.drag.currIndex};
    this.props.afterDragColWidth && this.props.afterDragColWidth(data);
    this.drag = {
      option:""
    };
  }

  //---拖拽列宽代码逻辑----start-----
 
  dragAbleMouseDown = (e) => {
    Event.stopPropagation(e); 
    let event = Event.getEvent(e);
    if (!this.props.draggable) return;
    event.target.setAttribute('draggable',true);//添加交换列效果
    this.drag.option = 'dragAble';
    this.removeDragBorderEvent();//清理掉拖拽列宽的事件
    this.addDragAbleEvent(); //添加拖拽交换列的事件
  }
  
  /**
   * 拖拽交换列的事件处理
   */
  addDragAbleEvent (){
    let  events = [
      {key:'dragstart',fun:this.onDragStart},//用户开始拖动元素时触发
      {key:'dragover', fun:this.onDragOver},//当某被拖动的对象在另一对象容器范围内拖动时触发此事件
      {key:'drop', fun:this.onDrop},        //在一个拖动过程中，释放鼠标键时触发此事件 
      // {key:'dragenter', fun:this.onDragEnter}  //当被鼠标拖动的对象进入其容器范围内时触发此事件
    ];
    this.thEventListen(events,'',true);
    // this.bodyEventListen([{key:'mouseup',fun:this.bodyonDragMouseMove}]);
  }
  
  removeDragAbleEvent(){
    let  events = [
      {key:'dragstart',fun:this.onDragStart},
      {key:'dragover', fun:this.onDragOver},
      {key:'drop', fun:this.onDrop},
      {key:'dragenter', fun:this.onDragEnter}
    ];
    this.thEventListen(events,'remove',true);
  }

  onDragStart = (e) => {
    let event = Event.getEvent(e);
    if (!this.props.draggable) return;
    if(this.drag.option === 'border'){return;}
    let currentIndex = parseInt(Event.getTarget(event).getAttribute("data-line-index"));
     
    let currentKey = event.target.getAttribute('data-line-key');
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("Text", currentKey);
    this.currentObj = this.props.rows[0][currentIndex];
    event.dataTransfer.setDragImage(event.target, 0, 0);
  };

  onDragOver = (e) => {
    event.preventDefault();
  };

  /**
   * 当被鼠标拖动的对象进入其容器范围内时触发此事件。【目标事件】
   * @memberof TableHeader
   */
  // onDragEnter = (e) => { 
  //   if (!this.props.draggable) return;
  //   if(this.drag.option === 'border'){return;}
  //   let data = this.getCurrentEventData(e);
  //   if (!this.currentObj || this.currentObj.key == data.key) return;
  // };

  /**
   * 在一个拖动过程中，释放鼠标键时触发此事件。【目标事件】
   * @memberof TableHeader
   */
  onDrop = (e) => {
    if (!this.props.draggable) return;
    if(this.drag.option === 'border'){return;}
    let data = this.getCurrentEventData(e);
    if (!this.currentObj || this.currentObj.key == data.key) return;
    if(!this.props.onDrop)return;
    this.props.onDrop(event,{dragSource:this.currentObj,dragTarg:data});
  };

  getCurrentEventData(e){
    let event = Event.getEvent(e);
    let key = event.target.getAttribute('data-line-key');
    let data = this.props.rows[0].find(da=>da.key == key);
    if(data){
      return data;
    }else{
      console.log(" getCurrentEventData data is null ");
      return null;
    }
  }
//---拖拽列交换----end----- 
  /**
   * @description 过滤输入后的回调函数
   */
  handlerFilterTextChange = (key, val) => {
    let { onFilterRowsChange } = this.props;
    if (onFilterRowsChange) {
      onFilterRowsChange(key, val);
    }
  };
  /**
   * @description 过滤输入后的回调函数
   */
  handlerFilterDropChange = (key, val) => {
    let { onFilterRowsDropChange } = this.props;
    if (onFilterRowsDropChange) {
      onFilterRowsDropChange(key, val.key);
    }
  };
  /**
   * @description 过滤渲染的组件类型
   */
  filterRenderType = (type, dataIndex, index) => {
    const { clsPrefix, rows, filterDelay, locale } = this.props;
    switch (type) {
      //文本输入
      case "text":
        return (
          <FilterType
            locale={locale}
            rendertype={type}
            clsPrefix={clsPrefix}
            className={`${clsPrefix} filter-text`}
            onChange={debounce(
              filterDelay || 300,
              this.handlerFilterTextChange.bind(this, dataIndex)
            )}
            // onChange={this.handlerFilterTextChange.bind(this, dataIndex)}
            onSelectDropdown={this.handlerFilterDropChange.bind(
              this,
              dataIndex
            )}
            filterDropdown={rows[1][index]["filterdropdown"]}
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
            onChange={debounce(
              filterDelay || 300,
              this.handlerFilterTextChange.bind(this, dataIndex)
            )}
            onSelectDropdown={this.handlerFilterDropChange.bind(
              this,
              dataIndex
            )}
            filterDropdown={rows[1][index]["filterdropdown"]}
            filterDropdownType={rows[1][index]["filterdropdowntype"]}//下拉的条件类型为string,number
          />
        );
      //下拉框选择
      case "dropdown":
        let selectDataSource = [];
        if (
          rows.length > 0 &&
          (rows[1][index]["filterdropdownauto"] || "auto") == "auto"
        ) {
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
          selectDataSource = rows[1][index]["filterdropdowndata"];
        }
        return (
          <FilterType
            locale={locale}
            rendertype={type}
            className={`${clsPrefix} filter-dropdown`}
            data={selectDataSource}
            onChange={this.handlerFilterTextChange.bind(this, dataIndex)}
            onSelectDropdown={this.handlerFilterDropChange.bind(
              this,
              dataIndex
            )}
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
            onClick={() => {}}
            format={rows[1][index]["format"] || "YYYY-MM-DD"}
            onChange={this.handlerFilterTextChange.bind(this, dataIndex)}
            onSelectDropdown={this.handlerFilterDropChange.bind(
              this,
              dataIndex
            )}
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
            onClick={() => {}}
            format={rows[1][index]["format"] || "YYYY-MM-DD"}
            onChange={this.handlerFilterTextChange.bind(this, dataIndex)}
            onSelectDropdown={this.handlerFilterDropChange.bind(
              this,
              dataIndex
            )}
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
      <thead className={`${clsPrefix}-thead`} {...attr} data-theader-fixed='scroll' >
        {rows.map((row, index) => (
          <tr key={index} style={rowStyle} className={(filterable && index == rows.length - 1)?'filterable':''}>
            {row.map((da, columIndex, arr) => {
              let thHover = da.drgHover
                ? ` ${clsPrefix}-thead th-drag-hover`
                : "";
              delete da.drgHover;
              let fixedStyle = "";
              let canDotDrag = "";
              if (!fixed && da.fixed) {
                fixedStyle = `${clsPrefix}-row-fixed-columns-in-body`;
              }
           
              if (lastShowIndex == columIndex) {
                canDotDrag = "th-can-not-drag";
              }
              if (filterable && index == rows.length - 1) {
                da.children = this.filterRenderType(
                  da["filtertype"],
                  da.dataindex,
                  columIndex
                );
                delete da.filterdropdownfocus;
              }

              let thDefaultObj = {};
              let thClassName = `${da.className}`;
                  if(draggable){
                    thClassName += `${clsPrefix}-thead th-drag ${thHover} `;
                  }
                  if(dragborder){
                    thClassName += `${clsPrefix}-thead-th ${canDotDrag}`;
                  }
                  thClassName += `${fixedStyle}`;
                if(!da.fixed){
                  return (<th key={Math.random()+new Date().getTime()} className={thClassName} data-th-fixed={da.fixed} 
                        data-line-key={da.key} data-line-index={columIndex} data-th-width={da.width} >
                        {da.children}
                        {
                          dragborder ? <div ref={el => (this.gap = el)} data-line-key={da.key} 
                          data-line-index={columIndex} data-th-width={da.width}
                          data-type="online" className = {`${clsPrefix}-thead-th-drag-gap`}>
                          <div id='th-online' className='online' data-line-key={da.key} data-line-index={columIndex} data-th-width={da.width} /></div>:""
                        }
                  </th>)
              }else{
                thDefaultObj = {
                  ...da,
                  className:`${da.className} ${fixedStyle}`,
                  key:columIndex
                };
                da.onClick ?thDefaultObj.onClick = (e)=>{da.onClick(da, e)}:"";
                return (<th {...thDefaultObj} data-th-fixed={da.fixed} />)
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
