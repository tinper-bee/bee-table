'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./lib/utils');

var _TableCell = require('./TableCell');

var _TableCell2 = _interopRequireDefault(_TableCell);

var _ExpandIcon = require('./ExpandIcon');

var _ExpandIcon2 = _interopRequireDefault(_ExpandIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
  onDestroy: _propTypes2["default"].func,
  onRowClick: _propTypes2["default"].func,
  onRowDoubleClick: _propTypes2["default"].func,
  record: _propTypes2["default"].object,
  clsPrefix: _propTypes2["default"].string,
  expandIconColumnIndex: _propTypes2["default"].number,
  onHover: _propTypes2["default"].func,
  columns: _propTypes2["default"].array,
  height: _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].number]),
  visible: _propTypes2["default"].bool,
  index: _propTypes2["default"].number,
  hoverKey: _propTypes2["default"].any,
  expanded: _propTypes2["default"].bool,
  expandable: _propTypes2["default"].any,
  onExpand: _propTypes2["default"].func,
  needIndentSpaced: _propTypes2["default"].bool,
  className: _propTypes2["default"].string,
  indent: _propTypes2["default"].number,
  indentSize: _propTypes2["default"].number,
  expandIconAsCell: _propTypes2["default"].bool,
  expandRowByClick: _propTypes2["default"].bool,
  store: _propTypes2["default"].object.isRequired,
  rowDraggAble: _propTypes2["default"].bool,
  onDragRow: _propTypes2["default"].func,
  onDragRowStart: _propTypes2["default"].func,
  syncRowHeight: _propTypes2["default"].bool
};

var defaultProps = {
  onRowClick: function onRowClick() {},

  // onRowDoubleClick() {},
  onDestroy: function onDestroy() {},

  expandIconColumnIndex: 0,
  expandRowByClick: false,
  onHover: function onHover() {},

  className: '',
  setRowParentIndex: function setRowParentIndex() {},
  rowDraggAble: false,
  // onDragRow:()=>{}
  syncRowHeight: false
};

var TableRow = function (_Component) {
  _inherits(TableRow, _Component);

  function TableRow(props) {
    _classCallCheck(this, TableRow);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.initEvent = function () {
      var events = [{ key: 'touchstart', fun: _this.onTouchStart }, //手指触摸到一个 DOM 元素时触发
      { key: 'touchmove', fun: _this.onTouchMove }, //手指在一个 DOM 元素上滑动时触发
      { key: 'touchend', fun: _this.onTouchEnd }, //手指从一个 DOM 元素上移开时触发

      { key: 'dragstart', fun: _this.onDragStart }, //用户开始拖动元素时触发
      { key: 'dragover', fun: _this.onDragOver }, //当某被拖动的对象在另一对象容器范围内拖动时触发此事件
      { key: 'drop', fun: _this.onDrop }, //在一个拖动过程中，释放鼠标键时触发此事件
      { key: 'dragenter', fun: _this.onDragEnter }, { key: 'dragleave', fun: _this.onDragLeave }];
      _this.eventListen(events, '', _this.element);
    };

    _this.removeDragAbleEvent = function () {
      var events = [{ key: 'touchstart', fun: _this.onTouchStart }, //手指触摸到一个 DOM 元素时触发
      { key: 'touchmove', fun: _this.onTouchMove }, //手指在一个 DOM 元素上滑动时触发
      { key: 'touchend', fun: _this.onTouchEnd }, //手指从一个 DOM 元素上移开时触发

      { key: 'dragstart', fun: _this.onDragStart }, //用户开始拖动元素时触发
      { key: 'dragover', fun: _this.onDragOver }, //当某被拖动的对象在另一对象容器范围内拖动时触发此事件
      { key: 'drop', fun: _this.onDrop }, //在一个拖动过程中，释放鼠标键时触发此事件
      { key: 'dragenter', fun: _this.onDragEnter }, { key: 'dragleave', fun: _this.onDragLeave }];
      _this.eventListen(events, 'remove', _this.element);
    };

    _this.onDragStart = function (e) {
      var onDragRowStart = _this.props.onDragRowStart;

      if (!_this.props.rowDraggAble || _this.notRowDrag) return;
      var event = _utils.Event.getEvent(e),
          target = _utils.Event.getTarget(event);
      if (target.tagName === 'TD') {
        target = target.parentNode;
      }
      _this.currentIndex = target.getAttribute("data-row-key");

      // 拖拽其实index
      _this.props.contentTable.startI = target.getAttribute("data-row-index");
      _this._dragCurrent = target;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("Text", _this.currentIndex);
      onDragRowStart && onDragRowStart(_this.currentIndex);
    };

    _this.onDragOver = function (e) {
      var event = _utils.Event.getEvent(e);
      event.preventDefault();
    };

    _this.onDrop = function (e) {
      var _this$props = _this.props,
          onDragRow = _this$props.onDragRow,
          contentTable = _this$props.contentTable;

      var event = _utils.Event.getEvent(e),
          _target = _utils.Event.getTarget(event),
          target = _target.parentNode;
      event.preventDefault();
      event.stopPropagation();
      var currentKey = event.dataTransfer.getData("text");
      var targetKey = target.getAttribute("data-row-key");

      if (!targetKey || targetKey === currentKey) return;
      if (target.nodeName.toUpperCase() === "TR") {
        _this.synchronizeTableTr(currentKey, null);
        _this.synchronizeTableTr(targetKey, null);
      }
      onDragRow && onDragRow(currentKey, targetKey);
    };

    _this.getTouchDom = function (event) {
      var currentLocation = event.changedTouches[0];
      var realTarget = document.elementFromPoint(currentLocation.clientX, currentLocation.clientY);
      return realTarget;
    };

    _this.onTouchStart = function (e) {
      e.stopPropagation();
      var onDragRowStart = _this.props.onDragRowStart;

      var event = _utils.Event.getEvent(e),
          _target = _utils.Event.getTarget(event),
          target = _target.parentNode;

      if (target.tagName === 'TR') {

        _this.currentIndex = target.getAttribute("data-row-key");

        onDragRowStart && onDragRowStart(_this.currentIndex);
      } else {

        _this.canBeTouch = false;
      }
    };

    _this.onTouchMove = function (e) {

      if (!_this.canBeTouch) return;
      e.stopPropagation();
      var event = _utils.Event.getEvent(e);
      event.preventDefault();
      var touchTarget = _this.getTouchDom(event),
          target = touchTarget.parentNode,
          targetKey = target.getAttribute("data-row-key");
      if (!targetKey || targetKey === _this.currentIndex) return;
      if (target.nodeName.toUpperCase() === "TR") {
        if (_this.cacheCurrentIndex !== targetKey) {
          //模拟 touchenter toucheleave 事件
          _this.cacheCurrentIndex && _this.synchronizeTableTr(_this.cacheCurrentIndex, null); //去掉虚线
          _this.synchronizeTableTr(targetKey, true); //添加虚线
        }
      }
    };

    _this.onTouchEnd = function (e) {

      if (!_this.canBeTouch) {
        _this.canBeTouch = true;
        return;
      }

      e.stopPropagation();
      var onDragRow = _this.props.onDragRow;

      var event = _utils.Event.getEvent(e),
          currentKey = _this.currentIndex,
          //拖拽行的key
      touchTarget = _this.getTouchDom(event),
          //当前触摸的DOM节点
      target = touchTarget.parentNode,
          //目标位置的行
      targetKey = target.getAttribute("data-row-key"); //目标位置的行key
      if (!targetKey || targetKey === currentKey) return;
      if (target.nodeName.toUpperCase() === "TR") {
        _this.synchronizeTableTr(currentKey, null);
        _this.synchronizeTableTr(targetKey, null);
      }

      onDragRow && onDragRow(currentKey, targetKey);
    };

    _this.synchronizeTableTrShadow = function () {
      var _this$props2 = _this.props,
          contentTable = _this$props2.contentTable,
          index = _this$props2.index;


      var cont = contentTable.querySelector('.u-table-scroll table tbody').getElementsByTagName("tr")[index],
          trs = cont.getBoundingClientRect(),
          fixed_left_trs = contentTable.querySelector('.u-table-fixed-left table tbody'),
          fixed_right_trs = contentTable.querySelector('.u-table-fixed-right table tbody');
      fixed_left_trs = fixed_left_trs && fixed_left_trs.getElementsByTagName("tr")[index].getBoundingClientRect();
      fixed_right_trs = fixed_right_trs && fixed_right_trs.getElementsByTagName("tr")[index].getBoundingClientRect();

      var div = document.createElement("div");
      var style = "wdith:" + (trs.width + (fixed_left_trs ? fixed_left_trs.width : 0) + (fixed_right_trs ? fixed_right_trs.width : 0)) + "px";
      style += ";height:" + trs.height + "px";
      style += ";classname:" + cont.className;
      div.setAttribute("style", style);
      return div;
    };

    _this.synchronizeTableTr = function (currentIndex, type) {
      if (type) {
        //同步 this.cacheCurrentIndex
        _this.cacheCurrentIndex = currentIndex;
      }
      var contentTable = _this.props.contentTable;

      var _table_trs = contentTable.querySelector('.u-table-scroll table tbody'),
          _table_fixed_left_trs = contentTable.querySelector('.u-table-fixed-left table tbody'),
          _table_fixed_right_trs = contentTable.querySelector('.u-table-fixed-right table tbody');

      _table_trs = _table_trs ? _table_trs : contentTable.querySelector('.u-table table tbody');

      _this.synchronizeTrStyle(_table_trs, currentIndex, type);
      if (_table_fixed_left_trs) {
        _this.synchronizeTrStyle(_table_fixed_left_trs, currentIndex, type);
      }
      if (_table_fixed_right_trs) {
        _this.synchronizeTrStyle(_table_fixed_right_trs, currentIndex, type);
      }
    };

    _this.synchronizeTrStyle = function (_elementBody, id, type) {
      var contentTable = _this.props.contentTable,
          trs = _elementBody.getElementsByTagName("tr"),
          currentObj = void 0;

      for (var index = 0; index < trs.length; index++) {
        var element = trs[index];
        if (element.getAttribute("data-row-key") == id) {
          currentObj = element;
        }
      }
      if (type == 'down') {
        currentObj && currentObj.setAttribute("style", "border-bottom:2px solid #02B1FD");
      } else if (type) {
        currentObj && currentObj.setAttribute("style", "border-top:2px solid #02B1FD");
      } else {
        currentObj && currentObj.setAttribute("style", "");
      }
    };

    _this.onDragEnter = function (e) {
      var contentTable = _this.props.contentTable;

      var event = _utils.Event.getEvent(e),
          _target = _utils.Event.getTarget(event),
          target = _target.parentNode;
      var currentIndex = target.getAttribute("data-row-key");
      var dragEnterIndex = target.getAttribute("data-row-index");
      if (!currentIndex || currentIndex === _this.currentIndex) return;
      var dragType = parseInt(dragEnterIndex) > parseInt(contentTable.startI) ? 'down' : 'top';

      contentTable.dragType = dragType;
      if (target.nodeName.toUpperCase() === "TR") {
        _this.synchronizeTableTr(currentIndex, dragType);
      }
    };

    _this.onDragLeave = function (e) {
      var event = _utils.Event.getEvent(e),
          _target = _utils.Event.getTarget(event),
          target = _target.parentNode;
      var currentIndex = target.getAttribute("data-row-key");
      if (!currentIndex || currentIndex === _this.currentIndex) return;
      if (target.nodeName.toUpperCase() === "TR") {
        _this.synchronizeTableTr(currentIndex, null);
      }
    };

    _this.stopRowDrag = function (isStop) {
      var rowDraggAble = _this.props.rowDraggAble;
      var notRowDrag = _this.state.notRowDrag;

      if (rowDraggAble && isStop !== notRowDrag) {
        _this.setState({
          notRowDrag: isStop
        });
      }
    };

    _this.set = function (fn) {
      _this.clear();
      _this._timeout = window.setTimeout(fn, 300);
    };

    _this.clear = function (event) {
      if (_this._timeout) {
        window.clearTimeout(_this._timeout);
      }
    };

    _this.bindElement = function (el) {
      _this.element = el;
    };

    _this._timeout = null;
    _this.state = {
      hovered: false
    };
    _this.onRowClick = _this.onRowClick.bind(_this);
    _this.onRowDoubleClick = _this.onRowDoubleClick.bind(_this);
    _this.onMouseEnter = _this.onMouseEnter.bind(_this);
    _this.onMouseLeave = _this.onMouseLeave.bind(_this);
    _this.expandHeight = 0;
    _this.event = false;
    _this.cacheCurrentIndex = null;
    _this.canBeTouch = true; //受否允许拖动该行
    return _this;
  }

  TableRow.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var _props = this.props,
        store = _props.store,
        hoverKey = _props.hoverKey,
        treeType = _props.treeType,
        rowDraggAble = _props.rowDraggAble;

    this.unsubscribe = store.subscribe(function () {
      if (store.getState().currentHoverKey === hoverKey) {
        _this2.setState({ hovered: true });
      } else if (_this2.state.hovered === true) {
        _this2.setState({ hovered: false });
      }
    });

    this.setRowHeight();
    if (treeType) {
      this.setRowParentIndex();
    }
  };

  /**
   * 事件初始化
   */


  /**
   * 事件移除，提供性能以及内存泄漏等问题。
   */


  /**
   * 事件绑定和移除函数
   */
  TableRow.prototype.eventListen = function eventListen(events, type, eventSource) {
    for (var i = 0; i < events.length; i++) {
      var _event = events[i];
      if (type === "remove") {
        _utils.EventUtil.removeHandler(eventSource, _event.key, _event.fun);
      } else {
        _utils.EventUtil.addHandler(eventSource, _event.key, _event.fun);
      }
    }
  };

  /**
   * 开始调整交换列的事件
   */


  /**
   * 在一个拖动过程中，释放鼠标键时触发此事件。【目标事件】
   * @memberof TableHeader
   */


  /**
   * 获取当前触摸的Dom节点
   */


  /**
   * 开始调整交换行的事件
   */


  /**
   * 手指移开时触发
   */


  /**
   *同步当前拖拽到阴影
   * @memberof TableRow
   */


  /**
   * 同步自己,也需要同步当前行的行显示
   */


  /**
   * 设置同步的style
   */


  TableRow.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _props2 = this.props,
        rowDraggAble = _props2.rowDraggAble,
        syncRowHeight = _props2.syncRowHeight;

    if (!this.event) {
      this.event = true;
      if (rowDraggAble) {
        this.initEvent();
      }
    }
    if (this.props.treeType) {
      this.setRowParentIndex();
    }
    // if(syncRowHeight){
    //   this.setRowHeight()
    // }
    this.setRowHeight();
  };

  TableRow.prototype.componentWillUnmount = function componentWillUnmount() {
    var _props3 = this.props,
        record = _props3.record,
        onDestroy = _props3.onDestroy,
        index = _props3.index,
        rowDraggAble = _props3.rowDraggAble;

    onDestroy(record, index);
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    if (rowDraggAble) {
      this.removeDragAbleEvent();
    }
  };

  TableRow.prototype.setRowHeight = function setRowHeight() {
    var _props4 = this.props,
        setRowHeight = _props4.setRowHeight,
        _props4$expandedConte = _props4.expandedContentHeight,
        expandedContentHeight = _props4$expandedConte === undefined ? 0 : _props4$expandedConte,
        fixed = _props4.fixed,
        fixedIndex = _props4.fixedIndex;

    if (!setRowHeight || !this.element || fixed) return;
    setRowHeight(this.element.clientHeight + expandedContentHeight, fixedIndex);
  };

  TableRow.prototype.setRowParentIndex = function setRowParentIndex() {
    var _props5 = this.props,
        index = _props5.index,
        setRowParentIndex = _props5.setRowParentIndex,
        fixedIndex = _props5.fixedIndex,
        rootIndex = _props5.rootIndex;

    setRowParentIndex(rootIndex < 0 ? index : rootIndex, fixedIndex);
  };

  TableRow.prototype.onRowClick = function onRowClick(event) {
    // fix: 解决 onRowClick 回调函数中，事件对象属性均为 null 的问题
    // 异步访问事件属性
    // 调用 event.persist() 会从事件池中移除该合成函数并允许对该合成事件的引用被保留下来。
    event.persist();
    var _props6 = this.props,
        record = _props6.record,
        index = _props6.index,
        onRowClick = _props6.onRowClick,
        expandable = _props6.expandable,
        expandRowByClick = _props6.expandRowByClick,
        expanded = _props6.expanded,
        onExpand = _props6.onExpand,
        fixedIndex = _props6.fixedIndex,
        onRowDoubleClick = _props6.onRowDoubleClick;

    if (expandable && expandRowByClick) {
      onExpand(!expanded, record, fixedIndex, event);
    }
    if (!onRowDoubleClick) {
      onRowClick(record, fixedIndex, event);
      return;
    }
    this.set(function (e) {
      onRowClick(record, fixedIndex, event);
    });
  };

  TableRow.prototype.onRowDoubleClick = function onRowDoubleClick(event) {
    var _props7 = this.props,
        record = _props7.record,
        index = _props7.index,
        onRowDoubleClick = _props7.onRowDoubleClick,
        fixedIndex = _props7.fixedIndex;

    this.clear();
    onRowDoubleClick && onRowDoubleClick(record, fixedIndex, event);
  };

  TableRow.prototype.onMouseEnter = function onMouseEnter(e) {
    var _props8 = this.props,
        onHover = _props8.onHover,
        hoverKey = _props8.hoverKey,
        fixedIndex = _props8.fixedIndex,
        syncHover = _props8.syncHover,
        record = _props8.record;

    if (syncHover) {
      this.setState({ hovered: true });
    }
    onHover(true, hoverKey, e, fixedIndex, record);
  };

  TableRow.prototype.onMouseLeave = function onMouseLeave(e) {
    var _props9 = this.props,
        onHover = _props9.onHover,
        hoverKey = _props9.hoverKey,
        fixedIndex = _props9.fixedIndex,
        syncHover = _props9.syncHover,
        record = _props9.record;

    if (syncHover) {
      this.setState({ hovered: false });
    }
    onHover(false, hoverKey, e, fixedIndex, record);
  };

  // 滚动加载数据时的loading，暂时不用
  // getLoadingStyle = (isPre, isSuf) => {
  //   if (isPre) {
  //     return this.element && this.element.nextSibling ? this.element.nextSibling .getBoundingClientRect() : {}
  //   }
  //   if (isSuf) {
  //     return this.element && this.element.previousSibling ? this.element.previousSibling.getBoundingClientRect() : {}
  //   }
  // }

  TableRow.prototype.render = function render() {
    var _props10 = this.props,
        clsPrefix = _props10.clsPrefix,
        columns = _props10.columns,
        record = _props10.record,
        height = _props10.height,
        visible = _props10.visible,
        index = _props10.index,
        onPaste = _props10.onPaste,
        expandIconColumnIndex = _props10.expandIconColumnIndex,
        expandIconAsCell = _props10.expandIconAsCell,
        expanded = _props10.expanded,
        useDragHandle = _props10.useDragHandle,
        rowDraggAble = _props10.rowDraggAble,
        expandable = _props10.expandable,
        onExpand = _props10.onExpand,
        needIndentSpaced = _props10.needIndentSpaced,
        indent = _props10.indent,
        indentSize = _props10.indentSize,
        isHiddenExpandIcon = _props10.isHiddenExpandIcon,
        fixed = _props10.fixed,
        bodyDisplayInRow = _props10.bodyDisplayInRow,
        expandedIcon = _props10.expandedIcon,
        collapsedIcon = _props10.collapsedIcon,
        hoverKey = _props10.hoverKey,
        lazyStartIndex = _props10.lazyStartIndex,
        lazyEndIndex = _props10.lazyEndIndex,
        expandIconCellWidth = _props10.expandIconCellWidth,
        getCellClassName = _props10.getCellClassName;
    var notRowDrag = this.state.notRowDrag;
    // const isEmptyTr = isPre || isSuf//暂时不用 滚动loading相关

    var showSum = false;
    var className = this.props.className;

    if (this.state.hovered) {
      className += ' ' + clsPrefix + '-hover';
    }
    //判断是否为合计行
    if (className.indexOf('sumrow') > -1) {
      showSum = true;
    }
    var cells = [];

    var expandIcon = _react2["default"].createElement(_ExpandIcon2["default"], {
      expandable: expandable,
      clsPrefix: clsPrefix,
      onExpand: onExpand,
      needIndentSpaced: needIndentSpaced,
      expanded: expanded,
      record: record,
      expandedIcon: expandedIcon,
      collapsedIcon: collapsedIcon,
      isHiddenExpandIcon: isHiddenExpandIcon
    });
    var isExpandIconAsCell = expandIconAsCell ? clsPrefix + '-expand-columns-in-body' : '';
    var expandIndexInThisTable;
    if (this.props.fixed === 'right') {
      expandIndexInThisTable = expandIconColumnIndex - this.props.leftColumnsLength - this.props.centerColumnsLength;
    } else {
      expandIndexInThisTable = expandIconColumnIndex;
    }
    for (var i = 0; i < columns.length; i++) {
      if (expandIconAsCell && i === 0) {
        showSum ? cells.push(_react2["default"].createElement('td', { width: expandIconCellWidth })) : cells.push(_react2["default"].createElement(
          'td',
          {
            className: clsPrefix + '-expand-icon-cell ' + isExpandIconAsCell,
            key: 'rc-table-expand-icon-cell-' + i,
            width: expandIconCellWidth
          },
          expandIcon
        ));
      }
      // bugfix 设置expandRowByClick，无法显示箭头，去掉 expandRowByClick 判断
      var isColumnHaveExpandIcon = expandIconAsCell || showSum ? false : i === expandIndexInThisTable;
      //注意：中间表格区域不需要渲染出固定列的单元格，以节省多余的性能消耗
      if (!fixed && columns[i].fixed) continue;
      cells.push(_react2["default"].createElement(_TableCell2["default"], {
        clsPrefix: clsPrefix,
        record: record,
        indentSize: indentSize,
        indent: indent,
        index: index,
        column: columns[i],
        key: index + "_" + (columns[i].key || columns[i].dataIndex || i),
        fixed: fixed,
        showSum: showSum,
        expandIcon: isColumnHaveExpandIcon ? expandIcon : null,
        bodyDisplayInRow: bodyDisplayInRow,
        lazyStartIndex: lazyStartIndex,
        lazyEndIndex: lazyEndIndex,
        onPaste: onPaste,
        stopRowDrag: this.stopRowDrag,
        col: i,
        getCellClassName: getCellClassName
      }));
    }
    var style = _extends({ height: height }, record ? record.style : undefined);
    if (!visible) {
      style.display = 'none';
    }
    if (record && record._checked) {
      className += ' selected';
    }

    if (rowDraggAble && !useDragHandle && !notRowDrag) {
      className += ' row-dragg-able';
    }
    // const tdStyle = !isEmptyTr ? {} : this.getLoadingStyle(isPre, isSuf)//暂时不用 滚动loading相关
    return _react2["default"].createElement(
      'tr',
      {
        draggable: rowDraggAble && !useDragHandle && !notRowDrag,
        onClick: this.onRowClick,
        onDoubleClick: this.onRowDoubleClick,
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave,
        className: clsPrefix + ' ' + className + ' ' + clsPrefix + '-level-' + indent,
        style: style,
        'data-row-key': record && record.key ? record.key : hoverKey,
        'data-row-index': this.props.index
        // key={hoverKey}
        , ref: this.bindElement
      },
      cells.length > 0 ? cells : _react2["default"].createElement('td', { style: { width: 0, padding: 0 } })
    );
  };

  return TableRow;
}(_react.Component);

;

TableRow.propTypes = propTypes;
TableRow.defaultProps = defaultProps;

exports["default"] = TableRow;
module.exports = exports['default'];