"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shallowequal = require("shallowequal");

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _throttleDebounce = require("throttle-debounce");

var _utils = require("./utils");

var _FilterType = require("./FilterType");

var _FilterType2 = _interopRequireDefault(_FilterType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
  clsPrefix: _propTypes2["default"].string,
  rowStyle: _propTypes2["default"].object,
  rows: _propTypes2["default"].array
};

var TableHeader = function (_Component) {
  _inherits(TableHeader, _Component);

  function TableHeader(props) {
    _classCallCheck(this, TableHeader);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onLineMouseMove = function (e) {
      var _this$props = _this.props,
          clsPrefix = _this$props.clsPrefix,
          dragborder = _this$props.dragborder,
          contentDomWidth = _this$props.contentDomWidth,
          scrollbarWidth = _this$props.scrollbarWidth,
          contentTable = _this$props.contentTable,
          headerScroll = _this$props.headerScroll;

      _utils.Event.stopPropagation(e);
      var event = _utils.Event.getEvent(e);
      if (!_this.props.dragborder) return;
      if (_this.drag.option != "border") {
        return false;
      }
      //移动改变宽度
      var currentCols = _this.table.cols[_this.drag.currIndex];
      var diff = event.x - _this.drag.oldLeft;
      var newWidth = _this.drag.oldWidth + diff;
      // if(newWidth > this.drag.minWidth){
      if (newWidth > _this.minWidth) {
        currentCols.style.width = newWidth + 'px';
        //hao 支持固定表头拖拽 修改表体的width
        if (_this.fixedTable.cols) {
          _this.fixedTable.cols[_this.drag.currIndex].style.width = newWidth + "px";
        }

        //表头滚动条处理
        if (headerScroll) {
          var oldTableWidth = parseInt(_this.table.table.style.width ? _this.table.table.style.width : _this.table.table.scrollWidth);
          var newTableWidth = oldTableWidth + diff;
          _this.table.table.style.width = newTableWidth; //改变table的width

          var showScroll = contentDomWidth - newTableWidth - scrollbarWidth;
          // if(bordered){
          //     showScroll = showScroll -1;
          // }
          var fixedLeftHeaderTable = contentTable.querySelector('.u-table-fixed-left .u-table-header');
          var fixedRighHeadertTable = contentTable.querySelector('.u-table-fixed-right .u-table-header');
          var contentTableHeader = contentTable.querySelector('.u-table-scroll .u-table-header');
          if (showScroll < 0) {
            //找到固定列表格，设置表头的marginBottom值为scrollbarWidth;
            contentTableHeader.style.overflowX = 'scroll';
            fixedLeftHeaderTable && (fixedLeftHeaderTable.style.marginBottom = scrollbarWidth + "px");
            fixedRighHeadertTable && (fixedRighHeadertTable.style.marginBottom = scrollbarWidth + "px");
          } else {
            contentTableHeader.style.overflowX = 'hidden';
            fixedLeftHeaderTable && (fixedLeftHeaderTable.style.marginBottom = '0px');
            fixedRighHeadertTable && (fixedRighHeadertTable.style.marginBottom = '0px');
          }
        }
      }
    };

    _this.onLineMouseDown = function (e) {
      _utils.Event.stopPropagation(e);
      var event = _utils.Event.getEvent(e);
      var _this$props2 = _this.props,
          clsPrefix = _this$props2.clsPrefix,
          contentTable = _this$props2.contentTable;

      if (!_this.props.dragborder) return;
      var currentIndex = parseInt(_utils.Event.getTarget(event).getAttribute("data-line-index"));
      var defaultWidth = _utils.Event.getTarget(event).getAttribute("data-th-width");
      var currentObj = _this.table.cols[currentIndex];
      _this.drag.option = "border"; //拖拽操作
      _this.drag.currIndex = currentIndex;
      _this.drag.oldLeft = event.x;
      _this.drag.oldWidth = parseInt(currentObj.style.width);
      _this.drag.minWidth = currentObj.style.minWidth != "" ? parseInt(currentObj.style.minWidth) : defaultWidth;
    };

    _this.onLineMouseUp = function (event) {

      _this.clearDragBorder(event);
    };

    _this.bodyonLineMouseMove = function (event) {
      _this.clearDragBorder(event);
    };

    _this.dragAbleMouseDown = function (e) {
      _utils.Event.stopPropagation(e);
      var event = _utils.Event.getEvent(e);
      if (!_this.props.draggable) return;
      event.target.setAttribute('draggable', true); //添加交换列效果
      _this.drag.option = 'dragAble';
      _this.currentDome = event.target;

      _this.thEventListen([{ key: 'mouseup', fun: _this.dragAbleMouseUp }], '', true); //th
      _this.removeDragBorderEvent(); //清理掉拖拽列宽的事件
      _this.addDragAbleEvent(); //添加拖拽交换列的事件
    };

    _this.dragAbleMouseUp = function (e) {
      _this.currentDome.setAttribute('draggable', false); //添加交换列效果
      _this.removeDragAbleEvent();
      _this.thEventListen([{ key: 'mouseup', fun: _this.dragAbleMouseUp }], 'remove', true); //th
      //拖拽交换列事件
      _this.thEventListen([{ key: 'mousedown', fun: _this.dragAbleMouseDown }], 'remove', true); //表示把事件添加到th元素上
      _this.initEvent();
    };

    _this.onDragStart = function (e) {
      var event = _utils.Event.getEvent(e);
      if (!_this.props.draggable) return;
      if (_this.drag.option === 'border') {
        return;
      }
      console.log(_this.drag.option + ' -------onDragStart----------', event.target);
      var th = _this.getThDome(event.target);
      if (!th) return;
      var currentIndex = parseInt(th.getAttribute("data-line-index"));

      var currentKey = event.target.getAttribute('data-line-key');
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("Text", currentKey);
      _this.currentObj = _this.props.rows[0][currentIndex];
      event.dataTransfer.setDragImage(event.target, 0, 0);
    };

    _this.onDragOver = function (e) {
      event.preventDefault();
    };

    _this.onDrop = function (e) {
      if (!_this.props.draggable) return;
      if (_this.drag.option === 'border') {
        return;
      }
      _this.currentDome.setAttribute('draggable', false); //添加交换列效果
      var data = _this.getCurrentEventData(e);
      if (!data) return;
      console.log(_this.drag.option + ' -------onDrop----------', event.target);
      if (!_this.currentObj || _this.currentObj.key == data.key) return;
      if (!_this.props.onDrop) return;
      _this.props.onDrop(event, { dragSource: _this.currentObj, dragTarg: data });
    };

    _this.handlerFilterChange = function (key, value, condition) {
      var onFilterChange = _this.props.onFilterChange;

      if (onFilterChange) {
        onFilterChange(key, value, condition);
      }
    };

    _this.handlerFilterClear = function (field) {
      var onFilterClear = _this.props.onFilterClear;

      if (onFilterClear) {
        onFilterClear(field);
      }
    };

    _this.filterRenderType = function (type, dataIndex, index) {
      var _this$props3 = _this.props,
          clsPrefix = _this$props3.clsPrefix,
          rows = _this$props3.rows,
          filterDelay = _this$props3.filterDelay,
          locale = _this$props3.locale;

      switch (type) {
        //文本输入
        case "text":
          return _react2["default"].createElement(_FilterType2["default"], {
            locale: locale //多语
            , rendertype: type //渲染类型
            , clsPrefix: clsPrefix //css前缀
            , className: clsPrefix + " filter-text",
            dataIndex: dataIndex //字段
            , onFilterChange: _this.handlerFilterChange //输入框回调
            , onFilterClear: _this.handlerFilterClear //清除回调
            , filterDropdown: rows[1][index]["filterdropdown"] //是否显示下拉条件
            , filterDropdownType: rows[1][index]["filterdropdowntype"] //下拉的条件类型为string,number
          });
        //数值输入
        case "number":
          return _react2["default"].createElement(_FilterType2["default"], {
            locale: locale,
            rendertype: type,
            clsPrefix: clsPrefix,
            className: clsPrefix + " filter-text",
            dataIndex: dataIndex //字段
            , onFilterChange: (0, _throttleDebounce.debounce)(filterDelay || 300, _this.handlerFilterChange) //输入框回调并且函数防抖动
            , onFilterClear: _this.handlerFilterClear //清除回调
            , filterDropdown: rows[1][index]["filterdropdown"],
            filterDropdownType: rows[1][index]["filterdropdowntype"] //下拉的条件类型为string,number
          });
        //下拉框选择
        case "dropdown":
          var selectDataSource = [];
          //处理没有输入数据源的时候，系统自动查找自带的数据筛选后注入
          if (rows.length > 0 && (rows[1][index]["filterdropdownauto"] || "auto") == "auto") {
            var hash = {};
            //处理下拉重复对象组装dropdown
            selectDataSource = Array.from(rows[1][0].datasource, function (x) {
              return {
                key: x[dataIndex],
                value: x[dataIndex]
              };
            });
            selectDataSource = selectDataSource.reduceRight(function (item, next) {
              hash[next.key] ? "" : hash[next.key] = true && item.push(next);
              return item;
            }, []);
          } else {
            //从外部数据源加载系统数据
            selectDataSource = rows[1][index]["filterdropdowndata"];
          }
          return _react2["default"].createElement(_FilterType2["default"], {
            locale: locale,
            rendertype: type,
            className: clsPrefix + " filter-dropdown",
            data: selectDataSource,
            dataIndex: dataIndex //字段
            , onFilterChange: _this.handlerFilterChange //输入框回调
            , onFilterClear: _this.handlerFilterClear //清除回调
            , filterDropdown: rows[1][index]["filterdropdown"],
            onFocus: rows[1][index]["filterdropdownfocus"],
            filterDropdownType: rows[1][index]["filterdropdowntype"] //下拉的条件类型为string,number
          });
        //日期
        case "date":
          return _react2["default"].createElement(_FilterType2["default"], {
            locale: locale,
            rendertype: type,
            className: "filter-date",
            onClick: function onClick() {},
            format: rows[1][index]["format"] || "YYYY-MM-DD",
            dataIndex: dataIndex //字段
            , onFilterChange: _this.handlerFilterChange //输入框回调
            , onFilterClear: _this.handlerFilterClear //清除回调
            , filterDropdown: rows[1][index]["filterdropdown"],
            filterDropdownType: rows[1][index]["filterdropdowntype"] //下拉的条件类型为string,number
          });
        //日期范围
        case "daterange":
          return _react2["default"].createElement(_FilterType2["default"], {
            locale: locale,
            rendertype: type,
            className: "filter-date",
            onClick: function onClick() {},
            format: rows[1][index]["format"] || "YYYY-MM-DD",
            dataIndex: dataIndex //字段
            , onFilterChange: _this.handlerFilterChange //输入框回调
            , onFilterClear: _this.handlerFilterClear //清除回调
            , filterDropdown: rows[1][index]["filterdropdown"],
            filterDropdownType: rows[1][index]["filterdropdowntype"] //下拉的条件类型为string,number
          });
        default:
          //不匹配类型默认文本输入
          return _react2["default"].createElement("div", null);
      }
    };

    _this.currentObj = null;
    _this.theadKey = new Date().getTime();
    _this.drag = {
      option: ''
    };
    _this.minWidth = 80; //确定最小宽度就是80
    _this.table = null;
    return _this;
  }

  /**
   * 动态绑定th line 事件
   * type 为false 为增加事件
   * eventSource 为false 给 th 内部的div增加事件
   */
  TableHeader.prototype.thEventListen = function thEventListen(events, type, eventSource) {
    var _table = this.table,
        ths = _table.ths,
        cols = _table.cols;

    for (var index = 0; index < ths.length; index++) {
      var element = ths[index]; //.getAttribute('data-type');
      if (!element.getAttribute('data-th-fixed')) {
        var colLine = null;
        if (element.children.length === 0) {
          colLine = element;
        } else if (element.children.length > 0) {
          colLine = element.lastElementChild;
        } else if (element.children.length === 1) {
          colLine = element.children[0];
        }
        // const colLine =  element.children.length > 1?element.lastElementChild:element.children[0];
        for (var i = 0; i < events.length; i++) {
          var _event = events[i];
          var _dataSource = eventSource ? element : colLine;
          if (type === "remove") {
            _utils.EventUtil.removeHandler(_dataSource, _event.key, _event.fun);
          } else {
            _utils.EventUtil.addHandler(_dataSource, _event.key, _event.fun);
          }
        }
      }
    }
  };

  TableHeader.prototype.bodyEventListen = function bodyEventListen(events, type) {
    for (var i = 0; i < events.length; i++) {
      var _event = events[i];
      if (type == "remove") {
        _utils.EventUtil.removeHandler(document.body, _event.key, _event.fun);
      } else {
        _utils.EventUtil.addHandler(document.body, _event.key, _event.fun);
      }
    }
  };

  TableHeader.prototype.componentDidUpdate = function componentDidUpdate() {
    this.initTable();
    this.initEvent();
  };

  TableHeader.prototype.componentDidMount = function componentDidMount() {
    this.initTable();
    this.initEvent();
  };

  /**
   * 拖拽列宽的事件处理
   */


  TableHeader.prototype.initEvent = function initEvent() {
    var events = [{ key: 'mouseup', fun: this.onLineMouseUp }, { key: 'mousemove', fun: this.onLineMouseMove }];

    if (this.props.dragborder) {
      this.thEventListen(events, '', true); //表示把事件添加到th元素上
      this.thEventListen([{ key: 'mousedown', fun: this.onLineMouseDown }]); //表示把事件添加到竖线
      this.bodyEventListen([{ key: 'mouseup', fun: this.bodyonLineMouseMove }]);
    }
    if (!this.props.draggable) return;
    //拖拽交换列事件
    this.thEventListen([{ key: 'mousedown', fun: this.dragAbleMouseDown }], '', true); //表示把事件添加到th元素上
  };

  /**
   * 移除拖拽宽度的事件
   */


  TableHeader.prototype.removeDragBorderEvent = function removeDragBorderEvent() {
    var events = [{ key: 'mouseup', fun: this.onLineMouseUp }, { key: 'mousemove', fun: this.onLineMouseMove }];
    this.thEventListen(events, 'remove', true); //表示把事件添加到th元素上
    this.thEventListen([{ key: 'mousedown', fun: this.onLineMouseDown }], 'remove'); //表示把事件添加到竖线
    this.bodyEventListen([{ key: 'mouseup', fun: this.bodyonLineMouseMove }], 'remove');
  };

  /**
   * 获取table的属性存放在this.table 中。(公用方法)
   */


  TableHeader.prototype.initTable = function initTable() {
    if (!this.props.dragborder && !this.props.draggable) return;
    var el = _reactDom2["default"].findDOMNode(this);
    var tableDome = el.parentNode;
    var table = {};
    if (tableDome && tableDome.nodeName && tableDome.nodeName.toUpperCase() == "TABLE") {
      table.table = tableDome;
      table.cols = tableDome.getElementsByTagName("col");
      table.ths = tableDome.getElementsByTagName("th");
    }
    this.table = table;

    if (!this.props.dragborder) return;
    if (document.getElementById("u-table-drag-thead-" + this.theadKey)) {
      //hao 固定列table
      this.fixedTable = {};
      var _fixedParentContext = document.getElementById("u-table-drag-thead-" + this.theadKey).parentNode;
      var siblingDom = _fixedParentContext.parentNode.nextElementSibling;
      if (siblingDom) {
        var fixedTable = siblingDom.querySelector("table");
        this.fixedTable.table = fixedTable;
        this.fixedTable.cols = fixedTable.getElementsByTagName("col");
        // this.fixedTable.ths = fixedTable.tableDome.getElementsByTagName("th");
      }
    }
  };

  //---拖拽列宽代码逻辑----start-----


  TableHeader.prototype.clearDragBorder = function clearDragBorder() {
    // if (!this.props.dragborder || !this.props.draggable) return;
    if (!this.drag || !this.drag.option) return;
    var rows = this.props.rows;

    var data = { rows: rows[0], cols: this.table.cols, currIndex: this.drag.currIndex };
    this.props.afterDragColWidth && this.props.afterDragColWidth(data);
    this.drag = {
      option: ""
    };
    if (this.props.draggable) {
      this.removeDragAbleEvent();
    }
  };

  //---拖拽列宽代码逻辑----start-----

  /**
   * 拖拽交换列的事件处理
   */
  TableHeader.prototype.addDragAbleEvent = function addDragAbleEvent() {
    var events = [{ key: 'dragstart', fun: this.onDragStart }, //用户开始拖动元素时触发
    { key: 'dragover', fun: this.onDragOver }, //当某被拖动的对象在另一对象容器范围内拖动时触发此事件
    { key: 'drop', fun: this.onDrop }];
    this.thEventListen(events, '', true);
    // this.bodyEventListen([{key:'mouseup',fun:this.bodyonDragMouseMove}]);
  };

  TableHeader.prototype.removeDragAbleEvent = function removeDragAbleEvent() {
    var events = [{ key: 'dragstart', fun: this.onDragStart }, { key: 'dragover', fun: this.onDragOver }, { key: 'drop', fun: this.onDrop }, { key: 'dragenter', fun: this.onDragEnter }];
    this.thEventListen(events, 'remove', true);
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


  TableHeader.prototype.getCurrentEventData = function getCurrentEventData(e) {
    var event = _utils.Event.getEvent(e);
    var th = this.getThDome(event.target);
    if (!th) {
      console.log(" event target is not th ! ");
      return null;
    }
    var key = th.getAttribute('data-line-key');
    var data = this.props.rows[0].find(function (da) {
      return da.key == key;
    });
    if (data) {
      return data;
    } else {
      console.log(" getCurrentEventData data is null ");
      return null;
    }
  };

  /**
   *根据拖拽，获取当前的Th属性
   * @param {*} element
   * @returns
   * @memberof TableHeader
   */


  TableHeader.prototype.getThDome = function getThDome(element) {
    var _tagName = element.tagName.toLowerCase();
    if (_tagName === 'i') return null;
    if (_tagName != 'th') {
      return this.getThDome(element.parentElement);
    } else {
      return element;
    }
  };

  //---拖拽列交换----end----- 

  /**
   * 过滤输入后或下拉条件的回调函数
   */


  /**
   * 过滤行清除回调
   */


  /**
   * 过滤渲染的组件类型
   */


  TableHeader.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        clsPrefix = _props.clsPrefix,
        rowStyle = _props.rowStyle,
        onDragStart = _props.onDragStart,
        onDragOver = _props.onDragOver,
        onDrop = _props.onDrop,
        draggable = _props.draggable,
        dragborder = _props.dragborder,
        rows = _props.rows,
        filterable = _props.filterable,
        onFilterRowsChange = _props.onFilterRowsChange,
        onMouseDown = _props.onMouseDown,
        onMouseMove = _props.onMouseMove,
        onMouseUp = _props.onMouseUp,
        onMouseOut = _props.onMouseOut,
        contentWidthDiff = _props.contentWidthDiff,
        fixed = _props.fixed,
        lastShowIndex = _props.lastShowIndex,
        contentTable = _props.contentTable;

    var attr = dragborder ? { id: "u-table-drag-thead-" + this.theadKey } : {};

    return _react2["default"].createElement(
      "thead",
      _extends({ className: clsPrefix + "-thead" }, attr, { "data-theader-fixed": "scroll" }),
      rows.map(function (row, index) {
        return _react2["default"].createElement(
          "tr",
          { key: index, style: rowStyle, className: filterable && index == rows.length - 1 ? 'filterable' : '' },
          row.map(function (da, columIndex, arr) {
            var thHover = da.drgHover ? " " + clsPrefix + "-thead th-drag-hover" : "";
            delete da.drgHover;
            var fixedStyle = "";
            var canDotDrag = "";
            if (!fixed && da.fixed) {
              fixedStyle = clsPrefix + "-row-fixed-columns-in-body";
            }

            if (lastShowIndex == columIndex) {
              canDotDrag = "th-can-not-drag";
            }
            if (filterable && index == rows.length - 1) {
              da.children = _this2.filterRenderType(da["filtertype"], da.dataindex, columIndex);
              delete da.filterdropdownfocus;
            }

            var thDefaultObj = {};
            var thClassName = "" + da.className;
            if (draggable) {
              thClassName += clsPrefix + "-thead th-drag " + thHover + " ";
            }
            if (dragborder) {
              thClassName += clsPrefix + "-thead-th " + canDotDrag;
            }
            thClassName += "" + fixedStyle;
            if (!da.fixed) {
              return _react2["default"].createElement(
                "th",
                { key: 'table-header-th-' + da.dataindex, className: thClassName, "data-th-fixed": da.fixed,
                  "data-line-key": da.key, "data-line-index": columIndex, "data-th-width": da.width },
                da.children,
                dragborder ? _react2["default"].createElement(
                  "div",
                  { ref: function ref(el) {
                      return _this2.gap = el;
                    }, "data-line-key": da.key,
                    "data-line-index": columIndex, "data-th-width": da.width,
                    "data-type": "online", className: clsPrefix + "-thead-th-drag-gap" },
                  _react2["default"].createElement("div", { id: "th-online", className: "online", "data-line-key": da.key, "data-line-index": columIndex, "data-th-width": da.width })
                ) : ""
              );
            } else {
              thDefaultObj = _extends({}, da, {
                className: da.className + " " + fixedStyle,
                key: columIndex
              });
              da.onClick ? thDefaultObj.onClick = function (e) {
                da.onClick(da, e);
              } : "";
              return _react2["default"].createElement("th", _extends({}, thDefaultObj, { "data-th-fixed": da.fixed }));
            }
          })
        );
      })
    );
  };

  return TableHeader;
}(_react.Component);

TableHeader.defaultProps = {
  contentWidthDiff: 0
};


TableHeader.propTypes = propTypes;

exports["default"] = TableHeader;
module.exports = exports["default"];