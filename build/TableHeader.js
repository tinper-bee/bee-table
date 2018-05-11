'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

// import ResizableTh from './ResizableTh';

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

    _this.onDragStart = function (event, data) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("Text", data.key);
      _this.currentObj = data;
      event.dataTransfer.setDragImage(event.target, 0, 0);
      _this.props.onDragStart(event, data);
    };

    _this.onDragOver = function (event, data) {
      if (_this.currentObj.key == data.key) return;
      event.preventDefault();
      _this.props.onDragOver(event, data);
    };

    _this.onDragEnter = function (event, data) {
      if (_this.currentObj.key == data.key) return;
      _this.props.onDragEnter(event, data);
    };

    _this.onDrop = function (event, data) {
      if (_this.currentObj.key == data.key) return;
      _this.props.onDrop(event, data);
    };

    _this.onMouseMove = function (event, data) {
      if (_this.border) return;
      var clsPrefix = _this.props.clsPrefix;

      if (_this.border) {
        var x = event.pageX - _this.drag.initPageLeftX + _this.drag.initLeft;
      } else {
        event.target.className = clsPrefix + '-thead-th-drag-gap th-drag-gap-hover';
      }
    };

    _this.onMouseOut = function (event, data) {
      if (_this.border) return;
      var clsPrefix = _this.props.clsPrefix;

      event.target.className = clsPrefix + '-thead-th-drag-gap th-drag-gap';
    };

    _this.onMouseDown = function (event, data) {
      _this.border = true;
      var clsPrefix = _this.props.clsPrefix;

      event.target.className = clsPrefix + '-thead-th-drag-gap th-drag-gap-hover';

      _this.drag.initPageLeftX = event.pageX;
      _this.drag.initLeft = (0, _utils.tryParseInt)(event.target.style.left);
      _this.drag.x = _this.drag.initLeft;
    };

    _this.onMouseUp = function (event, data) {
      _this.border = false;
      var clsPrefix = _this.props.clsPrefix;

      event.target.className = clsPrefix + '-thead-th-drag-gap th-drag-gap';
      var endx = event.pageX - _this.dragBorderObj.initPageLeftX;
      // event.target.offsetWidth
    };

    _this.currentObj = null;
    _this.border = false;
    _this.drag = {
      initPageLeftX: 0,
      initLeft: 0,
      x: 0
    };
    _this.state = {
      border: false
    };
    return _this;
  }

  TableHeader.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !(0, _shallowequal2["default"])(nextProps, this.props);
  };

  TableHeader.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        clsPrefix = _props.clsPrefix,
        rowStyle = _props.rowStyle,
        onDragStart = _props.onDragStart,
        onDragOver = _props.onDragOver,
        onDrop = _props.onDrop,
        draggable = _props.draggable,
        rows = _props.rows,
        onMouseDown = _props.onMouseDown,
        onMouseMove = _props.onMouseMove,
        onMouseUp = _props.onMouseUp,
        dragborder = _props.dragborder,
        onMouseOut = _props.onMouseOut;

    return _react2["default"].createElement(
      'thead',
      { className: clsPrefix + '-thead' },
      rows.map(function (row, index) {
        return _react2["default"].createElement(
          'tr',
          { key: index, style: rowStyle },
          row.map(function (da, i) {
            var thHover = da.drgHover ? ' ' + clsPrefix + '-thead th-drag-hover' : "";
            delete da.drgHover;
            if (draggable) {
              return _react2["default"].createElement('th', _extends({}, da, {
                onDragStart: function onDragStart(event) {
                  _this2.onDragStart(event, da);
                },
                onDragOver: function onDragOver(event) {
                  _this2.onDragOver(event, da);
                },
                onDrop: function onDrop(event) {
                  _this2.onDrop(event, da);
                },
                onDragEnter: function onDragEnter(event) {
                  _this2.onDragEnter(event, da);
                },
                draggable: draggable,
                className: da.className + ' ' + clsPrefix + '-thead th-drag ' + thHover,
                key: da.key }));
            } else if (dragborder) {
              return _react2["default"].createElement(
                'th',
                {
                  // onDragStart={(event)=>{this.onDragGapStart(event,da)}} 
                  // onDragOver={(event)=>{this.onDragGapOver(event,da)}}
                  // onDrop={(event)=>{this.onDropGap(event,da)}} 
                  // onDragEnter={(event)=>{this.onDragGapEnter(event,da)}}

                  // onMouseDown={(event)=>{onMouseDown(event,da)}}

                  // onMouseUp={(event)=>{onMouseUp(event,da)}}
                  // {...da}
                  className: da.className + ' ' + clsPrefix + '-thead-th ',
                  key: i },
                da.children,
                _react2["default"].createElement('div', { ref: function ref(el) {
                    return _this2.gap = el;
                  },
                  onMouseMove: function onMouseMove(event) {
                    _this2.onMouseMove(event, da);
                  },
                  onMouseOut: function onMouseOut(event) {
                    _this2.onMouseOut(event, da);
                  },
                  onMouseDown: function onMouseDown(event) {
                    _this2.onMouseDown(event, da);
                  },
                  onMouseUp: function onMouseUp(event) {
                    _this2.onMouseUp(event, da);
                  },
                  className: clsPrefix + '-thead-th-drag-gap ' })
              );
            } else {
              var th = da.onClick ? _react2["default"].createElement('th', _extends({}, da, { key: i, onClick: function onClick(event) {
                  da.onClick(da, event);
                } })) : _react2["default"].createElement('th', _extends({}, da, { key: i }));
              return th;
            }
          })
        );
      })
    );
  };

  return TableHeader;
}(_react.Component);

;

TableHeader.propTypes = propTypes;

exports["default"] = TableHeader;
module.exports = exports['default'];