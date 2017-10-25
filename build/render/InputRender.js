"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _beeIcon = require("bee-icon");

var _beeIcon2 = _interopRequireDefault(_beeIcon);

var _beeFormControl = require("bee-form-control");

var _beeFormControl2 = _interopRequireDefault(_beeFormControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var InputRender = function (_Component) {
  _inherits(InputRender, _Component);

  function InputRender() {
    var _temp, _this, _ret;

    _classCallCheck(this, InputRender);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      value: _this.props.value,
      editable: false
    }, _this.handleChange = function (e) {
      var value = e;
      _this.setState({ value: value });
    }, _this.check = function () {
      _this.setState({ editable: false });
      if (_this.props.onChange) {
        _this.props.onChange(_this.state.value);
      }
    }, _this.edit = function () {
      _this.setState({ editable: true });
    }, _this.handleKeydown = function (event) {
      if (event.keyCode == 13) {
        _this.check();
      }
    }, _this.formatCurrency = function (money) {
      if (money && money != null && !!Number(money)) {
        money = String(money);
        var left = money.split(".")[0],
            right = money.split(".")[1];
        right = right ? right.length >= 2 ? "." + right.substr(0, 2) : "." + right + "0" : ".00";
        var temp = left.split("").reverse().join("").match(/(\d{1,3})/g);
        return (Number(money) < 0 ? "-" : "") + temp.join(",").split("").reverse().join("") + right;
      } else if (money === 0) {
        //注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
        return "0.00";
      } else {
        return "";
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  //货币的格式化方法


  InputRender.prototype.render = function render() {
    var _state = this.state,
        value = _state.value,
        editable = _state.editable;
    var _props = this.props,
        isclickTrigger = _props.isclickTrigger,
        format = _props.format;

    var cellContent = "";
    if (editable) {
      cellContent = isclickTrigger ? _react2["default"].createElement(
        "div",
        { className: "editable-cell-input-wrapper" },
        _react2["default"].createElement(_beeFormControl2["default"], {
          onChange: this.handleChange,
          onKeyDown: this.handleKeydown,
          onBlur: this.check,
          autoFocus: true,
          value: value
        })
      ) : _react2["default"].createElement(
        "div",
        { className: "editable-cell-input-wrapper" },
        _react2["default"].createElement(_beeFormControl2["default"], {
          value: value,
          onChange: this.handleChange,
          onKeyDown: this.handleKeydown
        }),
        _react2["default"].createElement(_beeIcon2["default"], {
          type: "uf-correct",
          className: "editable-cell-icon-check",
          onClick: this.check
        })
      );
    } else {
      if (format && format === "Currency") {
        value = this.formatCurrency(value);
      }
      cellContent = isclickTrigger ? _react2["default"].createElement(
        "div",
        { className: "editable-cell-text-wrapper", onClick: this.edit },
        value || " "
      ) : _react2["default"].createElement(
        "div",
        { className: "editable-cell-text-wrapper" },
        value || " ",
        _react2["default"].createElement(_beeIcon2["default"], {
          type: "uf-pencil",
          className: "editable-cell-icon",
          onClick: this.edit
        })
      );
    }
    return _react2["default"].createElement(
      "div",
      { className: "editable-cell" },
      cellContent
    );
  };

  return InputRender;
}(_react.Component);

exports["default"] = InputRender;
module.exports = exports["default"];