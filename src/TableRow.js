import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Event,EventUtil} from "./lib/utils";
import TableCell from './TableCell';
import ExpandIcon from './ExpandIcon';

const propTypes = {
    onDestroy: PropTypes.func,
    onRowClick: PropTypes.func,
    onRowDoubleClick: PropTypes.func,
    record: PropTypes.object,
    clsPrefix: PropTypes.string,
    expandIconColumnIndex: PropTypes.number,
    onHover: PropTypes.func,
    columns: PropTypes.array,
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    visible: PropTypes.bool,
    index: PropTypes.number,
    hoverKey: PropTypes.any,
    expanded: PropTypes.bool,
    expandable: PropTypes.any,
    onExpand: PropTypes.func,
    needIndentSpaced: PropTypes.bool,
    className: PropTypes.string,
    indent: PropTypes.number,
    indentSize: PropTypes.number,
    expandIconAsCell: PropTypes.bool,
    expandRowByClick: PropTypes.bool,
    store: PropTypes.object.isRequired,
    rowDraggAble: PropTypes.bool,
    onDragRow: PropTypes.func,
    onDragRowStart: PropTypes.func,
    syncRowHeight:PropTypes.bool
};

const defaultProps = {
    onRowClick() {},
    // onRowDoubleClick() {},
    onDestroy() {},
    expandIconColumnIndex: 0,
    expandRowByClick: false,
    onHover() {},
    className:'',
    setRowParentIndex:()=>{},
    rowDraggAble:false,
    // onDragRow:()=>{}
    syncRowHeight:false
};

class TableRow extends Component{
 constructor(props){
     super(props);
     this._timeout = null;
     this.state = {
         hovered: false,
     };
     this.onRowClick = this.onRowClick.bind(this);
     this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
     this.onMouseEnter = this.onMouseEnter.bind(this);
     this.onMouseLeave = this.onMouseLeave.bind(this);
     this.expandHeight = 0;
     this.event = false;
     this.cacheCurrentIndex = null;
     this.canBeTouch = true  //受否允许拖动该行
 }


  componentDidMount() {
    const { store, hoverKey,treeType,rowDraggAble } = this.props;
    this.unsubscribe = store.subscribe(() => {
      if (store.getState().currentHoverKey === hoverKey) {
        this.setState({ hovered: true });
      } else if (this.state.hovered === true) {
        this.setState({ hovered: false });
      }
    });

    this.setRowHeight()
    if(treeType){
      this.setRowParentIndex();
    }
  }

  /**
   * 事件初始化
   */
  initEvent=()=>{
    let  events = [
      {key:'touchstart', fun:this.onTouchStart},//手指触摸到一个 DOM 元素时触发
      {key:'touchmove', fun:this.onTouchMove}, //手指在一个 DOM 元素上滑动时触发
      {key:'touchend', fun:this.onTouchEnd}, //手指从一个 DOM 元素上移开时触发

      {key:'dragstart',fun:this.onDragStart},//用户开始拖动元素时触发
      {key:'dragover', fun:this.onDragOver},//当某被拖动的对象在另一对象容器范围内拖动时触发此事件
      {key:'drop', fun:this.onDrop},        //在一个拖动过程中，释放鼠标键时触发此事件
      {key:'dragenter', fun:this.onDragEnter},
      {key:'dragleave', fun:this.onDragLeave},
    ];
    this.eventListen(events,'',this.element);
  }

  /**
   * 事件移除，提供性能以及内存泄漏等问题。
   */
  removeDragAbleEvent=()=>{
    let  events = [
      {key:'touchstart', fun:this.onTouchStart},//手指触摸到一个 DOM 元素时触发
      {key:'touchmove', fun:this.onTouchMove}, //手指在一个 DOM 元素上滑动时触发
      {key:'touchend', fun:this.onTouchEnd}, //手指从一个 DOM 元素上移开时触发

      {key:'dragstart',fun:this.onDragStart},//用户开始拖动元素时触发
      {key:'dragover', fun:this.onDragOver},//当某被拖动的对象在另一对象容器范围内拖动时触发此事件
      {key:'drop', fun:this.onDrop},        //在一个拖动过程中，释放鼠标键时触发此事件
      {key:'dragenter', fun:this.onDragEnter},
      {key:'dragleave', fun:this.onDragLeave},
    ];
    this.eventListen(events,'remove',this.element);
  }


  /**
   * 事件绑定和移除函数
   */
  eventListen(events,type,eventSource){
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
   * 开始调整交换列的事件
   */
  onDragStart = (e) => {
    let {onDragRowStart} = this.props;
    if (!this.props.rowDraggAble || this.notRowDrag) return;
    let event = Event.getEvent(e) ,
    target = Event.getTarget(event);
    if (target.tagName === 'TD') {
      target = target.parentNode;
    }
    this.currentIndex = target.getAttribute("data-row-key");

    // 拖拽其实index
    this.props.contentTable.startI = target.getAttribute("data-row-index");
    this._dragCurrent = target;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("Text", this.currentIndex);
    onDragRowStart && onDragRowStart(this.currentIndex);
  }

  onDragOver = (e) => {
    let event = Event.getEvent(e);
    event.preventDefault();
  };

  /**
   * 在一个拖动过程中，释放鼠标键时触发此事件。【目标事件】
   * @memberof TableHeader
   */
  onDrop = (e) => {
    let {onDragRow, contentTable} = this.props;
    let event = Event.getEvent(e) ,
        _target = Event.getTarget(event),
        target = _target.parentNode;
    event.preventDefault()
    event.stopPropagation();
    let currentKey = event.dataTransfer.getData("text");
    let targetKey = target.getAttribute("data-row-key");

    if(!targetKey || targetKey === currentKey)return;
    if(target.nodeName.toUpperCase() === "TR"){
      this.synchronizeTableTr(currentKey,null);
      this.synchronizeTableTr(targetKey,null);
    }
    onDragRow && onDragRow(currentKey,targetKey);
  };

  /**
   * 获取当前触摸的Dom节点
   */
  getTouchDom = (event) => {
    let currentLocation = event.changedTouches[0];
    let realTarget = document.elementFromPoint(currentLocation.clientX, currentLocation.clientY);
    return realTarget;
  }

  /**
   * 开始调整交换行的事件
   */
  onTouchStart = (e) => {
    e.stopPropagation()
    let {onDragRowStart} = this.props;
    let event = Event.getEvent(e) ,
        _target = Event.getTarget(event),
        target = _target.parentNode;

    if (target.tagName === 'TR') {

      this.currentIndex = target.getAttribute("data-row-key");

      onDragRowStart && onDragRowStart(this.currentIndex);
    }else{

      this.canBeTouch = false
    }

  }

  onTouchMove = (e) => {

    if (!this.canBeTouch) return;
    e.stopPropagation()
    let event = Event.getEvent(e);
    event.preventDefault();
    let touchTarget = this.getTouchDom(event),
        target = touchTarget.parentNode,
        targetKey = target.getAttribute("data-row-key");
    if(!targetKey || targetKey === this.currentIndex)return;
    if(target.nodeName.toUpperCase() === "TR"){
      if(this.cacheCurrentIndex !== targetKey){ //模拟 touchenter toucheleave 事件
        this.cacheCurrentIndex && this.synchronizeTableTr(this.cacheCurrentIndex,null); //去掉虚线
        this.synchronizeTableTr(targetKey,true); //添加虚线
      }
    }
  }

  /**
   * 手指移开时触发
   */
  onTouchEnd = (e) => {

    if(!this.canBeTouch){
      this.canBeTouch = true
      return
    }

    e.stopPropagation()
    let {onDragRow} = this.props;
    let event = Event.getEvent(e),
        currentKey = this.currentIndex, //拖拽行的key
        touchTarget = this.getTouchDom(event), //当前触摸的DOM节点
        target = touchTarget.parentNode, //目标位置的行
        targetKey = target.getAttribute("data-row-key"); //目标位置的行key
    if(!targetKey || targetKey === currentKey)return;
    if(target.nodeName.toUpperCase() === "TR"){
      this.synchronizeTableTr(currentKey,null);
      this.synchronizeTableTr(targetKey,null);
    }

    onDragRow && onDragRow(currentKey,targetKey);
  }

  /**
   *同步当前拖拽到阴影
   * @memberof TableRow
   */
  synchronizeTableTrShadow = ()=>{
    let {contentTable,index} = this.props;

    let cont = contentTable.querySelector('.u-table-scroll table tbody').getElementsByTagName("tr")[index],
        trs = cont.getBoundingClientRect(),
        fixed_left_trs = contentTable.querySelector('.u-table-fixed-left table tbody'),
        fixed_right_trs = contentTable.querySelector('.u-table-fixed-right table tbody');
    fixed_left_trs = fixed_left_trs && fixed_left_trs.getElementsByTagName("tr")[index].getBoundingClientRect();
    fixed_right_trs = fixed_right_trs && fixed_right_trs.getElementsByTagName("tr")[index].getBoundingClientRect()

    let div = document.createElement("div");
    let style = "wdith:"+(trs.width + (fixed_left_trs ? fixed_left_trs.width : 0) + (fixed_right_trs ? fixed_right_trs.width : 0))+"px";
    style += ";height:"+ trs.height+"px";
    style += ";classname:"+ cont.className;
    div.setAttribute("style",style);
    return div;
  }


  /**
   * 同步自己,也需要同步当前行的行显示
   */
  synchronizeTableTr = (currentIndex,type)=>{
    if(type){ //同步 this.cacheCurrentIndex
      this.cacheCurrentIndex = currentIndex;
    }
    let {contentTable} = this.props;
    let _table_trs = contentTable.querySelector('.u-table-scroll table tbody'),
     _table_fixed_left_trs = contentTable.querySelector('.u-table-fixed-left table tbody'),
    _table_fixed_right_trs = contentTable.querySelector('.u-table-fixed-right table tbody');

    _table_trs = _table_trs?_table_trs:contentTable.querySelector('.u-table table tbody');

    this.synchronizeTrStyle(_table_trs,currentIndex,type);
    if(_table_fixed_left_trs){
      this.synchronizeTrStyle(_table_fixed_left_trs,currentIndex,type);
    }
    if(_table_fixed_right_trs){
      this.synchronizeTrStyle(_table_fixed_right_trs,currentIndex,type);
    }
  }

  /**
   * 设置同步的style
   */
  synchronizeTrStyle = (_elementBody,id,type)=>{
    let {contentTable} = this.props,
    trs = _elementBody.getElementsByTagName("tr"),
    currentObj;
    for (let index = 0; index < trs.length; index++) {
      const element = trs[index];
      if(element.getAttribute("data-row-key") == id){
        currentObj = element;
      }
    }
    if(type == 'down'){
      currentObj && currentObj.setAttribute("style","border-bottom:2px solid #02B1FD");
    }else if(type){
      currentObj && currentObj.setAttribute("style","border-top:2px solid #02B1FD");
    }else{
      currentObj && currentObj.setAttribute("style","");
    }
  }

  onDragEnter = (e) => {
    const {contentTable} = this.props;
    let event = Event.getEvent(e) ,
    _target = Event.getTarget(event),target = _target.parentNode;
    let currentIndex = target.getAttribute("data-row-key");
    let dragEnterIndex = target.getAttribute("data-row-index");
    if(!currentIndex || currentIndex === this.currentIndex)return;
    const dragType = parseInt(dragEnterIndex) > parseInt(contentTable.startI)  ? 'down' : 'top'
    
    contentTable.dragType = dragType;
    if(target.nodeName.toUpperCase() === "TR"){
      this.synchronizeTableTr(currentIndex,dragType);
    }
  }

  onDragLeave = (e) => {
    let event = Event.getEvent(e) ,
    _target = Event.getTarget(event),target = _target.parentNode;
    let currentIndex = target.getAttribute("data-row-key");
    if(!currentIndex || currentIndex === this.currentIndex)return;
    if(target.nodeName.toUpperCase() === "TR"){
      this.synchronizeTableTr(currentIndex,null);
    }
  }

  componentDidUpdate(prevProps) {
    const { rowDraggAble,syncRowHeight } = this.props;
    if(!this.event){
      this.event = true;
      if(rowDraggAble){
        this.initEvent();
      }
    }
    if(this.props.treeType){
      this.setRowParentIndex();
    }
    // if(syncRowHeight){
    //   this.setRowHeight()
    // }
    this.setRowHeight()
  }

  componentWillUnmount() {
    const { record, onDestroy, index,rowDraggAble } = this.props;
    onDestroy(record, index);
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    if(rowDraggAble){
      this.removeDragAbleEvent();
    }
  }


  setRowHeight() {
    const { setRowHeight , expandedContentHeight=0,fixed,fixedIndex} = this.props
    if (!setRowHeight || !this.element || fixed) return
    setRowHeight(this.element.clientHeight + expandedContentHeight, fixedIndex)
  }
  setRowParentIndex(){
    const {index,setRowParentIndex,fixedIndex,rootIndex} = this.props;
    setRowParentIndex(rootIndex<0?index:rootIndex,fixedIndex);

  }

  onRowClick(event) {
    // fix: 解决 onRowClick 回调函数中，事件对象属性均为 null 的问题
    // 异步访问事件属性
    // 调用 event.persist() 会从事件池中移除该合成函数并允许对该合成事件的引用被保留下来。
    event.persist();
    const {
      record,
      index,
      onRowClick,
      expandable,
      expandRowByClick,
      expanded,
      onExpand,
      fixedIndex,
      onRowDoubleClick
    } = this.props;
    if (expandable && expandRowByClick) {
      onExpand(!expanded, record, fixedIndex,event);
    }
    if(!onRowDoubleClick){
      onRowClick(record, fixedIndex, event);
      return;
    }
    this.set((e)=> {
      onRowClick(record, fixedIndex, event);
    });
  }

  onRowDoubleClick(event) {
    const { record, index, onRowDoubleClick,fixedIndex } = this.props;
    this.clear();
    onRowDoubleClick && onRowDoubleClick(record, fixedIndex, event);
  }

  onMouseEnter(e) {
    const { onHover, hoverKey,fixedIndex,syncHover,record } = this.props;
    if(syncHover){
      this.setState({ hovered: true });
    }
    onHover(true, hoverKey,e,fixedIndex,record);
  }

  onMouseLeave(e) {

    const { onHover, hoverKey ,fixedIndex,syncHover,record} = this.props;
    if(syncHover){
      this.setState({ hovered: false });
    }
    onHover(false, hoverKey,e,fixedIndex,record);
  }

  stopRowDrag = (isStop) => {
    const {rowDraggAble} = this.props;
    const {notRowDrag} = this.state;
    if(rowDraggAble && isStop!== notRowDrag) {
        this.setState({
          notRowDrag: isStop
        })
    }
  }

  set =(fn)=> {
      this.clear();
      this._timeout = window.setTimeout(fn, 300);
  }

  clear =(event)=> {
    if (this._timeout) {
        window.clearTimeout(this._timeout);
    }
  }

  bindElement = (el)=> {
    this.element = el
  }

  render() {
    const {
      clsPrefix, columns, record, height, visible, index,onPaste, isPre, isSuf,
      expandIconColumnIndex, expandIconAsCell, expanded, useDragHandle,rowDraggAble,
      expandable, onExpand, needIndentSpaced, indent, indentSize,isHiddenExpandIcon,fixed,bodyDisplayInRow
      ,expandedIcon,collapsedIcon, hoverKey,lazyStartIndex,lazyEndIndex, expandIconCellWidth, getCellClassName
    } = this.props;
    const {notRowDrag} = this.state;
    const isEmptyTr = isPre || isSuf
    let showSum = false;
    let { className } = this.props;
    if (this.state.hovered) {
      className += ` ${clsPrefix}-hover`;
    }
    //判断是否为合计行
    if(className.indexOf('sumrow')>-1){
      showSum = true;
    }
    const cells = [];

    const expandIcon = (
      <ExpandIcon
        expandable={expandable}
        clsPrefix={clsPrefix}
        onExpand={onExpand}
        needIndentSpaced={needIndentSpaced}
        expanded={expanded}
        record={record}
        expandedIcon={expandedIcon}
        collapsedIcon={collapsedIcon}
        isHiddenExpandIcon={isHiddenExpandIcon}
      />
    );
    let isExpandIconAsCell = expandIconAsCell ? `${clsPrefix}-expand-columns-in-body` : '';
    var expandIndexInThisTable
    if(this.props.fixed === 'right'){
      expandIndexInThisTable = expandIconColumnIndex - this.props.leftColumnsLength-this.props.centerColumnsLength
    }else {
      expandIndexInThisTable = expandIconColumnIndex
    }
    for (let i = 0; i < columns.length; i++) {
      if (expandIconAsCell && i === 0) {
        showSum ? cells.push(<td width={expandIconCellWidth}></td>) :
        cells.push(
          <td
            className={`${clsPrefix}-expand-icon-cell ${isExpandIconAsCell}`}
            key={`rc-table-expand-icon-cell-${i}`}
            width={expandIconCellWidth}
          >
            {expandIcon}
          </td>
        );
      }
      // bugfix 设置expandRowByClick，无法显示箭头，去掉 expandRowByClick 判断
      const isColumnHaveExpandIcon = (expandIconAsCell || showSum) 
        ? false : (i === expandIndexInThisTable);
      cells.push(
        <TableCell
          clsPrefix={clsPrefix}
          record={record}
          indentSize={indentSize}
          indent={indent}
          index={index}
          column={columns[i]}
          key={index + "_"+(columns[i].key || columns[i].dataIndex || i)}
          fixed= {fixed}
          showSum={showSum}
          expandIcon={(isColumnHaveExpandIcon) ? expandIcon : null}
          bodyDisplayInRow =  {bodyDisplayInRow}
          lazyStartIndex={lazyStartIndex}
          lazyEndIndex={lazyEndIndex}
          onPaste={onPaste}
          stopRowDrag={this.stopRowDrag}
          col={i}
          getCellClassName = {getCellClassName}
        />
      );
    }
    const style = { height ,...record?record.style:undefined};
    if (!visible) {
      style.display = 'none';
    }
    if(record && record._checked){
      className += ' selected';
    }

    if(rowDraggAble && !useDragHandle && !notRowDrag) {
      className += ' row-dragg-able'
    }
    return (
      <tr
        draggable={rowDraggAble && !useDragHandle && !notRowDrag}
        onClick={this.onRowClick}
        onDoubleClick={this.onRowDoubleClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        className={`${clsPrefix} ${className} ${clsPrefix}-level-${indent}`}
        style={style}
        data-row-key={record && record.key?record.key:hoverKey}
        data-row-index={this.props.index}
        // key={hoverKey}
        ref={this.bindElement}
      >
        {cells.length > 0 ? cells : isEmptyTr ?
        <td className="loading-td">
          <div className={`loading-div ${ isPre ? 'pre' : 'suf' }`}>
            <img
              alt=''
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDJweCIgaGVpZ2h0PSI0MXB4IiB2aWV3Qm94PSIwIDAgNDIgNDEiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUzLjIgKDcyNjQzKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT53aW5kb3U8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz4KICAgICAgICA8bGluZWFyR3JhZGllbnQgeDE9IjQ5Ljc3NzAwMDElIiB5MT0iOTkuOTg4NjY2NyUiIHgyPSI0OS43NzcwMDAxJSIgeTI9IjIyLjc5MTY5ODQlIiBpZD0ibGluZWFyR3JhZGllbnQtMSI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiM4MkQ5MDAiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0ZGRkZGRiIgc3RvcC1vcGFjaXR5PSIwIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iMC4wNzY1JSIgeTE9IjQ5LjgwNDUlIiB4Mj0iODQuMDAyMTY0NCUiIHkyPSI0OS44MDQ1JSIgaWQ9ImxpbmVhckdyYWRpZW50LTIiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjRkZCRTBFIiBvZmZzZXQ9IjAlIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGRkZGRkYiIHN0b3Atb3BhY2l0eT0iMCIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgICAgICA8bGluZWFyR3JhZGllbnQgeDE9IjUwLjIyOTUwMDElIiB5MT0iLTAuMDgwOTk5OTQyOSUiIHgyPSI1MC4yMjk1MDAxJSIgeTI9IjgwLjA2MTg4MjglIiBpZD0ibGluZWFyR3JhZGllbnQtMyI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGRjQ3NDciIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0ZGRkZGRiIgc3RvcC1vcGFjaXR5PSIwIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iOTkuOTI1NjY2NyUiIHkxPSI0OS45MTglIiB4Mj0iMjQuMjY5MjQwMyUiIHkyPSI0OS45MTglIiBpZD0ibGluZWFyR3JhZGllbnQtNCI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMwMDhDREMiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0ZGRkZGRiIgc3RvcC1vcGFjaXR5PSIwIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPC9kZWZzPgogICAgPGcgaWQ9IlN5bWJvbHMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLop4blm74vbG9hZGluZyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMuMDAwMDAwLCAtMy4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9IndpbmRvdSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMy4wMDAwMDAsIDMuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i5YiG57uELTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI5LjAwMDAwMCwgMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiBmaWxsPSJ1cmwoI2xpbmVhckdyYWRpZW50LTEpIiBvcGFjaXR5PSIwLjQ5OTM3MjIxIiB4PSIwLjQwOTA5MDkwOSIgeT0iMCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjM0Ij48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0iIzAwQzg2NCIgY3g9IjYuNDA5MDkwOTEiIGN5PSIzNC4yNjY3MDkxIiByPSI2Ij48L2NpcmNsZT4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDxnIGlkPSLliIbnu4QtMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC40NTE3MjksIDI4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQtMikiIG9wYWNpdHk9IjAuNTA5MDIxNTc3IiB4PSI2LjI2MjM1NTk1IiB5PSIzLjU1MjcxMzY4ZS0xNSIgd2lkdGg9IjM0IiBoZWlnaHQ9IjEyIj48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0iI0ZGQkUwRSIgY3g9IjYuNTAyODE2OSIgY3k9IjYiIHI9IjYiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPGcgaWQ9IuWIhue7hCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMS4wMDAwMDAsIDAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0idXJsKCNsaW5lYXJHcmFkaWVudC0zKSIgb3BhY2l0eT0iMC41MDEyMzIzMjkiIHg9Ii0yLjY1NTY1MzQ3ZS0xMyIgeT0iNS43ODgyMTI4MSIgd2lkdGg9IjEyIiBoZWlnaHQ9IjM0Ij48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0iI0ZGNDc0NyIgY3g9IjYiIGN5PSI2IiByPSI2Ij48L2NpcmNsZT4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC45NTQ1NDUsIDAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0idXJsKCNsaW5lYXJHcmFkaWVudC00KSIgb3BhY2l0eT0iMC41MDQxODUyNjgiIHg9IjAiIHk9IjAiIHdpZHRoPSIzNiIgaGVpZ2h0PSIxMS45NDI2NTY5Ij48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0iIzAwOENEQyIgY3g9IjM1IiBjeT0iNiIgcj0iNiI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==" />
          </div>
          </td> : <td style={{width: 0,padding: 0}}>
        </td>}
      </tr>
    );
  }
};

TableRow.propTypes = propTypes;
TableRow.defaultProps = defaultProps;

export default TableRow;
