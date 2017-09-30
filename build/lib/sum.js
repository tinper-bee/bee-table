'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _src = require('../../src');

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

exports["default"] = Sum = function Sum(Table) {
    var SumTable = function (_React$Component) {
        _inherits(SumTable, _React$Component);

        function SumTable(props) {
            var _temp, _this;

            _classCallCheck(this, SumTable);

            (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call(this, props)), _this), _this.currentData = function (testTitle) {
                return _react2["default"].createElement(
                    'div',
                    null,
                    testTitle
                );
            }, _this.currentData2 = function () {
                data_2 = _this.state.data;
                var obj = {};
                if (data.isArray()) {
                    for (var i = 0; i < data_2.length; i++) {
                        for (var item in data[i]) {
                            if (obj[item] === 'undefined') {
                                obj[item] = data[i][item];
                            } else if (typeof data[i][item] == 'Number') {
                                obj[item] += data[i][item];
                            }
                        }
                    }
                }
                return _react2["default"].createElement(Table, {
                    showHeader: false,
                    columns: _this.props.columns,
                    data: obj,
                    heji: true
                });
            }, _temp), _this.state = {
                data: _this.props.data
            };
            return _this;
        }

        SumTable.prototype.render = function render() {
            var a = this.currentData;
            var b = this.currentData2;
            return _react2["default"].createElement(Table, {
                columns: this.props.columns,
                data: this.state.data,
                heji: true,
                title: a,
                footer: b
            });
        };

        return SumTable;
    }(_react2["default"].Component);

    return SumTable;
};

module.exports = exports['default'];