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