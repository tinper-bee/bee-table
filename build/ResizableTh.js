"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _beeIcon = require("bee-icon");

var _beeIcon2 = _interopRequireDefault(_beeIcon);

var _beeCheckbox = require("bee-checkbox");

var _beeCheckbox2 = _interopRequireDefault(_beeCheckbox);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _beePopover = require("bee-popover");

var _beePopover2 = _interopRequireDefault(_beePopover);

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var ResizableTh = function (_Component) {
  _inherits(ResizableTh, _Component);

  function ResizableTh(props) {
    _classCallCheck(this, ResizableTh);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onMouseDown = function (event, data) {
      _this.mouse = true;
      _this.dragBorderObj.startScreenX = event.screenX;
    };

    _this.onMouseMove = function (event, data) {
      if (!_this.mouse) return;
      var endx = event.screenX - _this.dragBorderObj.startScreenX;
      var _columns = _this.state.columns;

      var columns = [];
      _extends(columns, _columns);
      // let currentIndex = columns.findIndex((_da,i)=>_da.key == data.key);
      // currentIndex = currentIndex==0?currentIndex:(currentIndex-1);

      var currObj = columns.find(function (_da, i) {
        return _da.key == data.key;
      });
      if (!currObj) return;
      currObj.width = currObj.width ? currObj.width + endx : endx;
      _this.setState({
        columns: columns
      });
    };

    _this.getTarget = function (evt) {
      return evt.target || evt.srcElement;
    };

    _this.onMouseUp = function (event, data) {
      var endx = event.screenX - _this.dragBorderObj.startScreenX;
      _this.mouse = false;
    };

    _this.state = {
      width: 0
    };
    return _this;
  }

  ResizableTh.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.columns != this.props.columns) {}
  };

  ResizableTh.prototype.render = function render() {
    var className = this.props.className;


    return _react2["default"].createElement("th", _extends({}, this.props, { className: className + " u-table-drag-border"
      // onDragStart={this.onDragStart} onDragOver={this.onDragOver} onDrop={this.onDrop} 
      // onDragEnter={this.onDragEnter}
      // draggable={draggable}
      , onMouseDown: this.onMouseDown,
      onMouseMove: this.onMouseMove,
      onMouseUp: this.onMouseUp
    }));
  };

  return ResizableTh;
}(_react.Component);