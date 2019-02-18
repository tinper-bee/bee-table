import warning from 'warning';
import parseInt from 'lodash/parseInt';


let scrollbarSize;

// Measure scrollbar width for padding body during modal show/hide
const scrollbarMeasure = {
  position: 'absolute',
  top: '-9999px',
  width: '50px',
  height: '50px',
  overflow: 'scroll',
};

export function measureScrollbar(direction = 'vertical') {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return 0;
  }
  if (scrollbarSize) {
    return scrollbarSize;
  }
  const scrollDiv = document.createElement('div');
  Object.keys(scrollbarMeasure).forEach(scrollProp => {
    scrollDiv.style[scrollProp] = scrollbarMeasure[scrollProp];
  });
  document.body.appendChild(scrollDiv);
  let size = 0;
  if (direction === 'vertical') {
    size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  } else if (direction === 'horizontal') {
    size = scrollDiv.offsetHeight - scrollDiv.clientHeight;
  }

  document.body.removeChild(scrollDiv);
  scrollbarSize = size;
  return scrollbarSize;
}


export function debounce(func, wait, immediate) {
  let timeout;
  return function debounceFunc() {
    const context = this;
    const args = arguments;
    // https://fb.me/react-event-pooling
    if (args[0] && args[0].persist) {
      args[0].persist();
    }
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

const warned = {};
export function warningOnce(condition, format, args) {
  if (!warned[format]) {
    warning(condition, format, args);
    warned[format] = true;
  }
}
 export function getOffset (Node, offset ) {
	if(!offset) {
		offset = {};
		offset.top = 0;
		offset.left = 0;
	}
	if(Node == document.body) {
		return offset;
	}
	offset.top += Node.offsetTop;
	offset.left += Node.offsetLeft;
	if(Node.offsetParent)
		return getOffset(Node.offsetParent, offset);
	else
		return offset;
};





export const tryParseInt = (value, defaultValue = 0) => {
  const resultValue = parseInt(value);

  if (isNaN(resultValue)) {
    return defaultValue;
  }
  return resultValue;
};


export function addClass(elm, className) {
  if (!className) return;

  const els = Array.isArray(elm) ? elm : [elm];

  els.forEach((el) => {
    if (el.classList) {
      el.classList.add(className.split(' '));
    } else {
      el.className += ` ${className}`;
    }
  });
}

export function removeClass(elm, className) {
  if (!className) return;

  const els = Array.isArray(elm) ? elm : [elm];

  els.forEach((el) => {
    if (el.classList) {
      el.classList.remove(className.split(' '));
    } else {
      el.className = el.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
    }
  });
}

/**
 * 简单数组数据对象拷贝
 * @param {*} obj 要拷贝的对象 
 */
export function ObjectAssign(obj){
  let b = obj instanceof Array;
  let tagObj = b?[]:{};
  if(b){//数组
    obj.forEach(da => {
      let _da = {};
      Object.assign(_da,da);
      tagObj.push(_da);
    });
  }else{
    Object.assign(tagObj,obj);
  }
  return tagObj;
}
/**
 * 获取某个父元素
 * */

export function closest(ele, selector) {
  const matches = ele.matches || ele.webkitMatchesSelector || ele.mozMatchesSelector || ele.msMatchesSelector;
  if (matches) {
    while (ele) {
      if (matches.call(ele, selector)) {
        return ele;
      } else {
        ele = ele.parentElement;
      }
    }
  }
  return null;
}


export function getMaxColChildrenLength(columns){
  let  arr=[];
  arr = columns.map((item,index)=>{
    let chilrenLen = 0;
    if(item.children){
      chilrenLen = getColChildrenLength(item.children,chilrenLen+1)
    }
    return chilrenLen
  })
  var max = Math.max.apply(null,arr);
  return max;
} 

export function getColChildrenLength(columns,chilrenLen){
  columns.forEach((item,index)=>{
    if(item.children){
      chilrenLen = getColChildrenLength(item.children,chilrenLen+1);
    }
  })
  return chilrenLen;
}


 function addHandler(element,type,handler){
  let event = null;
  if(element.addEventListener){//检测是否为DOM2级方法
    event = element.addEventListener(type, handler, false);
  }else if (element.attachEvent){//检测是否为IE级方法
    event = element.attachEvent("on" + type, handler);
  } else {//检测是否为DOM0级方法
    event = element["on" + type] = handler;
  }
  return event;
}

 function removeHandler(element, type, handler){
  if (element.removeEventListener){
      element.removeEventListener(type, handler, false);
  } else if (element.detachEvent){
      element.detachEvent("on" + type, handler);
  } else {
      element["on" + type] = null;
  }
}

//获取事件对象的兼容性写法
function getEvent(event){
  return event ? event : window.event;
}

//获取事件对象目标的兼容性写法
function getTarget(event){
  return event.target || event.srcElement;
}

function preventDefault(event){
  if (event.preventDefault){
      event.preventDefault();
  } else {
      event.returnValue = false;
  }
}

function stopPropagation(event){
  if (event.stopPropagation){
      event.stopPropagation();
  } else {
      event.cancelBubble = true;
  }
}


//用事件冒泡方式，如果想兼容事件捕获只需要添加个bool参数
export const EventUtil = {
  addHandler: function(element,type,handler) {
      if (element.addEventListener) {
          element.addEventListener(type,handler,false);
      }
      else if (element.attachEvent) {
          element.attachEvent('on'+type,handler);
      }
      else {
          element['on'+type] = handler;
      }
  },

  removeHandler: function(element,type,handler) {
      if (element.removeEventListener)
      {
          element.removeEventListener(type,handler,false);
      }
      else if(element.detachEvent) {
          element.detachEvent('on' +type,handler);
      }
      else {
          element['on'+type] = null;
      }
  }
}

/*
 * 处理精度
 */
export function DicimalFormater(value,precision) {
  var value = value + '',
      precision = precision?precision:0;
  for (var i = 0; i < value.length; i++) {
      if ("-0123456789.".indexOf(value.charAt(i)) == -1)
          return "";
  }
  return checkDicimalInvalid(value, precision);
};
export function checkDicimalInvalid(value, precision) {
  if (value == null || isNaN(value))
      return "";
  // 浮点数总位数不能超过10位
  var digit = parseFloat(value);
  var result = (digit * Math.pow(10, precision) / Math.pow(10, precision))
      .toFixed(precision);
  if (result == "NaN")
      return "";
  return result;
};

export const Event = {
  addHandler,
  removeHandler,
  getEvent,
  getTarget,
  preventDefault,
  stopPropagation
}