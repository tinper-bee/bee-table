"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = bigData;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var defaultHeight = 40;
function bigData(Table) {
  var _class, _temp, _initialiseProps;

  return _temp = _class = function (_Component) {
    _inherits(BigData, _Component);

    function BigData(props) {
      _classCallCheck(this, BigData);

      var _this = _possibleConstructorReturn(this, _Component.call(this, props));

      _initialiseProps.call(_this);

      _this.state = {
        currentIndex: 0,
        scrollLeft: 0,
        scrollTop: 0
      };
      var rowHeight = _this.props.height ? _this.props.height : defaultHeight;
      //默认显示25条，rowsInView根据定高算的。在非固定高下，这个只是一个大概的值。
      _this.rowsInView = _this.props.scroll.y ? Math.ceil(_this.props.scroll.y / rowHeight) : 25;
      _this.cachedRowHeight = [];
      _this.lastScrollTop = 0;

      _this.setRowHeight = _this.setRowHeight.bind(_this);
      return _this;
    }
    /**
     *获取数据区高度
     *
     *
     **/


    BigData.prototype.getContentHeight = function getContentHeight() {
      if (!this.props.data) return 0;
      return this.getSumHeight(0, this.props.data.length);
    };

    BigData.prototype.getSumHeight = function getSumHeight(start, end) {
      var height = this.props.height;

      var rowHeight = height ? height : defaultHeight;
      var sumHeight = 0;
      for (var i = start; i < end; i++) {
        sumHeight += this.cachedRowHeight[i] || rowHeight;
      }
      return sumHeight;
    };

    // getIndex(scrollTop = this.state.scrollTop) {
    //     const { data } = this.props
    //     const {rowsInView} = this;
    //     const max = data.length
    //     const mcf = scrollTop > 0.5 ? Math.ceil : Math.floor
    //     let index = mcf((scrollTop * max) - (rowsInView * scrollTop))
    //     if (index > max - rowsInView) index = max - rowsInView
    //     if (index < 0) index = 0
    //     return index
    // }


    // getLastRowHeight = (index) =>{
    //     const { height, data } = this.props
    //     const {rowsInView} = this;
    //     if (index + rowsInView >= data.length) return 0

    //     let lastRowHeight = 0
    //     if (index >= 1 && index < data.length / 2) {
    //     lastRowHeight = this.cachedRowHeight[index - 1] || height
    //     }
    //     return lastRowHeight
    // }


    BigData.prototype.setRowHeight = function setRowHeight(height, index) {
      this.cachedRowHeight[index] = height;
    };

    BigData.prototype.render = function render() {
      var data = this.props.data;
      var _state = this.state,
          currentIndex = _state.currentIndex,
          scrollTop = _state.scrollTop;
      var rowsInView = this.rowsInView;

      var lazyLoad = {
        preHeight: this.getSumHeight(0, currentIndex),
        sufHeight: this.getSumHeight(currentIndex + rowsInView, data.length),
        currentIndex: currentIndex
      };

      return _react2["default"].createElement(Table, _extends({}, this.props, {
        data: data.slice(currentIndex, currentIndex + rowsInView),
        lazyLoad: lazyLoad,
        handleScroll: this.handleScroll,
        scrollTop: scrollTop,
        setRowHeight: this.setRowHeight
        //   className={'lazy-table'}
      }));
    };

    return BigData;
  }(_react.Component), _class.defaultProps = {
    data: undefined
    // height: 40, //默认行高
  }, _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.handleScroll = function (scrollTop) {
      console.log('scrollTop----' + scrollTop);
      var _props = _this2.props,
          data = _props.data,
          height = _props.height;

      var rowHeight = height ? height : defaultHeight;
      var rowsInView = _this2.rowsInView;
      var _state$currentIndex = _this2.state.currentIndex,
          currentIndex = _state$currentIndex === undefined ? 0 : _state$currentIndex;
      // let index = currentIndex;

      var index = 0;
      // let temp = scrollTop - this.lastScrollTop;
      var temp = scrollTop;
      // let lastScrollTop = scrollTop;

      while (temp > 0) {
        temp -= _this2.cachedRowHeight[index] || rowHeight;
        if (temp > 0) {
          index += 1;
        }
      }
      //记录上一次滚动的位置，作为缓存用
      // this.lastScrollTop = lastScrollTop + temp;

      // offset last row
      // index -= 1
      console.log(index);

      if (data.length - rowsInView < index) index = data.length - rowsInView;
      if (index < 0) index = 0;

      if (currentIndex !== index) {
        _this2.setState({ currentIndex: index, scrollTop: scrollTop });
      }
    };
  }, _temp;
}
module.exports = exports["default"];