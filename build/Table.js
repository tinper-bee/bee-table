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

var _utils = require('./utils');

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
  expandedRowClassName: _propTypes2["default"].func,
  childrenColumnName: _propTypes2["default"].string,
  onExpand: _propTypes2["default"].func,
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
  tabIndex: _propTypes2["default"].string
};

var defaultProps = {
  data: [],
  useFixedHeader: false,
  expandIconAsCell: false,
  defaultExpandAllRows: false,
  defaultExpandedRowKeys: [],
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
  onRowDoubleClick: function onRowDoubleClick() {},

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
  emptyText: function emptyText() {
    return 'No Data';
  },
  columns: [],
  minColumnWidth: 80,
  locale: {},
  syncHover: true,
  setRowHeight: function setRowHeight() {},
  setRowParentIndex: function setRowParentIndex() {},
  tabIndex: '0'
};

var Table = function (_Component) {
  _inherits(Table, _Component);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.renderDragHideTable = function () {
      var _this$props = _this.props,
          columns = _this$props.columns,
          dragborder = _this$props.dragborder,
          dragborderKey = _this$props.dragborderKey;

      if (!dragborder) return null;
      var sum = 0;
      return _react2["default"].createElement(
        'div',
        { id: 'u-table-drag-hide-table-' + dragborderKey, className: _this.props.clsPrefix + '-hiden-drag' },
        columns.map(function (da, i) {
          sum += da.width ? da.width : 0;
          return _react2["default"].createElement('div', { className: _this.props.clsPrefix + '-hiden-drag-li', key: da + "_hiden_" + i, style: { left: sum + "px" } });
        })
      );
    };

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
    _this.columnManager = new _ColumnManager2["default"](props.columns, props.children, props.originWidth);
    _this.store = (0, _createStore2["default"])({ currentHoverKey: null });

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
      fixedColumnsBodyRowsHeight: []
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
    _this.resetScrollY = _this.resetScrollY.bind(_this);
    _this.findExpandedRow = _this.findExpandedRow.bind(_this);
    _this.isRowExpanded = _this.isRowExpanded.bind(_this);
    _this.detectScrollTarget = _this.detectScrollTarget.bind(_this);
    _this.handleBodyScroll = _this.handleBodyScroll.bind(_this);
    _this.handleRowHover = _this.handleRowHover.bind(_this);
    _this.computeTableWidth = _this.computeTableWidth.bind(_this);
    return _this;
  }

  Table.prototype.componentDidMount = function componentDidMount() {
    _utils.EventUtil.addHandler(this.contentTable, 'keydown', this.onKeyDown);
    _utils.EventUtil.addHandler(this.contentTable, 'focus', this.onFocus);
    setTimeout(this.resetScrollY, 300);
    //含有纵向滚动条
    if (this.props.scroll.y) {
      this.scrollbarWidth = (0, _utils.measureScrollbar)();
    }
    //后续也放在recevice里面
    if (!this.props.originWidth) {
      this.computeTableWidth();
    }
    if (this.columnManager.isAnyColumnsFixed()) {
      this.syncFixedTableRowHeight();
      this.resizeEvent = (0, _addEventListener2["default"])(window, 'resize', (0, _utils.debounce)(this.syncFixedTableRowHeight, 150));
    }
  };

  Table.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('data' in nextProps) {
      this.setState({
        data: nextProps.data
      });
      if (!nextProps.data || nextProps.data.length === 0) {
        this.resetScrollY();
      }
    }
    if ('expandedRowKeys' in nextProps) {
      this.setState({
        expandedRowKeys: nextProps.expandedRowKeys
      });
    }
    if (nextProps.columns && nextProps.columns !== this.props.columns) {
      this.columnManager.reset(nextProps.columns);
      if (nextProps.columns.length !== this.props.columns.length && this.refs && this.refs.bodyTable) {
        this.scrollTop = this.refs.bodyTable.scrollTop;
      }
    } else if (nextProps.children !== this.props.children) {
      this.columnManager.reset(null, nextProps.children);
    }
    //适配lazyload
    if (nextProps.scrollTop > -1) {
      // this.refs.bodyTable.scrollTop = nextProps.scrollTop;
      this.scrollTop = nextProps.scrollTop;
    }
    if (!nextProps.originWidth) {
      this.computeTableWidth();
      this.firstDid = true; //避免重复update
    }
    if (nextProps.resetScroll) {
      this.resetScrollY();
    }

    // console.log('this.scrollTop**********',this.scrollTop);
  };

  Table.prototype.componentDidUpdate = function componentDidUpdate() {

    if (this.columnManager.isAnyColumnsFixed()) {
      this.syncFixedTableRowHeight();
    }
    //适应模态框中表格、以及父容器宽度变化的情况
    if (typeof this.props.scroll.x !== 'number' && this.contentTable.getBoundingClientRect().width !== this.contentDomWidth && this.firstDid) {
      this.computeTableWidth();
      this.firstDid = false; //避免重复update
    }
    if (this.scrollTop > -1) {
      this.refs.fixedColumnsBodyLeft && (this.refs.fixedColumnsBodyLeft.scrollTop = this.scrollTop);
      this.refs.fixedColumnsBodyRight && (this.refs.fixedColumnsBodyRight.scrollTop = this.scrollTop);
      this.refs.bodyTable.scrollTop = this.scrollTop;
      this.scrollTop = -1;
    }
  };

  Table.prototype.componentWillUnmount = function componentWillUnmount() {
    _utils.EventUtil.removeHandler(this.contentTable, 'keydown', this.onKeyDown);
    _utils.EventUtil.removeHandler(this.contentTable, 'focus', this.onFocus);
    if (this.resizeEvent) {
      this.resizeEvent.remove();
    }
  };

  Table.prototype.computeTableWidth = function computeTableWidth() {

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
    var lastShowIndex = computeObj.lastShowIndex;
    this.computeWidth = computeObj.computeWidth;

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
      this.onRowDestroy(record, index);
    } else if (!info && expanded) {
      var expandedRows = this.getExpandedRows().concat();
      expandedRows.push(this.getRowKey(record, index));
      this.onExpandedRowsChange(expandedRows);
    }
    this.props.onExpand(expanded, record);
  };

  Table.prototype.onRowDestroy = function onRowDestroy(record, rowIndex) {
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
    this.onExpandedRowsChange(expandedRows);
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

  Table.prototype.getHeader = function getHeader(columns, fixed) {
    var _props = this.props,
        filterDelay = _props.filterDelay,
        onFilterChange = _props.onFilterChange,
        onFilterClear = _props.onFilterClear,
        filterable = _props.filterable,
        showHeader = _props.showHeader,
        expandIconAsCell = _props.expandIconAsCell,
        clsPrefix = _props.clsPrefix,
        onDragStart = _props.onDragStart,
        onDragEnter = _props.onDragEnter,
        onDragOver = _props.onDragOver,
        onDrop = _props.onDrop,
        draggable = _props.draggable,
        onMouseDown = _props.onMouseDown,
        onMouseMove = _props.onMouseMove,
        onMouseUp = _props.onMouseUp,
        dragborder = _props.dragborder,
        onThMouseMove = _props.onThMouseMove,
        dragborderKey = _props.dragborderKey,
        minColumnWidth = _props.minColumnWidth,
        headerHeight = _props.headerHeight,
        afterDragColWidth = _props.afterDragColWidth,
        headerScroll = _props.headerScroll,
        bordered = _props.bordered,
        onDropBorder = _props.onDropBorder;

    var rows = this.getHeaderRows(columns);
    if (expandIconAsCell && fixed !== 'right') {
      rows[0].unshift({
        key: 'u-table-expandIconAsCell',
        className: clsPrefix + '-expand-icon-th',
        title: '',
        rowSpan: rows.length
      });
    }

    var trStyle = headerHeight && !fixed ? { height: headerHeight } : fixed ? this.getHeaderRowStyle(columns, rows) : null;
    var drop = draggable ? { onDragStart: onDragStart, onDragOver: onDragOver, onDrop: onDrop, onDragEnter: onDragEnter, draggable: draggable } : {};
    var dragBorder = dragborder ? { onMouseDown: onMouseDown, onMouseMove: onMouseMove, onMouseUp: onMouseUp, dragborder: dragborder, onThMouseMove: onThMouseMove, dragborderKey: dragborderKey, onDropBorder: onDropBorder } : {};
    var contentWidthDiff = 0;
    //非固定表格,宽度不够时自动扩充
    if (!fixed) {
      contentWidthDiff = this.state.contentWidthDiff;
    }
    return showHeader ? _react2["default"].createElement(_TableHeader2["default"], _extends({}, drop, dragBorder, {
      locale: this.props.locale,
      minColumnWidth: minColumnWidth,
      contentWidthDiff: contentWidthDiff,
      contentWidth: this.contentWidth,
      lastShowIndex: this.state.lastShowIndex,
      clsPrefix: clsPrefix,
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
      bordered: bordered
    })) : null;
  };

  Table.prototype.getHeaderRows = function getHeaderRows(columns) {
    var _this2 = this;

    var currentRow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var rows = arguments[2];
    var _state = this.state,
        _state$contentWidthDi = _state.contentWidthDiff,
        contentWidthDiff = _state$contentWidthDi === undefined ? 0 : _state$contentWidthDi,
        _state$lastShowIndex = _state.lastShowIndex,
        lastShowIndex = _state$lastShowIndex === undefined ? -1 : _state$lastShowIndex;

    var filterCol = [];
    rows = rows || [];
    rows[currentRow] = rows[currentRow] || [];

    columns.forEach(function (column, i) {
      if (column.rowSpan && rows.length < column.rowSpan) {
        while (rows.length < column.rowSpan) {
          rows.push([]);
        }
      }
      var width = column.width;
      if (typeof width == 'string' && width.indexOf('%') > -1 && _this2.contentWidth) {
        width = parseInt(_this2.contentWidth * parseInt(width) / 100);
      } else if (width) {
        width = parseInt(width);
      }
      if (lastShowIndex == i && width) {
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
        textAlign: column.textAlign
      };
      if (column.onHeadCellClick) {
        cell.onClick = column.onHeadCellClick;
      }
      if (column.children) {
        _this2.getHeaderRows(column.children, currentRow + 1, rows);
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
      if (_this2.props.filterable) {
        //组装Filter需要的Col
        filterCol.push({
          key: column.key,
          children: "过滤渲染",
          width: column.width,
          filtertype: column.filterType, //下拉的类型 包括['text','dropdown','date','daterange','number']
          dataindex: column.dataIndex, //field
          datasource: _this2.props.data, //需要单独拿到数据处理
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
    var _props2 = this.props,
        clsPrefix = _props2.clsPrefix,
        expandIconAsCell = _props2.expandIconAsCell;

    var colCount = void 0;
    if (fixed === 'left') {
      colCount = this.columnManager.leftLeafColumns().length;
    } else if (fixed === 'right') {
      colCount = this.columnManager.rightLeafColumns().length;
    } else {
      colCount = this.columnManager.leafColumns().length;
    }

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
      columns: columns,
      visible: visible,
      className: className,
      key: key + '-extra-row',
      clsPrefix: clsPrefix + '-expanded-row',
      indent: 1,
      expandable: false,
      store: this.store,
      dragborderKey: this.props.dragborderKey
    });
  };
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
    var fixedColumnsBodyRowsHeight = this.state.fixedColumnsBodyRowsHeight;

    var rst = [];
    var isHiddenExpandIcon = void 0;
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
    var expandIconColumnIndex = fixed !== 'right' ? props.expandIconColumnIndex : -1;
    if (props.lazyLoad && props.lazyLoad.preHeight && indent == 0) {
      rst.push(_react2["default"].createElement(_TableRow2["default"], { height: props.lazyLoad.preHeight, columns: [], className: '', store: this.store, visible: true }));
    }
    var lazyCurrentIndex = props.lazyLoad && props.lazyLoad.startIndex ? props.lazyLoad.startIndex : 0;
    var lazyParentIndex = props.lazyLoad && props.lazyLoad.startParentIndex ? props.lazyLoad.startParentIndex : 0;
    for (var i = 0; i < data.length; i++) {
      var record = data[i];
      var key = this.getRowKey(record, i);
      var childrenColumn = record[childrenColumnName];
      var isRowExpanded = this.isRowExpanded(record, i);
      var expandedRowContent = void 0;
      var expandedContentHeight = 0;
      if (expandedRowRender && isRowExpanded) {
        expandedRowContent = expandedRowRender(record, i, indent);
        expandedContentHeight = parseInt(expandedRowContent.props && expandedRowContent.props.style && expandedRowContent.props.style.height ? expandedRowContent.props.style.height : 0);
      }
      //只有当使用expandedRowRender参数的时候才去识别isHiddenExpandIcon（隐藏行展开的icon）
      if (expandedRowRender && typeof props.haveExpandIcon == 'function') {
        isHiddenExpandIcon = props.haveExpandIcon(record, i);
      }
      var className = rowClassName(record, i, indent);

      var onHoverProps = {};
      if (this.columnManager.isAnyColumnsFixed()) {
        onHoverProps.onHover = this.handleRowHover;
      }
      //fixedIndex一般是跟index是一个值的，只有是树结构时，会讲子节点的值也累计上
      var fixedIndex = i;
      //判断是否是tree结构
      if (this.treeType) {
        fixedIndex = this.treeRowIndex;
      }

      if (props.height) {
        height = props.height;
      } else if (fixed) {
        height = fixedColumnsBodyRowsHeight[fixedIndex];
      }

      var leafColumns = void 0;
      if (fixed === 'left') {
        leafColumns = this.columnManager.leftLeafColumns();
      } else if (fixed === 'right') {
        leafColumns = this.columnManager.rightLeafColumns();
      } else {
        leafColumns = this.columnManager.leafColumns();
      }

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
      rst.push(_react2["default"].createElement(_TableRow2["default"], _extends({
        indent: indent,
        indentSize: props.indentSize,
        needIndentSpaced: needIndentSpaced,
        className: className,
        record: record,
        expandIconAsCell: expandIconAsCell,
        onDestroy: this.onRowDestroy,
        index: index,
        visible: visible,
        expandRowByClick: expandRowByClick,
        onExpand: this.onExpanded,
        expandable: childrenColumn || expandedRowRender,
        expanded: isRowExpanded,
        clsPrefix: props.clsPrefix + '-row',
        childrenColumnName: childrenColumnName,
        columns: leafColumns,
        expandIconColumnIndex: expandIconColumnIndex,
        onRowClick: onRowClick,
        onRowDoubleClick: onRowDoubleClick,
        height: height,
        isHiddenExpandIcon: isHiddenExpandIcon
      }, onHoverProps, {
        key: key,
        hoverKey: key,
        ref: rowRef,
        store: this.store,
        fixed: fixed,
        expandedContentHeight: expandedContentHeight,
        setRowHeight: props.setRowHeight,
        setRowParentIndex: props.setRowParentIndex,
        treeType: childrenColumn || this.treeType ? true : false,
        fixedIndex: fixedIndex + lazyCurrentIndex,
        rootIndex: rootIndex

      })));
      this.treeRowIndex++;
      var subVisible = visible && isRowExpanded;

      if (expandedRowContent && isRowExpanded) {
        rst.push(this.getExpandedRow(key, expandedRowContent, subVisible, expandedRowClassName(record, i, indent), fixed));
      }
      if (childrenColumn) {
        this.treeType = true; //证明是tree表形式visible = {true}
        rst = rst.concat(this.getRowsByData(childrenColumn, subVisible, indent + 1, columns, fixed, paramRootIndex));
      }
    }

    if (props.lazyLoad && props.lazyLoad.sufHeight && indent == 0) {
      rst.push(_react2["default"].createElement(_TableRow2["default"], { height: props.lazyLoad.sufHeight, columns: [], className: '', store: this.store, visible: true }));
    }
    return rst;
  };

  Table.prototype.getRows = function getRows(columns, fixed) {
    //统计index，只有含有鼠表结构才有用，因为数表结构时，固定列的索引取值有问题
    this.treeRowIndex = 0;
    return this.getRowsByData(this.state.data, true, 0, columns, fixed);
  };

  Table.prototype.getColGroup = function getColGroup(columns, fixed) {
    var _this3 = this;

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
      leafColumns = this.columnManager.leafColumns();
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
        fixedClass = ' ' + _this3.props.clsPrefix + '-row-fixed-columns-in-body';
      }
      return _react2["default"].createElement('col', { key: c.key, style: { width: width, minWidth: c.width }, className: fixedClass });
    }));
    return _react2["default"].createElement(
      'colgroup',
      { id: 'bee-table-colgroup' },
      cols
    );
  };

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
    var _this4 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var columns = options.columns,
        fixed = options.fixed;
    var _props3 = this.props,
        clsPrefix = _props3.clsPrefix,
        _props3$scroll = _props3.scroll,
        scroll = _props3$scroll === undefined ? {} : _props3$scroll,
        getBodyWrapper = _props3.getBodyWrapper,
        footerScroll = _props3.footerScroll,
        headerScroll = _props3.headerScroll;
    var useFixedHeader = this.props.useFixedHeader;

    var bodyStyle = _extends({}, this.props.bodyStyle);
    var headStyle = {};
    var innerBodyStyle = {};

    var tableClassName = '';
    //表格元素的宽度大于容器的宽度也显示滚动条
    if (scroll.x || fixed || this.contentDomWidth < this.contentWidth) {
      tableClassName = clsPrefix + '-fixed';
      //没有数据并且含有顶部菜单时
      if (this.props.data.length == 0 && this.props.headerScroll) {
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
      var scrollbarWidth = this.scrollbarWidth;
      if (scrollbarWidth >= 0) {
        (fixed ? bodyStyle : headStyle).paddingBottom = '0px';
        //显示表头滚动条
        if (headerScroll) {
          if (fixed) {
            //内容少，不用显示滚动条
            if (this.domWidthDiff <= 0) {
              headStyle.marginBottom = scrollbarWidth + 'px';
              bodyStyle.marginBottom = '-' + scrollbarWidth + 'px';
            } else {
              innerBodyStyle.overflowX = 'auto';
            }
          } else {
            //内容少，不用显示滚动条
            if (this.domWidthDiff > 0) {
              headStyle.overflowX = 'hidden';
            }
            headStyle.marginBottom = '0px';
          }
        } else {
          if (fixed) {
            if (this.domWidthDiff > 0) {
              headStyle.overflow = 'hidden';
              innerBodyStyle.overflowX = 'auto'; //兼容expand场景、子表格含有固定列的场景
            } else {
              bodyStyle.marginBottom = '-' + scrollbarWidth + 'px';
            }
          } else {
            headStyle.marginBottom = '-' + scrollbarWidth + 'px';
          }
        }
      }
    }

    var renderTable = function renderTable() {
      var hasHead = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var hasBody = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var tableStyle = {};
      if (!fixed && scroll.x) {
        // not set width, then use content fixed width
        if (scroll.x === true) {
          tableStyle.tableLayout = 'fixed';
        } else {
          tableStyle.width = _this4.contentWidth - _this4.columnManager.getLeftColumnsWidth(_this4.contentWidth) - _this4.columnManager.getRightColumnsWidth(_this4.contentWidth);
        }
      }
      // 自动出现滚动条
      if (!fixed && _this4.contentDomWidth < _this4.contentWidth) {
        tableStyle.width = _this4.contentWidth - _this4.columnManager.getLeftColumnsWidth(_this4.contentWidth) - _this4.columnManager.getRightColumnsWidth(_this4.contentWidth);
      }
      var tableBody = hasBody ? getBodyWrapper(_react2["default"].createElement(
        'tbody',
        { className: clsPrefix + '-tbody' },
        _this4.getRows(columns, fixed)
      )) : null;
      var _drag_class = _this4.props.dragborder ? "table-drag-bordered" : "";
      return _react2["default"].createElement(
        'table',
        { id: 'bee-table-uid', className: ' ' + tableClassName + '  table-bordered ' + _drag_class + ' ', style: tableStyle },
        _this4.getColGroup(columns, fixed),
        hasHead ? _this4.getHeader(columns, fixed) : null,
        tableBody
      );
    };

    var headTable = void 0;

    if (useFixedHeader) {
      headTable = _react2["default"].createElement(
        'div',
        {
          className: clsPrefix + '-header',
          ref: fixed ? null : 'headTable',
          style: headStyle,
          onMouseOver: this.detectScrollTarget,
          onTouchStart: this.detectScrollTarget,
          onScroll: this.handleBodyScroll
        },
        renderTable(true, false)
      );
    }
    var BodyTable = _react2["default"].createElement(
      'div',
      {
        className: clsPrefix + '-body',
        style: bodyStyle,
        ref: 'bodyTable',
        onMouseOver: this.detectScrollTarget,
        onTouchStart: this.detectScrollTarget,
        onScroll: this.handleBodyScroll
      },
      this.renderDragHideTable(),
      renderTable(!useFixedHeader)
    );

    if (fixed && columns.length) {
      var refName = void 0;
      if (columns[0].fixed === 'left' || columns[0].fixed === true) {
        refName = 'fixedColumnsBodyLeft';
      } else if (columns[0].fixed === 'right') {
        refName = 'fixedColumnsBodyRight';
      }
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
            ref: refName,
            onMouseOver: this.detectScrollTarget,
            onTouchStart: this.detectScrollTarget,
            onScroll: this.handleBodyScroll
          },
          renderTable(!useFixedHeader)
        )
      );
    }
    var leftFixedWidth = this.columnManager.getLeftColumnsWidth(this.contentWidth);
    var rightFixedWidth = this.columnManager.getRightColumnsWidth(this.contentWidth);
    var parStyle = {};
    if (!fixed) {
      parStyle = { 'marginLeft': leftFixedWidth, 'marginRight': rightFixedWidth };
    }
    return _react2["default"].createElement(
      'div',
      { style: parStyle },
      headTable,
      BodyTable
    );
  };

  Table.prototype.getTitle = function getTitle() {
    var _props4 = this.props,
        title = _props4.title,
        clsPrefix = _props4.clsPrefix;

    return title ? _react2["default"].createElement(
      'div',
      { className: clsPrefix + '-title' },
      title(this.state.data)
    ) : null;
  };

  Table.prototype.getFooter = function getFooter() {
    var _props5 = this.props,
        footer = _props5.footer,
        clsPrefix = _props5.clsPrefix;

    return footer ? _react2["default"].createElement(
      'div',
      { className: clsPrefix + '-footer' },
      footer(this.state.data)
    ) : null;
  };

  Table.prototype.getEmptyText = function getEmptyText() {
    var _props6 = this.props,
        emptyText = _props6.emptyText,
        clsPrefix = _props6.clsPrefix,
        data = _props6.data;

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

  Table.prototype.syncFixedTableRowHeight = function syncFixedTableRowHeight() {
    //this.props.height、headerHeight分别为用户传入的行高和表头高度，如果有值，所有行的高度都是固定的，主要为了避免在千行数据中有固定列时获取行高度有问题
    var _props7 = this.props,
        clsPrefix = _props7.clsPrefix,
        height = _props7.height,
        headerHeight = _props7.headerHeight,
        columns = _props7.columns;

    var headRows = this.refs.headTable ? this.refs.headTable.querySelectorAll('thead') : this.refs.bodyTable.querySelectorAll('thead');
    var bodyRows = this.refs.bodyTable.querySelectorAll('.' + clsPrefix + '-row') || [];
    var fixedColumnsHeadRowsHeight = [].map.call(headRows, function (row) {
      var height = headerHeight;
      if (headerHeight) {
        height = ((0, _utils.getMaxColChildrenLength)(columns) + 1) * headerHeight;
      }
      return headerHeight ? height : row.getBoundingClientRect().height || 'auto';
    });
    var fixedColumnsBodyRowsHeight = [].map.call(bodyRows, function (row) {
      return height ? height : row.getBoundingClientRect().height || 'auto';
    });
    if ((0, _shallowequal2["default"])(this.state.fixedColumnsHeadRowsHeight, fixedColumnsHeadRowsHeight) && (0, _shallowequal2["default"])(this.state.fixedColumnsBodyRowsHeight, fixedColumnsBodyRowsHeight)) {
      return;
    }
    this.setState({
      fixedColumnsHeadRowsHeight: fixedColumnsHeadRowsHeight,
      fixedColumnsBodyRowsHeight: fixedColumnsBodyRowsHeight
    });
  };

  Table.prototype.resetScrollY = function resetScrollY() {
    if (this.refs.headTable) {
      this.refs.headTable.scrollLeft = 0;
    }
    if (this.refs.bodyTable) {
      this.refs.bodyTable.scrollLeft = 0;
    }
  };

  Table.prototype.findExpandedRow = function findExpandedRow(record, index) {
    var _this5 = this;

    var rows = this.getExpandedRows().filter(function (i) {
      return i === _this5.getRowKey(record, index);
    });
    return rows[0];
  };

  Table.prototype.isRowExpanded = function isRowExpanded(record, index) {
    return typeof this.findExpandedRow(record, index) !== 'undefined';
  };

  Table.prototype.detectScrollTarget = function detectScrollTarget(e) {
    if (this.scrollTarget !== e.currentTarget) {
      this.scrollTarget = e.currentTarget;
    }
  };

  Table.prototype.handleBodyScroll = function handleBodyScroll(e) {
    var _props8 = this.props,
        _props8$scroll = _props8.scroll,
        scroll = _props8$scroll === undefined ? {} : _props8$scroll,
        clsPrefix = _props8.clsPrefix,
        handleScrollY = _props8.handleScrollY,
        handleScrollX = _props8.handleScrollX;
    var _refs = this.refs,
        headTable = _refs.headTable,
        bodyTable = _refs.bodyTable,
        fixedColumnsBodyLeft = _refs.fixedColumnsBodyLeft,
        fixedColumnsBodyRight = _refs.fixedColumnsBodyRight;
    // Prevent scrollTop setter trigger onScroll event
    // http://stackoverflow.com/q/1386696

    if (e.target !== this.scrollTarget && this.scrollTarget !== headTable) {
      return;
    }
    if (e.target.scrollLeft !== this.lastScrollLeft) {
      var position = '';
      if (e.target === bodyTable && headTable) {
        headTable.scrollLeft = e.target.scrollLeft;
      } else if (e.target === headTable && bodyTable) {
        bodyTable.scrollLeft = e.target.scrollLeft;
      }
      if (e.target.scrollLeft === 0) {
        position = 'left';
      } else if (e.target.scrollLeft + 1 >= e.target.children[0].getBoundingClientRect().width - e.target.getBoundingClientRect().width) {
        position = 'right';
      } else if (this.state.scrollPosition !== 'middle') {
        position = 'middle';
      }
      if (position) {
        (0, _componentClasses2["default"])(this.contentTable).remove(new RegExp('^' + clsPrefix + '-scroll-position-.+$')).add(clsPrefix + '-scroll-position-' + position);
      }
      if (handleScrollX) {
        (0, _utils.debounce)(handleScrollX(e.target.scrollLeft, this.treeType), 300);
      }
    }
    // console.log('lastScrollTop--'+this.lastScrollTop+'--eventScrollTop--'+ e.target.scrollTop);
    if (scroll.y && this.lastScrollTop != e.target.scrollTop) {
      if (fixedColumnsBodyLeft && e.target !== fixedColumnsBodyLeft) {
        fixedColumnsBodyLeft.scrollTop = e.target.scrollTop;
      }
      if (fixedColumnsBodyRight && e.target !== fixedColumnsBodyRight) {
        fixedColumnsBodyRight.scrollTop = e.target.scrollTop;
      }
      if (bodyTable && e.target !== bodyTable) {
        bodyTable.scrollTop = e.target.scrollTop;
      }
      this.lastScrollTop = e.target.scrollTop;
      if (handleScrollY) {
        (0, _utils.debounce)(handleScrollY(this.lastScrollTop, this.treeType), 300);
      }
    }

    // Remember last scrollLeft for scroll direction detecting.
    this.lastScrollLeft = e.target.scrollLeft;
  };

  Table.prototype.handleRowHover = function handleRowHover(isHover, key) {
    //增加新的API，设置是否同步Hover状态，提高性能，避免无关的渲染
    var syncHover = this.props.syncHover;

    if (syncHover) {
      this.store.setState({
        currentHoverKey: isHover ? key : null
      });
    }
  };

  Table.prototype.render = function render() {
    var _this6 = this;

    var props = this.props;
    var clsPrefix = props.clsPrefix;

    var className = props.clsPrefix;
    if (props.className) {
      className += ' ' + props.className;
    }
    if (props.useFixedHeader || props.scroll && props.scroll.y) {
      className += ' ' + clsPrefix + '-fixed-header';
    }
    if (props.bordered) {
      className += ' ' + clsPrefix + '-bordered';
    }
    className += ' ' + clsPrefix + '-scroll-position-' + this.state.scrollPosition;
    //如果传入height说明是固定高度
    if (props.height) {
      className += ' fixed-height';
    }
    var isTableScroll = this.columnManager.isAnyColumnsFixed() || props.scroll.x || props.scroll.y;
    var loading = props.loading;
    if (typeof loading === 'boolean') {
      loading = {
        show: loading
      };
    }

    return _react2["default"].createElement(
      'div',
      { className: className, style: props.style, ref: function ref(el) {
          return _this6.contentTable = el;
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
        this.columnManager.isAnyColumnsLeftFixed() && _react2["default"].createElement(
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
      }, loading))
    );
  };

  return Table;
}(_react.Component);

;

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

exports["default"] = Table;
module.exports = exports['default'];