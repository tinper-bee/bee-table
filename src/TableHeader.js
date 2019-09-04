import React, { Component } from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import { debounce } from "throttle-debounce";
import { Event,EventUtil} from "./lib/utils";
import FilterType from "./FilterType";

const propTypes = {
  clsPrefix: PropTypes.string,
  rowStyle: PropTypes.object,
  rows: PropTypes.array
};


function getDiv(id){
  let div = document.createElement("div");
  div.className = "u-table-drag-hidden-cont";
  div.id = id;
  return div;
}

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
    this.event = false;//避免多次绑定问题
    this.lastColumWidth = null;//非固定列最后一列的初始化宽度
    this.fixedTable = {};
  }

  static defaultProps = {
    contentWidthDiff: 0
  };

  componentDidUpdate(){
    this.initTable();
    this.initEvent();
  }

  componentDidMount(){
    let uid = "_table_uid_"+new Date().getTime();
    this._table_none_cont_id = uid;
    let div = getDiv(uid);
    document.querySelector("body").appendChild(div);
  }

  componentWillUnmount(){
    this.fixedTable = null;
    if(!this.table)return;
    if (this.props.draggable){
      this.removeDragAbleEvent();
    }
    if(this.props.dragborder){
      this.removeDragBorderEvent();
    }
    this.eventListen([{key:'mousedown',fun:this.onTrMouseDown}],'remove',this.table.tr[0]);
    this.eventListen([{key:'mouseup',fun:this.bodyonLineMouseUp}],'remove',document.body);
  }

  /**
   * 获取table的属性存放在this.table 中。(公用方法)
   * @returns
   * @memberof TableHeader
   */
  initTable(){
    const {contentTable} = this.props;
    if(!this.props.dragborder && !this.props.draggable)return;
    let tableDome = this._thead.parentNode;
    let table = {};
    if(tableDome && tableDome.nodeName && tableDome.nodeName.toUpperCase() == "TABLE"){
      table.table = tableDome;
      table.cols = tableDome.getElementsByTagName("col");
      table.ths = tableDome.getElementsByTagName("th");
      table.tr = tableDome.getElementsByTagName("tr");
      table.tableBody = contentTable.querySelector('.u-table-scroll .u-table-body') && contentTable.querySelector('.u-table-scroll .u-table-body');
      table.tableBodyCols = contentTable.querySelector('.u-table-scroll .u-table-body') && contentTable.querySelector('.u-table-scroll .u-table-body').getElementsByTagName("col");
    }

    table.fixedLeftHeaderTable = contentTable.querySelector('.u-table-fixed-left .u-table-header') ;
    table.fixedRighHeadertTable = contentTable.querySelector('.u-table-fixed-right .u-table-header');
    table.contentTableHeader  = contentTable.querySelector('.u-table-scroll .u-table-header');
    table.fixedLeftBodyTable = contentTable.querySelector('.u-table-fixed-left .u-table-body-outer') ;
    table.fixedRightBodyTable = contentTable.querySelector('.u-table-fixed-right .u-table-body-outer') ;
    table.innerTableBody= contentTable.querySelector('.u-table-scroll .u-table-body table');

    this.table = table;

    if(!this.props.dragborder)return;
    if(document.getElementById("u-table-drag-thead-" + this.theadKey)){
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
   * 事件初始化
   */
  initEvent(){
    let {dragborder,draggable,rows} = this.props;
    // 当传入的 columns 为空时，不绑定拖拽事件
    if(Object.prototype.toString.call(rows) === '[object Array]' && rows.length === 0){
      return;
    }
    if(!this.event){ //避免多次绑定问题。
      this.event = true;
      if(dragborder){
        this.dragBorderEventInit();//列宽
      }
      if(draggable){
        this.dragAbleEventInit();//交换列
      }
      if(this.table && this.table.tr){
        this.eventListen([{key:'mousedown',fun:this.onTrMouseDown}],'',this.table.tr[0]);//body mouseup
      }
      this.eventListen([{key:'mouseup',fun:this.bodyonLineMouseUp}],'',document.body);//body mouseup
    }
  }

  /**
   * 拖拽列宽事件的监听
   */
  dragBorderEventInit (){
    if(!this.props.dragborder )return;
    let  events = [
      {key:'mouseup', fun:this.onTrMouseUp},
      {key:'mousemove', fun:this.onTrMouseMove},
      // {key:'mousemove', fun:debounce(50,this.onTrMouseMove)},//函数节流后体验很差
    ];
    this.eventListen(events,'',this.table.tr[0]);//表示把事件添加到th元素上
  }

  /**
   * 删除拖动改变列宽的事件监听
   */
  removeDragBorderEvent(){
    let  events = [
      {key:'mouseup', fun:this.onTrMouseUp},
      {key:'mousemove', fun:this.onTrMouseMove},
    ];
    this.eventListen(events,'remove',this.table.tr[0]);
  }

  eventListen(events,type,eventSource){
    if(!this.table)return;
    if(!eventSource){
      console.log("Please set the attributes of column !");
      return;
    }
    let {tr} = this.table;
    for (let i = 0; i < events.length; i++) {
      const _event = events[i];
      if(type === "remove"){
        EventUtil.removeHandler(eventSource,_event.key,_event.fun);
      }else{
        EventUtil.addHandler(eventSource,_event.key,_event.fun);
      }
    }
  }

  /**
   *
   *根据 data-type 来获取当前拖拽的对象的Object，如果为null表示拖动的对象并非是online
   * @memberof TableHeader
   */
  getOnLineObject = (_element) =>{
    let type = _element.getAttribute('data-type'),elementObj = null;
    if(!type){
      let element = _element.parentElement||parentNode;//兼容写法。
      if(element.getAttribute('data-type')){
        elementObj = element;
      }
    }else{
      elementObj = _element;
    }
    return elementObj;
  }

    /**
   * 调整列宽的down事件
   * @memberof TableHeader
   */
  onTrMouseDown = (e) => {
    Event.stopPropagation(e);
    let event = Event.getEvent(e) ,
    targetEvent = Event.getTarget(event);
    const { clsPrefix, contentTable,lastShowIndex } = this.props;
    // let currentElement = this.getOnLineObject(targetEvent);
    let currentElement = this.getTargetToType(targetEvent);
    if(!currentElement)return;
    let type = currentElement.getAttribute('data-type');
    if(!this.props.dragborder && !this.props.draggable)return;
    if(type == 'online' && this.props.dragborder){
      if(!this.props.dragborder)return;
      targetEvent.setAttribute('draggable',false);//添加交换列效果
      let currentIndex = parseInt(currentElement.getAttribute("data-line-index"));
      let defaultWidth = currentElement.getAttribute("data-th-width");
      let currentObj = this.table.cols[currentIndex];
      this.drag.option = "border";//拖拽操作
      this.drag.currIndex = currentIndex;
      this.drag.oldLeft = event.x;
      this.drag.oldWidth = parseInt((currentObj).style.width);
      this.drag.minWidth = currentObj.style.minWidth != ""?parseInt(currentObj.style.minWidth):defaultWidth;
      this.drag.tableWidth = parseInt(this.table.table.style.width ?this.table.table.style.width:this.table.table.scrollWidth);
      // console.log(" ----- ",this.drag);
      if(!this.tableOldWidth){
        this.tableOldWidth = this.drag.tableWidth;//this.getTableWidth();
        // console.log(" this.tableOldWidth--- ",this.tableOldWidth);
      }
      if(!this.lastColumWidth){
        this.lastColumWidth = parseInt(this.table.cols[lastShowIndex].style.width);
      }
    }else if(type != 'online' &&  this.props.draggable){
        // if (!this.props.draggable || targetEvent.nodeName.toUpperCase() != "TH") return;
        if (!this.props.draggable) return;
        let th = this.getTargetToType(targetEvent);
        th.setAttribute('draggable',true);//添加交换列效果
        this.drag.option = 'dragAble';
        this.currentDome = th;
        let currentIndex = parseInt(th.getAttribute("data-line-index"));
        this.drag.currIndex = currentIndex;
    }else{
      // console.log("onTrMouseDown dragborder or draggable is all false !");
      return ;
    }
  };

  getTableWidth = ()=>{
    let tableWidth = 0,offWidth = 0;//this.table.cols.length;
    for (let index = 0; index < this.table.cols.length; index++) {
      let da = this.table.cols[index];
      tableWidth += parseInt((da).style.width);
    }
    return (tableWidth-offWidth);
  }

  /**
   * 根据当前节点查找到有data-type类型的容器返回。
   * @memberof TableHeader
   */
  getTargetToType = (targetEvent) => {
    let tag = targetEvent;
    if(targetEvent && !targetEvent.getAttribute("data-type")){
      tag = this.getTargetToType(targetEvent.parentElement);
    }
    return tag;
  }


  /**
   * 判断当前的target 是否是 th，如果不是，直接递归查找。
   * @memberof TableHeader
   */
  getTargetToTh = (targetEvent) => {
    let th = targetEvent;
    if(targetEvent.nodeName.toUpperCase() != "TH"){
      th = this.getThDome(targetEvent);
    }
    console.log(" getTargetToTh: ", th);
    return th;
  }
  /**
   * 调整列宽的move事件
   * @memberof TableHeader
   */
  onTrMouseMove = (e) => {
    if(!this.props.dragborder && !this.props.draggable)return;
    const { clsPrefix ,dragborder,contentDomWidth,scrollbarWidth,contentTable,headerScroll,lastShowIndex,onDraggingBorder, leftFixedWidth, rightFixedWidth} = this.props;
    Event.stopPropagation(e);
    let event = Event.getEvent(e);
    if(this.props.dragborder && this.drag.option == "border"){
      //移动改变宽度
      let currentCols = this.table.cols[this.drag.currIndex];
      let diff = (event.x - this.drag.oldLeft);
      let newWidth = this.drag.oldWidth + diff;
      this.drag.newWidth = newWidth > 0 ? newWidth : this.minWidth;
       // if(newWidth > this.drag.minWidth){
      if(newWidth > this.minWidth){
        currentCols.style.width = newWidth +'px';
        //hao 支持固定表头拖拽 修改表体的width
        if(this.fixedTable.cols){
            this.fixedTable.cols[this.drag.currIndex].style.width = newWidth + "px";
        }

        // const newTableWidth = this.drag.tableWidth + diff;// +'px';
        // this.table.table.style.width  = newTableWidth+'px';;//改变table的width
        // if(this.table.innerTableBody){//TODO 后续需要处理此处
        //   this.table.innerTableBody.style.width  = newTableWidth+'px';

        // }

        let newDiff = (parseInt(currentCols.style.minWidth) - parseInt(currentCols.style.width));
        if(newDiff > 0){//缩小
          let lastWidth = this.lastColumWidth + newDiff;
          this.table.cols[lastShowIndex].style.width = lastWidth +"px";//同步表头
          this.table.tableBodyCols[lastShowIndex].style.width = lastWidth + "px";//同步表体
        }
        let showScroll =  contentDomWidth - (leftFixedWidth + rightFixedWidth) - (this.drag.tableWidth + diff) - scrollbarWidth ;
        //表头滚动条处理
        if(headerScroll){
            if(showScroll < 0){ //小于 0 出现滚动条
                //找到固定列表格，设置表头的marginBottom值为scrollbarWidth;
                this.table.contentTableHeader.style.overflowX = 'scroll';
                this.optTableMargin( this.table.fixedLeftHeaderTable,scrollbarWidth);
                this.optTableMargin( this.table.fixedRighHeadertTable,scrollbarWidth);
                // fixedLeftHeaderTable && (fixedLeftHeaderTable.style.marginBottom = scrollbarWidth + "px");
                // fixedRighHeadertTable && (fixedRighHeadertTable.style.marginBottom = scrollbarWidth + "px");
              //todo inner scroll-x去掉；outer marginbottom 设置成-15px】
              }else{ //大于 0 不显示滚动条
                this.table.contentTableHeader.style.overflowX = 'hidden';
                this.optTableMargin( this.table.fixedLeftHeaderTable,0);
                this.optTableMargin( this.table.fixedRighHeadertTable,0);
            }
        }else{
          if(showScroll < 0){
                this.table.tableBody.style.overflowX = 'auto';
                this.optTableMargin( this.table.fixedLeftBodyTable,'-'+scrollbarWidth);
                this.optTableMargin( this.table.fixedRightBodyTable,'-'+scrollbarWidth);
                this.optTableScroll( this.table.fixedLeftBodyTable,{x:'scroll'});
                this.optTableScroll( this.table.fixedRightBodyTable,{x:'scroll'});
          }else{
            this.table.tableBody.style.overflowX = 'hidden';
            this.optTableMargin( this.table.fixedLeftBodyTable,0);
            this.optTableMargin( this.table.fixedRightBodyTable,0);
            this.optTableScroll( this.table.fixedLeftBodyTable,{x:'auto'});
                this.optTableScroll( this.table.fixedRightBodyTable,{x:'auto'});
          }
        }
      }else {
        this.drag.newWidth = this.minWidth;
      }
    }else if(this.props.draggable && this.drag.option == "draggable"){
      // console.log(" --onTrMouseMove--draggable- ",this.drag.option);
    }else{
      // console.log("onTrMouseMove dragborder or draggable is all false !");
    }
    // 增加拖拽列宽动作的回调函数
    this.drag.newWidth && onDraggingBorder && onDraggingBorder(event, this.drag.newWidth);
  }

    /**
   * 调整列宽的up事件
   * @memberof TableHeader
   */
  onTrMouseUp = (e) => {
    let event = Event.getEvent(e);
    let width = this.drag.newWidth;
    this.mouseClear();
    this.props.onDropBorder && this.props.onDropBorder(event,width);
  };


  mouseClear(){
    if(!this.drag || !this.drag.option)return;
    let {rows} = this.props;
    let data = {rows:rows[0],cols:this.table.cols,currIndex:this.drag.currIndex};
    this.props.afterDragColWidth && this.props.afterDragColWidth(data);
    this.drag = {
      option:""
    };
    this.clearThsDr();
  }

  clearThsDr =()=>{
    let ths = this.table.ths;
    for (let index = 0; index < ths.length; index++) {
      ths[index].setAttribute('draggable',false);//去掉交换列效果
    }
  }

    /**
   * 当前对象上绑定全局事件，用于拖拽区域以外时的事件处理
   * @param {*} events
   * @param {*} type
   * @memberof TableHeader
   */
  bodyonLineMouseUp = (events,type) =>{
    if(!this.drag || !this.drag.option)return;
    this.mouseClear();
  }


  /**
   *相关滚动条联动操作
   *
   * @memberof TableHeader
   */
  optTableMargin =(table,scrollbarWidth)=>{
    if(table){
      table.style.marginBottom = scrollbarWidth + "px"
    }
  }

  optTableScroll = (table,overflow ={})=>{
    if(table){
      const innerTable = table.querySelector('.u-table-body-inner');
      if(innerTable){
        //fixbug: 拖拽列宽后，滚动条滚到表格底部，会导致固定列和非固定列错行
        overflow.x && (innerTable.style.overflowX = overflow.x);
        overflow.y && (innerTable.style.overflowY = overflow.y);
      }

    }
  }

  //---拖拽交换列代码----start-----
  /**
   * 添加换列的事件监听
   */
  dragAbleEventInit (){
    if (!this.props.draggable) return;
    let  events = [
      {key:'dragstart',fun:this.onDragStart},//用户开始拖动元素时触发
      {key:'dragover', fun:this.onDragOver},//当某被拖动的对象在另一对象容器范围内拖动时触发此事件
      {key:'drop', fun:this.onDrop},        //在一个拖动过程中，释放鼠标键时触发此事件

      {key:'dragenter', fun:this.onDragEnter},
      {key:'dragend', fun:this.onDragEnd},
      {key:'dragleave', fun:this.onDragLeave},
    ];
    this.eventListen(events,'',this.table.tr[0]);//表示把事件添加到th元素上
  }

  /**
   * 删除换列的事件监听
   */
  removeDragAbleEvent(){
    let  events = [
      {key:'dragstart',fun:this.onDragStart},
      {key:'dragover', fun:this.onDragOver},
      {key:'drop', fun:this.onDrop},
      {key:'dragenter', fun:this.onDragEnter},
      {key:'dragend', fun:this.onDragEnd},
      {key:'dragleave', fun:this.onDragLeave},
    ];
    this.eventListen(events,'remove',this.table.tr[0]);
  }

  /**
   * 开始调整交换列的事件
   */
  onDragStart = (e) => {
    if (!this.props.draggable) return;
    if(this.drag && this.drag.option != 'dragAble'){return;}
    let event = Event.getEvent(e) ,
    // target = Event.getTarget(event);
    target = this.getTargetToTh(Event.getTarget(event));
    let currentIndex = parseInt(target.getAttribute("data-line-index"));
    let currentKey = target.getAttribute('data-line-key');

    if(event.dataTransfer.setDragImage){
      var crt = target.cloneNode(true);
      crt.style.backgroundColor = "#ebecf0";
      crt.style.width = this.table.cols[currentIndex].style.width;//拖动后再交换列的时候，阴影效果可同步
      crt.style.height = "40px";
      // crt.style['line-height'] = "40px";
      // document.body.appendChild(crt);
      document.getElementById(this._table_none_cont_id).appendChild(crt);
      event.dataTransfer.setDragImage(crt, 0, 0);
    }

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("Text", currentKey);
    this.currentObj = this.props.rows[0][currentIndex];
  };

  onDragOver = (e) => {
    let event = Event.getEvent(e);
    event.preventDefault();
  };

    /**
   * 在一个拖动过程中，释放鼠标键时触发此事件。【目标事件】
   * @memberof TableHeader
   */
  onDrop = (e) => {
    if (!this.props.draggable) return;
    let props = this.getCurrentEventData(this._dragCurrent)
    e.column = {props};
    if(this.drag && this.drag.option != 'dragAble'){
      this.props.onDrop(e);
      return;
    }
    let event = Event.getEvent(e) ,
    target = Event.getTarget(event);
    this.currentDome.setAttribute('draggable',false);//添加交换列效果
    // let data = this.getCurrentEventData(this._dragCurrent);
    // if(!data){
    //   this.props.onDrop(e);
    //   return;
    // }
    if(!this.props.onDrop)return;
    // this.props.onDrop(event,target);
    this.props.onDrop(event,{dragSource:this.currentObj,dragTarg:e.column});
  };


  onDragEnter = (e) => {
    let event = Event.getEvent(e) ,
    target = Event.getTarget(event);
    this._dragCurrent = target;
    let currentIndex = target.getAttribute("data-line-index");
    if(!currentIndex || parseInt(currentIndex) === this.drag.currIndex)return;
    if(target.nodeName.toUpperCase() === "TH"){
      // target.style.border = "2px dashed rgba(5,0,0,0.25)";
      target.setAttribute("style","border-right:2px dashed rgb(30, 136, 229)");
      // target.style.backgroundColor = 'rgb(235, 236, 240)';
    }
  }

  onDragEnd = (e) => {
    let event = Event.getEvent(e) ,
    target = Event.getTarget(event);
    this._dragCurrent.setAttribute("style","");
    // this._dragCurrent.style = "";
    document.getElementById(this._table_none_cont_id).innerHTML = "";

    let data = this.getCurrentEventData(this._dragCurrent);
    if(!data)return;
    if (!this.currentObj || this.currentObj.key == data.key) return;
    if(!this.props.onDragEnd)return;
    this.props.onDragEnd(event,{dragSource:this.currentObj,dragTarg:data});
  }


  onDragLeave = (e) => {
    let event = Event.getEvent(e) ,
    target = Event.getTarget(event);
    let currentIndex = target.getAttribute("data-line-index");
    if(!currentIndex || parseInt(currentIndex) === this.drag.currIndex)return;
    if(target.nodeName.toUpperCase() === "TH"){
      target.setAttribute("style","");
      // this._dragCurrent.style = "";
    }
  }



  /**
   * 获取当前th上的对象数据
   * @param {*} e
   * @returns
   * @memberof TableHeader
   */
  getCurrentEventData(th){
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
        {rows.map((row, index) => {
          let _rowLeng = (row.length-1);
          return(<tr key={index} style={rowStyle} className={(filterable && index == rows.length - 1)?'filterable':''}>
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
              if(da.titleAlign){
                thClassName += ` text-${da.titleAlign} `;
              }
              else if(da.textAlign){
                thClassName += ` text-${da.textAlign} `;
              }
              
              delete da.textAlign;
              delete da.titleAlign;
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
                thClassName += ` ${clsPrefix}-thead th-drag ${thHover} `;
              }
              if(dragborder){
                thClassName += ` ${clsPrefix}-thead-th ${canDotDrag}`;
              }
              thClassName += ` ${fixedStyle}`;
              if(!da.fixed ){
                  return (<th {...da}  {...keyTemp} className={thClassName} data-th-fixed={da.fixed} data-line-key={da.key}
                  data-line-index={columIndex} data-th-width={da.width} data-type="draggable">
                      {da.required ? <span className='required'>*</span>:''}
                      {da.children}
                      {
                        dragborder && columIndex != _rowLeng? <div ref={el => (this.gap = el)} data-line-key={da.key}
                        data-line-index={columIndex} data-th-width={da.width}
                        data-type="online" className = {`${clsPrefix}-thead-th-drag-gap`}>
                        <div className='online' /></div>:""
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
        )})}
      </thead>
    );
  }
}

TableHeader.propTypes = propTypes;
export default TableHeader;
