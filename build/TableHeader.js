"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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

var grap = 16; //偏移数值

var TableHeader = function (_Component) {
  _inherits(TableHeader, _Component);

  function TableHeader(props) {
    _classCallCheck(this, TableHeader);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onDragStart = function (event, data) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("Text", data.key);
      _this.currentObj = data;
      event.dataTransfer.setDragImage(event.target, 0, 0);
      _this.props.onDragStart(event, data);
    };

    _this.onDragOver = function (event, data) {
      var dragAbleOrBordStart = _this.state.dragAbleOrBordStart;

      _this.setState({
        dragAbleOrBordStart: ""
      });
      if (!_this.currentObj || _this.currentObj.key == data.key) return;
      event.preventDefault();
      _this.props.onDragOver(event, data);
    };

    _this.onDragEnter = function (event, data) {
      if (!_this.currentObj || _this.currentObj.key == data.key) return;
      _this.props.onDragEnter(event, data);
    };

    _this.onDrop = function (event, data) {
      if (!_this.currentObj || _this.currentObj.key == data.key) return;
      _this.props.onDrop(event, data);
    };

    _this.onMouseOver = function (event, data) {
      //如果是固定列没有拖拽功能
      if (_this.border || data.fixed) return;
      var clsPrefix = _this.props.clsPrefix;

      if (event.target.id != 'th-online') {
        event.target.className = clsPrefix + "-thead-th-drag-gap th-drag-gap-hover";
      }
    };

    _this.ableOnMouseMove = function (event, data) {
      var dragAbleOrBord = _this.state.dragAbleOrBord;

      if (dragAbleOrBord === "borderStart" || dragAbleOrBord === "ableStart") return;
      if (dragAbleOrBord === "able") return;
      _this.setState({
        dragAbleOrBord: "able"
      });
    };

    _this.onMouseMove = function (event, data) {
      var dragAbleOrBord = _this.state.dragAbleOrBord;

      if (dragAbleOrBord === "borderStart" || dragAbleOrBord === "ableStart") return;
      if (dragAbleOrBord != "border") {
        _this.setState({
          dragAbleOrBord: "border"
        });
      }
      //如果是固定列没有拖拽功能
      if (_this.border || data.fixed) return;
      // const {clsPrefix} = this.props;
      // event.target.className = `${clsPrefix}-thead-th-drag-gap th-drag-gap-hover`;
    };

    _this.onMouseOut = function (event, data) {
      if (_this.border) return;
      var clsPrefix = _this.props.clsPrefix;

      if (event.target.id != 'th-online') {
        event.target.className = clsPrefix + "-thead-th-drag-gap th-drag-gap";
      }
    };

    _this.onMouseDown = function (event, data) {
      var _this$state = _this.state,
          dragAbleOrBord = _this$state.dragAbleOrBord,
          dragAbleOrBordStart = _this$state.dragAbleOrBordStart;

      _this.setState({
        dragAbleOrBordStart: dragAbleOrBord === "border" ? "borderStart" : ""
      });
      // console.log("-改变宽-----度--",dragAbleOrBordStart);
      _this.border = true;
      var _this$props = _this.props,
          clsPrefix = _this$props.clsPrefix,
          contentTable = _this$props.contentTable;

      _this.drag.initPageLeftX = event.pageX;
      _this.drag.initLeft = (0, _utils.tryParseInt)(event.target.style.left);
      _this.drag.x = _this.drag.initLeft;
      _this.drag.currIndex = _this.props.rows[0].findIndex(function (da) {
        return da.key == data.key;
      });

      var contentTableDom = document.getElementById("u-table-drag-thead-" + _this.theadKey).parentNode;
      var styleWidth = contentTableDom.style.width;
      if (styleWidth && (typeof styleWidth == "number" || styleWidth.includes("px"))) {
        _this.contentTableWidth = parseInt(styleWidth);
      } else {
        _this.contentTableWidth = parseInt(contentTableDom.scrollWidth);
      }
      var dragColWidth = _this.drag.data[_this.drag.currIndex].width;
      if (typeof dragColWidth == "string" && dragColWidth.indexOf("%") > -1) {
        _this.drag.width = _this.contentTableWidth * parseInt(dragColWidth) / 100;
      } else {
        _this.drag.width = parseInt(_this.drag.data[_this.drag.currIndex].width);
      }
    };

    _this.onMouseUp = function (event, data) {
      _this.setState({
        dragAbleOrBordStart: ""
      });
      _this.border = false;
      var clsPrefix = _this.props.clsPrefix;

      event.target.className = clsPrefix + "-thead-th-drag-gap th-drag-gap";
    };

    _this.onThMouseUp = function (event, data) {
      _this.border = false;
      var _this$props2 = _this.props,
          clsPrefix = _this$props2.clsPrefix,
          rows = _this$props2.rows,
          columns = _this$props2.columns;

      var eventDom = event.target;
      var optDom = void 0;
      if (eventDom.classList.contains(".th-drag-gap-hover")) {
        optDom = eventDom;
      } else {
        optDom = eventDom.querySelector("." + clsPrefix + "-thead-th-drag-gap");
      }
      if (optDom) {
        optDom.classList.remove("th-drag-gap-hover");
        optDom.classList.add("th-drag-gap");
      }
      // columns[this.drag.currIndex].width = data.width;
      //宽度拖拽后，增加回调函数，外部可以记录宽度
      if (typeof _this.props.afterDragColWidth == "function" && rows && rows[0] && _this.drag.currIndex) {
        _this.props.afterDragColWidth(rows[0], _this.drag.currIndex);
      }
    };

    _this.onThMouseMove = function (event, data) {
      if (!_this.border) return;
      //固定表头拖拽

      var _this$props3 = _this.props,
          dragborderKey = _this$props3.dragborderKey,
          contentTable = _this$props3.contentTable,
          headerScroll = _this$props3.headerScroll,
          contentDomWidth = _this$props3.contentDomWidth,
          scrollbarWidth = _this$props3.scrollbarWidth,
          bordered = _this$props3.bordered,
          rows = _this$props3.rows;

      var x = event.pageX - _this.drag.initPageLeftX + _this.drag.initLeft - 0;
      var contentTableDom = document.getElementById("u-table-drag-thead-" + _this.theadKey).parentNode;

      if (!_this.contentTableWidth) {
        var styleWidth = contentTableDom.style.width;
        if (styleWidth && (typeof styleWidth == "number" || styleWidth.includes("px"))) {
          _this.contentTableWidth = parseInt(styleWidth);
        } else {
          _this.contentTableWidth = parseInt(contentTableDom.scrollWidth);
        }
      }
      var newTableWidth = _this.contentTableWidth + x;
      var newWidth = _this.drag.width + x;
      if (newWidth < _this.props.minColumnWidth) {
        //清楚样式
        var moveDom = event.target.querySelector(".th-drag-gap-hover");
        moveDom && moveDom.classList.remove("th-drag-gap-hover");
        // event.target.classList.remove('th-drag-gap-hover');
        return;
      }
      //设置hiden的left
      //"u-table-drag-hide-table"
      var currentHideDom = document.getElementById("u-table-drag-hide-table-" + dragborderKey).getElementsByTagName("div")[_this.drag.currIndex];
      currentHideDom.style.left = _this.drag.initPageLeftX + x - grap + "px";

      //获取最小宽度，不让拖动
      // let minWidth = 0;
      // for(let i=0;i<=this.drag.currIndex;i++){
      //   minWidth += this.drag.data[i].width;
      // }

      // //判断最小值后在赋值 todo
      // let currLeft = this.drag.initPageLeftX+x-grap;
      // console.log("currLeft minWidth ",currLeft + " "+minWidth);
      // if(currLeft <= minWidth){
      //   return;
      // }
      // currentHideDom.style.left =  currLeft+"px";

      //设置当前的宽度
      var currentData = _this.drag.data[_this.drag.currIndex];
      currentData.width = newWidth;
      var currentDom = document.getElementById("u-table-drag-thead-" + _this.theadKey).getElementsByTagName("th")[_this.drag.currIndex];
      currentDom.style.width = newWidth + "px";
      // this.contentTableWidth = newTableWidth;
      contentTableDom.style.width = newTableWidth + "px";
      // data.width = newWidth;
      rows[0][_this.drag.currIndex].width = newWidth;
      _this.drag.x = x;
      var contentColDomArr = contentTableDom.querySelectorAll("colgroup col");
      contentColDomArr[_this.drag.currIndex].style.width = newWidth + "px";
      //固定表头时，表头和表体分开，拖拽时表体的宽度也需要一起联动
      var siblingDom = contentTableDom.parentNode.nextElementSibling;
      if (siblingDom) {
        var bodyTableDom = siblingDom.querySelector("table");
        //2、是的话将表头对应的表格的宽度给表体对应的表格的宽度
        bodyTableDom.style.width = newTableWidth + "px";
        //3、对应的col也要跟这变
        var colDomArr = bodyTableDom.querySelectorAll("colgroup col");
        colDomArr[_this.drag.currIndex].style.width = newWidth + "px";
        //4、设置overflow属性
      }

      //表头需要显示滚动条时，需兼容含有固定列
      if (headerScroll) {

        var showScroll = contentDomWidth - newTableWidth - scrollbarWidth;
        if (bordered) {
          showScroll = showScroll - 1;
        }
        var fixedLeftTable = contentTable.querySelector('.u-table-fixed-left .u-table-header');
        var fixedRightTable = contentTable.querySelector('.u-table-fixed-rigth .u-table-header');
        var contentTableHeader = contentTable.querySelector('.u-table-scroll .u-table-header');
        if (showScroll < 0) {
          //找到固定列表格，设置表头的marginBottom值为scrollbarWidth;
          contentTableHeader.style.overflowX = 'scroll';
          fixedLeftTable && (fixedLeftTable.style.marginBottom = scrollbarWidth + "px");
          fixedRightTable && (fixedRightTable.style.marginBottom = scrollbarWidth + "px");
        } else {
          contentTableHeader.style.overflowX = 'hidden';
          fixedLeftTable && (fixedLeftTable.style.marginBottom = '0px');
          fixedRightTable && (fixedRightTable.style.marginBottom = '0px');
        }
      }
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
      var _this$props4 = _this.props,
          clsPrefix = _this$props4.clsPrefix,
          rows = _this$props4.rows,
          filterDelay = _this$props4.filterDelay,
          locale = _this$props4.locale;

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
    _this.state = {
      border: false,
      dragAbleOrBord: props.draggable ? "able" : "", //border 拖拽列宽，able 交换列,
      dragAbleOrBordStart: "" // borderStart 开始拖拽宽度 ableStart 开始交换列

      // draggable:props.draggable?props.draggable:false,
    };
    //拖拽宽度处理
    if (!props.dragborder) return _possibleConstructorReturn(_this);
    _this.border = false;
    _this.theadKey = new Date().getTime();
    _this.drag = {
      initPageLeftX: 0,
      initLeft: 0,
      x: 0,
      width: 0
    };
    // let _da = {};
    // Object.assign(_da,this.props.rows[0]);
    // this.drag.data = JSON.parse(JSON.stringify(this.props.rows[0]));
    // let a = this.props.rows[0];

    var _row = [];
    _this.props.rows[0] && _this.props.rows[0].forEach(function (item) {
      var newItem = item.key != "checkbox" ? (0, _utils.ObjectAssign)(item) : item;
      _row.push(newItem);
    });
    _this.drag.data = _row; //JSON.parse(JSON.stringify(this.props.rows[0]));
    return _this;
  }

  TableHeader.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.draggable != nextProps.draggable) {
      this.setState({
        dragAbleOrBord: nextProps.draggable ? "able" : "" //border 拖拽列宽，able 交换列
        // draggable:nextProps.draggable,
      });
    }

    if (this.props.dragborder != nextProps.dragborder) {
      this.setState({
        dragAbleOrBord: nextProps.dragborder ? "border" : "" //border 拖拽列宽，able 交换列
      });
    }
  };

  // shouldComponentUpdate(nextProps) {
  //   return !shallowequal(nextProps, this.props);
  // }

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

    var _state = this.state,
        dragAbleOrBord = _state.dragAbleOrBord,
        dragAbleOrBordStart = _state.dragAbleOrBordStart;
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
      _extends({ className: clsPrefix + "-thead" }, attr),
      rows.map(function (row, index) {
        return _react2["default"].createElement(
          "tr",
          { key: index, style: rowStyle, className: filterable && index == rows.length - 1 ? 'filterable' : '' },
          row.map(function (da, i, arr) {
            var thHover = da.drgHover ? " " + clsPrefix + "-thead th-drag-hover" : "";
            delete da.drgHover;
            var fixedStyle = "";
            var canDotDrag = "";
            if (!fixed && da.fixed) {
              fixedStyle = clsPrefix + "-row-fixed-columns-in-body";
            }

            if (lastShowIndex == i) {
              canDotDrag = "th-can-not-drag";
            }
            if (filterable && index == rows.length - 1) {
              da.children = _this2.filterRenderType(da["filtertype"], da.dataindex, i);
              delete da.filterdropdownfocus;
            }

            var thAbleObj = {},
                thBorObj = {},
                thDefaultObj = {},
                thLineObj = {};
            var thClassName = "" + da.className;
            if (draggable || dragborder) {
              if (draggable && dragAbleOrBordStart != "borderStart") {
                thAbleObj = _extends({}, da, {
                  onDragStart: function onDragStart(e) {
                    _this2.onDragStart(e, da);
                  },
                  onDragOver: function onDragOver(e) {
                    _this2.onDragOver(e, da);
                  },
                  onDrop: function onDrop(e) {
                    _this2.onDrop(e, da);
                  },
                  onDragEnter: function onDragEnter(e) {
                    _this2.onDragEnter(e, da);
                  },
                  onMouseMove: function onMouseMove(e) {
                    _this2.ableOnMouseMove(e, da);
                  },
                  onMouseDown: function onMouseDown(e) {
                    //避免表头其他元素对其影响
                    var filterDom = contentTable.querySelector('.filterable');
                    //是否是过滤行元素，是的话不触发
                    var isFilterDom = filterDom ? filterDom.contains(e.target) : false;

                    if (e.target.classList.contains('uf') || isFilterDom) {
                      return;
                    }
                    if (e.target.classList.contains('uf')) {
                      return;
                    }
                    var _state2 = _this2.state,
                        dragAbleOrBord = _state2.dragAbleOrBord,
                        dragAbleOrBordStart = _state2.dragAbleOrBordStart;

                    _this2.setState({
                      dragAbleOrBordStart: dragAbleOrBord === "able" ? "ableStart" : ""
                    });
                  },
                  draggable: draggable,
                  // className:thObj.className+`${clsPrefix}-thead th-drag ${thHover}`,
                  key: da.key
                });
                thClassName += clsPrefix + "-thead th-drag " + thHover + " ";
              }
              // if (dragborder && dragAbleOrBord === "border") {
              if (dragborder && dragAbleOrBordStart != "ableStart") {
                thBorObj.style = { 'width': da.width
                  // thObj.className= thObj.className+`${clsPrefix}-thead-th ${canDotDrag}`,
                };thBorObj.onMouseMove = function (e) {
                  if (draggable) {
                    _this2.ableOnMouseMove(e, da);
                  }
                  _this2.onThMouseMove(e, da);
                };
                thBorObj.onMouseUp = function (e) {
                  _this2.onThMouseUp(e, da);
                };

                thClassName += clsPrefix + "-thead-th " + canDotDrag;
                thBorObj.style = { width: da.width
                  // key:i
                };
              }
              // thObj.className = thObj.className+`${fixedStyle}`;
              thClassName += "" + fixedStyle;
              if (!da.fixed) {
                thLineObj = {
                  onMouseMove: function onMouseMove(e) {
                    e.stopPropagation();_this2.onMouseMove(e, da);
                  },
                  onMouseOut: function onMouseOut(e) {
                    _this2.onMouseOut(e, da);
                  },
                  onMouseDown: function onMouseDown(e) {
                    e.stopPropagation();_this2.onMouseDown(e, da);
                  },
                  onMouseUp: function onMouseUp(e) {
                    _this2.onMouseUp(e, da);
                  },
                  onMouseOver: function onMouseOver(e) {
                    _this2.onMouseOver(e, da);
                  }
                  // className:`${clsPrefix}-thead-th-drag-gap th-drag-gap`,
                };
                if (dragAbleOrBordStart !== 'ableStart') {
                  thLineObj.className = clsPrefix + "-thead-th-drag-gap th-drag-gap";
                }
              }
              return _react2["default"].createElement(
                "th",
                _extends({ key: Math.random() + new Date().getTime() }, thAbleObj, thBorObj, { className: thClassName }),
                da.children,
                da.fixed ? "" : _react2["default"].createElement(
                  "div",
                  _extends({ ref: function ref(el) {
                      return _this2.gap = el;
                    } }, thLineObj),
                  _react2["default"].createElement("div", { id: "th-online", className: "online" })
                )
              );
            } else {
              thDefaultObj = _extends({}, da, {
                className: da.className + " " + fixedStyle,
                key: i
              });
              da.onClick ? thDefaultObj.onClick = function (e) {
                da.onClick(da, e);
              } : "";
              return _react2["default"].createElement("th", thDefaultObj);
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