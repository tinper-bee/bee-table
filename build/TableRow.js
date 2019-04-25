'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils');

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
  onDragRow: _propTypes2["default"].func
};

var defaultProps = {
  onRowClick: function onRowClick() {},
  onRowDoubleClick: function onRowDoubleClick() {},
  onDestroy: function onDestroy() {},

  expandIconColumnIndex: 0,
  expandRowByClick: false,
  onHover: function onHover() {},

  className: '',
  setRowParentIndex: function setRowParentIndex() {},
  rowDraggAble: false
  // onDragRow:()=>{}
};

var TableRow = function (_Component) {
  _inherits(TableRow, _Component);

  function TableRow(props) {
    _classCallCheck(this, TableRow);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.initEvent = function () {
      var events = [{ key: 'dragstart', fun: _this.onDragStart }, //用户开始拖动元素时触发
      { key: 'dragover', fun: _this.onDragOver }, //当某被拖动的对象在另一对象容器范围内拖动时触发此事件
      { key: 'drop', fun: _this.onDrop }, //在一个拖动过程中，释放鼠标键时触发此事件 

      { key: 'dragenter', fun: _this.onDragEnter }, { key: 'dragleave', fun: _this.onDragLeave }];
      _this.eventListen(events, '', _this.element);
    };

    _this.removeDragAbleEvent = function () {
      var events = [{ key: 'dragstart', fun: _this.onDragStart }, { key: 'dragover', fun: _this.onDragOver }, { key: 'drop', fun: _this.onDrop }, { key: 'dragenter', fun: _this.onDragEnter }, { key: 'dragleave', fun: _this.onDragLeave }];
      _this.eventListen(events, 'remove', _this.element);
    };

    _this.onDragStart = function (e) {
      if (!_this.props.rowDraggAble) return;
      var event = _utils.Event.getEvent(e),
          target = _utils.Event.getTarget(event);
      _this.currentIndex = target.getAttribute("data-row-key");
      _this._dragCurrent = target;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("Text", _this.currentIndex);
    };

    _this.onDragOver = function (e) {
      var event = _utils.Event.getEvent(e);
      event.preventDefault();
    };

    _this.onDrop = function (e) {
      var _this$props = _this.props,
          rowDraggAble = _this$props.rowDraggAble,
          onDragRow = _this$props.onDragRow;

      var event = _utils.Event.getEvent(e),
          _target = _utils.Event.getTarget(event),
          target = _target.parentNode;
      var currentIndex = target.getAttribute("data-row-key");
      if (!currentIndex || currentIndex === _this.currentIndex) return;
      if (target.nodeName.toUpperCase() === "TR") {
        _this.synchronizeTableTr(_this.currentIndex, null);
        // target.setAttribute("style","");
        // this.synchronizeTrStyle(this.currentIndex,false);
      }
      var _currentIndex = event.dataTransfer.getData("text");
      onDragRow && onDragRow(parseInt(_this.currentIndex--), parseInt(currentIndex--));
    };

    _this.synchronizeTableTr = function (currentIndex, type) {
      var contentTable = _this.props.contentTable;

      var _table_trs = contentTable.querySelector('.u-table-scroll table tbody'),
          _table_fixed_left_trs = contentTable.querySelector('.u-table-fixed-left table tbody'),
          _table_fixed_right_trs = contentTable.querySelector('.u-table-fixed-right table tbody');

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
      if (type) {
        currentObj && currentObj.setAttribute("style", "border-bottom:2px dashed rgba(5,0,0,0.25)");
      } else {
        currentObj && currentObj.setAttribute("style", "");
      }
    };

    _this.onDragEnter = function (e) {
      var event = _utils.Event.getEvent(e),
          _target = _utils.Event.getTarget(event),
          target = _target.parentNode;
      var currentIndex = target.getAttribute("data-row-key");
      if (!currentIndex || currentIndex === _this.currentIndex) return;
      if (target.nodeName.toUpperCase() === "TR") {
        _this.synchronizeTableTr(currentIndex, true);
        // target.setAttribute("style","border-bottom:2px dashed rgba(5,0,0,0.25)");
        // // target.style.backgroundColor = 'rgb(235, 236, 240)'; 
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
   * 同步自己,也需要同步当前行的行显示
   */


  /**
   * 设置同步的style
   */


  TableRow.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var rowDraggAble = this.props.rowDraggAble;

    if (!this.event) {
      this.event = true;
      if (rowDraggAble) {
        this.initEvent();
      }
    }

    if (this.props.treeType) {
      this.setRowParentIndex();
    }
    this.setRowHeight();
  };

  TableRow.prototype.componentWillUnmount = function componentWillUnmount() {
    var _props2 = this.props,
        record = _props2.record,
        onDestroy = _props2.onDestroy,
        index = _props2.index,
        rowDraggAble = _props2.rowDraggAble;

    onDestroy(record, index);
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    if (rowDraggAble) {
      this.removeDragAbleEvent();
    }
  };

  TableRow.prototype.setRowHeight = function setRowHeight() {
    var _props3 = this.props,
        setRowHeight = _props3.setRowHeight,
        _props3$expandedConte = _props3.expandedContentHeight,
        expandedContentHeight = _props3$expandedConte === undefined ? 0 : _props3$expandedConte,
        fixed = _props3.fixed,
        fixedIndex = _props3.fixedIndex;

    if (!setRowHeight || !this.element || fixed) return;
    setRowHeight(this.element.clientHeight + expandedContentHeight, fixedIndex);
  };

  TableRow.prototype.setRowParentIndex = function setRowParentIndex() {
    var _props4 = this.props,
        index = _props4.index,
        setRowParentIndex = _props4.setRowParentIndex,
        fixedIndex = _props4.fixedIndex,
        rootIndex = _props4.rootIndex;

    setRowParentIndex(rootIndex < 0 ? index : rootIndex, fixedIndex);
  };

  TableRow.prototype.onRowClick = function onRowClick(event) {
    var _props5 = this.props,
        record = _props5.record,
        index = _props5.index,
        onRowClick = _props5.onRowClick,
        expandable = _props5.expandable,
        expandRowByClick = _props5.expandRowByClick,
        expanded = _props5.expanded,
        onExpand = _props5.onExpand,
        fixedIndex = _props5.fixedIndex;

    if (expandable && expandRowByClick) {
      onExpand(!expanded, record, fixedIndex, event);
    }
    this.set(function (e) {
      onRowClick(record, fixedIndex, event);
    });
  };

  TableRow.prototype.onRowDoubleClick = function onRowDoubleClick(event) {
    var _props6 = this.props,
        record = _props6.record,
        index = _props6.index,
        onRowDoubleClick = _props6.onRowDoubleClick,
        fixedIndex = _props6.fixedIndex;

    this.clear();
    onRowDoubleClick(record, fixedIndex, event);
  };

  TableRow.prototype.onMouseEnter = function onMouseEnter(e) {
    var _props7 = this.props,
        onHover = _props7.onHover,
        hoverKey = _props7.hoverKey,
        fixedIndex = _props7.fixedIndex,
        syncHover = _props7.syncHover;

    if (syncHover) {
      this.setState({ hovered: true });
    }
    onHover(true, hoverKey, e, fixedIndex);
  };

  TableRow.prototype.onMouseLeave = function onMouseLeave(e) {
    var _props8 = this.props,
        onHover = _props8.onHover,
        hoverKey = _props8.hoverKey,
        fixedIndex = _props8.fixedIndex,
        syncHover = _props8.syncHover;

    if (syncHover) {
      this.setState({ hovered: false });
    }
    onHover(false, hoverKey, e, fixedIndex);
  };

  TableRow.prototype.render = function render() {
    var _props9 = this.props,
        clsPrefix = _props9.clsPrefix,
        columns = _props9.columns,
        record = _props9.record,
        height = _props9.height,
        visible = _props9.visible,
        index = _props9.index,
        expandIconColumnIndex = _props9.expandIconColumnIndex,
        expandIconAsCell = _props9.expandIconAsCell,
        expanded = _props9.expanded,
        expandRowByClick = _props9.expandRowByClick,
        rowDraggAble = _props9.rowDraggAble,
        expandable = _props9.expandable,
        onExpand = _props9.onExpand,
        needIndentSpaced = _props9.needIndentSpaced,
        indent = _props9.indent,
        indentSize = _props9.indentSize,
        isHiddenExpandIcon = _props9.isHiddenExpandIcon,
        fixed = _props9.fixed,
        bodyDisplayInRow = _props9.bodyDisplayInRow;

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
      isHiddenExpandIcon: isHiddenExpandIcon
    });

    for (var i = 0; i < columns.length; i++) {
      if (expandIconAsCell && i === 0 && !showSum) {
        cells.push(_react2["default"].createElement(
          'td',
          {
            className: clsPrefix + '-expand-icon-cell',
            key: 'rc-table-expand-icon-cell-' + i
          },
          expandIcon
        ));
      }
      var isColumnHaveExpandIcon = expandIconAsCell || expandRowByClick || showSum ? false : i === expandIconColumnIndex;
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
        bodyDisplayInRow: bodyDisplayInRow
      }));
    }
    var style = { height: height };
    if (!visible) {
      style.display = 'none';
    }

    return _react2["default"].createElement(
      'tr',
      {
        draggable: rowDraggAble,
        onClick: this.onRowClick,
        onDoubleClick: this.onRowDoubleClick,
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave,
        className: clsPrefix + ' ' + className + ' ' + clsPrefix + '-level-' + indent,
        style: style,
        'data-row-key': record && record.key ? record.key : "null"
        // key={hoverKey}
        , ref: this.bindElement
      },
      cells.length > 0 ? cells : _react2["default"].createElement('td', null)
    );
  };

  return TableRow;
}(_react.Component);

;

TableRow.propTypes = propTypes;
TableRow.defaultProps = defaultProps;

exports["default"] = TableRow;
module.exports = exports['default'];