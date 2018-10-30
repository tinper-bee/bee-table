'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _beeDropdown = require('bee-dropdown');

var _beeDropdown2 = _interopRequireDefault(_beeDropdown);

var _beeMenus = require('bee-menus');

var _beeMenus2 = _interopRequireDefault(_beeMenus);

var _beeButton = require('bee-button');

var _beeButton2 = _interopRequireDefault(_beeButton);

var _beeIcon = require('bee-icon');

var _beeIcon2 = _interopRequireDefault(_beeIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Item = _beeMenus2["default"].Item;

var FilterDropDown = function (_Component) {
    _inherits(FilterDropDown, _Component);

    function FilterDropDown() {
        _classCallCheck(this, FilterDropDown);

        var _this = _possibleConstructorReturn(this, _Component.call(this));

        _this.onSelectDropdown = function (s) {
            var onSelectDropdown = _this.props.onSelectDropdown;

            if (onSelectDropdown) {
                _this.setState({
                    selectValue: [s.key]
                }, function () {
                    onSelectDropdown(s);
                });
            }
        };

        _this.onClickClear = function () {
            var onClickClear = _this.props.onClickClear;

            if (onClickClear) {
                _this.setState({
                    selectValue: []
                }, function () {
                    onClickClear();
                });
            }
        };

        _this.state = {
            selectValue: []
        };
        return _this;
    }

    FilterDropDown.prototype.render = function render() {
        var isShowCondition = this.props.isShowCondition;

        var dropmenu = _react2["default"].createElement(
            _beeMenus2["default"],
            {
                onSelect: this.onSelectDropdown,
                selectedKeys: this.state.selectValue
            },
            _react2["default"].createElement(
                Item,
                { key: '2' },
                '\u5305\u542B'
            ),
            _react2["default"].createElement(
                Item,
                { key: '6' },
                '\u4E0D\u5305\u542B'
            ),
            _react2["default"].createElement(
                Item,
                { key: '1' },
                '\u7B49\u4E8E'
            ),
            _react2["default"].createElement(
                Item,
                { key: '5' },
                '\u4E0D\u7B49\u4E8E'
            ),
            _react2["default"].createElement(
                Item,
                { key: '7' },
                '\u4EE5\u5F00\u59CB'
            ),
            _react2["default"].createElement(
                Item,
                { key: '3' },
                '\u4EE5\u7ED3\u5C3E'
            )
        );
        return _react2["default"].createElement(
            'div',
            null,
            isShowCondition == 'show' && _react2["default"].createElement(
                _beeDropdown2["default"],
                {
                    trigger: ['click'],
                    overlay: dropmenu,
                    animation: 'slide-up'
                },
                _react2["default"].createElement(
                    _beeButton2["default"],
                    { shape: 'border', style: { marginLeft: "3px", minWidth: "0px", width: "24px", padding: 0 } },
                    _react2["default"].createElement(_beeIcon2["default"], { style: { padding: 0 }, type: 'uf-filter' })
                )
            ),
            _react2["default"].createElement(
                _beeButton2["default"],
                { onClick: this.onClickClear, shape: 'border', style: { marginLeft: "1px", minWidth: "0px", width: "24px", padding: 0, "visibility": this.props.isShowClear || this.state.selectValue.length > 0 ? "visible" : "hidden" } },
                _react2["default"].createElement(_beeIcon2["default"], { style: { padding: 0, "visibility": this.props.isShowClear || this.state.selectValue.length > 0 ? "visible" : "hidden" }, type: 'uf-filterno' })
            )
        );
    };

    return FilterDropDown;
}(_react.Component);

exports["default"] = FilterDropDown;
module.exports = exports['default'];