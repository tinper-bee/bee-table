"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _beeCheckbox = require("bee-checkbox");

var _beeCheckbox2 = _interopRequireDefault(_beeCheckbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * multiSelect={
 *  type--默认值为checkbox
 *  param--可以设置返回的选中的数据属性；默认值：null；
 * }
 * getSelectedDataFunc--function，能获取到选中的数据
 * 使用全选时得注意，data中的key值一定要是唯一值
 */
module.exports = function multiSelect(Table) {
  Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == val) return i;
    }
    return -1;
  };
  Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };
  return function (_Component) {
    _inherits(BookLoader, _Component);

    function BookLoader(props) {
      _classCallCheck(this, BookLoader);

      var _this = _possibleConstructorReturn(this, _Component.call(this, props));

      _this.onAllCheckChange = function () {
        var self = _this;
        var listData = self.state.data.concat();
        var checkedObj = _extends({}, self.state.checkedObj);
        var data = self.props.data;
        var selIds = [];
        var id = self.props.multiSelect.param;
        for (var i = 0; i < data.length; i++) {
          checkedObj[data[i]["key"]] = !self.state.checkedAll;
        }
        if (self.state.checkedAll) {
          selIds = [];
        } else {
          for (var i = 0; i < listData.length; i++) {
            if (id) {
              selIds[i] = listData[i][id];
            } else {
              selIds[i] = listData[i];
            }
          }
        }
        self.setState({
          checkedAll: !self.state.checkedAll,
          checkedObj: checkedObj,
          selIds: selIds
        });
        self.props.getSelectedDataFunc(selIds);
      };

      _this.onCheckboxChange = function (text, record, index) {
        var self = _this;
        var allFlag = false;
        var selIds = self.state.selIds;
        var id = self.props.multiSelect ? self.props.multiSelect.param ? record[self.props.multiSelect.param] : record : record;
        var checkedObj = _extends({}, self.state.checkedObj);
        var checkedArray = Object.keys(checkedObj);
        var getSelectedDataFunc = self.props.getSelectedDataFunc;

        if (checkedObj[record["key"]]) {
          selIds.remove(id);
        } else {
          selIds.push(id);
        }
        checkedObj[record["key"]] = !checkedObj[record["key"]];
        for (var i = 0; i < checkedArray.length; i++) {
          if (!checkedObj[checkedArray[i]]) {
            allFlag = false;
            break;
          } else {
            allFlag = true;
          }
        }
        self.setState({
          checkedAll: allFlag,
          checkedObj: checkedObj,
          selIds: selIds
        });
        if (typeof getSelectedDataFunc === 'function') {
          getSelectedDataFunc(selIds);
        }
      };

      _this.state = {
        checkedAll: false,
        checkedObj: {},
        selIds: [],
        data: _this.props.data
      };
      return _this;
    }

    BookLoader.prototype.renderColumnsMultiSelect = function renderColumnsMultiSelect(columns) {
      var _this2 = this;

      var data = this.state.data;

      var checkedObj = _extends({}, this.state.checkedObj);
      var checkedArray = Object.keys(checkedObj);
      var multiSelect = this.props.multiSelect;

      var select_column = {};
      var indeterminate_bool = false;
      if (!multiSelect || !multiSelect.type) {
        multiSelect = _extends({}, multiSelect, { type: "checkbox" });
      }
      if (multiSelect && multiSelect.type === "checkbox") {
        var i = checkedArray.length;
        while (i--) {
          if (checkedObj[checkedArray[i]]) {
            indeterminate_bool = true;
            break;
          }
        }
        var defaultColumns = [{
          title: _react2["default"].createElement(_beeCheckbox2["default"], {
            className: "table-checkbox",
            checked: this.state.checkedAll,
            indeterminate: indeterminate_bool && !this.state.checkedAll,
            onChange: this.onAllCheckChange
          }),
          key: "checkbox",
          dataIndex: "checkbox",
          width: "5%",
          render: function render(text, record, index) {
            return _react2["default"].createElement(_beeCheckbox2["default"], {
              className: "table-checkbox",
              checked: checkedObj[record.key],
              onChange: _this2.onCheckboxChange.bind(_this2, text, record, index)
            });
          }
        }];
        columns = defaultColumns.concat(columns);
      }
      return columns;
    };

    BookLoader.prototype.render = function render() {
      var columns = this.renderColumnsMultiSelect(this.props.columns).concat();
      return _react2["default"].createElement(Table, _extends({}, this.props, { columns: columns }));
    };

    return BookLoader;
  }(_react.Component);
};