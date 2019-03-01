'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _beeDropdown = require('bee-dropdown');

var _beeDropdown2 = _interopRequireDefault(_beeDropdown);

var _beeMenus = require('bee-menus');

var _beeMenus2 = _interopRequireDefault(_beeMenus);

var _beeButton = require('bee-button');

var _beeButton2 = _interopRequireDefault(_beeButton);

var _beeIcon = require('bee-icon');

var _beeIcon2 = _interopRequireDefault(_beeIcon);

var _i18n = require('./lib/i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _tool = require('bee-locale/build/tool');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 过滤行功能内的下拉条件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Item = _beeMenus2["default"].Item;

var FilterDropDown = function (_Component) {
    _inherits(FilterDropDown, _Component);

    function FilterDropDown() {
        _classCallCheck(this, FilterDropDown);

        var _this = _possibleConstructorReturn(this, _Component.call(this));

        _this.onSelectDropdown = function (item) {
            var _this$props = _this.props,
                onSelectDropdown = _this$props.onSelectDropdown,
                filterDropdownType = _this$props.filterDropdownType;

            if (onSelectDropdown) {
                if (filterDropdownType == 'string') {
                    _this.setState({
                        selectValue: [item.key]
                    }, function () {
                        onSelectDropdown(item);
                    });
                }
                if (filterDropdownType == 'number') {
                    _this.setState({
                        selectNumberValue: [item.key]
                    }, function () {
                        onSelectDropdown(item);
                    });
                }
            }
        };

        _this.onClickClear = function () {
            var onClickClear = _this.props.onClickClear;

            if (onClickClear) {
                _this.setState({
                    // selectValue: [],
                    // selectNumberValue: []
                }, function () {
                    onClickClear();
                });
            }
        };

        _this.getMenu = function () {
            var _this$state = _this.state,
                selectValue = _this$state.selectValue,
                selectNumberValue = _this$state.selectNumberValue;
            var _this$props2 = _this.props,
                filterDropdownType = _this$props2.filterDropdownType,
                filterDropdownIncludeKeys = _this$props2.filterDropdownIncludeKeys;

            var locale = (0, _tool.getComponentLocale)(_this.props, _this.context, 'Table', function () {
                return _i18n2["default"];
            });
            var stringEnum = {
                LIKE: 'include',
                ULIKE: 'exclusive',
                EQ: 'equal',
                UEQ: 'unequal',
                START: 'begin',
                END: 'end'
            };
            var numberEnum = {
                GT: 'greater_than',
                GTEQ: 'great_than_equal_to',
                LT: 'less_than',
                LTEQ: 'less_than_equal_to',
                EQ: 'be_equal_to',
                UEQ: 'not_equal_to'
            };
            if (filterDropdownIncludeKeys != undefined) {
                switch (filterDropdownType) {
                    case 'string':
                        return _react2["default"].createElement(
                            _beeMenus2["default"],
                            {
                                onSelect: _this.onSelectDropdown,
                                selectedKeys: selectValue
                            },
                            filterDropdownIncludeKeys.map(function (item) {
                                return _react2["default"].createElement(
                                    Item,
                                    { key: item },
                                    locale[stringEnum[item]]
                                );
                            })
                        );
                    case 'number':
                        return _react2["default"].createElement(
                            _beeMenus2["default"],
                            {
                                onSelect: _this.onSelectDropdown,
                                selectedKeys: selectNumberValue
                            },
                            filterDropdownIncludeKeys.map(function (item) {
                                return _react2["default"].createElement(
                                    Item,
                                    { key: item },
                                    locale[numberEnum[item]]
                                );
                            })
                        );
                    default:
                        return _react2["default"].createElement('div', null);
                }
            } else {
                switch (filterDropdownType) {
                    case 'string':
                        return _react2["default"].createElement(
                            _beeMenus2["default"],
                            {
                                onSelect: _this.onSelectDropdown,
                                selectedKeys: selectValue
                            },
                            _react2["default"].createElement(
                                Item,
                                { key: 'LIKE' },
                                locale['include']
                            ),
                            _react2["default"].createElement(
                                Item,
                                { key: 'ULIKE' },
                                locale['exclusive']
                            ),
                            _react2["default"].createElement(
                                Item,
                                { key: 'EQ' },
                                locale['equal']
                            ),
                            _react2["default"].createElement(
                                Item,
                                { key: 'UEQ' },
                                locale['unequal']
                            ),
                            _react2["default"].createElement(
                                Item,
                                { key: 'RLIKE' },
                                locale['begin']
                            ),
                            _react2["default"].createElement(
                                Item,
                                { key: 'LLIKE' },
                                locale['end']
                            )
                        );
                    case 'number':
                        return _react2["default"].createElement(
                            _beeMenus2["default"],
                            {
                                onSelect: _this.onSelectDropdown,
                                selectedKeys: selectNumberValue
                            },
                            _react2["default"].createElement(
                                Item,
                                { key: 'GT' },
                                locale['greater_than']
                            ),
                            _react2["default"].createElement(
                                Item,
                                { key: 'GTEQ' },
                                locale['great_than_equal_to']
                            ),
                            _react2["default"].createElement(
                                Item,
                                { key: 'LT' },
                                locale['less_than']
                            ),
                            _react2["default"].createElement(
                                Item,
                                { key: 'LTEQ' },
                                locale['less_than_equal_to']
                            ),
                            _react2["default"].createElement(
                                Item,
                                { key: 'EQ' },
                                locale['be_equal_to']
                            ),
                            _react2["default"].createElement(
                                Item,
                                { key: 'UEQ' },
                                locale['not_equal_to']
                            )
                        );
                    default:
                        return _react2["default"].createElement('div', null);
                }
            }
        };

        _this.state = {
            selectValue: ['LIKE'],
            selectNumberValue: ['EQ']
        };
        return _this;
    }
    /**
     * 点击下拉菜单
     *
     * @param {*} s 选中的selectRecord
     */


    /**
     * 清除事件
     *
     */


    /**
     * 根据props来获得指定的Menu,分为String和Number
     *
     * @returns JSX Menu
     */


    FilterDropDown.prototype.render = function render() {
        var isShowCondition = this.props.isShowCondition;


        return _react2["default"].createElement(
            'div',
            { className: 'filter-btns' },
            isShowCondition == 'show' && _react2["default"].createElement(
                _beeDropdown2["default"],
                {
                    overlayClassName: 'u-filter-dropdown-menu-wrap',
                    trigger: ['click'],
                    overlay: this.getMenu(),
                    animation: 'slide-up'
                },
                _react2["default"].createElement(
                    _beeButton2["default"],
                    {
                        shape: 'border',
                        style: { marginLeft: "3px", minWidth: "0px", width: "24px", padding: 0 }
                    },
                    _react2["default"].createElement(_beeIcon2["default"], { style: { padding: 0, color: '#585858' }, type: 'uf-filter' })
                )
            ),
            _react2["default"].createElement(
                _beeButton2["default"],
                {
                    onClick: this.onClickClear,
                    shape: 'border',
                    style: { marginLeft: "1px", minWidth: "0px", width: "24px", padding: 0, "visibility": this.props.isShowClear || this.state.selectValue.length > 0 ? "visible" : "hidden" }
                },
                _react2["default"].createElement(_beeIcon2["default"], { style: { padding: 0, color: '#585858', "visibility": this.props.isShowClear || this.state.selectValue.length > 0 ? "visible" : "hidden" }, type: 'uf-filterno' })
            )
        );
    };

    return FilterDropDown;
}(_react.Component);

FilterDropDown.propTypes = {
    isShowCondition: _propTypes2["default"].string,
    filterDropdownType: _propTypes2["default"].oneOf(['string', 'number'])
};

FilterDropDown.defaultProps = {
    isShowCondition: 'show',
    filterDropdownType: 'string'
};

exports["default"] = FilterDropDown;
module.exports = exports['default'];