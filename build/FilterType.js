'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _beeFormControl = require('bee-form-control');

var _beeFormControl2 = _interopRequireDefault(_beeFormControl);

var _beeSelect = require('bee-select');

var _beeSelect2 = _interopRequireDefault(_beeSelect);

var _beeInputNumber = require('bee-input-number');

var _beeInputNumber2 = _interopRequireDefault(_beeInputNumber);

var _beeDatepicker = require('bee-datepicker');

var _beeDatepicker2 = _interopRequireDefault(_beeDatepicker);

var _FilterDropDown = require('./FilterDropDown');

var _FilterDropDown2 = _interopRequireDefault(_FilterDropDown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    filterDropdown: _propTypes2["default"].string
};

var FilterType = function (_Component) {
    _inherits(FilterType, _Component);

    function FilterType() {
        _classCallCheck(this, FilterType);

        var _this = _possibleConstructorReturn(this, _Component.call(this));

        _this.clearText = function () {
            _this.setState({
                text: ""
            });
            var onChange = _this.props.onChange;

            onChange && onChange("");
        };

        _this.changeNumber = function (number) {
            var onChange = _this.props.onChange;

            onChange && onChange(number);
            _this.setState({
                number: number
            });
        };

        _this.clearNumber = function () {
            var onChange = _this.props.onChange;

            onChange && onChange("");
            _this.setState({
                number: ""
            });
        };

        _this.changeText = function (eve) {
            _this.setState({
                text: eve
            });
        };

        _this.changeTextCall = function (eve) {
            var onChange = _this.props.onChange;

            if (eve.keyCode == 13) {
                onChange(eve.target.value);
            }
        };

        _this.changeTextCallBlur = function (val) {
            var onChange = _this.props.onChange;

            onChange && onChange(val);
        };

        _this.changeSelect = function (val) {
            var onChange = _this.props.onChange;

            if (onChange) {
                onChange(val);
                _this.setState({
                    selectValue: val
                });
            }
        };

        _this.clearSelectValue = function () {
            _this.setState({
                selectValue: ""
            }, function () {
                _this.changeSelect("");
            });
        };

        _this.clearDateValue = function () {
            _this.setState({
                dateValue: ""
            }, function () {
                _this.changeDate("");
            });
        };

        _this.changeDate = function (val) {
            var onChange = _this.props.onChange;

            if (onChange) {
                onChange(val);
                _this.setState({
                    dateValue: val,
                    open: false
                });
            }
        };

        _this.renderControl = function (rendertype) {
            var _this$props = _this.props,
                filterDropdown = _this$props.filterDropdown,
                filterDropdownType = _this$props.filterDropdownType,
                className = _this$props.className,
                onChange = _this$props.onChange,
                onSelectDropdown = _this$props.onSelectDropdown,
                clsPrefix = _this$props.clsPrefix,
                locale = _this$props.locale;

            switch (rendertype) {
                case 'text':
                    return _react2["default"].createElement(
                        'div',
                        { className: clsPrefix + ' filter-wrap' },
                        _react2["default"].createElement(_beeFormControl2["default"], {
                            ref: function ref(el) {
                                return _this.text = el;
                            },
                            value: _this.state.text,
                            className: className,
                            onChange: _this.changeText,
                            onKeyDown: _this.changeTextCall,
                            onBlur: _this.changeTextCallBlur
                        }),
                        _react2["default"].createElement(_FilterDropDown2["default"], {
                            locale: locale,
                            onSelectDropdown: onSelectDropdown,
                            onClickClear: _this.clearText,
                            isShowClear: _this.state.text,
                            isShowCondition: filterDropdown,
                            filterDropdownType: filterDropdownType
                        })
                    );
                case 'number':
                    return _react2["default"].createElement(
                        'div',
                        { className: clsPrefix + ' filter-wrap' },
                        _react2["default"].createElement(_beeInputNumber2["default"], {
                            className: className,
                            value: _this.state.number,
                            onChange: _this.changeNumber
                        }),
                        _react2["default"].createElement(_FilterDropDown2["default"], {
                            locale: locale,
                            onSelectDropdown: onSelectDropdown,
                            onClickClear: _this.clearNumber,
                            isShowClear: _this.state.number,
                            isShowCondition: filterDropdown,
                            filterDropdownType: filterDropdownType
                        })
                    );
                case 'dropdown':
                    return _react2["default"].createElement(
                        'div',
                        { className: clsPrefix + ' filter-wrap' },
                        _react2["default"].createElement(_beeSelect2["default"], _extends({}, _this.props, {
                            value: _this.state.selectValue,
                            onChange: _this.changeSelect
                        })),
                        _react2["default"].createElement(_FilterDropDown2["default"], {
                            locale: locale,
                            onSelectDropdown: onSelectDropdown,
                            onClickClear: _this.clearSelectValue,
                            isShowCondition: filterDropdown,
                            isShowClear: _this.state.selectValue
                        })
                    );
                case 'date':
                    return _react2["default"].createElement(
                        'div',
                        { className: clsPrefix + ' filter-wrap' },
                        _react2["default"].createElement(_beeDatepicker2["default"], _extends({}, _this.props, {
                            value: _this.state.dateValue,
                            onChange: _this.changeDate,
                            open: _this.state.open
                        })),
                        filterDropdown == 'show' && _react2["default"].createElement(_FilterDropDown2["default"], {
                            locale: locale,
                            onSelectDropdown: onSelectDropdown,
                            onClickClear: _this.clearDateValue,
                            isShowCondition: filterDropdown,
                            isShowClear: _this.state.dateValue
                        })
                    );
                case 'bool':
                    return _react2["default"].createElement(
                        'div',
                        { className: clsPrefix + ' filter-wrap' },
                        _react2["default"].createElement(Switch, {
                            className: className,
                            onChange: onChange
                        }),
                        filterDropdown == 'show' && _react2["default"].createElement(_FilterDropDown2["default"], { locale: locale,
                            onSelectDropdown: onSelectDropdown
                        })
                    );
                default:
                    return _react2["default"].createElement('div', null);
            }
        };

        _this.state = {
            text: "",
            selectValue: "",
            dateValue: "",
            open: false,
            number: 0
        };
        return _this;
    }
    //清除文本

    //设置数值

    //清除数值

    //设置文本

    //回车执行函数

    //失去焦点后执行函数

    //设置下拉值

    //清除下拉值

    //清除日期值

    //设置日期值

    //组件渲染
    /**
     * 根据不同的类型生成对应的组件类型包含一些参数的适应
     *
     * @param {*} rendertype 参数类型，包括['text','dropdown','date','daterange','number']
     * @returns
     */


    FilterType.prototype.render = function render() {
        var rendertype = this.props.rendertype;

        return this.renderControl(rendertype);
    };

    return FilterType;
}(_react.Component);

FilterType.propTypes = propTypes;
FilterType.defaultProps = {
    filterDropdown: 'show'
};
exports["default"] = FilterType;
module.exports = exports['default'];