'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _objectPath = require('object-path');

var _objectPath2 = _interopRequireDefault(_objectPath);

var _i18n = require('./lib/i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _tool = require('bee-locale/build/tool');

var _utils = require('./lib/utils');

var _beeDropdown = require('bee-dropdown');

var _beeDropdown2 = _interopRequireDefault(_beeDropdown);

var _beeMenus = require('bee-menus');

var _beeMenus2 = _interopRequireDefault(_beeMenus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Item = _beeMenus2["default"].Item;

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

    _this.renderLinkType = function (data, record, index) {
      var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var url = config.url,
          urlIndex = config.urlIndex,
          linkType = config.linkType,
          className = config.className,
          underline = config.underline,
          descIndex = config.descIndex,
          desc = config.desc,
          linkColor = config.linkColor;

      var linkUrl = '';
      if (url) {
        linkUrl = url(data, record, index);
      } else if (urlIndex) {
        linkUrl = record[urlIndex];
      }
      if (linkUrl) {
        var link = function link() {
          window.open(linkUrl, linkType || '_blank');
        };
        var cls = 'u-table-link u-table-fieldtype ';
        if (className) {
          cls += className + ' ';
        }
        if (underline) {
          cls += 'u-table-link-underline ';
        }
        var title = '';

        if (desc === true) {
          title = linkUrl;
        } else if (typeof desc === 'string') {
          title = desc;
        } else if (typeof desc === 'function') {
          title = desc(data, record, index);
        } else if (descIndex) {
          title = record[descIndex];
        }
        return _react2["default"].createElement(
          'span',
          { onClick: link, className: cls, style: { color: linkColor || '' }, title: title },
          data
        );
      }
      return data;
    };

    _this.renderBoolType = function (data) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var locale = (0, _tool.getComponentLocale)(_this.props, _this.context, 'Table', function () {
        return _i18n2["default"];
      });
      var boolConfig = _extends({ trueText: locale['bool_true'], falseText: locale['bool_false'] }, config);
      if (typeof data === 'string') {
        if (data === 'false' || data === '0') {
          return boolConfig.falseText;
        }
      } else if (!data) {
        return boolConfig.falseText;
      }
      return boolConfig.trueText;
    };

    _this.renderNumber = function (data) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
      var precision = config.precision,
          thousand = config.thousand,
          makeUp = config.makeUp,
          preSymbol = config.preSymbol,
          nextSymbol = config.nextSymbol;

      var number = (0, _utils.formatMoney)(data, precision, thousand);
      if (makeUp === false && number.indexOf('.') !== -1) {
        number = number.replace(/0*$/, '').replace(/\.$/, '');
      }
      var numberWidth = parseInt(width) - 16; // 减去默认的左右padding共计16px
      var res = _react2["default"].createElement(
        'span',
        { className: 'u-table-currency-number' },
        number
      );
      var pre = preSymbol ? _react2["default"].createElement(
        'span',
        { className: 'u-table-currency-pre' },
        preSymbol
      ) : null;
      var next = nextSymbol ? _react2["default"].createElement(
        'span',
        { className: 'u-table-currency-next' },
        nextSymbol
      ) : null;
      var title = '';
      title += typeof preSymbol === 'string' ? preSymbol : '';
      title += number;
      title += typeof nextSymbol === 'string' ? nextSymbol : '';
      return _react2["default"].createElement(
        'span',
        { className: 'u-table-currency u-table-fieldtype', style: { width: numberWidth }, title: title },
        pre,
        res,
        next
      );
    };

    _this.renderDate = function (data) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var moment = config.moment,
          format = config.format;

      if (!moment) return data;
      return moment(data).format(format || 'YYYY-MM-DD');
    };

    _this.renderSelect = function (data) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (config.options) {
        data = config.options[data] || config.defaultShow;
      }
      return data;
    };

    _this.renderColumnMenu = function (colMenu, text, record, index) {
      if (!colMenu) return null;
      var menu = colMenu.menu,
          _colMenu$trigger = colMenu.trigger,
          trigger = _colMenu$trigger === undefined ? 'hover' : _colMenu$trigger,
          _colMenu$className = colMenu.className,
          className = _colMenu$className === undefined ? '' : _colMenu$className,
          _colMenu$icon = colMenu.icon,
          icon = _colMenu$icon === undefined ? _react2["default"].createElement('i', { className: 'uf uf-3dot-h' }) : _colMenu$icon,
          _colMenu$iconSize = colMenu.iconSize,
          iconSize = _colMenu$iconSize === undefined ? 21 : _colMenu$iconSize;

      var items = [];
      items = menu.map(function (item) {
        return _react2["default"].createElement(
          Item,
          { key: item.key, onClick: function onClick() {
              _this.onClickColMenu(item.callback, text, record, index);
            } },
          item.icon,
          item.text
        );
      });
      if (items.length === 0) return null;
      className += ' u-table-inline-op-dropdowm';
      var menus = _react2["default"].createElement(
        _beeMenus2["default"],
        { className: className },
        items
      );
      var top = 'calc(50% - ' + iconSize / 2 + 'px)';
      var visibility = _this.state.showDropdowm ? 'visible' : '';
      var iconClassName = 'u-table-inline-op-icon u-table-inline-op-icon-hover';
      return _react2["default"].createElement(
        _beeDropdown2["default"],
        {
          trigger: [trigger],
          overlay: menus,
          animation: 'slide-up',
          onVisibleChange: _this.changeShowDropdowm
        },
        _react2["default"].createElement(
          'span',
          { className: iconClassName, style: { fontSize: iconSize, top: top, visibility: visibility } },
          icon
        )
      );
    };

    _this.changeShowDropdowm = function (val) {
      _this.setState({
        showDropdowm: val
      });
    };

    _this.onClickColMenu = function (callback, text, record, index) {
      if (callback) {
        callback(text, record, index);
      }
      _this.setState({
        showDropdowm: false
      });
    };

    _this.isInvalidRenderCellText = _this.isInvalidRenderCellText.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.state = {
      showDropdowm: false
    };
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

  //  渲染链接类型


  // 渲染布尔类型


  // 渲染整数/货币类型


  // 渲染时间类型-l


  // 渲染下拉类型，主要为编辑表格铺垫


  // 渲染行内菜单


  // 下拉按钮状态改变，点击后保持图标常驻


  // 菜单点击事件


  TableCell.prototype.render = function render() {
    var _props2 = this.props,
        record = _props2.record,
        indentSize = _props2.indentSize,
        clsPrefix = _props2.clsPrefix,
        indent = _props2.indent,
        index = _props2.index,
        expandIcon = _props2.expandIcon,
        column = _props2.column,
        fixed = _props2.fixed,
        showSum = _props2.showSum,
        bodyDisplayInRow = _props2.bodyDisplayInRow,
        lazyStartIndex = _props2.lazyStartIndex,
        lazyEndIndex = _props2.lazyEndIndex;
    var dataIndex = column.dataIndex,
        render = column.render,
        fieldType = column.fieldType,
        linkConfig = column.linkConfig,
        fontColor = column.fontColor,
        bgColor = column.bgColor;
    var _column$className = column.className,
        className = _column$className === undefined ? '' : _column$className;


    var text = _objectPath2["default"].get(record, dataIndex);
    var tdProps = void 0;
    var colSpan = void 0;
    var rowSpan = void 0,
        title = void 0;

    if (render && !showSum) {
      text = render(text, record, index);
      if (this.isInvalidRenderCellText(text)) {
        tdProps = text.props || {};
        rowSpan = tdProps.rowSpan > lazyEndIndex && lazyEndIndex > 5 ? lazyEndIndex - index : tdProps.rowSpan;
        colSpan = tdProps.colSpan;
        text = text.children;
      }
    }

    var colMenu = this.renderColumnMenu(column.cellMenu, text, record, index);
    // 根据 fieldType 来渲染数据
    if (!render) {
      switch (column.fieldType) {
        case 'link':
          {
            text = this.renderLinkType(text, record, index, column.linkConfig);
            break;
          }
        case 'bool':
          {
            text = this.renderBoolType(text, column.boolConfig);
            break;
          }
        case 'currency':
          {
            var config = {
              precision: 2, // 精度值,需要大于0
              thousand: true, // 是否显示千分符号
              makeUp: true, // 末位是否补零
              preSymbol: '', // 前置符号
              nextSymbol: '' // 后置符号
            };
            text = this.renderNumber(text, _extends({}, config, column.currencyConfig), column.width);
            break;
          }
        case 'number':
          {
            var _config = {
              precision: 0, // 精度值,需要大于0
              thousand: true, // 是否显示千分符号
              makeUp: false, // 末位是否补零
              preSymbol: '', // 前置符号
              nextSymbol: '' // 后置符号
            };
            text = this.renderNumber(text, _extends({}, _config, column.numberConfig), column.width);
            break;
          }
        case 'date':
          {
            text = this.renderDate(text, column.dateConfig);
            break;
          }
        case 'select':
          {
            text = this.renderSelect(text, column.selectConfig);
            break;
          }
        default:
          {
            break;
          }
      }
    }

    if (this.isInvalidRenderCellText(text)) {
      text = null;
    }

    var indentText = expandIcon ? _react2["default"].createElement('span', {
      style: { paddingLeft: indentSize * indent + 'px' },
      className: clsPrefix + '-indent indent-level-' + indent
    }) : null;

    if (lazyStartIndex !== index && (rowSpan === 0 || colSpan === 0)) {
      return null;
    }
    if (tdProps && tdProps.mergeEndIndex && index < tdProps.mergeEndIndex && rowSpan === 0) {
      rowSpan = tdProps.mergeEndIndex - index;
      text = '';
    }
    //不是固定表格并且当前列是固定，则隐藏当前列
    if (column.fixed && !fixed) {
      className = className + (' ' + clsPrefix + '-fixed-columns-in-body');
    }
    if (column.contentAlign) {
      className = className + (' text-' + column.contentAlign);
    } else if (column.textAlign) {
      className = className + (' text-' + column.textAlign);
    }
    if ((typeof text == 'string' || typeof text === 'number') && bodyDisplayInRow) {
      title = text;
    }
    if (expandIcon && expandIcon.props.expandable) {
      className = className + (' ' + clsPrefix + '-has-expandIcon');
    }
    if (colMenu) {
      className += ' u-table-inline-icon';
    }
    return _react2["default"].createElement(
      'td',
      {
        colSpan: colSpan,
        rowSpan: rowSpan,
        className: className,
        onClick: this.handleClick,
        title: title,
        style: _extends({ color: fontColor, backgroundColor: bgColor }, column.style)
      },
      indentText,
      expandIcon,
      text,
      colMenu
    );
  };

  return TableCell;
}(_react.Component);

;

TableCell.propTypes = propTypes;

exports["default"] = TableCell;
module.exports = exports['default'];