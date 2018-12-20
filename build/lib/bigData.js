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

      var _this2 = _possibleConstructorReturn(this, _Component.call(this, props));

      _initialiseProps.call(_this2);

      _this2.state = {

        scrollLeft: 0,
        scrollTop: 0
      };
      var rowHeight = _this2.props.height ? _this2.props.height : defaultHeight;
      //默认显示25条，rowsInView根据定高算的。在非固定高下，这个只是一个大概的值。
      _this2.rowsInView = _this2.props.scroll.y ? Math.ceil(_this2.props.scroll.y / rowHeight) : 25;
      _this2.currentIndex = 0;
      _this2.loadCount = 30; //一次加载多少数据
      _this2.cachedRowHeight = [];
      _this2.lastScrollTop = 0;
      _this2.startIndex = _this2.currentIndex;
      _this2.endIndex = _this2.currentIndex + _this2.loadCount;
      _this2.setRowHeight = _this2.setRowHeight.bind(_this2);
      return _this2;
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
      var currentIndex = this.currentIndex,
          scrollTop = this.scrollTop;
      var rowsInView = this.rowsInView,
          loadCount = this.loadCount,
          endIndex = this.endIndex,
          startIndex = this.startIndex;

      var lazyLoad = {
        preHeight: this.getSumHeight(0, startIndex),
        sufHeight: this.getSumHeight(endIndex, data.length),
        startIndex: startIndex
      };
      return _react2["default"].createElement(Table, _extends({}, this.props, {
        data: data.slice(startIndex, endIndex),
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
    var _this3 = this;

    this.handleScroll = function (nextScrollTop) {
      var _this = _this3;
      //将currentIndex放在this上，如果可视区域中需要展示的数据已经存在则不重现render。
      var _props = _this3.props,
          data = _props.data,
          height = _props.height,
          _props$scroll = _props.scroll,
          scroll = _props$scroll === undefined ? {} : _props$scroll;

      var rowHeight = height ? height : defaultHeight;

      var _this$currentIndex = _this.currentIndex,
          currentIndex = _this$currentIndex === undefined ? 0 : _this$currentIndex,
          loadCount = _this.loadCount,
          scrollTop = _this.scrollTop;
      var endIndex = _this.endIndex,
          startIndex = _this.startIndex;
      var needRender = _this.state.needRender;


      var index = 0;

      var temp = nextScrollTop;
      var viewHeight = parseInt(scroll.y);
      var isOrder = nextScrollTop > scrollTop ? true : false;

      while (temp > 0) {
        temp -= _this3.cachedRowHeight[index] || rowHeight;
        if (temp > 0) {
          index += 1;
        }
      }

      if (data.length - loadCount < index) index = data.length - loadCount;
      if (index < 0) index = 0;

      if (currentIndex !== index) {
        _this.currentIndex = index;
        _this.scrollTop = nextScrollTop;
        var rowsInView = 0;
        var rowsHeight = 0;

        //计算下一屏显示的数据条数
        if (viewHeight) {
          //有时滚动过快时this.cachedRowHeight[rowsInView + index]为undifined
          while (rowsHeight < viewHeight && _this3.cachedRowHeight[rowsInView + index]) {
            rowsHeight += _this3.cachedRowHeight[rowsInView + index];
            rowsInView++;
          }
          // 如果rowsInView 小于 缓存的数据则重新render 
          // 向下滚动
          if (rowsInView + index > endIndex - 3 && isOrder) {

            _this3.startIndex = index;
            endIndex = _this3.startIndex + loadCount;
            if (endIndex > data.length - 1) {
              endIndex = data.length - 1;
            }
            _this3.endIndex = endIndex;
            _this3.setState({ needRender: !needRender });
          }
          // 向上滚动，当前的index是否已经加载（currentIndex）
          if (!isOrder && index < startIndex + 3) {
            startIndex = index - 15;
            if (startIndex < 0) {
              startIndex = 0;
            }
            _this3.startIndex = startIndex;
            _this3.endIndex = _this3.startIndex + loadCount;
            _this3.setState({ needRender: !needRender });
          }
        }
        console.log('**index**' + index, "**startIndex**" + _this3.startIndex, "**endIndex**" + _this3.endIndex);
        // this.setState({ scrollTop:scrollTop})
      }
    };
  }, _temp;
}
module.exports = exports["default"];