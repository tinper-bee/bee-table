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

var _throttleDebounce = require("throttle-debounce");

var _utils = require("./lib/utils");

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

function getDiv(id) {
  var div = document.createElement("div");
  div.className = "u-table-drag-hidden-cont";
  div.id = id;
  return div;
}

var TableHeader = function (_Component) {
  _inherits(TableHeader, _Component);

  function TableHeader(props) {
    _classCallCheck(this, TableHeader);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    _this.currentObj = null;
    _this.theadKey = new Date().getTime();
    _this.drag = {
      option: ''
    };
    _this.minWidth = parseInt(props.minColumnWidth);
    _this.table = null;
    _this._thead = null; //当前对象
    _this.event = false; //避免多次绑定问题
    _this.lastColumWidth = null; //非固定列最后一列的初始化宽度
    _this.fixedTable = {};
    return _this;
  }

  TableHeader.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    // 表格column改变时，要重新绑定拖拽事件，否则拖拽不生效
    var oldCols = this.props.columnsChildrenList;
    var newCols = nextProps.columnsChildrenList;

    if (this._thead) {
      if (newCols.length !== oldCols.length) {
        this.event = false;
        return;
      }
      oldCols.some(function (item, index) {
        if (newCols[index] && newCols[index].dataIndex !== item.dataIndex) {
          _this2.event = false;
          return true;
        }
      });
    }
  };

  TableHeader.prototype.componentDidUpdate = function componentDidUpdate() {
    this.initTable();
    this.initEvent();
  };

  TableHeader.prototype.componentDidMount = function componentDidMount() {
    var uid = "_table_uid_" + new Date().getTime();
    this._table_none_cont_id = uid;
    var div = getDiv(uid);
    document.querySelector("body").appendChild(div);
  };

  TableHeader.prototype.componentWillUnmount = function componentWillUnmount() {
    var _this3 = this;

    this.fixedTable = null;
    if (!this.table) return;
    if (this.props.draggable) {
      this.removeDragAbleEvent();
    }
    if (this.props.dragborder) {
      this.removeDragBorderEvent();
    }
    this.doEventList(this.table.tr, function (tr) {
      _this3.eventListen([{ key: 'mousedown', fun: _this3.onTrMouseDown }], 'remove', tr);
    });
    // this.eventListen([{key:'mousedown',fun:this.onTrMouseDown}],'remove',this.table.tr[0]);
    this.eventListen([{ key: 'mouseup', fun: this.bodyonLineMouseUp }], 'remove', document.body);
  };

  /**
   * 获取table的属性存放在this.table 中。(公用方法)
   * @returns
   * @memberof TableHeader
   */


  TableHeader.prototype.initTable = function initTable() {
    var contentTable = this.props.contentTable;

    if (!this.props.dragborder && !this.props.draggable) return;
    var tableDome = this._thead.parentNode;
    var table = {};
    if (tableDome && tableDome.nodeName && tableDome.nodeName.toUpperCase() == "TABLE") {
      table.table = tableDome;
      table.cols = tableDome.getElementsByTagName("col");
      table.ths = tableDome.getElementsByTagName("th");
      table.tr = tableDome.getElementsByTagName("tr");
      table.tableHeaderCols = contentTable.querySelector('.u-table-scroll .u-table-header') && contentTable.querySelector('.u-table-scroll .u-table-header').getElementsByTagName("col");
      table.tableBody = contentTable.querySelector('.u-table-scroll .u-table-body') && contentTable.querySelector('.u-table-scroll .u-table-body');
      table.tableBodyCols = contentTable.querySelector('.u-table-scroll .u-table-body') && contentTable.querySelector('.u-table-scroll .u-table-body').getElementsByTagName("col");
      table.bodyRows = table.tableBody && table.tableBody.querySelectorAll('tr') || [];

      table.fixedLeftHeaderTable = contentTable.querySelector('.u-table-fixed-left .u-table-header');
      table.fixedRighHeadertTable = contentTable.querySelector('.u-table-fixed-right .u-table-header');
      table.contentTableHeader = contentTable.querySelector('.u-table-scroll .u-table-header');
      table.fixedLeftBodyTable = contentTable.querySelectorAll('.u-table-fixed-left .u-table-body-outer');
      if (table.fixedLeftBodyTable) {
        var leftBodyTableIndex = table.fixedLeftBodyTable.length - 1 < 0 ? 0 : table.fixedLeftBodyTable.length - 1;
        table.fixedLeftBodyTable = table.fixedLeftBodyTable[leftBodyTableIndex];
      }

      table.fixedRightBodyTable = contentTable.querySelectorAll('.u-table-fixed-right .u-table-body-outer');
      if (table.fixedRightBodyTable) {
        var rightBodyTableIndex = table.fixedRightBodyTable.length - 1 < 0 ? 0 : table.fixedRightBodyTable.length - 1;
        table.fixedRightBodyTable = table.fixedRightBodyTable[rightBodyTableIndex];
      }

      table.innerTableBody = contentTable.querySelector('.u-table-scroll .u-table-body table');
      table.fixedLeftBodyRows = table.fixedLeftBodyTable && table.fixedLeftBodyTable.querySelectorAll('tr') || [];
      table.fixedRightBodyRows = table.fixedRightBodyTable && table.fixedRightBodyTable.querySelectorAll('tr') || [];
    }

    this.table = table;

    if (!this.props.dragborder) return;
    if (document.getElementById("u-table-drag-thead-" + this.theadKey)) {
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

  /**
   * 事件初始化
   */


  TableHeader.prototype.initEvent = function initEvent() {
    var _this4 = this;

    var _props = this.props,
        dragborder = _props.dragborder,
        draggable = _props.draggable,
        rows = _props.rows;
    // 当传入的 columns 为空时，不绑定拖拽事件

    if (Object.prototype.toString.call(rows) === '[object Array]' && rows.length === 0) {
      return;
    }
    if (!this.event) {
      //避免多次绑定问题。
      this.event = true;
      if (dragborder) {
        this.dragBorderEventInit(); //列宽
      }
      if (draggable) {
        this.dragAbleEventInit(); //交换列
      }
      if (this.table && this.table.tr) {
        // this.eventListen([{key:'mousedown',fun:this.onTrMouseDown}],'',this.table.tr[0]);//body mouseup
        this.doEventList(this.table.tr, function (tr) {
          _this4.eventListen([{ key: 'mousedown', fun: _this4.onTrMouseDown }], '', tr); //body mouseup
        });
      }
      this.eventListen([{ key: 'mouseup', fun: this.bodyonLineMouseUp }], '', document.body); //body mouseup
    }
  };

  TableHeader.prototype.doEventList = function doEventList(trs, action) {
    for (var index = 0; index < trs.length; index++) {
      action(trs[index]);
    }
  };

  /**
   * 拖拽列宽事件的监听
   */


  TableHeader.prototype.dragBorderEventInit = function dragBorderEventInit() {
    if (!this.props.dragborder) return;
    this.eventListen([{ key: 'mouseup', fun: this.onTrMouseUp }], '', document.body);
    this.eventListen([{ key: 'mousemove', fun: this.onTrMouseMove }], '', document.body);

    // let  events = [
    //   {key:'mouseup', fun:this.onTrMouseUp},
    //   {key:'mousemove', fun:this.onTrMouseMove},
    //   // {key:'mousemove', fun:debounce(50,this.onTrMouseMove)},//函数节流后体验很差
    // ];
    // this.doEventList(this.table.tr,(tr)=>{
    //   this.eventListen(events,'',tr);//表示把事件添加到th元素上
    // })
    // this.eventListen(events,'',this.table.tr[0]);//表示把事件添加到th元素上
  };

  /**
   * 删除拖动改变列宽的事件监听
   */


  TableHeader.prototype.removeDragBorderEvent = function removeDragBorderEvent() {
    var _this5 = this;

    var events = [{ key: 'mouseup', fun: this.onTrMouseUp }, { key: 'mousemove', fun: this.onTrMouseMove }];
    // this.eventListen(events,'remove',this.table.tr[0]);
    this.doEventList(this.table.tr, function (tr) {
      _this5.eventListen(events, 'remove', _this5.table.tr);
    });
  };

  TableHeader.prototype.eventListen = function eventListen(events, type, eventSource) {
    if (!this.table) return;
    if (!eventSource) {
      console.log("Please set the attributes of column !");
      return;
    }
    var tr = this.table.tr;

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
   *
   *根据 data-type 来获取当前拖拽的对象的Object，如果为null表示拖动的对象并非是online
   * @memberof TableHeader
   */


  /**
  * 调整列宽的down事件
  * @memberof TableHeader
  */


  /**
   * 根据当前节点查找到有data-type类型的容器返回。
   * @memberof TableHeader
   */


  /**
   * 判断当前的target 是否是 th，如果不是，直接递归查找。
   * @memberof TableHeader
   */

  /**
   * 调整列宽的move事件
   * @memberof TableHeader
   */


  /**
  * 调整列宽的up事件
  * @memberof TableHeader
  */


  TableHeader.prototype.mouseClear = function mouseClear() {
    if (!this.drag || !this.drag.option) return;
    var rows = this.props.rows;

    var data = { rows: rows[0], cols: this.table.cols, currIndex: this.drag.currIndex };
    this.props.afterDragColWidth && this.props.afterDragColWidth(data);
    this.drag = {
      option: ""
    };
    this.clearThsDr();
  };

  /**
  * 当前对象上绑定全局事件，用于拖拽区域以外时的事件处理
  * @param {*} events
  * @param {*} type
  * @memberof TableHeader
  */


  /**
   *相关滚动条联动操作
   *
   * @memberof TableHeader
   */


  //---拖拽交换列代码----start-----
  /**
   * 添加换列的事件监听
   */
  TableHeader.prototype.dragAbleEventInit = function dragAbleEventInit() {
    if (!this.props.draggable) return;
    var events = [{ key: 'dragstart', fun: this.onDragStart }, //用户开始拖动元素时触发
    { key: 'dragover', fun: this.onDragOver }, //当某被拖动的对象在另一对象容器范围内拖动时触发此事件
    { key: 'drop', fun: this.onDrop }, //在一个拖动过程中，释放鼠标键时触发此事件

    { key: 'dragenter', fun: this.onDragEnter }, { key: 'dragend', fun: this.onDragEnd }, { key: 'dragleave', fun: this.onDragLeave }];
    this.eventListen(events, '', this.table.tr[0]); //表示把事件添加到th元素上
  };

  /**
   * 删除换列的事件监听
   */


  TableHeader.prototype.removeDragAbleEvent = function removeDragAbleEvent() {
    var events = [{ key: 'dragstart', fun: this.onDragStart }, { key: 'dragover', fun: this.onDragOver }, { key: 'drop', fun: this.onDrop }, { key: 'dragenter', fun: this.onDragEnter }, { key: 'dragend', fun: this.onDragEnd }, { key: 'dragleave', fun: this.onDragLeave }];
    this.eventListen(events, 'remove', this.table.tr[0]);
  };

  /**
   * 开始调整交换列的事件
   */


  /**
  * 在一个拖动过程中，释放鼠标键时触发此事件。【目标事件】
  * @memberof TableHeader
  */


  /**
   * 获取当前th上的对象数据
   * @param {*} e
   * @returns
   * @memberof TableHeader
   */
  TableHeader.prototype.getCurrentEventData = function getCurrentEventData(th) {
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
  * 根据当前鼠标点击的节点，进行递归遍历，最终找到th
  * @param {*} element
  * @returns  <th />对象
  * @memberof TableHeader
  */


  TableHeader.prototype.getThDome = function getThDome(element) {
    var _tagName = element.tagName.toLowerCase();
    if (element.getAttribute('data-filter-type') === 'filterContext') return null;
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
    var _this6 = this;

    var _props2 = this.props,
        clsPrefix = _props2.clsPrefix,
        rowStyle = _props2.rowStyle,
        draggable = _props2.draggable,
        dragborder = _props2.dragborder,
        rows = _props2.rows,
        filterable = _props2.filterable,
        fixed = _props2.fixed,
        lastShowIndex = _props2.lastShowIndex,
        columnsChildrenList = _props2.columnsChildrenList;

    var attr = dragborder ? { id: "u-table-drag-thead-" + this.theadKey } : {};
    var lastObj = columnsChildrenList[columnsChildrenList.length - 1];
    return _react2["default"].createElement(
      "thead",
      _extends({ className: clsPrefix + "-thead" }, attr, { "data-theader-fixed": "scroll", ref: function ref(_thead) {
          return _this6._thead = _thead;
        } }),
      rows.map(function (row, index) {
        var _rowLeng = row.length - 1;
        return _react2["default"].createElement(
          "tr",
          { key: index, style: rowStyle, className: filterable && index == rows.length - 1 ? 'filterable' : '' },
          row.map(function (da, columIndex, arr) {
            da.children = da.required ? _react2["default"].createElement(
              "span",
              null,
              _react2["default"].createElement(
                "span",
                { className: "required" },
                "*"
              ),
              da.children
            ) : da.children;
            var thHover = da.drgHover ? " " + clsPrefix + "-thead th-drag-hover" : "";
            delete da.drgHover;
            var fixedStyle = "";
            var canDotDrag = "";
            //主表格下、固定列或者是过滤行中含有固定列时添加该属性
            if (!fixed && (da.fixed || filterable && index == rows.length - 1 && rows[0][columIndex].fixed)) {
              fixedStyle = " " + clsPrefix + "-row-fixed-columns-in-body";
            }

            if (lastShowIndex == columIndex) {
              canDotDrag = "th-can-not-drag";
            }
            var thClassName = "" + da.className ? "" + da.className : '';
            if (da.titleAlign) {
              thClassName += " text-" + da.titleAlign + " ";
            } else if (da.textAlign) {
              thClassName += " text-" + da.textAlign + " ";
            }

            delete da.textAlign;
            delete da.titleAlign;
            var keyTemp = {};
            //避免key为undefined
            // if(da.dataindex && da.key ===undefined ){
            keyTemp.key = da.key || da.dataindex || index + '-' + columIndex;

            // }
            if (filterable && index == rows.length - 1) {
              da.children = _this6.filterRenderType(da["filtertype"], da.dataindex, columIndex);
              if (da.key === undefined) {
                keyTemp.key = keyTemp.key + '-filterable';
              }
              delete da.filterdropdownfocus;
            }

            var thDefaultObj = {};

            if (draggable) {
              thClassName += " " + clsPrefix + "-thead th-drag " + thHover + " ";
            }
            if (dragborder) {
              thClassName += " " + clsPrefix + "-thead-th " + canDotDrag;
            }
            thClassName += " " + fixedStyle;
            if (!da.fixed) {
              return _react2["default"].createElement(
                "th",
                _extends({}, da, keyTemp, { className: thClassName, "data-th-fixed": da.fixed, "data-line-key": da.key,
                  "data-line-index": columIndex, "data-th-width": da.width, "data-type": "draggable", onCopy: function onCopy(event) {
                    _this6.onCopy(da, columIndex, event);
                  } }),
                da.children,

                // && columIndex != _rowLeng
                dragborder && lastObj && da.key != lastObj.key ? _react2["default"].createElement(
                  "div",
                  { ref: function ref(el) {
                      return _this6.gap = el;
                    }, "data-line-key": da.key,
                    "data-line-index": columIndex, "data-th-width": da.width,
                    "data-type": "online", "data-th-fixed": da.fixed, className: clsPrefix + "-thead-th-drag-gap" },
                  _react2["default"].createElement("div", { className: "online" })
                ) : ""
              );
            } else {
              thDefaultObj = _extends({}, da, {
                className: thClassName + " " + fixedStyle
              });
              da.onClick ? thDefaultObj.onClick = function (e) {
                da.onClick(da, e);
              } : "";
              return _react2["default"].createElement(
                "th",
                _extends({}, thDefaultObj, keyTemp, { "data-th-fixed": da.fixed, style: { maxWidth: da.width }, onCopy: _this6.onCopy }),
                da.children,

                // && columIndex != _rowLeng
                dragborder ? _react2["default"].createElement(
                  "div",
                  { ref: function ref(el) {
                      return _this6.gap = el;
                    }, "data-line-key": da.key,
                    "data-line-index": columIndex, "data-th-width": da.width,
                    "data-type": "online", "data-th-fixed": da.fixed, className: clsPrefix + "-thead-th-drag-gap" },
                  _react2["default"].createElement("div", { className: "online" })
                ) : ""
              );
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

var _initialiseProps = function _initialiseProps() {
  var _this7 = this;

  this.getOnLineObject = function (_element) {
    var type = _element.getAttribute('data-type'),
        elementObj = null;
    if (!type) {
      var element = _element.parentElement || parentNode; //兼容写法。
      if (element.getAttribute('data-type')) {
        elementObj = element;
      }
    } else {
      elementObj = _element;
    }
    return elementObj;
  };

  this.onTrMouseDown = function (e) {
    var eventNoStop = _this7.props.eventNoStop;

    !eventNoStop && _utils.Event.stopPropagation(e);
    var event = _utils.Event.getEvent(e),
        targetEvent = _utils.Event.getTarget(event);
    var _props3 = _this7.props,
        clsPrefix = _props3.clsPrefix,
        contentTable = _props3.contentTable,
        lastShowIndex = _props3.lastShowIndex,
        columnsChildrenList = _props3.columnsChildrenList;
    // let currentElement = this.getOnLineObject(targetEvent);

    var currentElement = _this7.getTargetToType(targetEvent);
    if (!currentElement) return;
    var type = currentElement.getAttribute('data-type');
    var fixedType = currentElement.getAttribute('data-th-fixed');
    if (!_this7.props.dragborder && !_this7.props.draggable) return;
    if (type == 'online' && _this7.props.dragborder) {
      // if(!this.props.dragborder)return;
      targetEvent.setAttribute('draggable', false); //添加交换列效果
      var currentIndex = -1;
      var defaultWidth = currentElement.getAttribute("data-th-width");
      _this7.drag.option = "border"; //拖拽操作
      if (columnsChildrenList) {
        var columnKey = currentElement.getAttribute("data-line-key");
        if (columnKey) {
          currentIndex = columnsChildrenList.findIndex(function (da) {
            return (da.key && da.key.toLowerCase()) === columnKey.toLowerCase();
          });
        }
      }
      if (currentIndex < 0) {
        console.log('Key must be set for column!');
        return;
      }
      var currentObj = _this7.table.cols[currentIndex];
      _this7.drag.currIndex = currentIndex;
      _this7.drag.oldLeft = event.clientX;
      _this7.drag.oldWidth = parseInt(currentObj.style.width);
      _this7.drag.minWidth = currentObj.style.minWidth != "" ? parseInt(currentObj.style.minWidth) : defaultWidth;
      _this7.drag.tableWidth = parseInt(_this7.table.table.style.width ? _this7.table.table.style.width : _this7.table.table.scrollWidth);
      if (!_this7.tableOldWidth) {
        _this7.tableOldWidth = _this7.drag.tableWidth; //this.getTableWidth();
      }

      // if(!this.lastColumWidth){
      var contentT = _this7.table.tableHeaderCols || _this7.table.cols;
      _this7.lastColumWidth = parseInt(contentT[lastShowIndex].style.width);
      // console.log('begin--lastColumnWidth',this.lastColumWidth);
      // }
      _this7.drag.contentTableCWidth = _this7.table.contentTableHeader.clientWidth;
      _this7.drag.contentTableSWidth = _this7.table.contentTableHeader.scrollWidth;
      if (fixedType) {
        var contentTablePar = _this7.table.contentTableHeader.parentNode;

        if (contentTablePar) {
          var originL = parseInt(contentTablePar.style.marginLeft);
          var originR = parseInt(contentTablePar.style.marginRight);
          // 内容区表格marginLef
          _this7.drag.contentTableML = originL;
          _this7.drag.contentTableMR = originR;
        }
      }
      _this7.drag.fixedType = fixedType;
    } else if (type != 'online' && _this7.props.draggable) {
      // if (!this.props.draggable || targetEvent.nodeName.toUpperCase() != "TH") return;
      if (!_this7.props.draggable) return;
      var th = _this7.getTargetToType(targetEvent);
      th.setAttribute('draggable', true); //添加交换列效果
      _this7.drag.option = 'dragAble';
      _this7.currentDome = th;
      var _currentIndex = parseInt(th.getAttribute("data-line-index"));
      _this7.drag.currIndex = _currentIndex;
    } else {
      // console.log("onTrMouseDown dragborder or draggable is all false !");
      return;
    }
  };

  this.getTableWidth = function () {
    var tableWidth = 0,
        offWidth = 0; //this.table.cols.length;
    for (var index = 0; index < _this7.table.cols.length; index++) {
      var da = _this7.table.cols[index];
      tableWidth += parseInt(da.style.width);
    }
    return tableWidth - offWidth;
  };

  this.getTargetToType = function (targetEvent) {
    var tag = targetEvent;
    if (targetEvent && !targetEvent.getAttribute("data-type")) {
      tag = _this7.getTargetToType(targetEvent.parentElement);
    }
    return tag;
  };

  this.getTargetToTh = function (targetEvent) {
    var th = targetEvent;
    if (targetEvent.nodeName.toUpperCase() != "TH") {
      th = _this7.getThDome(targetEvent);
    }
    // console.log(" getTargetToTh: ", th);
    return th;
  };

  this.onTrMouseMove = function (e) {
    if (!_this7.props.dragborder && !_this7.props.draggable) return;
    var _props4 = _this7.props,
        clsPrefix = _props4.clsPrefix,
        dragborder = _props4.dragborder,
        contentDomWidth = _props4.contentDomWidth,
        scrollbarWidth = _props4.scrollbarWidth,
        contentTable = _props4.contentTable,
        headerScroll = _props4.headerScroll,
        lastShowIndex = _props4.lastShowIndex,
        onDraggingBorder = _props4.onDraggingBorder,
        leftFixedWidth = _props4.leftFixedWidth,
        rightFixedWidth = _props4.rightFixedWidth,
        bodyDisplayInRow = _props4.bodyDisplayInRow,
        eventNoStop = _props4.eventNoStop;

    !eventNoStop && _utils.Event.stopPropagation(e);
    var event = _utils.Event.getEvent(e);
    if (_this7.props.dragborder && _this7.drag.option == "border") {
      //移动改变宽度
      var currentCols = _this7.table.cols[_this7.drag.currIndex];
      var diff = event.clientX - _this7.drag.oldLeft;
      var newWidth = _this7.drag.oldWidth + diff;
      _this7.drag.newWidth = newWidth > 0 ? newWidth : _this7.minWidth;
      if (newWidth > _this7.minWidth) {
        currentCols.style.width = newWidth + 'px';

        // displayinrow 判断、 固定行高判断 
        if (!bodyDisplayInRow) {
          _this7.table.bodyRows.forEach(function (row, index) {
            var leftRow = _this7.table.fixedLeftBodyRows[index];
            var rightRow = _this7.table.fixedRightBodyRows[index];
            if (leftRow || rightRow) {
              var height = row.getBoundingClientRect().height;
              leftRow && (leftRow.style.height = height + "px");
              rightRow && (rightRow.style.height = height + "px");
            }
          });
        }

        //hao 支持固定表头拖拽 修改表体的width
        if (_this7.fixedTable.cols) {
          _this7.fixedTable.cols[_this7.drag.currIndex].style.width = newWidth + "px";
        }

        var contentTableSWidth = _this7.drag.contentTableSWidth - _this7.drag.contentTableCWidth;
        // console.log('contentTableSWidth+diff',contentTableSWidth+diff,'diff',diff);
        if (diff < 0 && contentTableSWidth + diff < 0) {
          var headerCols = _this7.table.tableHeaderCols || _this7.table.cols;
          var lastWidth = _this7.lastColumWidth - (contentTableSWidth + diff);
          // console.log('lastWidth',lastWidth,'lastShowIndex',lastShowIndex);
          headerCols[lastShowIndex].style.width = lastWidth + "px"; //同步表头
          _this7.table.tableBodyCols[lastShowIndex].style.width = lastWidth + "px"; //同步表体
        }
        // 内容区非固定列场景拖拽
        if (!_this7.drag.fixedType) {

          // let newDiff = (parseInt(currentCols.style.minWidth) - parseInt(currentCols.style.width));
          // if(newDiff > 0){//缩小
          //   let lastWidth = this.lastColumWidth + newDiff;
          //   this.table.cols[lastShowIndex].style.width = lastWidth +"px";//同步表头
          //   this.table.tableBodyCols[lastShowIndex].style.width = lastWidth + "px";//同步表体

          // }

          var showScroll = contentDomWidth - (leftFixedWidth + rightFixedWidth) - (_this7.drag.tableWidth + diff) - scrollbarWidth;

          //表头滚动条处理
          if (headerScroll) {
            if (showScroll < 0) {
              //小于 0 出现滚动条
              //找到固定列表格，设置表头的marginBottom值为scrollbarWidth;
              _this7.table.contentTableHeader.style.overflowX = 'scroll';
              _this7.optTableMargin(_this7.table.fixedLeftHeaderTable, scrollbarWidth);
              _this7.optTableMargin(_this7.table.fixedRighHeadertTable, scrollbarWidth);
            } else {
              //大于 0 不显示滚动条
              _this7.table.contentTableHeader.style.overflowX = 'hidden';
              _this7.optTableMargin(_this7.table.fixedLeftHeaderTable, 0);
              _this7.optTableMargin(_this7.table.fixedRighHeadertTable, 0);
            }
          } else {
            if (showScroll < 0) {
              _this7.table.tableBody.style.overflowX = 'auto';
              _this7.optTableMargin(_this7.table.fixedLeftBodyTable, '-' + scrollbarWidth);
              _this7.optTableMargin(_this7.table.fixedRightBodyTable, '-' + scrollbarWidth);
              _this7.optTableScroll(_this7.table.fixedLeftBodyTable, { x: 'scroll' });
              _this7.optTableScroll(_this7.table.fixedRightBodyTable, { x: 'scroll' });
            } else {
              _this7.table.tableBody.style.overflowX = 'hidden';
              _this7.optTableMargin(_this7.table.fixedLeftBodyTable, 0);
              _this7.optTableMargin(_this7.table.fixedRightBodyTable, 0);
              _this7.optTableScroll(_this7.table.fixedLeftBodyTable, { x: 'auto' });
              _this7.optTableScroll(_this7.table.fixedRightBodyTable, { x: 'auto' });
            }
          }
        } else if (_this7.drag.fixedType) {
          if (_this7.table.ths[_this7.drag.currIndex]) {
            _this7.table.ths[_this7.drag.currIndex].width = newWidth;
          }
          // console.log('this.drag.contentTableML',this.drag.contentTableML,'diff',diff);
          // debugger

          var contentTablePar = _this7.table.contentTableHeader.parentNode;
          // left、right缩小的内容，在没有滚动条时，需要将宽度同步到到最后一列
          // diff<0 往里拖，
          // const  contentTableSWidth = this.drag.contentTableSWidth - this.drag.contentTableCWidth;
          // console.log('contentTableSWidth+diff',contentTableSWidth+diff,'diff',diff);
          // if(diff<0 && contentTableSWidth+diff < 0) {
          //   const headerCols = this.table.tableHeaderCols || this.table.cols;
          //   const lastWidth =this.lastColumWidth - (contentTableSWidth+diff);
          //   console.log('lastWidth',lastWidth,'lastShowIndex',lastShowIndex);
          //   headerCols[lastShowIndex].style.width = lastWidth +"px";//同步表头
          //   this.table.tableBodyCols[lastShowIndex].style.width = lastWidth + "px";//同步表体
          // }
          if (_this7.drag.fixedType == 'left') {
            contentTablePar.style.marginLeft = _this7.drag.contentTableML + diff + 'px';
          } else {
            contentTablePar.style.marginRight = _this7.drag.contentTableMR + diff + 'px';
          }
        }
      } else {
        _this7.drag.newWidth = _this7.minWidth;
      }
    }
    // 增加拖拽列宽动作的回调函数
    _this7.drag.newWidth && onDraggingBorder && onDraggingBorder(event, _this7.drag.newWidth);
  };

  this.onTrMouseUp = function (e) {
    var event = _utils.Event.getEvent(e);
    var width = _this7.drag.newWidth;
    var opt = _this7.drag.option;
    _this7.mouseClear();
    if (opt !== "border") return; // fix:点击表头会触发onDropBorder事件的问题
    _this7.props.onDropBorder && _this7.props.onDropBorder(event, width);
  };

  this.clearThsDr = function () {
    var ths = _this7.table.ths;
    for (var index = 0; index < ths.length; index++) {
      ths[index].setAttribute('draggable', false); //去掉交换列效果
    }
  };

  this.bodyonLineMouseUp = function (events, type) {
    if (!_this7.drag || !_this7.drag.option) return;
    _this7.mouseClear();
  };

  this.optTableMargin = function (table, scrollbarWidth) {
    if (table) {
      table.style.marginBottom = scrollbarWidth + "px";
    }
  };

  this.optTableScroll = function (table) {
    var overflow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (table) {
      var innerTable = table.querySelector('.u-table-body-inner');
      if (innerTable) {
        //fixbug: 拖拽列宽后，滚动条滚到表格底部，会导致固定列和非固定列错行
        overflow.x && (innerTable.style.overflowX = overflow.x);
        overflow.y && (innerTable.style.overflowY = overflow.y);
      }
    }
  };

  this.onDragStart = function (e) {
    if (!_this7.props.draggable) return;
    if (_this7.drag && _this7.drag.option != 'dragAble') {
      return;
    }
    var event = _utils.Event.getEvent(e),

    // target = Event.getTarget(event);
    target = _this7.getTargetToTh(_utils.Event.getTarget(event));
    var currentIndex = parseInt(target.getAttribute("data-line-index"));
    var currentKey = target.getAttribute('data-line-key');

    if (event.dataTransfer.setDragImage) {
      var crt = target.cloneNode(true);
      crt.style.backgroundColor = "#ebecf0";
      crt.style.width = _this7.table.cols[currentIndex].style.width; //拖动后再交换列的时候，阴影效果可同步
      crt.style.height = "40px";
      // crt.style['line-height'] = "40px";
      // document.body.appendChild(crt);
      document.getElementById(_this7._table_none_cont_id).appendChild(crt);
      event.dataTransfer.setDragImage(crt, 0, 0);
    }

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("Text", currentKey);
    _this7.currentObj = _this7.props.rows[0][currentIndex];
  };

  this.onDragOver = function (e) {
    var event = _utils.Event.getEvent(e);
    event.preventDefault();
  };

  this.onDrop = function (e) {
    if (!_this7.props.draggable) return;
    var props = _this7.getCurrentEventData(_this7._dragCurrent);
    e.column = { props: props };
    if (_this7.drag && _this7.drag.option != 'dragAble') {
      _this7.props.onDrop(e);
      return;
    }
    var event = _utils.Event.getEvent(e),
        target = _utils.Event.getTarget(event);
    event.preventDefault();
    event.stopPropagation();
    _this7.currentDome.setAttribute('draggable', false); //添加交换列效果
    // let data = this.getCurrentEventData(this._dragCurrent);
    // if(!data){
    //   this.props.onDrop(e);
    //   return;
    // }
    if (!_this7.props.onDrop) return;
    // this.props.onDrop(event,target);
    _this7.props.onDrop(event, { dragSource: _this7.currentObj, dragTarg: e.column });
  };

  this.onDragEnter = function (e) {
    var event = _utils.Event.getEvent(e),
        target = _utils.Event.getTarget(event);
    _this7._dragCurrent = target;
    var currentIndex = target.getAttribute("data-line-index");
    if (!currentIndex || parseInt(currentIndex) === _this7.drag.currIndex) return;
    if (target.nodeName.toUpperCase() === "TH") {
      // target.style.border = "2px dashed rgba(5,0,0,0.25)";
      target.setAttribute("style", "border-right:2px dashed rgb(30, 136, 229)");
      // target.style.backgroundColor = 'rgb(235, 236, 240)';
    }
  };

  this.onDragEnd = function (e) {
    var event = _utils.Event.getEvent(e),
        target = _utils.Event.getTarget(event);
    _this7._dragCurrent.setAttribute("style", "");
    event.preventDefault();
    event.stopPropagation();
    // this._dragCurrent.style = "";
    document.getElementById(_this7._table_none_cont_id).innerHTML = "";

    var data = _this7.getCurrentEventData(_this7._dragCurrent);
    if (!data) return;
    if (!_this7.currentObj || _this7.currentObj.key == data.key) return;
    if (!_this7.props.onDragEnd) return;
    _this7.props.onDragEnd(event, { dragSource: _this7.currentObj, dragTarg: data });
  };

  this.onDragLeave = function (e) {
    var event = _utils.Event.getEvent(e),
        target = _utils.Event.getTarget(event);
    var currentIndex = target.getAttribute("data-line-index");
    if (!currentIndex || parseInt(currentIndex) === _this7.drag.currIndex) return;
    if (target.nodeName.toUpperCase() === "TH") {
      target.setAttribute("style", "");
      // this._dragCurrent.style = "";
    }
  };

  this.handlerFilterChange = function (key, value, condition) {
    var onFilterChange = _this7.props.onFilterChange;

    if (onFilterChange) {
      onFilterChange(key, value, condition);
    }
  };

  this.handlerFilterClear = function (field) {
    var onFilterClear = _this7.props.onFilterClear;

    if (onFilterClear) {
      onFilterClear(field);
    }
  };

  this.filterRenderType = function (type, dataIndex, index) {
    var _props5 = _this7.props,
        clsPrefix = _props5.clsPrefix,
        rows = _props5.rows,
        filterDelay = _props5.filterDelay,
        locale = _props5.locale;

    switch (type) {
      //文本输入
      case "text":
        return _react2["default"].createElement(_FilterType2["default"], {
          locale: locale //多语
          , rendertype: type //渲染类型
          , clsPrefix: clsPrefix //css前缀
          , className: clsPrefix + " filter-text",
          dataIndex: dataIndex //字段
          , onFilterChange: (0, _throttleDebounce.debounce)(filterDelay || 300, _this7.handlerFilterChange) //输入框回调
          , onFilterClear: _this7.handlerFilterClear //清除回调
          , filterDropdown: rows[1][index]["filterdropdown"] //是否显示下拉条件
          , filterDropdownType: rows[1][index]["filterdropdowntype"] //下拉的条件类型为string,number
          , filterDropdownIncludeKeys: rows[1][index]["filterdropdownincludekeys"] //下拉条件按照指定的keys去显示
        });
      //数值输入
      case "number":
        return _react2["default"].createElement(_FilterType2["default"], {
          locale: locale,
          rendertype: type,
          clsPrefix: clsPrefix,
          className: clsPrefix + " filter-text",
          dataIndex: dataIndex //字段
          , onFilterChange: (0, _throttleDebounce.debounce)(filterDelay || 300, _this7.handlerFilterChange) //输入框回调并且函数防抖动
          , onFilterClear: _this7.handlerFilterClear //清除回调
          , filterDropdown: rows[1][index]["filterdropdown"],
          filterDropdownType: rows[1][index]["filterdropdowntype"] //下拉的条件类型为string,number
          , filterDropdownIncludeKeys: rows[1][index]["filterdropdownincludekeys"] //下拉条件按照指定的keys去显示
          , filterInputNumberOptions: rows[1][index]["filterinputnumberoptions"] //设置数值框内的详细属性
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
          notFoundContent: "Loading" //没有数据显示的默认字
          , dataIndex: dataIndex //字段
          , onFilterChange: _this7.handlerFilterChange //输入框回调
          , onFilterClear: _this7.handlerFilterClear //清除回调
          , filterDropdown: rows[1][index]["filterdropdown"],
          onFocus: rows[1][index]["filterdropdownfocus"],
          filterDropdownType: rows[1][index]["filterdropdowntype"] //下拉的条件类型为string,number
          , filterDropdownIncludeKeys: rows[1][index]["filterdropdownincludekeys"] //下拉条件按照指定的keys去显示
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
          , onFilterChange: _this7.handlerFilterChange //输入框回调
          , onFilterClear: _this7.handlerFilterClear //清除回调
          , filterDropdown: rows[1][index]["filterdropdown"],
          filterDropdownType: rows[1][index]["filterdropdowntype"] //下拉的条件类型为string,number
          , filterDropdownIncludeKeys: rows[1][index]["filterdropdownincludekeys"] //下拉条件按照指定的keys去显示
        });
      //日期 年
      case "dateyear":
        return _react2["default"].createElement(_FilterType2["default"], {
          locale: locale,
          rendertype: type,
          className: "filter-date",
          onClick: function onClick() {},
          format: rows[1][index]["format"] || "YYYY",
          dataIndex: dataIndex //字段
          , onFilterChange: _this7.handlerFilterChange //输入框回调
          , onFilterClear: _this7.handlerFilterClear //清除回调
          , filterDropdown: rows[1][index]["filterdropdown"],
          filterDropdownType: rows[1][index]["filterdropdowntype"] //下拉的条件类型为string,number
          , filterDropdownIncludeKeys: rows[1][index]["filterdropdownincludekeys"] //下拉条件按照指定的keys去显示
        });
      //日期 月
      case "datemonth":
        return _react2["default"].createElement(_FilterType2["default"], {
          locale: locale,
          rendertype: type,
          className: "filter-date",
          onClick: function onClick() {},
          format: rows[1][index]["format"] || "YYYY-MM",
          dataIndex: dataIndex //字段
          , onFilterChange: _this7.handlerFilterChange //输入框回调
          , onFilterClear: _this7.handlerFilterClear //清除回调
          , filterDropdown: rows[1][index]["filterdropdown"],
          filterDropdownType: rows[1][index]["filterdropdowntype"] //下拉的条件类型为string,number
          , filterDropdownIncludeKeys: rows[1][index]["filterdropdownincludekeys"] //下拉条件按照指定的keys去显示
        });
      //日期 周
      case "dateweek":
        return _react2["default"].createElement(_FilterType2["default"], {
          locale: locale,
          rendertype: type,
          className: "filter-date",
          onClick: function onClick() {},
          format: rows[1][index]["format"] || "YYYY-Wo",
          dataIndex: dataIndex //字段
          , onFilterChange: _this7.handlerFilterChange //输入框回调
          , onFilterClear: _this7.handlerFilterClear //清除回调
          , filterDropdown: rows[1][index]["filterdropdown"],
          filterDropdownType: rows[1][index]["filterdropdowntype"] //下拉的条件类型为string,number
          , filterDropdownIncludeKeys: rows[1][index]["filterdropdownincludekeys"] //下拉条件按照指定的keys去显示
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
          , onFilterChange: _this7.handlerFilterChange //输入框回调
          , onFilterClear: _this7.handlerFilterClear //清除回调
          , filterDropdown: rows[1][index]["filterdropdown"],
          filterDropdownType: rows[1][index]["filterdropdowntype"] //下拉的条件类型为string,number
          , filterDropdownIncludeKeys: rows[1][index]["filterdropdownincludekeys"] //下拉条件按照指定的keys去显示
        });
      default:
        //不匹配类型默认文本输入
        return _react2["default"].createElement("div", null);
    }
  };

  this.onCopy = function (data, index, event) {
    if (_this7.props.onCopy) {
      _this7.props.onCopy(_extends(data, { col: index }), event);
    }
  };
};

TableHeader.propTypes = propTypes;
exports["default"] = TableHeader;
module.exports = exports["default"];