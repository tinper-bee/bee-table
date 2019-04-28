import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Event,EventUtil} from "./utils";
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
};

const defaultProps = {
    onRowClick() {},
    onRowDoubleClick() {},
    onDestroy() {},
    expandIconColumnIndex: 0,
    expandRowByClick: false,
    onHover() {},
    className:'',
    setRowParentIndex:()=>{},
    rowDraggAble:false,
    // onDragRow:()=>{}
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
      {key:'dragstart',fun:this.onDragStart},
      {key:'dragover', fun:this.onDragOver},
      {key:'drop', fun:this.onDrop},

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
    if (!this.props.rowDraggAble) return;
    let event = Event.getEvent(e) ,
    target = Event.getTarget(event);
     this.currentIndex = target.getAttribute("data-row-key");
     this._dragCurrent = target;
 
    //TODO 自定义图像后续需要增加。
    //  let crt = this.synchronizeTableTrShadow(); 
    //  document.getElementById(this.props.tableUid).appendChild(crt);
    // event.dataTransfer.setDragImage(crt, 0, 0);
     event.dataTransfer.effectAllowed = "move";
     event.dataTransfer.setData("Text", this.currentIndex);
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
    let {rowDraggAble,onDragRow} = this.props;
    let event = Event.getEvent(e) ,
    _target = Event.getTarget(event),target = _target.parentNode;
    
    let currentKey = event.dataTransfer.getData("text");
    let targetKey = target.getAttribute("data-row-key");

    if(!targetKey || targetKey === currentKey)return;    
    if(target.nodeName.toUpperCase() === "TR"){
      this.synchronizeTableTr(currentKey,null);
      this.synchronizeTableTr(targetKey,null);
      // target.setAttribute("style","");
      // this.synchronizeTrStyle(this.currentIndex,false);
    }
    onDragRow && onDragRow(currentKey,targetKey);
  };


  /**
   *同步当前拖拽到阴影
   * @memberof TableRow
   */
  synchronizeTableTrShadow = ()=>{
    let {contentTable,index} = this.props; 

    let _table_cont = contentTable.querySelector('.u-table-scroll table tbody').getElementsByTagName("tr")[index],
    _table_trs = _table_cont.getBoundingClientRect(),
     _table_fixed_left_trs = contentTable.querySelector('.u-table-fixed-left table tbody').getElementsByTagName("tr")[index].getBoundingClientRect(),
    _table_fixed_right_trs = contentTable.querySelector('.u-table-fixed-right table tbody').getElementsByTagName("tr")[index].getBoundingClientRect();

    let div = document.createElement("div");
    let style = "wdith:"+(_table_trs.width + _table_fixed_left_trs.width + _table_fixed_right_trs.width)+"px";
    style += "height:"+ _table_trs.height+"px";
    style += "classname:"+ _table_cont.className;
    div.setAttribute("style",style);
    return div;
  }


  /**
   * 同步自己,也需要同步当前行的行显示
   */
  synchronizeTableTr = (currentIndex,type)=>{
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
    if(type){
      currentObj && currentObj.setAttribute("style","border-bottom:2px dashed rgba(5,0,0,0.25)");
    }else{
      currentObj && currentObj.setAttribute("style","");
    }
  }

  onDragEnter = (e) => {
    let event = Event.getEvent(e) ,
    _target = Event.getTarget(event),target = _target.parentNode;
    let currentIndex = target.getAttribute("data-row-key");
    if(!currentIndex || currentIndex === this.currentIndex)return;
    if(target.nodeName.toUpperCase() === "TR"){
      this.synchronizeTableTr(currentIndex,true);
      // target.setAttribute("style","border-bottom:2px dashed rgba(5,0,0,0.25)");
      // // target.style.backgroundColor = 'rgb(235, 236, 240)'; 
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
    const { rowDraggAble } = this.props;
    if(!this.event){
      this.event = true;
      if(rowDraggAble){
        this.initEvent();
      }
    }

    if(this.props.treeType){
      this.setRowParentIndex();
    }
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
    const {
      record,
      index,
      onRowClick,
      expandable,
      expandRowByClick,
      expanded,
      onExpand,
      fixedIndex
    } = this.props;
    if (expandable && expandRowByClick) {
      onExpand(!expanded, record, fixedIndex,event);
    }
    this.set((e)=> {  
      onRowClick(record, fixedIndex, event);
    });
  }

  onRowDoubleClick(event) {
    const { record, index, onRowDoubleClick,fixedIndex } = this.props;
    this.clear();
    onRowDoubleClick(record, fixedIndex, event);
  }

  onMouseEnter(e) {
    const { onHover, hoverKey,fixedIndex,syncHover } = this.props;
    if(syncHover){
      this.setState({ hovered: true });
    }
    onHover(true, hoverKey,e,fixedIndex);
  }

  onMouseLeave(e) {

    const { onHover, hoverKey ,fixedIndex,syncHover} = this.props;
    if(syncHover){
      this.setState({ hovered: false });
    }
    onHover(false, hoverKey,e,fixedIndex);
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
      clsPrefix, columns, record, height, visible, index,
      expandIconColumnIndex, expandIconAsCell, expanded, expandRowByClick,rowDraggAble,
      expandable, onExpand, needIndentSpaced, indent, indentSize,isHiddenExpandIcon,fixed,bodyDisplayInRow
    } = this.props;
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
        isHiddenExpandIcon={isHiddenExpandIcon}
      />
    );

    for (let i = 0; i < columns.length; i++) {
      if (expandIconAsCell && i === 0 && !showSum ) {
        cells.push(
          <td
            className={`${clsPrefix}-expand-icon-cell`}
            key={`rc-table-expand-icon-cell-${i}`}
          >
            {expandIcon}
          </td>
        );
      }
      const isColumnHaveExpandIcon = (expandIconAsCell || expandRowByClick || showSum)
        ? false : (i === expandIconColumnIndex);
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
        />
      );
    }
    const style = { height };
    if (!visible) {
      style.display = 'none';
    }
    
    return ( 
      <tr
        draggable={rowDraggAble}
        onClick={this.onRowClick}
        onDoubleClick={this.onRowDoubleClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        className={`${clsPrefix} ${className} ${clsPrefix}-level-${indent}`}
        style={style}
        data-row-key={record && record.key?record.key:"null"}
        // key={hoverKey}
        ref={this.bindElement}
      >
        {cells.length>0?cells:<td></td>}
      </tr>
    );
  }
};

TableRow.propTypes = propTypes;
TableRow.defaultProps = defaultProps;

export default TableRow;
