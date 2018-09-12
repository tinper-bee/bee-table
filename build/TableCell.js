'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _objectPath = require('object-path');

var _objectPath2 = _interopRequireDefault(_objectPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
  record: _propTypes2["default"].object,
  clsPrefix: _propTypes2["default"].string,
  index: _propTypes2["default"].number,
  indent: _propTypes2["default"].number,
  indentSize: _propTypes2["default"].number,
  column: _propTypes2["default"].object,
  expandIcon: _propTypes2["default"].node
};

var TableCell = function (_Component) {
  _inherits(TableCell, _Component);

  function TableCell(props) {
    _classCallCheck(this, TableCell);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.isInvalidRenderCellText = _this.isInvalidRenderCellText.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  TableCell.prototype.isInvalidRenderCellText = function isInvalidRenderCellText(text) {
    return text && !_react2["default"].isValidElement(text) && Object.prototype.toString.call(text) === '[object Object]';
  };

  TableCell.prototype.handleClick = function handleClick(e) {
    var _props = this.props,
        record = _props.record,
        onCellClick = _props.column.onCellClick;

    if (onCellClick) {
      onCellClick(record, e);
    }
  };

  TableCell.prototype.render = function render() {
    var _props2 = this.props,
        record = _props2.record,
        indentSize = _props2.indentSize,
        clsPrefix = _props2.clsPrefix,
        indent = _props2.indent,
        index = _props2.index,
        expandIcon = _props2.expandIcon,
        column = _props2.column,
        fixed = _props2.fixed;
    var dataIndex = column.dataIndex,
        render = column.render;
    var _column$className = column.className,
        className = _column$className === undefined ? '' : _column$className;


    var text = _objectPath2["default"].get(record, dataIndex);
    var tdProps = void 0;
    var colSpan = void 0;
    var rowSpan = void 0;

    if (render) {
      text = render(text, record, index);
      if (this.isInvalidRenderCellText(text)) {
        tdProps = text.props || {};
        rowSpan = tdProps.rowSpan;
        colSpan = tdProps.colSpan;
        text = text.children;
      }
    }

    if (this.isInvalidRenderCellText(text)) {
      text = null;
    }

    var indentText = expandIcon ? _react2["default"].createElement('span', {
      style: { paddingLeft: indentSize * indent + 'px' },
      className: clsPrefix + '-indent indent-level-' + indent
    }) : null;

    if (rowSpan === 0 || colSpan === 0) {
      return null;
    }
    //不是固定表格并且当前列是固定，则隐藏当前列
    if (column.fixed && !fixed) {
      className = className + (clsPrefix + '-fixed-columns-in-body');
    }
    return _react2["default"].createElement(
      'td',
      {
        colSpan: colSpan,
        rowSpan: rowSpan,
        className: className,
        onClick: this.handleClick
      },
      indentText,
      expandIcon,
      text
    );
  };

  return TableCell;
}(_react.Component);

;

TableCell.propTypes = propTypes;

exports["default"] = TableCell;
module.exports = exports['default'];