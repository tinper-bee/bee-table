import React, { Component } from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import { debounce } from "throttle-debounce";
import { Event,EventUtil} from "./utils";
import FilterType from "./FilterType";

const propTypes = {
  clsPrefix: PropTypes.string,
  rowStyle: PropTypes.object,
  rows: PropTypes.array
};

class TableHeader extends Component {
  constructor(props) {
    super(props);
    this.currentObj = null; 
    this.theadKey = new Date().getTime();
    this.drag = {
      option:''
    };
    this.minWidth = 80;//确定最小宽度就是80
    this.table = null;
    this._thead = null;//当前对象
  }

  static defaultProps = {
    contentWidthDiff: 0
  };

  /**
   *
   * 动态绑定th line 事件方法
   * @param {*} events
   * @param {*} type  type 为false 为增加事件
   * @param {*} eventSource 为false 给 th 内部的div增加事件
   * @memberof TableHeader
   */
  thEventListen(events,type,eventSource){
    let {ths,cols} = this.table;
    for (let index = 0; index < ths.length; index++) {
      const element = ths[index];//.getAttribute('data-type');
      if(!element.getAttribute('data-th-fixed')){
        let colLine =  null;
        if(element.children.length === 0){
          colLine = element;
        }else if(element.children.length > 0){
          colLine = element.lastElementChild;
        }else if(element.children.length === 1){
          colLine = element.children[0];
        }
        // const colLine =  element.children.length > 1?element.lastElementChild:element.children[0];
        for (let i = 0; i < events.length; i++) {
          const _event = events[i];
          let _dataSource = eventSource?element:colLine;
          if(type === "remove"){
            EventUtil.removeHandler(_dataSource,_event.key,_event.fun);
          }else{
            EventUtil.addHandler(_dataSource,_event.key,_event.fun);
          }
        }
      }
    }
  }

 
  /**
   * 当前对象上绑定全局事件，用于拖拽区域以外时的事件处理
   * @param {*} events
   * @param {*} type
   * @memberof TableHeader
   */
  bodyEventListen(events,type){
    for (let i = 0; i < events.length; i++) {
      const _event = events[i];
      if(type == "remove"){
        EventUtil.removeHandler(document.body,_event.key,_event.fun);
      }else{
        EventUtil.addHandler(document.body,_event.key,_event.fun);
      }
    }
  }

  componentDidUpdate(){
    this.initTable(); 
    this.initEvent();
  }

  // componentDidMount(){
    // this.initTable();
    // this.initEvent();
  // } 
  
  /**
   * 初始化拖拽列宽的事件处理
   * @returns
   * @memberof TableHeader
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
    this.thEventListen([{key:'mousedown',fun:this.dragAbleMouseDown}],'',true);//表示把事件添加到th元素上
  }

  /**
   * 移除当前全局事件对象
   * @memberof TableHeader
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
   * @returns
   * @memberof TableHeader
   */
  initTable(){
    if(!this.props.dragborder && !this.props.draggable)return;
    // let el = ReactDOM.findDOMNode(this);
    let tableDome = this._thead.parentNode;
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
  
  /**
   * 调整列宽的move事件
   * @memberof TableHeader
   */
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
      this.drag.newWidth = newWidth;
      // if(newWidth > this.drag.minWidth){
      if(newWidth > this.minWidth){
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

  /**
   * 调整列宽的down事件
   * @memberof TableHeader
   */
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

  /**
   * 调整列宽的up事件
   * @memberof TableHeader
   */
  onLineMouseUp = (event) => {
    let width = this.drag.newWidth;
    this.clearDragBorder(event);
    this.props.onDropBorder(event,width);
  };

  /**
   * 调整列宽到区域以外的up事件
   */
  bodyonLineMouseMove = (event) => {
    this.clearDragBorder(event);
  };

  clearDragBorder(){
    if(!this.drag || !this.drag.option)return;
    let {rows} = this.props;
    let data = {rows:rows[0],cols:this.table.cols,currIndex:this.drag.currIndex};
    this.props.afterDragColWidth && this.props.afterDragColWidth(data);
    this.drag = {
      option:""
    };
    if (this.props.draggable){
      this.removeDragAbleEvent();
    }
  }

  //---拖拽列宽代码逻辑----start-----
 
  /**
   * 调整交换列down事件
   * @memberof TableHeader
   */
  dragAbleMouseDown = (e) => {
    // Event.stopPropagation(e); 
    let event = Event.getEvent(e);
    if (!this.props.draggable) return;
    let th = this.getThDome(event.target);
    if(!th)return;
    event.target.setAttribute('draggable',true);//添加交换列效果
    this.drag.option = 'dragAble';
    this.currentDome = event.target;

    this.thEventListen([{key:'mouseup',fun:this.dragAbleMouseUp}],'',true);//th
    this.removeDragBorderEvent();//清理掉拖拽列宽的事件
    this.addDragAbleEvent(); //添加拖拽交换列的事件
  }
  /**
   * 调整交换列up事件
   * @memberof TableHeader
   */
  dragAbleMouseUp = (e) => {
    this.currentDome.setAttribute('draggable',false);//添加交换列效果
    this.removeDragAbleEvent();
    this.thEventListen([{key:'mouseup',fun:this.dragAbleMouseUp}],'remove',true);//th
    //拖拽交换列事件
    this.thEventListen([{key:'mousedown',fun:this.dragAbleMouseDown}],'remove',true);//表示把事件添加到th元素上
    this.initEvent();
  }

  /**
   * 添加换列的事件监听
   */
  addDragAbleEvent (){
    let  events = [
      {key:'dragstart',fun:this.onDragStart},//用户开始拖动元素时触发
      {key:'dragover', fun:this.onDragOver},//当某被拖动的对象在另一对象容器范围内拖动时触发此事件
      {key:'drop', fun:this.onDrop},        //在一个拖动过程中，释放鼠标键时触发此事件 
    ];
    this.thEventListen(events,'',true);
  }
  
  /**
   * 删除换列的事件监听
   */
  removeDragAbleEvent(){
    let  events = [
      {key:'dragstart',fun:this.onDragStart},
      {key:'dragover', fun:this.onDragOver},
      {key:'drop', fun:this.onDrop},
      {key:'dragenter', fun:this.onDragEnter}
    ];
    this.thEventListen(events,'remove',true);
  }

  /**
   * 开始调整交换列的事件
   */
  onDragStart = (e) => {
    let event = Event.getEvent(e);
    if (!this.props.draggable) return;
    if(this.drag.option === 'border'){return;}
    let th = this.getThDome(event.target);
    if(!th)return;
    let currentIndex = parseInt(th.getAttribute("data-line-index"));
     
    let currentKey = event.target.getAttribute('data-line-key');
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("Text", currentKey);
    this.currentObj = this.props.rows[0][currentIndex];
    // event.dataTransfer.setDragImage(event.target, 0, 0);
  };

  onDragOver = (e) => {
    event.preventDefault();
  };

  /**
   * 在一个拖动过程中，释放鼠标键时触发此事件。【目标事件】
   * @memberof TableHeader
   */
  onDrop = (e) => {
    if (!this.props.draggable) return;
    if(this.drag.option === 'border'){return;}
    this.currentDome.setAttribute('draggable',false);//添加交换列效果
    let data = this.getCurrentEventData(e);
    if(!data)return;
    if (!this.currentObj || this.currentObj.key == data.key) return;
    if(!this.props.onDrop)return;
    this.props.onDrop(event,{dragSource:this.currentObj,dragTarg:data});
  };

  /**
   * 获取当前th上的对象数据
   * @param {*} e
   * @returns
   * @memberof TableHeader
   */
  getCurrentEventData(e){
    let event = Event.getEvent(e);
    let th = this.getThDome(event.target)
    if(!th){
      console.log(" event target is not th ! ");
      return null;
    }
    let key = th.getAttribute('data-line-key');
    let data = this.props.rows[0].find(da=>da.key == key);
    if(data){
      return data;
    }else{
      console.log(" getCurrentEventData data is null ");
      return null;
    }
  }

  /**
   * 根据当前鼠标点击的节点，进行递归遍历，最终找到th
   * @param {*} element
   * @returns  <th />对象
   * @memberof TableHeader
   */
  getThDome(element){
    let _tagName = element.tagName.toLowerCase();
    if(element.getAttribute('data-filter-type') === 'filterContext')return null;
    if(_tagName === 'i')return null;
    if(_tagName != 'th'){
      return this.getThDome(element.parentElement);
    }else{
      return element;
    }
  }

//---拖拽列交换----end----- 

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
            filterDropdownIncludeKeys={rows[1][index]["filterdropdownincludekeys"]}//下拉条件按照指定的keys去显示
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
            filterDropdownIncludeKeys={rows[1][index]["filterdropdownincludekeys"]}//下拉条件按照指定的keys去显示
            filterInputNumberOptions={rows[1][index]["filterinputnumberoptions"]}//设置数值框内的详细属性
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
            notFoundContent={"Loading"}//没有数据显示的默认字
            dataIndex={dataIndex}//字段
            onFilterChange={this.handlerFilterChange}//输入框回调
            onFilterClear={this.handlerFilterClear}//清除回调
            filterDropdown={rows[1][index]["filterdropdown"]}
            onFocus={rows[1][index]["filterdropdownfocus"]}
            filterDropdownType={rows[1][index]["filterdropdowntype"]}//下拉的条件类型为string,number
            filterDropdownIncludeKeys={rows[1][index]["filterdropdownincludekeys"]}//下拉条件按照指定的keys去显示
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
            filterDropdownIncludeKeys={rows[1][index]["filterdropdownincludekeys"]}//下拉条件按照指定的keys去显示
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
            filterDropdownIncludeKeys={rows[1][index]["filterdropdownincludekeys"]}//下拉条件按照指定的keys去显示
          />
        );
      default:
        //不匹配类型默认文本输入
        return <div />;
    }
  };


  render() { 
    const { clsPrefix, rowStyle,draggable,
        dragborder, rows,filterable,fixed,lastShowIndex,
    } = this.props;

    let attr = dragborder ? { id: `u-table-drag-thead-${this.theadKey}` } : {};
    return (
      <thead className={`${clsPrefix}-thead`} {...attr} data-theader-fixed='scroll' ref={_thead=>this._thead = _thead} >
        {rows.map((row, index) => (
          <tr key={index} style={rowStyle} className={(filterable && index == rows.length - 1)?'filterable':''}>
            {row.map((da, columIndex, arr) => {
              let thHover = da.drgHover
                ? ` ${clsPrefix}-thead th-drag-hover`
                : "";
              delete da.drgHover;
              let fixedStyle = "";
              let canDotDrag = "";
              //主表格下、固定列或者是过滤行中含有固定列时添加该属性
              if (!fixed && (da.fixed || (filterable && index == rows.length - 1 && rows[0][columIndex].fixed)) ) {
                fixedStyle = ` ${clsPrefix}-row-fixed-columns-in-body`;
              }
           
              if (lastShowIndex == columIndex) {
                canDotDrag = "th-can-not-drag";
              }
              let thClassName = `${da.className}`?`${da.className}`:'';
              if(da.textAlign){
                thClassName += ` text-${da.textAlign} `;
              }
              delete da.textAlign;
              const keyTemp = {};
              //避免key为undefined
              // if(da.dataindex && da.key ===undefined ){
                keyTemp.key = da.key || da.dataindex || index+'-'+columIndex
                
              // } 
              if (filterable && index == rows.length - 1) {
                da.children = this.filterRenderType(
                  da["filtertype"],
                  da.dataindex,
                  columIndex
                );
                if(da.key ===undefined ){
                  keyTemp.key = keyTemp.key + '-filterable'
                }
                delete da.filterdropdownfocus;
              }

              let thDefaultObj = {};
              
                  if(draggable){
                    thClassName += `${clsPrefix}-thead th-drag ${thHover} `;
                  }
                  if(dragborder){
                    thClassName += `${clsPrefix}-thead-th ${canDotDrag}`;
                  }
                  thClassName += ` ${fixedStyle}`;
                 
                if(!da.fixed){
             
                  return (<th {...da}  {...keyTemp} className={thClassName} data-th-fixed={da.fixed} 
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
                  className:`${thClassName} ${fixedStyle}`,
                };
                da.onClick ?thDefaultObj.onClick = (e)=>{da.onClick(da, e)}:"";
                return (<th {...thDefaultObj} {...keyTemp}  data-th-fixed={da.fixed} />)
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
