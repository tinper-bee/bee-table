'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Column = require('./Column');

var _Column2 = _interopRequireDefault(_Column);

var _ColumnGroup = require('./ColumnGroup');

var _ColumnGroup2 = _interopRequireDefault(_ColumnGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//行控制管理

var ColumnManager = function () {
  function ColumnManager(columns, elements, originWidth) {
    _classCallCheck(this, ColumnManager);

    this._cached = {};

    this.columns = columns || this.normalize(elements);
    this.originWidth = originWidth;
  }

  ColumnManager.prototype.isAnyColumnsFixed = function isAnyColumnsFixed() {
    var _this = this;

    return this._cache('isAnyColumnsFixed', function () {
      return _this.columns.some(function (column) {
        return !!column.fixed;
      });
    });
  };

  ColumnManager.prototype.isAnyColumnsLeftFixed = function isAnyColumnsLeftFixed() {
    var _this2 = this;

    return this._cache('isAnyColumnsLeftFixed', function () {
      return _this2.columns.some(function (column) {
        return column.fixed === 'left' || column.fixed === true;
      });
    });
  };

  ColumnManager.prototype.isAnyColumnsRightFixed = function isAnyColumnsRightFixed() {
    var _this3 = this;

    return this._cache('isAnyColumnsRightFixed', function () {
      return _this3.columns.some(function (column) {
        return column.fixed === 'right';
      });
    });
  };

  ColumnManager.prototype.leftColumns = function leftColumns() {
    var _this4 = this;

    return this._cache('leftColumns', function () {
      return _this4.groupedColumns().filter(function (column) {
        return column.fixed === 'left' || column.fixed === true;
      });
    });
  };

  ColumnManager.prototype.rightColumns = function rightColumns() {
    var _this5 = this;

    return this._cache('rightColumns', function () {
      return _this5.groupedColumns().filter(function (column) {
        return column.fixed === 'right';
      });
    });
  };

  ColumnManager.prototype.centerColumns = function centerColumns() {
    var _this6 = this;

    return this._cache('centerColumns', function () {
      return _this6.groupedColumns().filter(function (column) {
        return !column.fixed;
      });
    });
  };

  ColumnManager.prototype.leafColumns = function leafColumns() {
    var _this7 = this;

    return this._cache('leafColumns', function () {
      return _this7._leafColumns(_this7.columns);
    });
  };

  ColumnManager.prototype.leftLeafColumns = function leftLeafColumns() {
    var _this8 = this;

    return this._cache('leftLeafColumns', function () {
      return _this8._leafColumns(_this8.leftColumns());
    });
  };

  ColumnManager.prototype.rightLeafColumns = function rightLeafColumns() {
    var _this9 = this;

    return this._cache('rightLeafColumns', function () {
      return _this9._leafColumns(_this9.rightColumns());
    });
  };

  ColumnManager.prototype.centerLeafColumns = function centerLeafColumns() {
    var _this10 = this;

    return this._cache('centerLeafColumns', function () {
      return _this10._leafColumns(_this10.centerColumns());
    });
  };

  // add appropriate rowspan and colspan to column


  ColumnManager.prototype.groupedColumns = function groupedColumns(type) {
    var _this11 = this;

    return this._cache('groupedColumns', function () {
      var _groupColumns = function _groupColumns(columns) {
        var currentRow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var parentColumn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var rows = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

        // track how many rows we got
        rows[currentRow] = rows[currentRow] || [];
        var grouped = [];
        var setRowSpan = function setRowSpan(column) {
          var rowSpan = rows.length - currentRow;
          if (column && !column.children && // parent columns are supposed to be one row
          rowSpan > 1 && (!column.rowSpan || column.rowSpan < rowSpan)) {
            column.rowSpan = rowSpan;
          }
        };
        columns.forEach(function (column, index) {
          var defaultOpt = {
            ifshow: true
          };
          if (!_this11.originWidth) {
            defaultOpt.width = 200;
          }
          //获取非固定列
          if (type == 'nofixed' && column.fixed) {
            return false;
          }
          var newColumn = _extends({}, defaultOpt, column);
          rows[currentRow].push(newColumn);
          parentColumn.colSpan = parentColumn.colSpan || 0;
          if (newColumn.children && newColumn.children.length > 0) {
            newColumn.children = _groupColumns(newColumn.children, currentRow + 1, newColumn, rows);
            parentColumn.colSpan = parentColumn.colSpan + newColumn.colSpan;
          } else {
            parentColumn.colSpan++;
          }
          // update rowspan to all same row columns
          for (var i = 0; i < rows[currentRow].length - 1; ++i) {
            setRowSpan(rows[currentRow][i]);
          }
          // last column, update rowspan immediately
          if (index + 1 === columns.length) {
            setRowSpan(newColumn);
          }
          grouped.push(newColumn);
        });
        return grouped;
      };
      return _groupColumns(_this11.columns);
    });
  };

  ColumnManager.prototype.normalize = function normalize(elements) {
    var _this12 = this;

    var columns = [];
    _react2["default"].Children.forEach(elements, function (element) {
      if (!_this12.isColumnElement(element)) return;
      var column = _extends({}, element.props);
      if (element.key) {
        column.key = element.key;
      }
      if (element.type === _ColumnGroup2["default"]) {
        column.children = _this12.normalize(column.children);
      }
      columns.push(column);
    });
    return columns;
  };

  ColumnManager.prototype.isColumnElement = function isColumnElement(element) {
    return element && (element.type === _Column2["default"] || element.type === _ColumnGroup2["default"]);
  };

  ColumnManager.prototype.reset = function reset(columns, elements) {
    this.columns = columns || this.normalize(elements);
    this._cached = {};
  };

  ColumnManager.prototype.getColumnWidth = function getColumnWidth(contentWidth) {
    var columns = this.leafColumns();
    var res = { computeWidth: 0, lastShowIndex: -1 };
    columns.forEach(function (col, index) {
      //如果列显示
      if (col.ifshow) {
        var width = col.width;
        if (typeof width == 'string' && width.includes('%')) {
          width = contentWidth * parseInt(col.width) / 100;
        }
        res.computeWidth += parseInt(width);
        if (!col.fixed) {
          res.lastShowIndex = index;
        }
      }
    });
    return res;
  };

  ColumnManager.prototype.getLeftColumnsWidth = function getLeftColumnsWidth() {
    var _this13 = this;

    return this._cache('leftColumnsWidth', function () {
      var leftColumnsWidth = 0;
      _this13.groupedColumns().forEach(function (column) {
        if (column.fixed === 'left' || column.fixed === true) {
          leftColumnsWidth += column.width;
        }
      });
      return leftColumnsWidth;
    });
  };

  ColumnManager.prototype.getRightColumnsWidth = function getRightColumnsWidth() {
    var _this14 = this;

    return this._cache('rightColumnsWidth', function () {
      var rightColumnsWidth = 0;
      _this14.groupedColumns().forEach(function (column) {
        if (column.fixed === 'right') {
          rightColumnsWidth += column.width;
        }
      });
      return rightColumnsWidth;
    });
  };

  ColumnManager.prototype._cache = function _cache(name, fn) {
    if (name in this._cached) {
      return this._cached[name];
    }
    this._cached[name] = fn();
    return this._cached[name];
  };

  //todo 含有children的宽度计算


  ColumnManager.prototype._leafColumns = function _leafColumns(columns) {
    var _this15 = this;

    var leafColumns = [];

    columns.forEach(function (column) {
      if (!column.children) {

        var defaultOpt = {
          ifshow: true
        };
        if (!_this15.originWidth) {
          defaultOpt.width = 200;
        }
        var newColumn = _extends({}, defaultOpt, column);
        leafColumns.push(newColumn);
      } else {
        leafColumns.push.apply(leafColumns, _toConsumableArray(_this15._leafColumns(column.children)));
      }
    });
    return leafColumns;
  };

  return ColumnManager;
}();

exports["default"] = ColumnManager;
module.exports = exports['default'];