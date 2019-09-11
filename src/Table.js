import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from 'component-classes';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import { measureScrollbar, debounce, warningOnce ,getMaxColChildrenLength} from './lib/utils';
import shallowequal from 'shallowequal';
import addEventListener from 'tinper-bee-core/lib/addEventListener';
import ColumnManager from './ColumnManager';
import createStore from './createStore';
import Loading from 'bee-loading';
import Icon from 'bee-icon';
import { Event,EventUtil,closest} from "./lib/utils";
import i18n from "./lib/i18n";
import { getComponentLocale } from "bee-locale/build/tool";

const propTypes = {
  data: PropTypes.array,
  expandIconAsCell: PropTypes.bool,
  defaultExpandAllRows: PropTypes.bool,
  expandedRowKeys: PropTypes.array,
  defaultExpandedRowKeys: PropTypes.array,
  useFixedHeader: PropTypes.bool,
  columns: PropTypes.array,
  clsPrefix: PropTypes.string,
  bodyStyle: PropTypes.object,
  style: PropTypes.object,
  //特殊的渲染规则的key值
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  rowClassName: PropTypes.func,
  expandedRowClassName: PropTypes.func,
  childrenColumnName: PropTypes.string,
  onExpand: PropTypes.func,
  onRowHover:PropTypes.func,
  onExpandedRowsChange: PropTypes.func,
  indentSize: PropTypes.number,
  onRowClick: PropTypes.func,
  onRowDoubleClick: PropTypes.func,
  expandIconColumnIndex: PropTypes.number,
  //是否显示表头
  showHeader: PropTypes.bool,
  title: PropTypes.func,
  footer: PropTypes.func,
  emptyText: PropTypes.func,
  scroll: PropTypes.object,
  rowRef: PropTypes.func,
  getBodyWrapper: PropTypes.func,
  children: PropTypes.node,
  draggable: PropTypes.bool,
  minColumnWidth: PropTypes.number,
  filterable: PropTypes.bool,
  filterDelay: PropTypes.number,
  onFilterChange: PropTypes.func,
  onFilterClear: PropTypes.func,
  syncHover: PropTypes.bool,
  tabIndex:PropTypes.string,
  hoverContent:PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  rowDraggAble: PropTypes.bool,
  onDropRow: PropTypes.func,
  onDragRowStart: PropTypes.func,
  onBodyScroll: PropTypes.func,
  bodyDisplayInRow: PropTypes.bool, // 表格内容超出列宽度时进行换行 or 以...形式展现
  headerDisplayInRow: PropTypes.bool, // 表头内容超出列宽度时进行换行 or 以...形式展现
  showRowNum: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]), // 表格是否自动生成序号,格式为{base:number || 0,defaultKey:string || '_index',defaultName:string || '序号'}
};

const defaultProps = {
  data: [],
  useFixedHeader: false,
  expandIconAsCell: false,
  defaultExpandAllRows: false,
  defaultExpandedRowKeys: [],
  rowKey: 'key',
  rowClassName: () => '',
  expandedRowClassName: () => '',
  onExpand() { },
  onExpandedRowsChange() { },
  onRowClick() { },
  onRowDoubleClick() { },
  clsPrefix: 'u-table',
  bodyStyle: {},
  style: {},
  childrenColumnName: 'children',
  indentSize: 15,
  expandIconColumnIndex: 0,
  showHeader: true,
  scroll: {},
  rowRef: () => null,
  getBodyWrapper: body => body,
  // emptyText: () => <div><Icon type="uf-nodata" className="table-nodata"></Icon><span>{locale["no_data"]}</span></div>,
  columns:[],
  minColumnWidth: 80,
  locale:{},
  syncHover: true,
  setRowHeight:()=>{},
  setRowParentIndex:()=>{},
  tabIndex:'0',
  heightConsistent:false,
  size: 'md',
  rowDraggAble:false,
  onDropRow: ()=>{},
  onDragRowStart: ()=>{},
  onBodyScroll: ()=>{},
  bodyDisplayInRow: true,
  headerDisplayInRow: true,
  showRowNum: false,
};

class Table extends Component {
  constructor(props) {
    super(props);
    let expandedRowKeys = [];
    let rows = [...props.data];
    this.columnManager = new ColumnManager(props.columns, props.children, props.originWidth, props.rowDraggAble, props.showRowNum); // 加入props.showRowNum参数
    this.store = createStore({ currentHoverKey: null });
    this.firstDid = true;
    if (props.defaultExpandAllRows) {
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        expandedRowKeys.push(this.getRowKey(row, i));
        rows = rows.concat(row[props.childrenColumnName] || []);
      }
    } else {
      expandedRowKeys = props.expandedRowKeys || props.defaultExpandedRowKeys;
    }
    this.state = {
      expandedRowKeys,
      data: props.data,
      currentHoverKey: null,
      scrollPosition: 'left',
      fixedColumnsHeadRowsHeight: [],
      fixedColumnsBodyRowsHeight: [],
      fixedColumnsExpandedRowsHeight: {}, //扩展行的高度
    }

    this.onExpandedRowsChange = this.onExpandedRowsChange.bind(this);
    this.onExpanded = this.onExpanded.bind(this);
    this.onRowDestroy = this.onRowDestroy.bind(this);
    this.getRowKey = this.getRowKey.bind(this);
    this.getExpandedRows = this.getExpandedRows.bind(this);
    this.getHeader = this.getHeader.bind(this);
    this.getHeaderRows = this.getHeaderRows.bind(this);
    this.getExpandedRow = this.getExpandedRow.bind(this);
    this.getRowsByData = this.getRowsByData.bind(this);
    this.getRows = this.getRows.bind(this);
    this.getColGroup = this.getColGroup.bind(this);
    this.getLeftFixedTable = this.getLeftFixedTable.bind(this);
    this.getRightFixedTable = this.getRightFixedTable.bind(this);
    this.getTable = this.getTable.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.getFooter = this.getFooter.bind(this);
    this.getEmptyText = this.getEmptyText.bind(this);
    this.getHeaderRowStyle = this.getHeaderRowStyle.bind(this);
    this.syncFixedTableRowHeight = this.syncFixedTableRowHeight.bind(this);
    this.resetScrollX = this.resetScrollX.bind(this);
    this.findExpandedRow = this.findExpandedRow.bind(this);
    this.isRowExpanded = this.isRowExpanded.bind(this);
    this.detectScrollTarget = this.detectScrollTarget.bind(this);
    this.handleBodyScroll = this.handleBodyScroll.bind(this);
    this.handleRowHover = this.handleRowHover.bind(this);
    this.computeTableWidth = this.computeTableWidth.bind(this);
    this.onBodyMouseLeave = this.onBodyMouseLeave.bind(this);
    this.tableUid = null;
    this.contentTable = null;
    this.leftColumnsLength  //左侧固定列的长度
    this.centerColumnsLength  //非固定列的长度
  }
  componentWillMount() {
    this.centerColumnsLength = this.columnManager.centerColumns().length
    this.leftColumnsLength = this.columnManager.leftColumns().length
  }

  componentDidMount() {
    this.getTableUID();
    EventUtil.addHandler(this.contentTable,'keydown',this.onKeyDown);
    EventUtil.addHandler(this.contentTable,'focus',this.onFocus);
    setTimeout(this.resetScrollX, 300);
    //含有纵向滚动条
    // if(this.props.scroll.y){
       this.scrollbarWidth = measureScrollbar();
    // }
    //后续也放在recevice里面
    if (!this.props.originWidth) {
      this.computeTableWidth();
    }
    if (this.columnManager.isAnyColumnsFixed()) {
      this.syncFixedTableRowHeight();
      this.resizeEvent = addEventListener(
        window, 'resize', this.resize
      );
    }

  }

  componentWillReceiveProps(nextProps) {
    if ('data' in nextProps) {
      this.setState({
        data: nextProps.data,
      });
    }
    if ('expandedRowKeys' in nextProps) {
      this.setState({
        expandedRowKeys: nextProps.expandedRowKeys,
      });
    }
    if (nextProps.columns && nextProps.columns !== this.props.columns) {
      this.columnManager.reset(nextProps.columns, null, this.props.showRowNum); // 加入this.props.showRowNum参数
      if(nextProps.columns.length !== this.props.columns.length && this.refs && this.bodyTable){
         this.scrollTop = this.bodyTable.scrollTop;
     }
    } else if (nextProps.children !== this.props.children) {
      this.columnManager.reset(null, nextProps.children,this.porps.showRowNum); // 加入this.props.showRowNum参数
    }
    //适配lazyload
    if(nextProps.scrollTop > -1){
      // this.bodyTable.scrollTop = nextProps.scrollTop;
      this.scrollTop = nextProps.scrollTop;
    }
    if (!nextProps.originWidth) {
      this.computeTableWidth();
      this.firstDid = true;//避免重复update
    }
    if(nextProps.resetScroll){
      this.resetScrollX();
    }
    // fix:模态框中使用table，计算的滚动条宽度为0的bug
    // fix:表格首次渲染时 display:none，再显示时，未重新计算，导致表行出现错位的bug
    if(this.scrollbarWidth<=0 && this.props.scroll.y){
      this.scrollbarWidth = measureScrollbar();
    }


    // console.log('this.scrollTop**********',this.scrollTop);

  }

  componentDidUpdate(prevProps) {

    if (this.columnManager.isAnyColumnsFixed()) {
      this.syncFixedTableRowHeight();
    }
    //适应模态框中表格、以及父容器宽度变化的情况
    if (typeof (this.props.scroll.x) !== 'number' && this.contentTable.getBoundingClientRect().width !== this.contentDomWidth && this.firstDid) {
      this.computeTableWidth();
      this.firstDid = false;//避免重复update
    }
    if(this.scrollTop > -1){
      this.refs.fixedColumnsBodyLeft && ( this.refs.fixedColumnsBodyLeft.scrollTop = this.scrollTop);
      this.refs.fixedColumnsBodyRight && ( this.refs.fixedColumnsBodyRight.scrollTop = this.scrollTop);
      this.bodyTable.scrollTop = this.scrollTop;
      this.scrollTop = -1;
    }
    if (prevProps.data.length === 0  || this.props.data.length === 0 ) {
      this.resetScrollX();
    }

    // 是否传入 scroll中的y属性，如果传入判断是否是整数，如果是则进行比较 。bodyTable 的clientHeight进行判断
    this.isShowScrollY();
  }

  componentWillUnmount() {
    // 移除绑定事件,避免内存泄漏
    this.contentTable = null;
    EventUtil.removeHandler(this.contentTable,'keydown',this.onKeyDown);
    EventUtil.removeHandler(this.contentTable,'focus',this.onFocus);
    if (this.resizeEvent) {
      this.resizeEvent.remove();
    }
  }

  resize = ()=>{
    debounce(this.syncFixedTableRowHeight, 150);
    this.computeTableWidth();
    let renderFlag = this.state.renderFlag;
    this.setState({
      renderFlag: !renderFlag
    });
  }

  getTableUID =()=>{
    let uid = "_table_uid_"+new Date().getTime();
    this.tableUid = uid;
    let div = document.createElement("div");
    // div.className = "u-table-drag-hidden-cont";
    div.className = "u-table-drag-hidden-cont";
    div.id = uid;
    this.contentTable.appendChild(div);
  }

  computeTableWidth() {

    //如果用户传了scroll.x按用户传的为主
    let setWidthParam = this.props.scroll.x

    if (typeof (setWidthParam) == 'number') {
      let numSetWidthParam = parseInt(setWidthParam);
      this.contentWidth = numSetWidthParam;
    } else {
      // this.preContentDomWidth = this.contentDomWidth;
      //计算总表格宽度、根据表格宽度和各列的宽度和比较，重置最后一列
      this.contentDomWidth = this.contentTable.getBoundingClientRect().width//表格容器宽度

      this.contentWidth = this.contentDomWidth;//默认与容器宽度一样

    }
    const computeObj = this.columnManager.getColumnWidth(this.contentWidth);
    let lastShowIndex = computeObj.lastShowIndex;
    this.computeWidth = computeObj.computeWidth;

    this.domWidthDiff = this.contentDomWidth - this.computeWidth;
    if (typeof (setWidthParam) == 'string' && setWidthParam.indexOf('%')) {
      this.contentWidth = this.contentWidth * parseInt(setWidthParam) / 100;
      this.domWidthDiff = this.contentDomWidth - this.contentWidth;
    }

    if (this.computeWidth < this.contentWidth) {
      let contentWidthDiff = this.scrollbarWidth?this.contentWidth - this.computeWidth-this.scrollbarWidth:this.contentWidth - this.computeWidth;
      //bordered的表格需要减去边框的差值1
      if(this.props.bordered){
        contentWidthDiff = contentWidthDiff-1;
      }
      this.setState({ contentWidthDiff, lastShowIndex });
    } else {
      this.contentWidth = this.computeWidth;
      this.setState({ contentWidthDiff: 0, lastShowIndex });//重新渲染，为了显示滚动条
    }
  }
  //根据内容动态的判断是否显示纵向滚动条
  isShowScrollY(){
    const props = this.props;
    const y = props.scroll && props.scroll.y;
    if(y){
      const bodyH = this.bodyTable.clientHeight;
      const bodyContentH = this.bodyTable.querySelector('table').clientHeight;
      const rightBodyTable = this.refs.fixedColumnsBodyRight;
      // const leftBodyTable = this.refs.fixedColumnsBodyLeft;
      const overflowy = bodyContentH <= bodyH ? 'auto':'scroll';
      this.bodyTable.style.overflowY = overflowy;

      this.headTable.style.overflowY = overflowy;
      rightBodyTable && (rightBodyTable.style.overflowY = overflowy);
      // 没有纵向滚动条时，表头横向滚动条根据内容动态显示 待验证
      // if(overflowy == 'auto'){
      //   this.fixedHeadTable && (this.fixedHeadTable.style.overflowX = 'auto');
      //   rightBodyTable && (rightBodyTable.style.overflowX = 'auto');
      //   leftBodyTable && (leftBodyTable.style.overflowX = 'auto');
      // }


    }
  }
  onExpandedRowsChange(expandedRowKeys) {
    if (!this.props.expandedRowKeys) {
      this.setState({ expandedRowKeys });
    }
    this.props.onExpandedRowsChange(expandedRowKeys);
  }

  onExpanded(expanded, record, index, e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const info = this.findExpandedRow(record);
    if (typeof info !== 'undefined' && !expanded) {
      this.onRowDestroy(record, index);
    } else if (!info && expanded) {
      const expandedRows = this.getExpandedRows().concat();
      expandedRows.push(this.getRowKey(record, index));
      this.onExpandedRowsChange(expandedRows);
    }
    this.props.onExpand(expanded, record,index);
  }

  onRowDestroy(record, rowIndex) {
    const expandedRows = this.getExpandedRows().concat();
    const rowKey = this.getRowKey(record, rowIndex);
    let index = -1;
    expandedRows.forEach((r, i) => {
      if (r === rowKey) {
        index = i;
      }
    });
    if (index !== -1) {
      expandedRows.splice(index, 1);
    }
    //
    if(this.currentHoverKey == rowKey && this.hoverDom){
      this.hoverDom.style.display = 'none';
    }
    this.onExpandedRowsChange(expandedRows);
  }

  getRowKey(record, index) {
    const rowKey = this.props.rowKey;
    const key = (typeof rowKey === 'function') ?
      rowKey(record, index) : record[rowKey];
    warningOnce(
      key !== undefined,
      'Each record in table should have a unique `key` prop,' +
      'or set `rowKey` to an unique primary key.'
    );
    return key;


  }

  getExpandedRows() {
    return this.props.expandedRowKeys || this.state.expandedRowKeys;
  }

  getHeader(columns, fixed, leftFixedWidth, rightFixedWidth) {
    const { filterDelay, onFilterChange, onFilterClear, filterable, showHeader, expandIconAsCell, clsPrefix, onDragStart, onDragEnter, onDragOver, onDrop,onDragEnd, draggable,
      onMouseDown, onMouseMove, onMouseUp, dragborder, onThMouseMove, dragborderKey, minColumnWidth, headerHeight,afterDragColWidth,headerScroll ,bordered,onDropBorder,onDraggingBorder} = this.props;
    const rows = this.getHeaderRows(columns);
    if (expandIconAsCell && fixed !== 'right') {
      rows[0].unshift({
        key: 'u-table-expandIconAsCell',
        className: `${clsPrefix}-expand-icon-th`,
        title: '',
        rowSpan: rows.length,
      });
    }

    const trStyle = headerHeight&&!fixed ? { height: headerHeight } : (fixed ? this.getHeaderRowStyle(columns, rows) : null);
    let drop = draggable ? { onDragStart, onDragOver, onDrop,onDragEnd, onDragEnter, draggable } : {};
    let dragBorder = dragborder ? { onMouseDown, onMouseMove, onMouseUp, dragborder, onThMouseMove, dragborderKey,onDropBorder,onDraggingBorder } : {};
    let contentWidthDiff = 0;
    //非固定表格,宽度不够时自动扩充
    if (!fixed) {
      contentWidthDiff = this.state.contentWidthDiff
    }
    return showHeader ? (
      <TableHeader
        {...drop}
        {...dragBorder}
        locale={this.props.locale}
        minColumnWidth={minColumnWidth}
        contentWidthDiff={contentWidthDiff}
        contentWidth={this.contentWidth}
        lastShowIndex={this.state.lastShowIndex}
        clsPrefix={clsPrefix}
        rows={rows}
        contentTable={this.contentTable}
        rowStyle={trStyle}
        fixed={fixed}
        filterable={filterable}
        onFilterChange={onFilterChange}
        onFilterClear={onFilterClear}
        filterDelay={filterDelay}
        afterDragColWidth = {afterDragColWidth}
        contentDomWidth={this.contentDomWidth}
        scrollbarWidth = {this.scrollbarWidth}
        headerScroll = {headerScroll}
        bordered = {bordered}
        leftFixedWidth = {leftFixedWidth}
        rightFixedWidth = {rightFixedWidth}
      />
    ) : null;
  }

  getHeaderRows(columns, currentRow = 0, rows) {
    let { contentWidthDiff = 0, lastShowIndex = -1 } = this.state;
    let filterCol = [];
    rows = rows || [];
    rows[currentRow] = rows[currentRow] || [];

    columns.forEach((column,i) => {
      if (column.rowSpan && rows.length < column.rowSpan) {
        while (rows.length < column.rowSpan) {
          rows.push([]);
        }
      }
      let width = column.width;
      if (typeof (width) == 'string' && width.indexOf('%') > -1 && this.contentWidth) {
        width = parseInt(this.contentWidth * parseInt(width) / 100);
      } else if (width) {
        width = parseInt(width);
      }
      if (lastShowIndex == i && width) {
        width = width + contentWidthDiff;
      }
      const cell = {
        key: column.key,
        className: column.className || '',
        children: column.title,
        drgHover: column.drgHover,
        fixed: column.fixed,
        width: width,
        dataindex:column.dataIndex,
        textAlign:column.textAlign,
        titleAlign: column.titleAlign, // 标题水平对齐方式
        required: column.required, // 标题是否展示必填标志
      };
      if (column.onHeadCellClick) {
        cell.onClick = column.onHeadCellClick;
      }
      if (column.children) {
        this.getHeaderRows(column.children, currentRow + 1, rows);
      }
      if ('colSpan' in column) {
        cell.colSpan = column.colSpan;
      }
      if ('rowSpan' in column) {
        cell.rowSpan = column.rowSpan;
      }
      if (cell.colSpan !== 0) {
        rows[currentRow].push(cell);
      }
      //判断是否启用过滤
      if (this.props.filterable) {
        //组装Filter需要的Col
        filterCol.push({
          key: column.key,
          children: "过滤渲染",
          width: column.width,
          filtertype: column.filterType,//下拉的类型 包括['text','dropdown','date','daterange','number']
          dataindex: column.dataIndex,//field
          datasource: this.props.data,//需要单独拿到数据处理
          format: column.format,//设置日期的格式
          filterdropdown: column.filterDropdown,//是否显示 show hide
          filterdropdownauto: column.filterDropdownAuto,//是否自定义数据
          filterdropdowndata: column.filterDropdownData,//自定义数据格式
          filterdropdownfocus: column.filterDropdownFocus,//焦点触发函数回调
          filterdropdowntype: column.filterDropdownType,//下拉的类型分为 String,Number 默认是String
          filterdropdownincludekeys: column.filterDropdownIncludeKeys,//下拉条件按照指定的keys去显示
          filterinputnumberoptions: column.filterInputNumberOptions//设置数值框内的详细属性
        });
      }
    });
    if (this.props.filterable) {
      rows.push(filterCol);
    }
    return rows.filter(row => row.length > 0);
  }

  getExpandedRow(key, content, visible, className, fixed) {
    const { clsPrefix, expandIconAsCell } = this.props;
    let colCount;
    if (fixed === 'left') {
      colCount = this.columnManager.leftLeafColumns().length;
    } else if (fixed === 'right') {
      colCount = this.columnManager.rightLeafColumns().length;
    } else {
      colCount = this.columnManager.centerColumns().length; //计算非固定列的个数，fix: 嵌套表格场景，右侧列断开的问题
    }

    let expandedRowHeight = this.state.fixedColumnsExpandedRowsHeight[key] || 'auto';
    function contentContainer() {
      if (content && content.props && content.props.style) {
        return (
          <div style={{ height: content.props.style.height }}></div>
        )
      } else {
        return ' '
      }
    }

    const columns = [{
      key: 'extra-row',
      render: () => ({
        props: {
          colSpan: colCount,
        },
        children: !fixed ? content : contentContainer(),
      }),
    }];
    if (expandIconAsCell && fixed !== 'right') {
      columns.unshift({
        key: 'expand-icon-placeholder',
        render: () => null,
      });
    }
    return (
      <TableRow
        columns={columns}
        visible={visible}
        className={className}
        key={`${key}-extra-row`}
        clsPrefix={`${clsPrefix}-expanded-row`}
        indent={1}
        expandable={false}
        store={this.store}
        dragborderKey={this.props.dragborderKey}
        rowDraggAble={this.props.rowDraggAble}
        onDragRow={this.onDragRow}
        onDragRowStart={this.onDragRowStart}
        height={expandedRowHeight}
      />
    );
  }

  /**
   * 行拖拽开始时触发
   * @param currentKey 当前拖拽目标的key
   */
  onDragRowStart = (currentKey) => {
    let {data} = this.state,currentIndex,record;
    data.forEach((da,i)=>{
      // tr 的唯一标识通过 data.key 或 rowKey 两种方式传进来
      let trKey = da.key ? da.key : this.getRowKey(da, i);
      if(trKey == currentKey){
        currentIndex = i;
        record = da;
      }
    });
    this.props.onDragRowStart && this.props.onDragRowStart(record,currentIndex);
  }

  /**
   * 行拖拽结束时触发
   * @param currentKey 当前拖拽目标的key
   * @param targetKey 拖拽结束时，目标位置的key
   */
  onDragRow = (currentKey,targetKey)=>{
    let {data} = this.state,currentIndex,targetIndex,record;
    data.forEach((da,i)=>{
      // tr 的唯一标识通过 data.key 或 rowKey 两种方式传进来
      let trKey = da.key ? da.key : this.getRowKey(da, i);
      if(trKey == currentKey){
        currentIndex = i;
        record = da;
      }
      if(trKey == targetKey){
        targetIndex = i;
      }
    });
    data = this.swapArray(data,currentIndex,targetIndex);
    this.props.onDropRow && this.props.onDropRow(data,record);
    this.setState({
      data,
    });
  }
  /**
  * 数组元素交换位置
  * @param {array} arr 数组
  * @param {number} index1 添加项目的位置
  * @param {number} index2 删除项目的位置
  */
  swapArray = (arr, index1, index2) => {
    var value1 = arr[index1]
    arr.splice(index1,1)
    if(index1<index2){
      arr.splice(index2,0,value1)

    }else {
      arr.splice(index2+1,0,value1)
    }

     return arr;
  }

  /**
   *
   *
   * @param {*} data
   * @param {*} visible
   * @param {*} indent 层级
   * @param {*} columns
   * @param {*} fixed
   * @param {number} [rootIndex=-1] 祖级节点
   * @returns
   * @memberof Table
   */
  getRowsByData(data, visible, indent, columns, fixed,rootIndex=-1) {
    const props = this.props;
    const childrenColumnName = props.childrenColumnName;
    const expandedRowRender = props.expandedRowRender;
    const expandRowByClick = props.expandRowByClick;
    const { fixedColumnsBodyRowsHeight } = this.state;
    let rst = [];

    let height;
    const rowClassName = props.rowClassName;
    const rowRef = props.rowRef;
    const expandedRowClassName = props.expandedRowClassName;
    const needIndentSpaced = props.data.some(record => record[childrenColumnName]);
    const onRowClick = props.onRowClick;
    const onRowDoubleClick = props.onRowDoubleClick;

    const expandIconAsCell = fixed !== 'right' ? props.expandIconAsCell : false;
    const expandIconColumnIndex = props.expandIconColumnIndex
    if(props.lazyLoad && props.lazyLoad.preHeight && indent == 0){
      rst.push(
        <TableRow height={props.lazyLoad.preHeight} columns={[]} className='' key={'table_row_first'} store={this.store} visible = {true}/>
      )
    }
    const lazyCurrentIndex =  props.lazyLoad && props.lazyLoad.startIndex ?props.lazyLoad.startIndex :0;
    const lazyParentIndex = props.lazyLoad && props.lazyLoad.startParentIndex ?props.lazyLoad.startParentIndex :0;
    const lazyEndIndex =  props.lazyLoad && props.lazyLoad.endIndex ?props.lazyLoad.endIndex :-1;
    for (let i = 0; i < data.length; i++) {
      let isHiddenExpandIcon;
      // if ( props.showRowNum ){
      //   switch(props.showRowNum.type){
      //     case 'number':{
      //       data[i][props.showRowNum.key || '_index'] = (props.showRowNum.base || 0) + i;
      //       break;
      //     }
      //     case 'ascii': {
      //       data[i][props.showRowNum.key || '_index'] = String.fromCharCode(i + (props.showRowNum.base || '0').charCodeAt());
      //       break;
      //     }
      //     default: {
      //       data[i][props.showRowNum.key || '_index'] = (props.showRowNum.base || 0) + i;
      //       break;
      //     }
      //   }
        
      // } 
      const record = data[i];
      const key = this.getRowKey(record, i);
      const isLeaf = typeof record['isLeaf'] === 'boolean' && record['isLeaf'] || false;
      const childrenColumn = isLeaf ? false : record[childrenColumnName];
      const isRowExpanded = this.isRowExpanded(record, i);
      let expandedRowContent;
      let expandedContentHeight = 0;
        //fixedIndex一般是跟index是一个值的，只有是树结构时，会讲子节点的值也累计上
        let fixedIndex = i;
        //判断是否是tree结构
        if (this.treeType) {
          fixedIndex = this.treeRowIndex;
        }
      if (expandedRowRender && isRowExpanded) {
        expandedRowContent = expandedRowRender(record, fixedIndex+lazyCurrentIndex, indent);
        expandedContentHeight = parseInt(expandedRowContent.props && expandedRowContent.props.style && expandedRowContent.props.style.height?expandedRowContent.props.style.height:0);
      }
      //只有当使用expandedRowRender参数的时候才去识别isHiddenExpandIcon（隐藏行展开的icon）
      if (expandedRowRender && typeof props.haveExpandIcon == 'function') {
        isHiddenExpandIcon = props.haveExpandIcon(record, i);
      }


      const onHoverProps = {};

      onHoverProps.onHover = this.handleRowHover;


      if (props.bodyDisplayInRow && props.height) {
        height = props.height
      } else if(fixed || props.heightConsistent) {
        height = fixedColumnsBodyRowsHeight[fixedIndex];
      }

      let leafColumns;
      if (fixed === 'left') {
        leafColumns = this.columnManager.leftLeafColumns();
      } else if (fixed === 'right') {
        leafColumns = this.columnManager.rightLeafColumns();
      } else {
        leafColumns = this.columnManager.leafColumns();
      }
      let className = rowClassName(record, fixedIndex+lazyCurrentIndex, indent);

      //合计代码如果是最后一行并且有合计功能时，最后一行为合计列
      if(i == data.length -1 && props.showSum){
        className = className + ' sumrow';
      }

      let paramRootIndex = rootIndex;
      //小于0说明为第一层节点，她的子孙节点要保存自己的根节点
      if(paramRootIndex<0){
        paramRootIndex = i+lazyParentIndex;
      }
      let index = i;
      if(rootIndex ==-1){
        index = i+lazyParentIndex
      }
      rst.push(
        <TableRow
          indent={indent}
          indentSize={props.indentSize}
          needIndentSpaced={needIndentSpaced}
          className={`${className} ${this.props.rowDraggAble?' row-dragg-able ':''}`}
          record={record}
          expandIconAsCell={expandIconAsCell}
          onDestroy={this.onRowDestroy}
          index={index}
          visible={visible}
          expandRowByClick={expandRowByClick}
          onExpand={this.onExpanded}
          expandable={childrenColumn || expandedRowRender}
          expanded={isRowExpanded}
          clsPrefix={`${props.clsPrefix}-row`}
          childrenColumnName={childrenColumnName}
          columns={leafColumns}
          expandIconColumnIndex={expandIconColumnIndex}
          onRowClick={onRowClick}
          onRowDoubleClick={onRowDoubleClick}
          height={height}
          isHiddenExpandIcon={isHiddenExpandIcon}
          {...onHoverProps}
          key={"table_row_"+key+"_"+index}
          hoverKey={key}
          ref={rowRef}
          store={this.store}
          fixed={fixed}
          expandedContentHeight={expandedContentHeight}
          setRowHeight={props.setRowHeight}
          setRowParentIndex={props.setRowParentIndex}
          treeType={childrenColumn||this.treeType?true:false}
          fixedIndex={fixedIndex+lazyCurrentIndex}
          rootIndex = {rootIndex}
          syncHover = {props.syncHover}
          bodyDisplayInRow = {props.bodyDisplayInRow}
          rowDraggAble={this.props.rowDraggAble}
          onDragRow={this.onDragRow}
          onDragRowStart={this.onDragRowStart}
          contentTable={this.contentTable}
          tableUid = {this.tableUid}
          expandedIcon={props.expandedIcon}
          collapsedIcon={props.collapsedIcon}
          lazyStartIndex = {lazyCurrentIndex}
          lazyEndIndex = {lazyEndIndex}
          centerColumnsLength={this.centerColumnsLength}
          leftColumnsLength={this.leftColumnsLength}
        />
      );
      this.treeRowIndex++;
      const subVisible = visible && isRowExpanded;

      if (expandedRowContent && isRowExpanded) {
        rst.push(this.getExpandedRow(
          key, expandedRowContent, subVisible, expandedRowClassName(record, i, indent), fixed
        ));
      }
      if (childrenColumn) {
        this.treeType = true;//证明是tree表形式visible = {true}
        rst = rst.concat(this.getRowsByData(
          childrenColumn, subVisible, indent + 1, columns, fixed,paramRootIndex
        ));
      }
    }

    if(props.lazyLoad && props.lazyLoad.sufHeight && indent == 0){
      rst.push(
        <TableRow height={props.lazyLoad.sufHeight} key={'table_row_end'} columns={[]} className='' store={this.store} visible = {true}/>
      )
    }
    return rst;
  }

  getRows(columns, fixed) {
    //统计index，只有含有树表结构才有用，因为树表结构时，固定列的索引取值有问题
    this.treeRowIndex = 0;
    let rs = this.getRowsByData(this.state.data, true, 0, columns, fixed);
    return rs;
  }

  getColGroup(columns, fixed) {
    let cols = [];
    let self = this;

    let { contentWidthDiff = 0, lastShowIndex = 0 } = this.state;
    if (this.props.expandIconAsCell && fixed !== 'right') {
      cols.push(
        <col
          className={`${this.props.clsPrefix}-expand-icon-col`}
          key="u-table-expand-icon-col"
        />
      );
    }
    let leafColumns;
    if (fixed === 'left') {
      contentWidthDiff = 0;
      leafColumns = this.columnManager.leftLeafColumns();
    } else if (fixed === 'right') {
      contentWidthDiff = 0;
      leafColumns = this.columnManager.rightLeafColumns();
    } else {
      leafColumns = this.columnManager.leafColumns();
    }
    cols = cols.concat(leafColumns.map((c, i, arr) => {
      let fixedClass ='';
      let width = c.width;
      if (typeof (width) == 'string' && width.indexOf('%') > -1 && self.contentWidth) {
        width = parseInt(self.contentWidth * parseInt(width) / 100);
      } else if (width) {
        width = parseInt(width);
      }
      if (lastShowIndex == i && width) {
        width = width + contentWidthDiff;
      }
      if (!fixed && c.fixed) {
        fixedClass = ` ${this.props.clsPrefix}-row-fixed-columns-in-body`;
      }
      return <col key={c.key} style={{ width: width, minWidth: c.width }} className={fixedClass}/>;
    }));
    return <colgroup id="bee-table-colgroup">{cols}</colgroup>;
  }

  renderDragHideTable = () => {
    const { columns, dragborder, dragborderKey } = this.props;
    if (!dragborder) return null;
    let sum = 0;
    return (<div id={`u-table-drag-hide-table-${dragborderKey}`} className={`${this.props.clsPrefix}-hiden-drag`} >
      {
        columns.map((da, i) => {
          sum += da.width ? da.width : 0;
          return (<div className={`${this.props.clsPrefix}-hiden-drag-li`} key={da + "_hiden_" + i} style={{ left: sum + "px" }}></div>);
        })
      }
    </div>);
  }

  getLeftFixedTable() {
    return this.getTable({
      columns: this.columnManager.leftColumns(),
      fixed: 'left',
    });
  }

  getRightFixedTable() {
    return this.getTable({
      columns: this.columnManager.rightColumns(),
      fixed: 'right',
    });
  }

  getTable(options = {}) {
    const { columns, fixed } = options;
    const { clsPrefix, scroll = {}, getBodyWrapper, footerScroll,headerScroll,hideHeaderScroll = false,expandIconAsCell } = this.props;
    let { useFixedHeader,data } = this.props;
    const bodyStyle = { ...this.props.bodyStyle };  // 这里为什么不写在上面?
    const headStyle = {};
    const innerBodyStyle = {};
    const leftFixedWidth = this.columnManager.getLeftColumnsWidth(this.contentWidth);
    const rightFixedWidth = this.columnManager.getRightColumnsWidth(this.contentWidth);

    let tableClassName = '';
    //表格元素的宽度大于容器的宽度也显示滚动条
    if (scroll.x || fixed || this.contentDomWidth < this.contentWidth) {
      tableClassName = `${clsPrefix}-fixed`;
      //没有数据并且含有顶部菜单时
      if(this.props.data.length == 0 && this.props.headerScroll ){
        bodyStyle.overflowX = 'hidden';
      }
      if (!footerScroll) {
        bodyStyle.overflowX = bodyStyle.overflowX || 'auto';
      }
    }

    if (scroll.y) {
      // maxHeight will make fixed-Table scrolling not working
      // so we only set maxHeight to body-Table here
      if (fixed) {
        // bodyStyle.height = bodyStyle.height || scroll.y;
        innerBodyStyle.maxHeight = bodyStyle.maxHeight || scroll.y;
        innerBodyStyle.overflowY = bodyStyle.overflowY || 'scroll';
      } else {
        bodyStyle.maxHeight = bodyStyle.maxHeight || scroll.y;
      }
      bodyStyle.overflowY = bodyStyle.overflowY || 'scroll';
      useFixedHeader = true;

      // Add negative margin bottom for scroll bar overflow bug
      const scrollbarWidth = this.scrollbarWidth;
      if (scrollbarWidth >= 0) {
        (fixed ? bodyStyle : headStyle).paddingBottom = '0px';
        //显示表头滚动条
        if(headerScroll){
          if(fixed){

           if(this.domWidthDiff <= 0){
              headStyle.marginBottom = `${scrollbarWidth}px`;
              bodyStyle.marginBottom = `-${scrollbarWidth}px`;
            }else{
              innerBodyStyle.overflowX = 'auto';
            }
          }else{
               //内容少，不用显示滚动条
               if(this.domWidthDiff > 0){
                headStyle.overflowX = 'hidden';
              }
            headStyle.marginBottom = `0px`;
          }
        }else{
          if(fixed){
            if(this.domWidthDiff > 0){
              headStyle.overflow = 'hidden';
              innerBodyStyle.overflowX = 'auto'; //兼容expand场景、子表格含有固定列的场景
            }else{
              bodyStyle.marginBottom = `-${scrollbarWidth}px`;
            }

          }else{
              // 没有数据时，表头滚动条隐藏问题
              if(data.length == 0 && this.domWidthDiff < 0){
                headStyle.marginBottom = '0px';
              }else{
                headStyle.marginBottom = `-${scrollbarWidth}px`;
              }

          }

        }
      }
    }

    if(data.length == 0 && hideHeaderScroll){
      //支持 NCC 需求:表格无数据时，去掉表头滚动条 (https://github.com/iuap-design/tinper-bee/issues/207)
      headStyle.marginBottom = `-${this.scrollbarWidth}px`;
    }

    const renderTable = (hasHead = true, hasBody = true) => {
      const tableStyle = {};
      if (!fixed && scroll.x) {
        // not set width, then use content fixed width
        if (scroll.x === true) {
          tableStyle.tableLayout = 'fixed';
        } else {
          tableStyle.width = this.contentWidth - this.columnManager.getLeftColumnsWidth(this.contentWidth) - this.columnManager.getRightColumnsWidth(this.contentWidth);
        }
      }
      // 自动出现滚动条
      if ( !fixed && this.contentDomWidth < this.contentWidth) {
        tableStyle.width = this.contentWidth - this.columnManager.getLeftColumnsWidth(this.contentWidth) - this.columnManager.getRightColumnsWidth(this.contentWidth);
      }
      const tableBody = hasBody ? getBodyWrapper(
        <tbody className={`${clsPrefix}-tbody`} onMouseLeave={this.onBodyMouseLeave}>
          {this.getRows(columns, fixed)}
        </tbody>
      ) : null;
      let _drag_class = this.props.dragborder ? "table-drag-bordered" : ""
      return (
        <table className={` ${tableClassName}  table-bordered ${_drag_class} `} style={tableStyle}  >
          {/* {this.props.dragborder?null:this.getColGroup(columns, fixed)} */}
          {this.getColGroup(columns, fixed)}
          {hasHead ? this.getHeader(columns, fixed, leftFixedWidth, rightFixedWidth) : null}
          {tableBody}
        </table>
      );
    };

    let headTable;

    if (useFixedHeader) {
      headTable = (
        <div
          className={`${clsPrefix}-header`}
          ref={(el)=>{fixed ? this.fixedHeadTable=el : this.headTable=el}}
          style={headStyle}
          onMouseOver={this.detectScrollTarget}
          onTouchStart={this.detectScrollTarget}
          onScroll={this.handleBodyScroll}
        >
          {renderTable(true, false)}
        </div>
      );
    }
    let BodyTable = (
      <div
        className={`${clsPrefix}-body`}
        style={bodyStyle}
        ref={(el)=>{this.bodyTable = el}}
        onMouseOver={this.detectScrollTarget}
        onTouchStart={this.detectScrollTarget}
        onScroll={this.handleBodyScroll}
        onMouseLeave={this.onBodyMouseLeave}
      >
        {this.renderDragHideTable()}
        {renderTable(!useFixedHeader)}
      </div>
    );

    if (fixed && columns.length) {
      let refName;
      if (columns[0].fixed === 'left' || columns[0].fixed === true) {
        refName = 'fixedColumnsBodyLeft';
      } else if (columns[0].fixed === 'right') {
        refName = 'fixedColumnsBodyRight';
      }
      delete bodyStyle.overflowX;
      delete bodyStyle.overflowY;
      BodyTable = (
        <div
          className={`${clsPrefix}-body-outer`}
          style={{ ...bodyStyle }}
        >
          <div
            style={{...innerBodyStyle}}
            className={`${clsPrefix}-body-inner`}
            ref={refName}
            onMouseOver={this.detectScrollTarget}
            onTouchStart={this.detectScrollTarget}
            onScroll={this.handleBodyScroll}
          >
            {renderTable(!useFixedHeader)}
            {/* <div className="scroll-dom" style={{height:`${this.scrollbarWidth}px`}}></div> */}
          </div>
        </div>
      );
    }
    // const leftFixedWidth = this.columnManager.getLeftColumnsWidth(this.contentWidth);
    // const rightFixedWidth = this.columnManager.getRightColumnsWidth(this.contentWidth);
    let expandIconWidth = expandIconAsCell ? 33 : 0;
    let parStyle = {}
    if(!fixed){
      parStyle = {'marginLeft':leftFixedWidth + expandIconWidth,'marginRight':rightFixedWidth}
    }
    return <div style={parStyle}>{headTable}{BodyTable}</div>;
  }

  getTitle() {
    const { title, clsPrefix } = this.props;
    return title ? (
      <div className={`${clsPrefix}-title`}>
        {title(this.state.data)}
      </div>
    ) : null;
  }

  getFooter() {
    const { footer, clsPrefix } = this.props;
    return footer ? (
      <div className={`${clsPrefix}-footer`}>
        {footer(this.state.data)}
      </div>
    ) : null;
  }

  getEmptyText() {
    const { emptyText : defaultEmptyText, clsPrefix, data } = this.props;
    let locale = getComponentLocale(this.props, this.context, 'Table', () => i18n);
    let emptyText = defaultEmptyText !== undefined ? defaultEmptyText : () => <div><Icon type="uf-nodata" className="table-nodata"></Icon><span>{locale["no_data"]}</span></div>;

    return !data.length ? (
      <div className={`${clsPrefix}-placeholder`}>
        {emptyText()}
      </div>
    ) : null;
  }

  getHeaderRowStyle(columns, rows) {
    const { fixedColumnsHeadRowsHeight } = this.state;
    const headerHeight = fixedColumnsHeadRowsHeight[0];

    if (headerHeight && columns) {
      if (headerHeight === 'auto') {
        return { height: 'auto' };
      }
      return { height: headerHeight / rows.length };
    }
    return null;
  }

  syncFixedTableRowHeight() {
    //this.props.height、headerHeight分别为用户传入的行高和表头高度，如果有值，所有行的高度都是固定的，主要为了避免在千行数据中有固定列时获取行高度有问题
    const { clsPrefix, height, headerHeight,columns,heightConsistent, bodyDisplayInRow } = this.props;
    const headRows = this.headTable ?
      this.headTable.querySelectorAll('thead') :
      this.bodyTable.querySelectorAll('thead');
    const expandedRows = this.bodyTable.querySelectorAll(`.${clsPrefix}-expanded-row`) || [];
    const bodyRows = this.bodyTable.querySelectorAll(`.${clsPrefix}-row`) || [];
    const leftBodyRows = this.refs.fixedColumnsBodyLeft && this.refs.fixedColumnsBodyLeft.querySelectorAll(`.${clsPrefix}-row`) || [];
    const rightBodyRows = this.refs.fixedColumnsBodyRight && this.refs.fixedColumnsBodyRight.querySelectorAll(`.${clsPrefix}-row`) || [];
    const fixedColumnsHeadRowsHeight = [].map.call(
      headRows, row =>{
        let height = headerHeight;
        if(headerHeight){
          height = (getMaxColChildrenLength(columns)+1)*headerHeight;
        }
        return headerHeight ? height : (row.getBoundingClientRect().height || 'auto')}
    );
    const fixedColumnsBodyRowsHeight = [].map.call(
      bodyRows, (row,index) =>{
        let rsHeight = height;
        if(bodyDisplayInRow && rsHeight){
          return rsHeight;
        }else{
          // 为了提高性能，默认获取主表的高度，但是有的场景中固定列的高度比主表的高度高，所以提供此属性，会统计所有列的高度取最大的，设置
          // 内容折行显示，并又设置了 height 的情况下，也要获取主表高度
          if(heightConsistent || (!bodyDisplayInRow && rsHeight)){
            let leftHeight,rightHeight,currentHeight,maxHeight;
            leftHeight = leftBodyRows[index]?leftBodyRows[index].getBoundingClientRect().height:0;
            rightHeight = rightBodyRows[index]?rightBodyRows[index].getBoundingClientRect().height:0;
            currentHeight = row.getBoundingClientRect().height
            maxHeight = Math.max(leftHeight,rightHeight,currentHeight);
            return maxHeight || 'auto'
          }else{
            return row.getBoundingClientRect().height || 'auto'
          }
        }
      }
    );
    const fixedColumnsExpandedRowsHeight = {};
    expandedRows.length > 0 && expandedRows.forEach(row => {
      let parentRowKey = row && row.previousSibling && row.previousSibling.getAttribute("data-row-key"),
          height = row && row.getBoundingClientRect().height || 'auto';
      fixedColumnsExpandedRowsHeight[parentRowKey] = height;
    })
    if (shallowequal(this.state.fixedColumnsHeadRowsHeight, fixedColumnsHeadRowsHeight) &&
      shallowequal(this.state.fixedColumnsBodyRowsHeight, fixedColumnsBodyRowsHeight) &&
      shallowequal(this.state.fixedColumnsExpandedRowsHeight, fixedColumnsExpandedRowsHeight)) {
      return;
    }
    this.setState({
      fixedColumnsHeadRowsHeight,
      fixedColumnsBodyRowsHeight,
      fixedColumnsExpandedRowsHeight,
    });
  }

  resetScrollX() {
    if (this.headTable) {
      this.headTable.scrollLeft = 0;
    }
    if (this.bodyTable) {
      this.bodyTable.scrollLeft = 0;
    }
  }

  findExpandedRow(record, index) {
    const rows = this.getExpandedRows().filter(i => i === this.getRowKey(record, index));
    return rows[0];
  }

  isRowExpanded(record, index) {
    return typeof this.findExpandedRow(record, index) !== 'undefined';
  }
  onBodyMouseLeave(e){
    this.hideHoverDom(e);
  }

  detectScrollTarget(e) {
    if (this.scrollTarget !== e.currentTarget) {
      this.scrollTarget = e.currentTarget;
    }
  }

  hideHoverDom(e){
    if(this.hoverDom){
      this.hoverDom.style.display = 'none';
    }
  }


  handleBodyScroll(e) {
    const headTable = this.headTable;
    const { scroll = {},clsPrefix,handleScrollY, handleScrollX, onBodyScroll} = this.props;
    const {fixedColumnsBodyLeft, fixedColumnsBodyRight } = this.refs;
    // Prevent scrollTop setter trigger onScroll event
    // http://stackoverflow.com/q/1386696
    if (e.currentTarget !== e.target) {
      return;
    }
    if (e.target.scrollLeft !== this.lastScrollLeft) {
      let position = '';
      if (e.target === this.bodyTable && headTable) {
        headTable.scrollLeft = e.target.scrollLeft;
      } else if (e.target === headTable && this.bodyTable) {
        this.bodyTable.scrollLeft = e.target.scrollLeft;
      }
      if (e.target.scrollLeft === 0) {
        position='left';
      } else if (e.target.scrollLeft + 1 >=
        e.target.children[0].getBoundingClientRect().width -
        e.target.getBoundingClientRect().width) {
          position='right';
      } else if (this.state.scrollPosition !== 'middle') {
        position='middle';
      }
      if(position){
        classes(this.contentTable)
        .remove(new RegExp(`^${clsPrefix}-scroll-position-.+$`))
        .add(`${clsPrefix}-scroll-position-${position}`);
      }
      if(handleScrollX){
        debounce(
          handleScrollX(e.target.scrollLeft,this.treeType),
        300)
      }
    }
    // console.log('lastScrollTop--'+this.lastScrollTop+'--eventScrollTop--'+ e.target.scrollTop);
    if (scroll.y && this.lastScrollTop != e.target.scrollTop && e.target !== headTable) {
      if (fixedColumnsBodyLeft && e.target !== fixedColumnsBodyLeft) {
        fixedColumnsBodyLeft.scrollTop = e.target.scrollTop;
      }
      if (fixedColumnsBodyRight && e.target !== fixedColumnsBodyRight) {
        fixedColumnsBodyRight.scrollTop = e.target.scrollTop;
      }
      if (this.bodyTable && e.target !== this.bodyTable) {
        this.bodyTable.scrollTop = e.target.scrollTop;
      }
      if(this.hoverDom){
        this.hoverDom.style.display = 'none'
      }
      this.lastScrollTop = e.target.scrollTop;
      if(handleScrollY){
        debounce(
          handleScrollY(this.lastScrollTop,this.treeType,onBodyScroll),
        300)
      }

    }

    // Remember last scrollLeft for scroll direction detecting.
    this.lastScrollLeft = e.target.scrollLeft;
  }

  handleRowHover(isHover, key,event,currentIndex) {
    //增加新的API，设置是否同步Hover状态，提高性能，避免无关的渲染
    let { syncHover,onRowHover,data } = this.props;
    const record = data[currentIndex];
    // 固定列、或者含有hoverdom时情况下同步hover状态
    if(this.columnManager.isAnyColumnsFixed() && syncHover ){
      this.hoverKey = key;
      this.store.setState({
        currentHoverKey: isHover ? key : null,
      });
    }
    if(this.hoverDom){
      if(isHover){
        this.currentHoverKey = key;
        const td = closest(event.target,'td');
        if(td){
          const scrollTop = this.lastScrollTop ?this.lastScrollTop:0
          let top = td.offsetTop -  scrollTop;
          if(this.headTable){
            top = top + this.headTable.clientHeight;
          }
          this.hoverDom.style.top = top + 'px';
          this.hoverDom.style.height = td.offsetHeight + 'px';
          this.hoverDom.style.lineHeight = td.offsetHeight + 'px';
          this.hoverDom.style.display = 'block';
        }
      }

    }

    onRowHover && onRowHover(currentIndex,record);

  }

  onRowHoverMouseEnter = () =>{

    this.store.setState({
      currentHoverKey: this.currentHoverKey,
    });
    this.hoverDom.style.display = 'block';

  }
  onRowHoverMouseLeave = () =>{

  }
  onFocus=(e)=>{
    this.props.onKeyTab&&this.props.onKeyTab();
  }

  onKeyDown=(e)=>{
    let event = Event.getEvent(e);
    // event.preventDefault?event.preventDefault():event.returnValue = false;
    if(event.keyCode === 38){//up
      event.preventDefault&&event.preventDefault();
      this.props.onKeyUp&&this.props.onKeyUp();
    }else if(event.keyCode === 40){//down
      event.preventDefault&&event.preventDefault();
      this.props.onKeyDown&&this.props.onKeyDown();
    }
    this.props.onTableKeyDown&&this.props.onTableKeyDown();
  }

  render() {
    const props = this.props;
    const clsPrefix = props.clsPrefix;
    const hasFixedLeft = this.columnManager.isAnyColumnsLeftFixed();
    let className = props.clsPrefix;
    if (props.className) {
      className += ` ${props.className}`;
    }
    if (props.useFixedHeader || (props.scroll && props.scroll.y)) {
      className += ` ${clsPrefix}-fixed-header`;
    }
    if (!props.showHeader) {
      className += ` ${clsPrefix}-hide-header`;
    }
    if (props.bordered) {
      className += ` ${clsPrefix}-bordered`;
    }
    className += ` ${clsPrefix}-scroll-position-${this.state.scrollPosition}`;
    //如果传入height说明是固定高度
    //内容过多折行显示时，height 属性会失效，为了避免产生错行
    if(props.bodyDisplayInRow && props.height){
      className += ' fixed-height';
    }
    if(props.bodyDisplayInRow){
      className += ' body-dispaly-in-row'
    }
    if(props.headerDisplayInRow){
      className += ' header-dispaly-in-row'
    }
    const isTableScroll = this.columnManager.isAnyColumnsFixed() ||
      props.scroll.x ||
      props.scroll.y;
    let loading = props.loading;
    if (typeof loading === 'boolean') {
      loading = {
        show: loading,
      };
    }
    if (props.size) {
      className += ` ${clsPrefix}-${props.size}`;
    }
    if(hasFixedLeft){
      className += ` has-fixed-left`;
    }

    return (
      <div className={className} style={props.style} ref={el => this.contentTable = el}
      tabIndex={props.focusable && (props.tabIndex?props.tabIndex:'0')} >
        {this.getTitle()}
        <div className={`${clsPrefix}-content`}>

          <div className={isTableScroll ? `${clsPrefix}-scroll` : ''} >
            {this.getTable({ columns: this.columnManager.groupedColumns() })}
            {this.getEmptyText()}
            {this.getFooter()}
          </div>

          {hasFixedLeft &&
            <div className={`${clsPrefix}-fixed-left`}>
              {this.getLeftFixedTable()}
            </div>}
          {this.columnManager.isAnyColumnsRightFixed() &&
            <div className={`${clsPrefix}-fixed-right`}>
              {this.getRightFixedTable()}
            </div>}
        </div>
        <Loading
          container={this}
          {...loading} />
        { props.hoverContent && <div className="u-row-hover"
                                     onMouseEnter={this.onRowHoverMouseEnter} onMouseLeave={this.onRowHoverMouseLeave} ref={el=> this.hoverDom = el }>{props.hoverContent()}</div>}
      </div>
    );
  }
};

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;
Table.contextTypes = {
  beeLocale: PropTypes.object
};

export default Table;
