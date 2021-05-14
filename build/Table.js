'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _componentClasses = require('component-classes');

var _componentClasses2 = _interopRequireDefault(_componentClasses);

var _TableRow = require('./TableRow');

var _TableRow2 = _interopRequireDefault(_TableRow);

var _TableHeader = require('./TableHeader');

var _TableHeader2 = _interopRequireDefault(_TableHeader);

var _utils = require('./lib/utils');

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _addEventListener = require('tinper-bee-core/lib/addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _ColumnManager = require('./ColumnManager');

var _ColumnManager2 = _interopRequireDefault(_ColumnManager);

var _createStore = require('./createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _beeLoading = require('bee-loading');

var _beeLoading2 = _interopRequireDefault(_beeLoading);

var _beeIcon = require('bee-icon');

var _beeIcon2 = _interopRequireDefault(_beeIcon);

var _i18n = require('./lib/i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _tool = require('bee-locale/build/tool');

var _resizeObserverPolyfill = require('resize-observer-polyfill');

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
  data: _propTypes2["default"].array,
  expandIconAsCell: _propTypes2["default"].bool,
  defaultExpandAllRows: _propTypes2["default"].bool,
  expandedRowKeys: _propTypes2["default"].array,
  defaultExpandedRowKeys: _propTypes2["default"].array,
  useFixedHeader: _propTypes2["default"].bool,
  columns: _propTypes2["default"].array,
  clsPrefix: _propTypes2["default"].string,
  bodyStyle: _propTypes2["default"].object,
  style: _propTypes2["default"].object,
  //特殊的渲染规则的key值
  rowKey: _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].func]),
  rowClassName: _propTypes2["default"].func,
  //column的主键，和 column.key 作用相同
  columnKey: _propTypes2["default"].string,
  expandedRowClassName: _propTypes2["default"].func,
  childrenColumnName: _propTypes2["default"].string,
  onExpand: _propTypes2["default"].func,
  onRowHover: _propTypes2["default"].func,
  onExpandedRowsChange: _propTypes2["default"].func,
  indentSize: _propTypes2["default"].number,
  onRowClick: _propTypes2["default"].func,
  onRowDoubleClick: _propTypes2["default"].func,
  expandIconColumnIndex: _propTypes2["default"].number,
  //是否显示表头
  showHeader: _propTypes2["default"].bool,
  title: _propTypes2["default"].func,
  footer: _propTypes2["default"].func,
  emptyText: _propTypes2["default"].func,
  scroll: _propTypes2["default"].object,
  rowRef: _propTypes2["default"].func,
  getBodyWrapper: _propTypes2["default"].func,
  children: _propTypes2["default"].node,
  draggable: _propTypes2["default"].bool,
  minColumnWidth: _propTypes2["default"].number,
  filterable: _propTypes2["default"].bool,
  filterDelay: _propTypes2["default"].number,
  onFilterChange: _propTypes2["default"].func,
  onFilterClear: _propTypes2["default"].func,
  syncHover: _propTypes2["default"].bool,
  tabIndex: _propTypes2["default"].string,
  hoverContent: _propTypes2["default"].func,
  size: _propTypes2["default"].oneOf(['sm', 'md', 'lg']),
  rowDraggAble: _propTypes2["default"].bool,
  hideDragHandle: _propTypes2["default"].bool, // 隐藏行拖拽把手
  onDropRow: _propTypes2["default"].func,
  onDragRowStart: _propTypes2["default"].func,
  onBodyScroll: _propTypes2["default"].func,
  bodyDisplayInRow: _propTypes2["default"].bool, // 表格内容超出列宽度时进行换行 or 以...形式展现
  headerDisplayInRow: _propTypes2["default"].bool, // 表头内容超出列宽度时进行换行 or 以...形式展现
  showRowNum: _propTypes2["default"].oneOfType([_propTypes2["default"].bool, _propTypes2["default"].object]), // 表格是否自动生成序号,格式为{base:number || 0,defaultKey:string || '_index',defaultName:string || '序号'}
  onPaste: _propTypes2["default"].func,
  onBodyMouseLeave: _propTypes2["default"].func
};

var defaultProps = {
  data: [],
  useFixedHeader: false,
  expandIconAsCell: false,
  defaultExpandAllRows: false,
  defaultExpandedRowKeys: [],
  columnKey: 'key',
  rowKey: 'key',
  rowClassName: function rowClassName() {
    return '';
  },
  expandedRowClassName: function expandedRowClassName() {
    return '';
  },
  onExpand: function onExpand() {},
  onExpandedRowsChange: function onExpandedRowsChange() {},
  onRowClick: function onRowClick() {},

  // onRowDoubleClick() { },
  clsPrefix: 'u-table',
  bodyStyle: {},
  style: {},
  childrenColumnName: 'children',
  indentSize: 15,
  expandIconColumnIndex: 0,
  showHeader: true,
  scroll: {},
  rowRef: function rowRef() {
    return null;
  },
  getBodyWrapper: function getBodyWrapper(body) {
    return body;
  },
  // emptyText: () => <div><Icon type="uf-nodata" className="table-nodata"></Icon><span>{locale["no_data"]}</span></div>,
  columns: [],
  minColumnWidth: 80,
  locale: {},
  syncHover: true,
  // setRowHeight:()=>{},
  setRowParentIndex: function setRowParentIndex() {},
  tabIndex: '0',
  heightConsistent: false,
  size: 'md',
  rowDraggAble: false,
  hideDragHandle: false,
  onDropRow: function onDropRow() {},
  onDragRowStart: function onDragRowStart() {},
  onBodyScroll: function onBodyScroll() {},
  bodyDisplayInRow: true,
  headerDisplayInRow: true,
  showRowNum: false,
  onPaste: function onPaste() {},
  originWidth: null //做什么用??
};

var expandIconCellWidth = Number(43);

var Table = function (_Component) {
  _inherits(Table, _Component);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.resize = function () {
      (0, _utils.debounce)(_this.syncFixedTableRowHeight, 150);
      _this.computeTableWidth();
      var renderFlag = _this.state.renderFlag;
      _this.setState({
        renderFlag: !renderFlag
      });
    };

    _this.getTableUID = function () {
      var uid = "_table_uid_" + new Date().getTime();
      _this.tableUid = uid;
      var div = document.createElement("div");
      // div.className = "u-table-drag-hidden-cont";
      div.className = "u-table-drag-hidden-cont";
      div.id = uid;
      _this.contentTable.appendChild(div);
    };

    _this.syncFixedTableScrollWidth = function () {
      var clsPrefix = _this.props.clsPrefix;

      var tableDom = _this.contentTable;
      var tableContentDom = tableDom.querySelector('.' + clsPrefix + '-content');
      var tableFixedRight = tableDom.querySelector('.' + clsPrefix + '-fixed-right');
      var centerBodyDom = tableDom.querySelector('.' + clsPrefix + '-scroll .' + clsPrefix + '-body');
      var centerHeadTableDom = tableDom.querySelector('.' + clsPrefix + '-scroll .' + clsPrefix + '-header table');
      var bodyInnerDoms = tableDom.querySelectorAll('.' + clsPrefix + '-body-outer .' + clsPrefix + '-body-inner');
      if (!_this.scrollbarWidth) _this.scrollbarWidth = (0, _utils.measureScrollbar)();
      var scrollbarWidth = _this.scrollbarWidth;
      var hasCenterScrollY = !!(centerBodyDom.scrollHeight > centerBodyDom.clientHeight); //中间区域是否存在垂直滚动条
      var hasCenterScrollX = !!(centerBodyDom.scrollWidth > centerBodyDom.clientWidth); //中间区域存在水平滚动条
      //解决存在右侧固定列,中间区域垂直滚动条需要隐藏显示的问题
      if (hasCenterScrollY && _this.columnManager.isAnyColumnsRightFixed()) {
        centerBodyDom.style.marginRight = scrollbarWidth ? '-' + scrollbarWidth + 'px' : 8;
      } else {
        centerBodyDom.style.marginRight = 0;
      }
      //解决中间区域存在水平滚动条，左右固定区域无法跟其对齐的问题
      if (bodyInnerDoms && bodyInnerDoms.length) {
        [].forEach.call(bodyInnerDoms, function (bodyInnerDom) {
          if (hasCenterScrollX) {
            bodyInnerDom.style.paddingBottom = scrollbarWidth + 'px';
          } else {
            bodyInnerDom.style.paddingBottom = 0;
          }
        });
      }
      //解决中间存在水平滚动条头部区域无法对齐的问题
      if (centerHeadTableDom) {
        var paddingWidth = 0;
        if (hasCenterScrollY && hasCenterScrollX || hasCenterScrollY && !tableFixedRight) paddingWidth = paddingWidth + scrollbarWidth;
        centerHeadTableDom.style.paddingRight = paddingWidth + 'px';
      }
      //为表格追加是否存在滚动条的样式标识
      if (tableContentDom) {
        if (hasCenterScrollX) {
          if (!tableContentDom.classList.contains('has-scroll-x')) tableContentDom.classList.add('has-scroll-x');
        } else {
          tableContentDom.classList.remove('has-scroll-x');
        }
        if (hasCenterScrollY) {
          if (_this.headTable) _this.headTable.style.overflowY = 'scroll'; //中间区域有垂直滚动条，则头部也需要显示头部滚动条
          if (!tableContentDom.classList.contains('has-scroll-y')) tableContentDom.classList.add('has-scroll-y');
        } else {
          tableContentDom.classList.remove('has-scroll-y');
        }
      }
    };

    _this.onDragRowStart = function (currentKey) {
      var data = _this.state.data,
          currentIndex = void 0,
          record = void 0;
      data.forEach(function (da, i) {
        // tr 的唯一标识通过 data.key 或 rowKey 两种方式传进来
        var trKey = da.key ? da.key : _this.getRowKey(da, i);
        if (trKey == currentKey) {
          currentIndex = i;
          record = da;
        }
      });
      _this.props.onDragRowStart && _this.props.onDragRowStart(record, currentIndex);
    };

    _this.onDragRow = function (currentKey, targetKey) {
      var data = _this.state.data,
          currentIndex = void 0,
          targetIndex = void 0,
          record = void 0;
      data.forEach(function (da, i) {
        // tr 的唯一标识通过 data.key 或 rowKey 两种方式传进来
        var trKey = da.key ? da.key : _this.getRowKey(da, i);
        if (trKey == currentKey) {
          currentIndex = i;
          record = da;
        }
        if (trKey == targetKey) {
          targetIndex = i;
        }
      });
      if (currentIndex > -1) {
        if (_this.contentTable.dragType == 'top') {
          targetIndex = targetIndex - 1;
        }
        data = _this.swapArray(data, currentIndex, targetIndex);
        _this.props.onDropRow && _this.props.onDropRow(data, record, targetIndex);
        _this.setState({
          data: data
        });
      } else {
        _this.props.onDropRow && _this.props.onDropRow(data, record, targetIndex);
      }
    };

    _this.swapArray = function (arr, index1, index2) {
      var value1 = arr[index1];
      arr.splice(index1, 1);
      if (index1 < index2) {
        arr.splice(index2, 0, value1);
      } else {
        arr.splice(index2 + 1, 0, value1);
      }

      return arr;
    };

    _this.manualSyncFixedTableRowHeight = function () {
      _this.dataChanged = true;
      _this.syncFixedTableRowHeight();
    };

    _this.clearBodyMouseLeaveTimer = function () {
      if (_this.bodyMouseLeaveTimmer) {
        clearTimeout(_this.bodyMouseLeaveTimmer);
        _this.bodyMouseLeaveTimmer = null;
      }
    };

    _this.onRowHoverMouseEnter = function () {

      _this.store.setState({
        currentHoverKey: _this.currentHoverKey
      });
      if (_this.hoverDom) _this.hoverDom.style.display = 'block';
      _this.clearBodyMouseLeaveTimer();
    };

    _this.onRowHoverMouseLeave = function () {};

    _this.onFocus = function (e) {
      _this.props.onKeyTab && _this.props.onKeyTab();
    };

    _this.onKeyDown = function (e) {
      var event = _utils.Event.getEvent(e);
      // event.preventDefault?event.preventDefault():event.returnValue = false;
      if (event.keyCode === 38) {
        //up
        event.preventDefault && event.preventDefault();
        _this.props.onKeyUp && _this.props.onKeyUp();
      } else if (event.keyCode === 40) {
        //down
        event.preventDefault && event.preventDefault();
        _this.props.onKeyDown && _this.props.onKeyDown();
      }
      _this.props.onTableKeyDown && _this.props.onTableKeyDown();
    };

    var expandedRowKeys = [];
    var rows = [].concat(_toConsumableArray(props.data));
    var showDragHandle = !props.hideDragHandle && props.rowDraggAble;
    _this.columnManager = new _ColumnManager2["default"](props.columns, props.children, props.originWidth, showDragHandle, props.showRowNum); // 加入props.showRowNum参数
    _this.store = (0, _createStore2["default"])({ currentHoverKey: null });
    _this.firstDid = true;
    _this.scrollYChanged = false;
    if (props.defaultExpandAllRows) {
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        expandedRowKeys.push(_this.getRowKey(row, i));
        rows = rows.concat(row[props.childrenColumnName] || []);
      }
    } else {
      expandedRowKeys = props.expandedRowKeys || props.defaultExpandedRowKeys;
    }

    _this.state = {
      expandedRowKeys: expandedRowKeys,
      data: props.data,
      currentHoverKey: null,
      scrollPosition: 'left',
      fixedColumnsHeadRowsHeight: [],
      fixedColumnsBodyRowsHeight: [],
      fixedColumnsExpandedRowsHeight: {} //扩展行的高度
    };

    _this.onExpandedRowsChange = _this.onExpandedRowsChange.bind(_this);
    _this.onExpanded = _this.onExpanded.bind(_this);
    _this.onRowDestroy = _this.onRowDestroy.bind(_this);
    _this.getRowKey = _this.getRowKey.bind(_this);
    _this.getExpandedRows = _this.getExpandedRows.bind(_this);
    _this.getHeader = _this.getHeader.bind(_this);
    _this.getHeaderRows = _this.getHeaderRows.bind(_this);
    _this.getExpandedRow = _this.getExpandedRow.bind(_this);
    _this.getRowsByData = _this.getRowsByData.bind(_this);
    _this.getRows = _this.getRows.bind(_this);
    _this.getColGroup = _this.getColGroup.bind(_this);
    _this.getLeftFixedTable = _this.getLeftFixedTable.bind(_this);
    _this.getRightFixedTable = _this.getRightFixedTable.bind(_this);
    _this.getTable = _this.getTable.bind(_this);
    _this.getTitle = _this.getTitle.bind(_this);
    _this.getFooter = _this.getFooter.bind(_this);
    _this.getEmptyText = _this.getEmptyText.bind(_this);
    _this.getHeaderRowStyle = _this.getHeaderRowStyle.bind(_this);
    _this.syncFixedTableRowHeight = _this.syncFixedTableRowHeight.bind(_this);
    _this.resetScrollX = _this.resetScrollX.bind(_this);
    _this.findExpandedRow = _this.findExpandedRow.bind(_this);
    _this.isRowExpanded = _this.isRowExpanded.bind(_this);
    _this.detectScrollTarget = _this.detectScrollTarget.bind(_this);
    _this.handleBodyScroll = _this.handleBodyScroll.bind(_this);
    _this.handleRowHover = _this.handleRowHover.bind(_this);
    _this.computeTableWidth = _this.computeTableWidth.bind(_this);
    _this.onBodyMouseLeave = _this.onBodyMouseLeave.bind(_this);
    _this.tableUid = null;
    _this.contentTable = null;
    _this.leftColumnsLength; //左侧固定列的长度
    // this.centerColumnsLength  //非固定列的长度// this.columnsChildrenList = [];//复杂表头、所有叶子节点
    _this.dataChanged = false; // 数据是否改变
    return _this;
  }

  Table.prototype.componentWillMount = function componentWillMount() {
    this.centerColumnsLength = this.columnManager.centerColumns().length;
    this.leftColumnsLength = this.columnManager.leftColumns().length;
  };

  Table.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.getTableUID();
    _utils.EventUtil.addHandler(this.contentTable, 'keydown', this.onKeyDown);
    _utils.EventUtil.addHandler(this.contentTable, 'focus', this.onFocus);
    setTimeout(this.resetScrollX, 300);
    //含有纵向滚动条
    // if(this.props.scroll.y){
    //    this.scrollbarWidth = measureScrollbar(`.u-table`);
    // }
    //后续也放在recevice里面
    if (!this.props.originWidth) {
      this.computeTableWidth();
    }
    if (this.columnManager.isAnyColumnsFixed()) {
      this.syncFixedTableRowHeight(); //同步固定列的内容行高度
      this.syncFixedTableScrollWidth(); //同步固定列的滚动宽度
      var targetNode = this.contentTable;
      if (targetNode) {
        this.resizeObserver = new _resizeObserverPolyfill2["default"](function () {
          _this2.resize();
        });
        this.resizeObserver.observe(targetNode);
      }
    }
  };

  Table.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _props = this.props,
        hideDragHandle = _props.hideDragHandle,
        rowDraggAble = _props.rowDraggAble,
        showRowNum = _props.showRowNum,
        clsPrefix = _props.clsPrefix;

    if ('data' in nextProps) {
      this.setState({
        data: nextProps.data
      });
    }
    if ('expandedRowKeys' in nextProps) {
      this.setState({
        expandedRowKeys: nextProps.expandedRowKeys
      });
    }
    if (nextProps.columns && nextProps.columns !== this.props.columns) {
      this.columnManager.reset(nextProps.columns, null, showRowNum, !hideDragHandle && rowDraggAble); // 加入this.props.showRowNum参数
      if (nextProps.columns.length !== this.props.columns.length && this.bodyTable) {
        this.scrollTop = this.bodyTable.scrollTop;
      }
    } else if (nextProps.children !== this.props.children) {
      this.columnManager.reset(null, nextProps.children, showRowNum, !hideDragHandle && rowDraggAble); // 加入this.props.showRowNum参数
    }
    //适配lazyload
    if (nextProps.scrollTop > -1) {
      // this.bodyTable.scrollTop = nextProps.scrollTop;
      this.scrollTop = nextProps.scrollTop;
    }
    // fix:模态框中使用table，计算的滚动条宽度为0的bug
    // fix:表格首次渲染时 display:none，再显示时，未重新计算，导致表行出现错位的bug
    if (this.scrollbarWidth <= 0 && this.props.scroll.y) {
      this.scrollbarWidth = (0, _utils.measureScrollbar)('.' + clsPrefix);
    }
    if (!nextProps.originWidth) {
      this.computeTableWidth();
      this.firstDid = true; //避免重复update
    }
    if (nextProps.resetScroll) {
      this.resetScrollX();
    }

    // console.log('this.scrollTop**********',this.scrollTop);
  };

  Table.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    // todo: IE 大数据渲染，行高不固定，且设置了 heightConsistent={true} 时，滚动加载操作会导致 ie11 浏览器崩溃
    // https://github.com/tinper-bee/bee-table/commit/bd2092cdbaad236ff89477304e58dea93325bf09
    if (this.columnManager.isAnyColumnsFixed()) {
      (0, _utils.debounce)(this.syncFixedTableRowHeight(), 200); //同步固定列内容行的高度
      (0, _utils.debounce)(this.syncFixedTableScrollWidth(), 200); //同步固定列的滚动宽度
    }

    //适应模态框中表格、以及父容器宽度变化的情况
    if (typeof this.props.scroll.x !== 'number' && this.contentTable.getBoundingClientRect().width !== this.contentDomWidth && this.firstDid) {
      this.computeTableWidth();
      this.firstDid = false; //避免重复update
    }
    if (this.scrollTop > -1) {
      this.fixedLeftBodyInner && (this.fixedLeftBodyInner.scrollTop = this.scrollTop);
      this.fixedRightBodyInner && (this.fixedRightBodyInner.scrollTop = this.scrollTop);
      this.bodyTable.scrollTop = this.scrollTop;
      this.scrollTop = -1;
    }
    // 当表格没有数据时，重置滚动条位置，造成grid里面的表头列无法操作
    // if (prevProps.data.length === 0  || this.props.data.length === 0 ) {
    //   this.resetScrollX();
    // }
    // 当懒加载手动设置的scroll.y发生变化时，滚动条回到顶部
    var prevScrollY = prevProps.scroll.y;
    var currentScrollY = this.props.scroll.y;
    if (prevScrollY && currentScrollY && prevScrollY !== currentScrollY && this.props.lazyLoad && !this.props.ignoreScrollYChange) {
      this.bodyTable.scrollTop = 0;
    } else if (this.props.ignoreScrollYChange && currentScrollY && prevScrollY) {
      if (prevScrollY !== currentScrollY) {
        this.scrollYChanged = true;
        var bodyScrollTop = this.bodyTable.scrollTop;
        if (bodyScrollTop === 0) {
          // 在顶部的时候，滚动条不用动
          this.bodyTable.scrollTop = 0;
        } else {
          var distance = bodyScrollTop + currentScrollY - prevScrollY;
          if (distance < 0) {
            this.bodyTable.scrollTop = 0;
          } else {
            var _bodyTable = this.bodyTable,
                scrollHeight = _bodyTable.scrollHeight,
                scrollTop = _bodyTable.scrollTop;

            var bottomDistance = Math.abs(scrollHeight - scrollTop - prevScrollY); // 在最底部的时候也不用滚动滚动条
            if (bottomDistance < 5) {
              // 有些dom计算不是十分精确，设置一个值来缓冲一下
              this.bodyTable.scrollTop = scrollTop + prevScrollY - currentScrollY;
            } else {
              this.bodyTable.scrollTop = distance;
            }
          }
        }
      } else if (this.scrollYChanged) {
        this.bodyTable.scrollTop += 1;
        this.scrollYChanged = false;
      }
    }
    // 是否传入 scroll中的y属性，如果传入判断是否是整数，如果是则进行比较 。bodyTable 的clientHeight进行判断
    // this.isShowScrollY();
    // gx为了解决底部滚动条显示的问题
    // if (this.bodyTable) {
    //   const currentOverflowX = window.getComputedStyle(this.bodyTable).overflowX;
    //   if (this.props.scroll.x && currentOverflowX !== 'scroll') {
    //     // 此处应该对比一下实际的
    //     if (this.computeWidth > this.contentDomWidth) {
    //       this.bodyTable.style.overflowX = 'scroll';
    //     }
    //   }
    // }
    // let scrollContainerWidth = window.getComputedStyle(this.bodyTableOuter.querySelector('.scroll-container')).width; // scroll-container层元素的宽度
    // let scrollContainerTableWidth =  this.bodyTableOuter.querySelector('.table-bordered').style.width; // scroll-container内层table元素的宽度
    // // 有左右固定列时，scroll-container因为有竖直滚动条，使得scroll-container实际宽度（不包括滚动条的宽度）小于内部table宽度出现水平方向滚动条，导致滚动到底部不对齐
    // if ((parseFloat(scrollContainerWidth) >= parseFloat(scrollContainerTableWidth)) && (this.columnManager.leftLeafColumns().length > 0 || this.columnManager.rightLeafColumns().length > 0)) {
    //   this.bodyTable.style.overflowX = 'hidden';
    // } else {
    //   this.bodyTable.style.overflowX = 'auto';
    // }
    // if (this.bodyTableOuter) { // 隐藏几个不需要真正滚动的父元素的滚动条
    //   this.bodyTableOuter.style.overflowY = 'hidden'
    // }
    // if (this.fixedColumnsBodyLeftOuter) {
    //   this.fixedColumnsBodyLeftOuter.style.overflowY = 'hidden'
    // }
    // if (this.fixedColumnsBodyRightOuter) {
    //   this.fixedColumnsBodyRightOuter.style.overflowY = 'hidden'
    // }
  };

  Table.prototype.componentWillUnmount = function componentWillUnmount() {
    // 移除绑定事件,避免内存泄漏
    this.contentTable = null;
    _utils.EventUtil.removeHandler(this.contentTable, 'keydown', this.onKeyDown);
    _utils.EventUtil.removeHandler(this.contentTable, 'focus', this.onFocus);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  };

  //计算表格宽度 --- 这块有必要？待确认 待废除 zzj
  Table.prototype.computeTableWidth = function computeTableWidth() {
    var expandIconAsCell = this.props.expandIconAsCell;
    //如果用户传了scroll.x按用户传的为主

    var setWidthParam = this.props.scroll.x;

    if (typeof setWidthParam == 'number') {
      var numSetWidthParam = parseInt(setWidthParam);
      this.contentWidth = numSetWidthParam;
    } else {
      // this.preContentDomWidth = this.contentDomWidth;
      //计算总表格宽度、根据表格宽度和各列的宽度和比较，重置最后一列
      this.contentDomWidth = this.contentTable.getBoundingClientRect().width; //表格容器宽度

      this.contentWidth = this.contentDomWidth; //默认与容器宽度一样
    }
    var computeObj = this.columnManager.getColumnWidth(this.contentWidth);
    var expandColWidth = expandIconAsCell ? expandIconCellWidth : 0;
    var lastShowIndex = computeObj.lastShowIndex;
    this.computeWidth = computeObj.computeWidth + expandColWidth;

    this.domWidthDiff = this.contentDomWidth - this.computeWidth;
    if (typeof setWidthParam == 'string' && setWidthParam.indexOf('%')) {
      this.contentWidth = this.contentWidth * parseInt(setWidthParam) / 100;
      this.domWidthDiff = this.contentDomWidth - this.contentWidth;
    }

    if (this.computeWidth < this.contentWidth) {
      var contentWidthDiff = this.scrollbarWidth ? this.contentWidth - this.computeWidth - this.scrollbarWidth : this.contentWidth - this.computeWidth;
      //bordered的表格需要减去边框的差值1
      if (this.props.bordered) {
        contentWidthDiff = contentWidthDiff - 1;
      }
      this.setState({ contentWidthDiff: contentWidthDiff, lastShowIndex: lastShowIndex });
    } else {
      this.contentWidth = this.computeWidth;
      this.setState({ contentWidthDiff: 0, lastShowIndex: lastShowIndex }); //重新渲染，为了显示滚动条
    }
  };
  //根据内容动态的判断是否显示纵向滚动条


  Table.prototype.isShowScrollY = function isShowScrollY() {
    var props = this.props;
    var y = props.scroll && props.scroll.y;
    if (y) {
      var bodyH = this.bodyTable.clientHeight;
      var bodyContentH = this.bodyTable.querySelector('table').clientHeight;
      var rightBodyTable = this.fixedRightBodyInner;
      // const leftBodyTable = this.fixedLeftBodyInner;
      var overflowy = bodyContentH <= bodyH ? 'auto' : 'scroll';
      this.bodyTable.style.overflowY = overflowy;

      this.headTable.style.overflowY = overflowy;
      rightBodyTable && (rightBodyTable.style.overflowY = overflowy);
    }
  };
  //同步固定列情况下部分区域滚动条出现引起的错位问题


  Table.prototype.onExpandedRowsChange = function onExpandedRowsChange(expandedRowKeys) {
    if (!this.props.expandedRowKeys) {
      this.setState({ expandedRowKeys: expandedRowKeys });
    }
    this.props.onExpandedRowsChange(expandedRowKeys);
  };

  Table.prototype.onExpanded = function onExpanded(expanded, record, index, e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    var info = this.findExpandedRow(record);
    if (typeof info !== 'undefined' && !expanded) {
      this.onRowDestroy(record, index, true);
    } else if (!info && expanded) {
      var expandedRows = this.getExpandedRows().concat();
      expandedRows.push(this.getRowKey(record, index));
      this.onExpandedRowsChange(expandedRows);
    }
    this.props.onExpand(expanded, record, index);
  };

  Table.prototype.onRowDestroy = function onRowDestroy(record, rowIndex, isExpandOperation) {
    var expandedRows = this.getExpandedRows().concat();
    var rowKey = this.getRowKey(record, rowIndex);
    var index = -1;
    expandedRows.forEach(function (r, i) {
      if (r === rowKey) {
        index = i;
      }
    });
    if (index !== -1) {
      expandedRows.splice(index, 1);
    }
    //
    if (this.currentHoverKey == rowKey && this.hoverDom) {
      this.hoverDom.style.display = 'none';
    }
    // todo:如果是TableRow组件卸载触发的该方法，需要加判断，解决懒加载时，持续触发onExpandedRowsChange的问题
    if (isExpandOperation) {
      this.onExpandedRowsChange(expandedRows);
    } else {
      var info = this.findExpandedRow(record);
      if (typeof info === 'undefined') {
        this.onExpandedRowsChange(expandedRows);
      }
    }
  };

  Table.prototype.getRowKey = function getRowKey(record, index) {
    var rowKey = this.props.rowKey;
    var key = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey];
    (0, _utils.warningOnce)(key !== undefined, 'Each record in table should have a unique `key` prop,' + 'or set `rowKey` to an unique primary key.');
    return key;
  };

  Table.prototype.getExpandedRows = function getExpandedRows() {
    return this.props.expandedRowKeys || this.state.expandedRowKeys;
  };

  Table.prototype.getHeader = function getHeader(columns, fixed, leftFixedWidth, rightFixedWidth) {
    // const { lastShowIndex } = this.state;
    var _props2 = this.props,
        filterDelay = _props2.filterDelay,
        onFilterChange = _props2.onFilterChange,
        onFilterClear = _props2.onFilterClear,
        filterable = _props2.filterable,
        showHeader = _props2.showHeader,
        expandIconAsCell = _props2.expandIconAsCell,
        clsPrefix = _props2.clsPrefix,
        onDragStart = _props2.onDragStart,
        onDragEnter = _props2.onDragEnter,
        onDragOver = _props2.onDragOver,
        onDrop = _props2.onDrop,
        onDragEnd = _props2.onDragEnd,
        draggable = _props2.draggable,
        onMouseDown = _props2.onMouseDown,
        onMouseMove = _props2.onMouseMove,
        onMouseUp = _props2.onMouseUp,
        dragborder = _props2.dragborder,
        onThMouseMove = _props2.onThMouseMove,
        dragborderKey = _props2.dragborderKey,
        minColumnWidth = _props2.minColumnWidth,
        headerHeight = _props2.headerHeight,
        afterDragColWidth = _props2.afterDragColWidth,
        headerScroll = _props2.headerScroll,
        bordered = _props2.bordered,
        onDropBorder = _props2.onDropBorder,
        onDraggingBorder = _props2.onDraggingBorder,
        bodyDisplayInRow = _props2.bodyDisplayInRow,
        headerEventNoStop = _props2.headerEventNoStop,
        onCopy = _props2.onCopy;

    var columnsChildrenList = []; //复杂表头拖拽，重新render表头前，将其置空
    var rows = this.getHeaderRows({ columns: columns, columnsChildrenList: columnsChildrenList });
    if (expandIconAsCell && fixed !== 'right') {
      rows[0].unshift({
        key: 'u-table-expandIconAsCell',
        className: clsPrefix + '-expand-icon-th',
        title: '',
        rowSpan: rows.length,
        width: expandIconCellWidth
      });
      columnsChildrenList.unshift({
        className: "u-table-expand-icon-column",
        key: "expand-icon"
      });
    }
    if (fixed) {
      columnsChildrenList = columnsChildrenList.filter(function (col) {
        return col.fixed == fixed;
      }); //只获取对应的固定列
    } else {
      columnsChildrenList = columnsChildrenList.filter(function (col) {
        return !col.fixed;
      }); //只获取非固定的列
    }
    var trStyle = headerHeight && !fixed ? { height: headerHeight } : fixed ? this.getHeaderRowStyle(columns, rows) : null;
    var drop = draggable ? { onDragStart: onDragStart, onDragOver: onDragOver, onDrop: onDrop, onDragEnd: onDragEnd, onDragEnter: onDragEnter, draggable: draggable } : {};
    var dragBorder = dragborder ? { onMouseDown: onMouseDown, onMouseMove: onMouseMove, onMouseUp: onMouseUp, dragborder: dragborder, onThMouseMove: onThMouseMove, dragborderKey: dragborderKey, onDropBorder: onDropBorder, onDraggingBorder: onDraggingBorder } : {};
    // let contentWidthDiff = 0;
    // //非固定表格,宽度不够时自动扩充
    // if (!fixed) {
    //   contentWidthDiff = this.state.contentWidthDiff
    // }
    return showHeader ? _react2["default"].createElement(_TableHeader2["default"], _extends({}, drop, dragBorder, {
      columnsChildrenList: columnsChildrenList,
      locale: this.props.locale,
      minColumnWidth: minColumnWidth
      // contentWidthDiff={contentWidthDiff}
      // contentWidth={this.contentWidth}
      , clsPrefix: clsPrefix,
      rows: rows,
      contentTable: this.contentTable,
      rowStyle: trStyle,
      fixed: fixed,
      filterable: filterable,
      onFilterChange: onFilterChange,
      onFilterClear: onFilterClear,
      filterDelay: filterDelay,
      afterDragColWidth: afterDragColWidth,
      contentDomWidth: this.contentDomWidth,
      scrollbarWidth: this.scrollbarWidth,
      headerScroll: headerScroll,
      bordered: bordered,
      leftFixedWidth: leftFixedWidth,
      rightFixedWidth: rightFixedWidth,
      bodyDisplayInRow: bodyDisplayInRow,
      eventNoStop: headerEventNoStop,
      onCopy: onCopy
    })) : null;
  };

  Table.prototype.getHeaderRows = function getHeaderRows(options) {
    var _this3 = this;

    var columns = options.columns,
        _options$currentRow = options.currentRow,
        currentRow = _options$currentRow === undefined ? 0 : _options$currentRow,
        rows = options.rows,
        columnsChildrenList = options.columnsChildrenList;
    var columnKey = this.props.columnKey;
    var _state = this.state,
        _state$contentWidthDi = _state.contentWidthDiff,
        contentWidthDiff = _state$contentWidthDi === undefined ? 0 : _state$contentWidthDi,
        _state$lastShowIndex = _state.lastShowIndex,
        lastShowIndex = _state$lastShowIndex === undefined ? -1 : _state$lastShowIndex;

    var filterCol = [];
    rows = rows || [];
    rows[currentRow] = rows[currentRow] || [];

    columns.forEach(function (column, i) {
      if (!column.key) {
        column.key = column[columnKey];
      }
      if (column.rowSpan && rows.length < column.rowSpan) {
        while (rows.length < column.rowSpan) {
          rows.push([]);
        }
      }
      var width = column.width;
      if (typeof width == 'string' && width.indexOf('%') > -1 && _this3.contentWidth) {
        width = parseInt(_this3.contentWidth * parseInt(width) / 100);
      } else if (width) {
        width = parseInt(width);
      }
      if (!column.fixed && lastShowIndex == i && width) {
        width = width + contentWidthDiff;
      }
      var cell = {
        key: column.key,
        className: column.className || '',
        children: column.title,
        drgHover: column.drgHover,
        fixed: column.fixed,
        width: width,
        dataindex: column.dataIndex,
        textAlign: column.textAlign,
        titleAlign: column.titleAlign, // 标题水平对齐方式
        required: column.required // 标题是否展示必填标志
      };
      if (column.onHeadCellClick) {
        cell.onClick = column.onHeadCellClick;
      }
      if (column.children) {
        _this3.getHeaderRows({ columns: column.children, currentRow: currentRow + 1, rows: rows, columnsChildrenList: columnsChildrenList });
      } else {
        columnsChildrenList && columnsChildrenList.push(column); //复杂表头拖拽，所有叶子节点
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
      if (_this3.props.filterable) {
        //组装Filter需要的Col
        filterCol.push({
          key: column.key,
          children: "过滤渲染",
          width: column.width,
          filtertype: column.filterType, //下拉的类型 包括['text','dropdown','date','daterange','number']
          dataindex: column.dataIndex, //field
          datasource: _this3.props.data, //需要单独拿到数据处理
          format: column.format, //设置日期的格式
          filterdropdown: column.filterDropdown, //是否显示 show hide
          filterdropdownauto: column.filterDropdownAuto, //是否自定义数据
          filterdropdowndata: column.filterDropdownData, //自定义数据格式
          filterdropdownfocus: column.filterDropdownFocus, //焦点触发函数回调
          filterdropdowntype: column.filterDropdownType, //下拉的类型分为 String,Number 默认是String
          filterdropdownincludekeys: column.filterDropdownIncludeKeys, //下拉条件按照指定的keys去显示
          filterinputnumberoptions: column.filterInputNumberOptions //设置数值框内的详细属性
        });
      }
    });
    if (this.props.filterable) {
      rows.push(filterCol);
    }
    return rows.filter(function (row) {
      return row.length > 0;
    });
  };

  Table.prototype.getExpandedRow = function getExpandedRow(key, content, visible, className, fixed) {
    var _props3 = this.props,
        clsPrefix = _props3.clsPrefix,
        expandIconAsCell = _props3.expandIconAsCell,
        onPaste = _props3.onPaste,
        getCellClassName = _props3.getCellClassName;

    var colCount = void 0;
    if (fixed === 'left') {
      colCount = this.columnManager.leftLeafColumns().length;
    } else if (fixed === 'right') {
      colCount = this.columnManager.rightLeafColumns().length;
    } else {
      colCount = this.columnManager.centerColumns().length; //计算非固定列的个数，fix: 嵌套表格场景，右侧列断开的问题
    }

    var expandedRowHeight = this.state.fixedColumnsExpandedRowsHeight[key] || 'auto';
    function contentContainer() {
      if (content && content.props && content.props.style) {
        return _react2["default"].createElement('div', { style: { height: content.props.style.height } });
      } else {
        return ' ';
      }
    }

    var columns = [{
      key: 'extra-row',
      render: function render() {
        return {
          props: {
            colSpan: colCount
          },
          children: !fixed ? content : contentContainer()
        };
      }
    }];
    if (expandIconAsCell && fixed !== 'right') {
      columns.unshift({
        key: 'expand-icon-placeholder',
        render: function render() {
          return null;
        }
      });
    }
    return _react2["default"].createElement(_TableRow2["default"], {
      onPaste: onPaste,
      columns: columns,
      visible: visible,
      className: className,
      key: key + '-extra-row',
      clsPrefix: clsPrefix + '-expanded-row',
      indent: 1,
      expandable: false,
      store: this.store,
      dragborderKey: this.props.dragborderKey,
      rowDraggAble: this.props.rowDraggAble,
      useDragHandle: this.props.useDragHandle,
      onDragRow: this.onDragRow,
      onDragRowStart: this.onDragRowStart,
      height: expandedRowHeight,
      getCellClassName: getCellClassName
    });
  };

  /**
   * 行拖拽开始时触发
   * @param currentKey 当前拖拽目标的key
   */


  /**
   * 行拖拽结束时触发
   * @param currentKey 当前拖拽目标的key
   * @param targetKey 拖拽结束时，目标位置的key
   */

  /**
  * 数组元素交换位置
  * @param {array} arr 数组
  * @param {number} index1 添加项目的位置
  * @param {number} index2 删除项目的位置
  */


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
  Table.prototype.getRowsByData = function getRowsByData(data, visible, indent, columns, fixed) {
    var rootIndex = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : -1;

    var props = this.props;
    var childrenColumnName = props.childrenColumnName;
    var expandedRowRender = props.expandedRowRender;
    var expandRowByClick = props.expandRowByClick;
    var onPaste = props.onPaste;
    var anyColumnsFixed = this.columnManager.isAnyColumnsFixed();
    var fixedColumnsBodyRowsHeight = this.state.fixedColumnsBodyRowsHeight;

    var rst = [];
    var height = void 0;
    var rowClassName = props.rowClassName;
    var rowRef = props.rowRef;
    var expandedRowClassName = props.expandedRowClassName;
    var needIndentSpaced = props.data.some(function (record) {
      return record[childrenColumnName];
    });
    var onRowClick = props.onRowClick;
    var onRowDoubleClick = props.onRowDoubleClick;

    var expandIconAsCell = fixed !== 'right' ? props.expandIconAsCell : false;
    var expandIconColumnIndex = props.expandIconColumnIndex;
    if (props.lazyLoad && props.lazyLoad.preHeight && indent == 0) {
      rst.push(_react2["default"].createElement(_TableRow2["default"], { onPaste: onPaste, height: props.lazyLoad.preHeight, columns: [], className: '', key: 'table_row_first', store: this.store, visible: true }));
    }
    var leafColumns = void 0;
    if (fixed === 'left') {
      leafColumns = this.columnManager.leftLeafColumns();
    } else if (fixed === 'right') {
      leafColumns = this.columnManager.rightLeafColumns();
    } else {
      leafColumns = this.columnManager.leafColumns();
    }
    var lazyCurrentIndex = props.lazyLoad && props.lazyLoad.startIndex ? props.lazyLoad.startIndex : 0;
    var lazyParentIndex = props.lazyLoad && props.lazyLoad.startParentIndex ? props.lazyLoad.startParentIndex : 0;
    var lazyEndIndex = props.lazyLoad && props.lazyLoad.endIndex ? props.lazyLoad.endIndex : -1;
    for (var i = 0; i < data.length; i++) {
      var isHiddenExpandIcon = void 0;
      var record = data[i];
      var key = this.getRowKey(record, i);
      // 兼容 NCC 以前的业务逻辑，支持外部通过 record 中的 isleaf 字段，判断是否为叶子节点
      record['_isLeaf'] = typeof record['isleaf'] === 'boolean' ? record['isleaf'] : record['_isLeaf'];
      // _isLeaf 字段是在 bigData 里添加的，只有层级树大数据场景需要该字段
      // _isLeaf 有三种取值情况：true / false / null。（Table内部字段）
      var _isLeaf = typeof record['_isLeaf'] === 'boolean' ? record['_isLeaf'] : null;
      var childrenColumn = _isLeaf ? false : record[childrenColumnName];
      var isRowExpanded = this.isRowExpanded(record, i);
      var expandedRowContent = void 0;
      var expandedContentHeight = 0;
      //fixedIndex一般是跟index是一个值的，只有是树结构时，会讲子节点的值也累计上
      var fixedIndex = i;
      //判断是否是tree结构
      if (this.treeType) {
        fixedIndex = this.treeRowIndex;
      }
      if (expandedRowRender && isRowExpanded) {
        expandedRowContent = expandedRowRender(record, fixedIndex + lazyCurrentIndex, indent);
        expandedContentHeight = parseInt(expandedRowContent.props && expandedRowContent.props.style && expandedRowContent.props.style.height ? expandedRowContent.props.style.height : 0);
      }
      //只有当使用expandedRowRender参数的时候才去识别isHiddenExpandIcon（隐藏行展开的icon）
      if (expandedRowRender && typeof props.haveExpandIcon == 'function') {
        isHiddenExpandIcon = props.haveExpandIcon(record, i);
      }

      if (props.bodyDisplayInRow) {
        //内容显示不换行，即显示为"..."
        if (anyColumnsFixed) {
          //存在固定列则强制同步行高度，以确保行不会错位
          height = fixedColumnsBodyRowsHeight[fixedIndex];
        } else {
          //不存在固定列，则按指定高度呈现行
          height = props.height || 40;
        }
      } else {
        //内容自适应行高
        if (anyColumnsFixed) {
          //存在固定列则强制同步行高度，以确保行不会错位
          height = fixedColumnsBodyRowsHeight[fixedIndex];
        } else {
          //不存在固定列，则按内容高度自行呈现
        }
      }

      // if (props.bodyDisplayInRow && props.height) {
      //   height = props.height
      // } else if(fixed || props.heightConsistent) {
      //   height = fixedColumnsBodyRowsHeight[fixedIndex];
      // }

      var className = rowClassName(record, fixedIndex + lazyCurrentIndex, indent);

      //合计代码如果是最后一行并且有合计功能时，最后一行为合计列
      if (i == data.length - 1 && props.showSum) {
        className = className + ' sumrow';
      }

      var paramRootIndex = rootIndex;
      //小于0说明为第一层节点，她的子孙节点要保存自己的根节点
      if (paramRootIndex < 0) {
        paramRootIndex = i + lazyParentIndex;
      }
      var index = i;
      if (rootIndex == -1) {
        index = i + lazyParentIndex;
      }
      rst.push(_react2["default"].createElement(_TableRow2["default"], {
        onPaste: onPaste,
        indent: indent,
        indentSize: props.indentSize,
        needIndentSpaced: needIndentSpaced,
        className: '' + className,
        record: record,
        expandIconAsCell: expandIconAsCell,
        onDestroy: this.onRowDestroy,
        index: index,
        visible: visible,
        expandRowByClick: expandRowByClick,
        onExpand: this.onExpanded,
        expandable: expandedRowRender || (childrenColumn && childrenColumn.length > 0 ? true : _isLeaf === false),
        expanded: isRowExpanded,
        clsPrefix: props.clsPrefix + '-row',
        childrenColumnName: childrenColumnName,
        columns: leafColumns,
        expandIconColumnIndex: expandIconColumnIndex,
        onRowClick: onRowClick,
        onRowDoubleClick: onRowDoubleClick,
        height: height,
        isHiddenExpandIcon: isHiddenExpandIcon,
        onHover: this.handleRowHover,
        key: "table_row_" + key + "_" + index,
        hoverKey: key,
        ref: rowRef,
        store: this.store,
        fixed: fixed,
        expandedContentHeight: expandedContentHeight,
        setRowHeight: props.setRowHeight,
        setRowParentIndex: props.setRowParentIndex,
        treeType: childrenColumn || this.treeType ? true : false,
        fixedIndex: fixedIndex + lazyCurrentIndex,
        rootIndex: rootIndex,
        syncHover: props.syncHover,
        bodyDisplayInRow: props.bodyDisplayInRow,
        rowDraggAble: props.rowDraggAble,
        useDragHandle: props.useDragHandle,
        onDragRow: this.onDragRow,
        onDragRowStart: this.onDragRowStart,
        contentTable: this.contentTable,
        tableUid: this.tableUid,
        expandedIcon: props.expandedIcon,
        collapsedIcon: props.collapsedIcon,
        lazyStartIndex: lazyCurrentIndex,
        lazyEndIndex: lazyEndIndex,
        centerColumnsLength: this.centerColumnsLength,
        leftColumnsLength: this.leftColumnsLength,
        expandIconCellWidth: expandIconCellWidth,
        getCellClassName: props.getCellClassName
      }));
      this.treeRowIndex++;
      var subVisible = visible && isRowExpanded;

      if (expandedRowContent && isRowExpanded) {
        rst.push(this.getExpandedRow(key, expandedRowContent, subVisible, expandedRowClassName(record, i, indent), fixed));
      }
      if (childrenColumn) {
        this.isTreeType = true; //增加该标志位，为了兼容老版本，不修改以前的 `this.treeType` 的相关逻辑
        this.treeType = true; //证明是tree表形式visible = {true}
        rst = rst.concat(this.getRowsByData(childrenColumn, subVisible, indent + 1, columns, fixed, paramRootIndex));
      }
    }

    if (props.lazyLoad && props.lazyLoad.sufHeight && indent == 0) {
      rst.push(_react2["default"].createElement(_TableRow2["default"], { onPaste: onPaste //containerWidth={this.contentDomWidth} isSuf //滚动loading相关的暂时不用
        , height: props.lazyLoad.sufHeight, key: 'table_row_end', columns: [], className: '', store: this.store, visible: true }));
    }
    if (!this.isTreeType) {
      this.treeType = false;
    }
    return rst;
  };

  Table.prototype.getRows = function getRows(columns, fixed) {
    //统计index，只有含有树表结构才有用，因为树表结构时，固定列的索引取值有问题
    this.treeRowIndex = 0;
    //每次遍历 data 前，将this.isTreeType置为 false，若遍历完 data，此变量仍为 false，说明是普通表格
    this.isTreeType = false;
    var rs = this.getRowsByData(this.state.data, true, 0, columns, fixed);
    return rs;
  };

  Table.prototype.getColGroup = function getColGroup(columns, fixed) {
    var _this4 = this;

    var cols = [];
    var self = this;

    var _state2 = this.state,
        _state2$contentWidthD = _state2.contentWidthDiff,
        contentWidthDiff = _state2$contentWidthD === undefined ? 0 : _state2$contentWidthD,
        _state2$lastShowIndex = _state2.lastShowIndex,
        lastShowIndex = _state2$lastShowIndex === undefined ? 0 : _state2$lastShowIndex;

    if (this.props.expandIconAsCell && fixed !== 'right') {
      cols.push(_react2["default"].createElement('col', {
        className: this.props.clsPrefix + '-expand-icon-col',
        key: 'u-table-expand-icon-col'
      }));
    }
    var leafColumns = void 0;
    if (fixed === 'left') {
      contentWidthDiff = 0;
      leafColumns = this.columnManager.leftLeafColumns();
    } else if (fixed === 'right') {
      contentWidthDiff = 0;
      leafColumns = this.columnManager.rightLeafColumns();
    } else {
      leafColumns = this.columnManager.centerLeafColumns();
    }
    cols = cols.concat(leafColumns.map(function (c, i, arr) {
      var fixedClass = '';
      var width = c.width;
      if (typeof width == 'string' && width.indexOf('%') > -1 && self.contentWidth) {
        width = parseInt(self.contentWidth * parseInt(width) / 100);
      } else if (width) {
        width = parseInt(width);
      }
      if (lastShowIndex == i && width) {
        width = width + contentWidthDiff;
      }
      if (!fixed && c.fixed) {
        fixedClass = ' ' + _this4.props.clsPrefix + '-row-fixed-columns-in-body';
      }
      return _react2["default"].createElement('col', { key: c.key, style: { width: width, minWidth: c.width }, className: fixedClass || null });
    }));
    return _react2["default"].createElement(
      'colgroup',
      { className: 'u-table-colgroup' },
      cols
    );
  };

  // renderDragHideTable = () => {
  //   const { columns,clsPrefix, dragborder, dragborderKey } = this.props;
  //   if (!dragborder) return null;
  //   let sum = 0;
  //   return (<div id={`u-table-drag-hide-table-${dragborderKey}`} className={`${clsPrefix}-hiden-drag`} >
  //     {
  //       columns.map((da, i) => {
  //         sum += da.width ? parseInt(da.width) : 0;
  //         return (<div className={`${clsPrefix}-hiden-drag-li`} key={da + "_hiden_" + i} style={{ left: sum + "px" }}></div>);
  //       })
  //     }
  //   </div>);
  // }

  Table.prototype.getLeftFixedTable = function getLeftFixedTable() {
    return this.getTable({
      columns: this.columnManager.leftColumns(),
      fixed: 'left'
    });
  };

  Table.prototype.getRightFixedTable = function getRightFixedTable() {
    return this.getTable({
      columns: this.columnManager.rightColumns(),
      fixed: 'right'
    });
  };

  Table.prototype.getTable = function getTable() {
    var _this5 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var columns = options.columns,
        fixed = options.fixed;
    var _props4 = this.props,
        clsPrefix = _props4.clsPrefix,
        data = _props4.data,
        _props4$scroll = _props4.scroll,
        scroll = _props4$scroll === undefined ? {} : _props4$scroll,
        getBodyWrapper = _props4.getBodyWrapper,
        footerScroll = _props4.footerScroll,
        headerScroll = _props4.headerScroll,
        _props4$hideHeaderScr = _props4.hideHeaderScroll,
        hideHeaderScroll = _props4$hideHeaderScr === undefined ? false : _props4$hideHeaderScr,
        expandIconAsCell = _props4.expandIconAsCell;

    var useFixedHeader = this.props.useFixedHeader; // let变量声明
    var bodyStyle = _extends({}, this.props.bodyStyle); // 克隆一份
    var headStyle = {};
    var innerBodyStyle = {};
    var leftFixedWidth = this.columnManager.getLeftColumnsWidth(this.contentWidth);
    var rightFixedWidth = this.columnManager.getRightColumnsWidth(this.contentWidth);

    var tableClassName = fixed ? clsPrefix + '-fixed' : '';

    if (scroll.x || fixed //|| this.contentDomWidth < this.contentWidth  //表格元素的宽度大于容器的宽度也显示滚动条
    ) {

        //没有数据并且含有顶部菜单时
        if (data.length == 0 && this.props.headerScroll) {
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
        //固定表格
        // bodyStyle.height = bodyStyle.height || scroll.y;
        innerBodyStyle.maxHeight = bodyStyle.maxHeight || scroll.y;
        innerBodyStyle.overflowY = bodyStyle.overflowY || 'auto';
        // gx解决底部滚动条的显示问题
        // if (this.computeWidth > this.contentDomWidth) {
        //   innerBodyStyle.overflowX = 'scroll';
        // } else if (this.contentWidth === this.contentDomWidth) {
        //   innerBodyStyle.overflowX = 'hidden';
        // }
      } else {
        bodyStyle.maxHeight = bodyStyle.maxHeight || scroll.y;
      }
      bodyStyle.overflowY = bodyStyle.overflowY || 'auto';
      useFixedHeader = true;

      // Add negative margin bottom for scroll bar overflow bug
      // const scrollbarWidth = this.scrollbarWidth;
      // if (scrollbarWidth >= 0) {
      //   (fixed ? bodyStyle : headStyle).paddingBottom = '0px';
      //   //显示表头滚动条
      //   if(headerScroll){
      //     if(fixed){
      //
      //      if(this.domWidthDiff <= 0){
      //         headStyle.marginBottom = `${scrollbarWidth}px`;
      //         bodyStyle.marginBottom = `-${scrollbarWidth}px`;
      //       }else{
      //         innerBodyStyle.overflowX = 'auto';
      //       }
      //     }else{
      //          //内容少，不用显示滚动条
      //          if(this.domWidthDiff > 0){
      //           headStyle.overflowX = 'hidden';
      //         }
      //       headStyle.marginBottom = `0px`;
      //     }
      //   }else{
      //     if(fixed){
      //       if(this.domWidthDiff > 0){
      //         headStyle.overflow = 'hidden';
      //         innerBodyStyle.overflowX = 'auto'; //兼容expand场景、子表格含有固定列的场景
      //       }else{
      //         // 海龙为了解决固定右侧滚动条Firefox下的现象问题，解决方案不合适，暂时不用，还原
      //         // if (this.computeWidth > this.contentDomWidth) {
      //         //   bodyStyle.marginBottom = '-' + scrollbarWidth + 'px';
      //         //   const userAgent = navigator.userAgent; // 火狐，IE浏览器，固定表格跟随resize事件产生的滚动条隐藏
      //         //   const isFF = userAgent.indexOf("Firefox") > -1;
      //         //   const isIE = !!window.ActiveXObject || "ActiveXObject" in window
      //         //   if (isFF || isIE) {
      //         //     // innerBodyStyle.overflowX = 'hidden';
      //         //     delete innerBodyStyle.overflowX
      //         //   }
      //         // }
      //         bodyStyle.marginBottom = `-${scrollbarWidth}px`;
      //       }
      //
      //     }else{
      //         // // 没有数据时，表头滚动条隐藏问题
      //         // if(data.length == 0 && this.domWidthDiff < 0){
      //         //   headStyle.marginBottom = '0px';
      //         // }else{
      //         //   headStyle.marginBottom = `-${scrollbarWidth}px`;
      //         // }
      //
      //     }
      //
      //   }
      // }
    }

    // if(data.length == 0 && hideHeaderScroll){
    //   //支持 NCC 需求:表格无数据时，去掉表头滚动条 (https://github.com/iuap-design/tinper-bee/issues/207)
    //   headStyle.marginBottom = `-${this.scrollbarWidth}px`;
    // }

    //----------------水平滚动条的显示处理-------------
    //没有数据时
    if (data.length == 0) {
      if (fixed) {
        //固定列头部滚水平动条隐藏
        headStyle.overflowX = 'hidden';
      } else {
        //中间列头部水平滚动条自动显示
        headStyle.overflowX = 'auto';
      }
    } else {
      //有数据时，头部水平滚动条隐藏
      headStyle.overflowX = 'hidden';
    }
    //强制固定列和中间列隐藏头部水平滚动条，
    if (hideHeaderScroll) {
      headStyle.overflowX = 'hidden';
    }

    //---------------垂直滚动条的显示处理---------------
    if (data.length == 0) {
      bodyStyle.overflowY = 'hidden';
      innerBodyStyle.overflowY = 'hidden';
      headStyle.overflowY = 'hidden';
    } else {
      bodyStyle.overflowY = bodyStyle.overflowY || 'auto';
      innerBodyStyle.overflowY = bodyStyle.overflowY;
      headStyle.overflowY = innerBodyStyle.overflowY;
    }

    var renderTable = function renderTable() {
      var hasHead = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var hasBody = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var options = arguments[2];
      var columns = options.columns,
          fixed = options.fixed;

      var tableStyle = {};
      if (!fixed && scroll.x) {
        //非固定列的中间表格
        // not set width, then use content fixed width
        if (scroll.x === true) {
          tableStyle.tableLayout = 'fixed';
        } else {
          // tableStyle.width = this.contentWidth - this.columnManager.getLeftColumnsWidth(this.contentWidth) - this.columnManager.getRightColumnsWidth(this.contentWidth);
          tableStyle.width = scroll.x;
        }
      }
      // // 自动出现滚动条
      // if ( !fixed && this.contentDomWidth < this.contentWidth) {
      //   tableStyle.width = this.contentWidth - this.columnManager.getLeftColumnsWidth(this.contentWidth) - this.columnManager.getRightColumnsWidth(this.contentWidth);
      // }
      // by gx
      // if (this.bodyTable && !fixed && this.contentDomWidth === this.contentWidth) {
      //   tableStyle.width = this.bodyTable.clientWidth
      // }
      var tableBody = hasBody ? getBodyWrapper(_react2["default"].createElement(
        'tbody',
        { className: clsPrefix + '-tbody', onMouseLeave: _this5.onBodyMouseLeave },
        _this5.getRows(columns, fixed)
      )) : null;
      var _drag_class = _this5.props.dragborder ? "table-drag-bordered" : "";
      return _react2["default"].createElement(
        'table',
        { className: ' ' + tableClassName + '  table-bordered ' + _drag_class + ' ', style: tableStyle },
        _this5.getColGroup(columns, fixed),
        hasHead ? _this5.getHeader(columns, fixed, leftFixedWidth, rightFixedWidth) : null,
        tableBody
      );
    };

    var headTable = void 0;

    if (useFixedHeader) {
      headTable = _react2["default"].createElement(
        'div',
        {
          className: clsPrefix + '-header',
          ref: function ref(el) {
            fixed ? _this5.fixedHeadTable = el : _this5.headTable = el;
          },
          style: headStyle,
          onMouseOver: this.detectScrollTarget,
          onTouchStart: this.detectScrollTarget,
          onScroll: this.handleBodyScroll
        },
        renderTable(true, false, options)
      );
    }
    var BodyTable = //中间表格的body
    _react2["default"].createElement(
      'div',
      {
        className: clsPrefix + '-body',
        style: bodyStyle,
        ref: function ref(el) {
          _this5.bodyTable = el;
        },
        onMouseOver: this.detectScrollTarget,
        onTouchStart: this.detectScrollTarget,
        onScroll: this.handleBodyScroll,
        onMouseLeave: this.onBodyMouseLeave
      },
      renderTable(!useFixedHeader, true, options)
    );

    if (fixed && columns.length) {
      //固定表格的body
      delete bodyStyle.overflowX;
      delete bodyStyle.overflowY;
      BodyTable = _react2["default"].createElement(
        'div',
        {
          className: clsPrefix + '-body-outer',
          style: _extends({}, bodyStyle)
        },
        _react2["default"].createElement(
          'div',
          {
            style: _extends({}, innerBodyStyle),
            className: clsPrefix + '-body-inner',
            ref: function ref(_ref) {
              switch (fixed) {
                case "left":
                  _this5.fixedLeftBodyInner = _ref;break;
                case "right":
                  _this5.fixedRightBodyInner = _ref;break;
              }
            },
            onMouseOver: this.detectScrollTarget,
            onTouchStart: this.detectScrollTarget,
            onScroll: this.handleBodyScroll
          },
          renderTable(!useFixedHeader, true, options)
        )
      );
    }
    // const leftFixedWidth = this.columnManager.getLeftColumnsWidth(this.contentWidth);
    // const rightFixedWidth = this.columnManager.getRightColumnsWidth(this.contentWidth);
    var expandIconWidth = expandIconAsCell ? 32 : 0;
    var parStyle = {};
    if (!fixed) {
      parStyle = { 'marginLeft': leftFixedWidth + expandIconWidth, 'marginRight': rightFixedWidth };
    }
    return _react2["default"].createElement(
      'div',
      { style: parStyle },
      headTable,
      BodyTable
    );
  };

  Table.prototype.getTitle = function getTitle() {
    var _props5 = this.props,
        title = _props5.title,
        clsPrefix = _props5.clsPrefix;

    return title ? _react2["default"].createElement(
      'div',
      { className: clsPrefix + '-title' },
      title(this.state.data)
    ) : null;
  };

  Table.prototype.getFooter = function getFooter() {
    var _props6 = this.props,
        footer = _props6.footer,
        clsPrefix = _props6.clsPrefix;

    return footer ? _react2["default"].createElement(
      'div',
      { className: clsPrefix + '-footer' },
      footer(this.state.data)
    ) : null;
  };

  Table.prototype.getEmptyText = function getEmptyText() {
    var _props7 = this.props,
        defaultEmptyText = _props7.emptyText,
        clsPrefix = _props7.clsPrefix,
        data = _props7.data;

    var locale = (0, _tool.getComponentLocale)(this.props, this.context, 'Table', function () {
      return _i18n2["default"];
    });
    var emptyText = defaultEmptyText !== undefined ? defaultEmptyText : function () {
      return _react2["default"].createElement(
        'div',
        null,
        _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-nodata', className: 'table-nodata' }),
        _react2["default"].createElement(
          'span',
          null,
          locale["no_data"]
        )
      );
    };

    return !data.length ? _react2["default"].createElement(
      'div',
      { className: clsPrefix + '-placeholder' },
      emptyText()
    ) : null;
  };

  Table.prototype.getHeaderRowStyle = function getHeaderRowStyle(columns, rows) {
    var fixedColumnsHeadRowsHeight = this.state.fixedColumnsHeadRowsHeight;

    var headerHeight = fixedColumnsHeadRowsHeight[0];

    if (headerHeight && columns) {
      if (headerHeight === 'auto') {
        return { height: 'auto' };
      }
      return { height: headerHeight / rows.length };
    }
    return null;
  };
  // getStyle(obj,attr){
  //   if(obj.currentStyle){
  //       return obj.currentStyle[attr];
  //   }
  //   else{
  //       return document.defaultView.getComputedStyle(obj,null)[attr];
  //   }
  // }
  // getTdPadding=(td)=>{
  //   let tdPaddingTop = this.getStyle(td,'paddingTop'),tdPaddingBottom = this.getStyle(td,'paddingBottom'),
  //   tdBorderTop = this.getStyle(td,'borderTopWidth'),tdBorderBottom = this.getStyle(td,'borderBottomWidth');
  //   return Number(tdPaddingTop.replace('px',''))+Number(tdPaddingBottom.replace('px',''))+Number(tdBorderTop.replace('px',''))+Number(tdBorderBottom.replace('px',''))
  //
  // }

  // getFlatRecords = data => {
  //   var result = []
  //   for (var i = 0; i < data.length; i++) {
  //     result.push(data[i])
  //     if ((data[i].children || []).length) {
  //       result = result.concat(this.getFlatRecords(data[i].children))
  //     }
  //   }
  //   return result
  // };
  //add by gx 供外部数据变更时调用此方法同步内容行高度


  Table.prototype.syncFixedTableRowHeight = function syncFixedTableRowHeight() {
    var _this6 = this;

    //this.props.height、headerHeight分别为用户传入的行高和表头高度，如果有值，所有行的高度都是固定的，主要为了避免在千行数据中有固定列时获取行高度有问题
    var _props8 = this.props,
        clsPrefix = _props8.clsPrefix,
        height = _props8.height,
        headerHeight = _props8.headerHeight,
        columns = _props8.columns,
        heightConsistent = _props8.heightConsistent,
        bodyDisplayInRow = _props8.bodyDisplayInRow,
        lazyLoad = _props8.lazyLoad,
        syncFixedRowHeight = _props8.syncFixedRowHeight;

    var headRows = this.headTable ? this.headTable.querySelectorAll('thead') : this.bodyTable.querySelectorAll('thead');
    var expandedRows = this.bodyTable.querySelectorAll('.' + clsPrefix + '-expanded-row') || [];
    var bodyRows = this.bodyTable.querySelectorAll('.' + clsPrefix + '-row') || [];
    var leftBodyRows = !this.dataChanged && this.fixedLeftBodyInner && this.fixedLeftBodyInner.querySelectorAll('.' + clsPrefix + '-row') || [];
    var rightBodyRows = !this.dataChanged && this.fixedRightBodyInner && this.fixedRightBodyInner.querySelectorAll('.' + clsPrefix + '-row') || [];
    this.dataChanged = false;
    var fixedColumnsHeadRowsHeight = [].map.call(headRows, function (row) {
      var height = headerHeight;
      if (headerHeight) {
        height = ((0, _utils.getMaxColChildrenLength)(columns) + 1) * headerHeight;
      }
      return headerHeight ? height : parseInt(row.getBoundingClientRect().height) || 'auto';
    });
    // const flatRecords = this.getFlatRecords(this.props.data || [])
    // const fixedColumnsBodyRowsHeight = [].map.call(
    //   bodyRows, (row,index) =>{
    //     let rsHeight = height;
    //     if(bodyDisplayInRow && rsHeight){
    //       return rsHeight;
    //     }else{
    //       const rowKey = row.getAttribute('data-row-key')
    //       const record = flatRecords.find(record => record.key === rowKey) || {}
    //       const leafKey = 'isleaf' in record ? 'isleaf' : '_isLeaf' in record ? '_isLeaf' : null // ncc传递这俩属性区分是否是子节点
    //       const isLeaf = leafKey && record[leafKey] === true
    //       if (isLeaf) {
    //         return Number((Number(row.getBoundingClientRect().height)).toFixed(2)) || 'auto';
    //       }
    //       // 为了提高性能，默认获取主表的高度，但是有的场景中固定列的高度比主表的高度高，所以提供此属性，会统计所有列的高度取最大的，设置
    //       // 内容折行显示，并又设置了 height 的情况下，也要获取主表高度
    //       if(heightConsistent || (!bodyDisplayInRow && rsHeight && syncFixedRowHeight)){
    //         let leftHeight,rightHeight,currentHeight,maxHeight;
    //         leftHeight = leftBodyRows[index]?Number(leftBodyRows[index].getBoundingClientRect().height).toFixed(2):0; // 有些浏览器中，取到的高度是小数，直接parseInt有问题，保留两位小数处理
    //         rightHeight = rightBodyRows[index]?Number(rightBodyRows[index].getBoundingClientRect().height).toFixed(2):0;
    //         currentHeight = Number(row.getBoundingClientRect().height).toFixed(2)
    //         maxHeight = Math.max(leftHeight,rightHeight,currentHeight);
    //         return maxHeight || 'auto'
    //       }else{
    //         return Number((Number(row.getBoundingClientRect().height)).toFixed(2)) || 'auto';
    //       }
    //     }
    //   }
    // );
    //add by zzj
    var getMax = function getMax(a, b, c) {
      //求三个数的最大值
      return a > b ? a > c ? a : c : b > c ? b : c;
    };
    var fixedColumnsBodyRowsHeight = [].map.call(bodyRows, function (row, i) {
      return getMax(leftBodyRows.length ? parseInt(leftBodyRows[i].getBoundingClientRect().height) : 0, rightBodyRows.length ? parseInt(rightBodyRows[i].getBoundingClientRect().height) : 0, parseInt(row.getBoundingClientRect().height));
    });
    // console.log("AAA--->fixedColumnsBodyRowsHeight->"+fixedColumnsBodyRowsHeight)
    var fixedColumnsExpandedRowsHeight = {};
    // expandedRows为NodeList  Array.prototype.forEach ie 下报错 对象不支持 “forEach” 方法
    expandedRows.length > 0 && Array.prototype.forEach.call(expandedRows, function (row) {
      var parentRowKey = row && row.previousSibling && row.previousSibling.getAttribute("data-row-key");
      var exHeight = row && parseInt(row.getBoundingClientRect().height) || 'auto';
      // fix: ie 展开表格计算渲染bug
      // try {//子表数据减少时，动态计算高度
      //   let td = row.querySelector('td');
      //   let tdPadding = this.getTdPadding(td);
      //   let trueheight = parseInt(row.querySelectorAll('.u-table')[0].getBoundingClientRect().height);
      //   exHeight = trueheight+tdPadding;
      // } catch (error) {
      // }
      fixedColumnsExpandedRowsHeight[parentRowKey] = parseInt(exHeight);
    });
    if ((0, _shallowequal2["default"])(this.state.fixedColumnsHeadRowsHeight, fixedColumnsHeadRowsHeight) && (0, _shallowequal2["default"])(this.state.fixedColumnsBodyRowsHeight, fixedColumnsBodyRowsHeight) && (0, _shallowequal2["default"])(this.state.fixedColumnsExpandedRowsHeight, fixedColumnsExpandedRowsHeight)) {
      return;
    }
    //add by zzj
    clearTimeout(this.timer);
    this.timer = setTimeout(function () {
      _this6.setState({
        fixedColumnsHeadRowsHeight: fixedColumnsHeadRowsHeight,
        fixedColumnsBodyRowsHeight: fixedColumnsBodyRowsHeight,
        fixedColumnsExpandedRowsHeight: fixedColumnsExpandedRowsHeight
      }, function () {
        var center = _this6.bodyTable;
        var left = _this6.fixedLeftBodyInner;
        var right = _this6.fixedRightBodyInner;
        //滚动条在最底部并且表格行高变化时，inner部分scrollTop数值不一致造成的表格没对齐。
        if (_this6.columnManager.isAnyColumnsRightFixed()) {
          if (center && right && center.scrollTop !== right.scrollTop) {
            center.scrollTop = right.scrollTop;
          }
          if (center && left && left.scrollTop !== right.scrollTop) {
            left.scrollTop = right.scrollTop;
          }
        } else {
          if (center && left && center.scrollTop !== left.scrollTop) {
            left.scrollTop = center.scrollTop;
          }
        }
      });
    }, 10);
  };

  Table.prototype.resetScrollX = function resetScrollX() {
    if (this.headTable) {
      this.headTable.scrollLeft = 0;
    }
    if (this.bodyTable) {
      this.bodyTable.scrollLeft = 0;
    }
  };

  Table.prototype.findExpandedRow = function findExpandedRow(record, index) {
    var _this7 = this;

    var rows = this.getExpandedRows().filter(function (i) {
      return i === _this7.getRowKey(record, index);
    });
    return rows[0];
  };

  Table.prototype.isRowExpanded = function isRowExpanded(record, index) {
    return typeof this.findExpandedRow(record, index) !== 'undefined';
  };

  Table.prototype.onBodyMouseLeave = function onBodyMouseLeave(e) {
    this.hideHoverDom(e);
    var onBodyMouseLeave = this.props.onBodyMouseLeave;

    if (typeof onBodyMouseLeave === 'function') {
      this.clearBodyMouseLeaveTimer();
      //因为鼠标移动到 hoverContent 中也会触发 onBodyMouseLeave，这是错误的
      //所以讲 onBodyMouseLeave 回调的调用放入 setTimeout中，
      // 当触发 hoverContent 的 onRowHoverMouseEnter 回调时，清除此定时器
      this.bodyMouseLeaveTimmer = setTimeout(onBodyMouseLeave, 0);
    }
  };

  Table.prototype.detectScrollTarget = function detectScrollTarget(e) {
    if (this.scrollTarget !== e.currentTarget) {
      this.scrollTarget = e.currentTarget;
    }
  };
  //隐藏行上悬浮的自定义dom


  Table.prototype.hideHoverDom = function hideHoverDom(e) {
    if (this.hoverDom) {
      this.hoverDom.style.display = 'none';
    }
  };

  //处理表格体内滚动


  Table.prototype.handleBodyScroll = function handleBodyScroll(e) {
    var _this8 = this;

    var _props9 = this.props,
        _props9$scroll = _props9.scroll,
        scroll = _props9$scroll === undefined ? {} : _props9$scroll,
        clsPrefix = _props9.clsPrefix,
        handleScrollY = _props9.handleScrollY,
        handleScrollX = _props9.handleScrollX,
        onBodyScroll = _props9.onBodyScroll;
    var headTable = this.headTable,
        bodyTable = this.bodyTable,
        bottomTable = this.bottomTable,
        fixedLeftBodyInner = this.fixedLeftBodyInner,
        fixedRightBodyInner = this.fixedRightBodyInner;
    // Prevent scrollTop setter trigger onScroll event
    // http://stackoverflow.com/q/1386696

    if (this.scrollTarget && e.target !== this.scrollTarget && e.target !== headTable) {
      //仅body区域滚动生效，头部区域滚动无需处理
      return;
    }
    //水平滚动的逻辑处理
    if (e.target.scrollLeft !== this.lastScrollLeft) {
      if (e.target === bodyTable) {
        //中间内容中的水平滚动
        if (headTable) headTable.scrollLeft = e.target.scrollLeft;
        if (bottomTable) bottomTable.scrollLeft = e.target.scrollLeft;
      } else if (e.target === headTable && bodyTable) {
        bodyTable.scrollLeft = e.target.scrollLeft;
      }
      if (e.target.scrollLeft === 0) {
        this.setState({ scrollPosition: 'left' });
      } else if (e.target.scrollLeft + 1 >= e.target.querySelector('table').getBoundingClientRect().width - e.target.getBoundingClientRect().width) {
        this.setState({ scrollPosition: 'right' });
      } else if (this.state.scrollPosition !== 'middle') {
        this.setState({ scrollPosition: 'middle' });
      }
      if (handleScrollX) {
        //触发props.handleScrollX
        (0, _utils.debounce)(handleScrollX(e.target.scrollLeft, this.treeType), 300);
      }
      this.lastScrollLeft = e.target.scrollLeft; //记录最后一次水平滚动位置
    }
    //垂直滚动的逻辑处理
    if (this.lastScrollTop !== e.target.scrollTop) {
      if (fixedLeftBodyInner && e.target !== fixedLeftBodyInner) {
        fixedLeftBodyInner.scrollTop = e.target.scrollTop;
      }
      if (fixedRightBodyInner && e.target !== fixedRightBodyInner) {
        fixedRightBodyInner.scrollTop = e.target.scrollTop;
      }
      if (bodyTable && e.target !== bodyTable) {
        bodyTable.scrollTop = e.target.scrollTop;
      }
      //注意快速滚动时将行的hover效果隐藏，timeout之后还原，以解决固定列情况下表格滚动时hover效果错位的问题。
      if (!this.state.currentHoverKey) {
        this.store.setState({ currentHoverKey: null });
        clearTimeout(this.scrollHoverKeyTimer);
        this.scrollHoverKeyTimer = setTimeout(function () {
          _this8.store.setState({ currentHoverKey: _this8.hoverKey });
        }, 100);
      }
      this.hideHoverDom(e); //隐藏外部自定义悬浮dom
      this.lastScrollTop = e.target.scrollTop; //记录最后一次垂直滚动位置
      if (handleScrollY) {
        //触发props.handleScrollY
        (0, _utils.debounce)(handleScrollY(this.lastScrollTop, this.treeType, onBodyScroll), 300);
      } else {
        onBodyScroll(this.lastScrollTop); //触发props.onBodyScroll滚动回调
      }
    }
  };

  Table.prototype.handleRowHover = function handleRowHover(isHover, key, event, currentIndex, propsRecord) {
    var _this9 = this;

    //增加新的API，设置是否同步Hover状态，提高性能，避免无关的渲染
    var _props10 = this.props,
        syncHover = _props10.syncHover,
        onRowHover = _props10.onRowHover,
        data = _props10.data,
        lazyLoad = _props10.lazyLoad;
    //fix:树形表，onRowHover返回参数异常

    var isTreeType = this.isTreeType;

    var record = isTreeType ? propsRecord : lazyLoad ? data.find(function (item, index) {
      var rowKey = item.key ? item.key : _this9.getRowKey(item, index);
      return rowKey === key;
    }) : data[currentIndex];
    this.hoverKey = key;
    // 固定列、或者含有hoverdom时情况下同步hover状态
    if (this.columnManager.isAnyColumnsFixed() && syncHover) {
      this.store.setState({
        currentHoverKey: isHover ? key : null
      });
    }

    if (this.hoverDom) {
      if (isHover) {
        this.currentHoverKey = key;
        var td = (0, _utils.closest)(event.target, 'td');
        if (td) {
          var scrollTop = this.lastScrollTop ? this.lastScrollTop : 0;
          var top = td.offsetTop - scrollTop;
          if (this.headTable) {
            top = top + this.headTable.clientHeight;
          }
          this.hoverDom.style.top = top + 'px';
          this.hoverDom.style.height = td.offsetHeight + 'px';
          this.hoverDom.style.lineHeight = td.offsetHeight + 'px';
          this.hoverDom.style.display = 'block';
        }
        this.setState({
          currentHoverIndex: currentIndex,
          currentHoverRecord: record
        });
      }
    }
    onRowHover && onRowHover(currentIndex, record);
  };

  Table.prototype.render = function render() {
    var _this10 = this;

    var _state3 = this.state,
        currentHoverRecord = _state3.currentHoverRecord,
        currentHoverIndex = _state3.currentHoverIndex;

    var props = this.props;
    var clsPrefix = props.clsPrefix;
    var hasFixedLeft = this.columnManager.isAnyColumnsLeftFixed();
    var hasFixedRight = this.columnManager.isAnyColumnsRightFixed();
    var className = props.clsPrefix;
    if (props.className) {
      className += ' ' + props.className;
    }
    if (props.useFixedHeader || props.scroll && props.scroll.y) {
      className += ' ' + clsPrefix + '-fixed-header';
    }
    if (!props.showHeader) {
      className += ' ' + clsPrefix + '-hide-header';
    }
    if (props.bordered) {
      className += ' ' + clsPrefix + '-bordered';
    }
    if (props.onCopy) {
      className += ' copy';
    }
    className += ' ' + clsPrefix + '-scroll-position-' + this.state.scrollPosition;
    //如果传入height说明是固定高度
    //内容过多折行显示时，height 属性会失效，为了避免产生错行
    if (props.bodyDisplayInRow && props.height) {
      className += ' fixed-height';
    }
    if (props.bodyDisplayInRow) {
      className += ' body-dispaly-in-row';
    }
    if (props.headerDisplayInRow) {
      className += ' header-dispaly-in-row';
    }
    var isTableScroll = this.columnManager.isAnyColumnsFixed() || props.scroll.x || props.scroll.y;
    var loading = props.loading;
    if (typeof loading === 'boolean') {
      loading = {
        show: loading
      };
    }
    if (props.size) {
      className += ' ' + clsPrefix + '-' + props.size;
    }
    if (hasFixedLeft) {
      className += ' has-fixed-left';
    }
    if (hasFixedRight) {
      className += ' has-fixed-right';
    }
    return _react2["default"].createElement(
      'div',
      { className: className, style: props.style, ref: function ref(el) {
          return _this10.contentTable = el;
        },
        tabIndex: props.focusable && (props.tabIndex ? props.tabIndex : '0') },
      this.getTitle(),
      _react2["default"].createElement(
        'div',
        { className: clsPrefix + '-content' },
        _react2["default"].createElement(
          'div',
          { className: isTableScroll ? clsPrefix + '-scroll' : '' },
          this.getTable({ columns: this.columnManager.groupedColumns() }),
          this.getEmptyText(),
          this.getFooter()
        ),
        hasFixedLeft && _react2["default"].createElement(
          'div',
          { className: clsPrefix + '-fixed-left' },
          this.getLeftFixedTable()
        ),
        this.columnManager.isAnyColumnsRightFixed() && _react2["default"].createElement(
          'div',
          { className: clsPrefix + '-fixed-right' },
          this.getRightFixedTable()
        )
      ),
      _react2["default"].createElement(_beeLoading2["default"], _extends({
        container: this
      }, loading)),
      props.hoverContent && _react2["default"].createElement(
        'div',
        { className: 'u-row-hover',
          onMouseEnter: this.onRowHoverMouseEnter, onMouseLeave: this.onRowHoverMouseLeave, ref: function ref(el) {
            return _this10.hoverDom = el;
          } },
        currentHoverRecord ? props.hoverContent(currentHoverRecord, currentHoverIndex) : null
      )
    );
  };

  return Table;
}(_react.Component);

;

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;
Table.contextTypes = {
  beeLocale: _propTypes2["default"].object
};

exports["default"] = Table;
module.exports = exports['default'];