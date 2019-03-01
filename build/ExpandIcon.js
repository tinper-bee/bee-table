'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
  record: _propTypes2["default"].object,
  clsPrefix: _propTypes2["default"].string,
  expandable: _propTypes2["default"].any,
  expanded: _propTypes2["default"].bool,
  needIndentSpaced: _propTypes2["default"].bool,
  onExpand: _propTypes2["default"].func
};

var ExpandIcon = function (_Component) {
  _inherits(ExpandIcon, _Component);

  function ExpandIcon(props) {
    _classCallCheck(this, ExpandIcon);

    return _possibleConstructorReturn(this, _Component.call(this, props));
  }

  ExpandIcon.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !(0, _shallowequal2["default"])(nextProps, this.props);
  };

  ExpandIcon.prototype.render = function render() {
    var _props = this.props,
        expandable = _props.expandable,
        clsPrefix = _props.clsPrefix,
        onExpand = _props.onExpand,
        needIndentSpaced = _props.needIndentSpaced,
        expanded = _props.expanded,
        record = _props.record,
        isHiddenExpandIcon = _props.isHiddenExpandIcon;

    if (expandable && !isHiddenExpandIcon) {
      var expandClassName = expanded ? 'expanded' : 'collapsed';
      return _react2["default"].createElement('span', {
        className: clsPrefix + '-expand-icon ' + clsPrefix + '-' + expandClassName,
        onClick: function onClick(e) {
          return onExpand(!expanded, record, e);
        }
      });
    } else if (needIndentSpaced || isHiddenExpandIcon) {
      return _react2["default"].createElement('span', { className: clsPrefix + '-expand-icon ' + clsPrefix + '-spaced' });
    }
    return null;
  };

  return ExpandIcon;
}(_react.Component);

;

ExpandIcon.propTypes = propTypes;

exports["default"] = ExpandIcon;
module.exports = exports['default'];