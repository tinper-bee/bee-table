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
//注意需要处理各系统及各浏览器的兼容性
export function measureScrollbar(selectors,direction = 'vertical') {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return 0;
  }
  if (scrollbarSize) {//计算一次即可
    return scrollbarSize;
  }
  let brow = myBrowser();
  //window系统下firefox的offsetWidth同clientWidth一致，所以通过父子容器间带滚动条的墨盒尺寸计算出滚动条宽度
  if(['IE','FF'].includes(brow.browserType) && brow.osType == 'Win'){
    let scrollDivParent = document.createElement('div');
    scrollDivParent.setAttribute("id",'measureScrollbar_temp');
    scrollDivParent.style.position = 'absolute';
    scrollDivParent.style.top = '-9999px';
    scrollDivParent.style.overflow = 'scroll';
    // scrollDivParent.style.background = 'red';
    scrollDivParent.style.width = '50px';
    scrollDivParent.style.height = '100px';
    let scrollDivChild = document.createElement('div');
    // scrollDivChild.style.background = 'green';
    scrollDivChild.style.height = '200px';
    scrollDivChild.style.flex = "1";
    scrollDivParent.appendChild(scrollDivChild);
    let a = document.getElementById('measureScrollbar_temp');
    if(a){
        document.body.replaceChild(scrollDivParent,a);
    }else{
        document.body.appendChild(scrollDivParent);
    }
    let scrollbarSize = scrollDivParent.getBoundingClientRect().width-scrollDivChild.getBoundingClientRect().width;
    document.body.removeChild(scrollDivParent);
    scrollDivParent = null;
    scrollDivChild = null;
    return scrollbarSize
  }else if('FF' == brow.browserType && brow.osType == 'Mac'){
    return 8;//Mac系统的Firefox无法正常计算出滚动条宽度，所以推荐返回默认宽度
  }else{
      const tableDom =document.querySelector(selectors);
      let currentDom = tableDom?tableDom:document.body;
      const scrollDiv = document.createElement('div');
      Object.keys(scrollbarMeasure).forEach(scrollProp => {
        scrollDiv.style[scrollProp] = scrollbarMeasure[scrollProp];
      });
      currentDom.appendChild(scrollDiv);
      scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      currentDom.removeChild(scrollDiv);
      currentDom = null;
      return scrollbarSize;
  }
}

export function myBrowser() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var browserType = '',osType = '';

  if (userAgent.indexOf("Opera") > -1) { //判断是否Opera浏览器
      browserType = "Opera"
  }else
  if (userAgent.indexOf("Firefox") > -1) { //判断是否Firefox浏览器
      browserType = "FF";
  }else
  if (userAgent.indexOf("Chrome") > -1) {
      browserType = "Chrome";
  }else
  if (userAgent.indexOf("Safari") > -1) { //判断是否Safari浏览器
      browserType = "Safari";
  }else
  if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 ) { //判断是否IE浏览器
      browserType = "IE";
  }
  if(userAgent.indexOf("Win")>-1){
      osType = 'Win';
  }else if(userAgent.indexOf("Mac")>-1){
      osType = 'Mac';
  }
  return {browserType,osType}
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
  if (element&&element.removeEventListener){//element&& ie11报错兼容
      element.removeEventListener(type, handler, false);
  } else if (element&&element.detachEvent){
      element.detachEvent("on" + type, handler);
  } else if(element) {
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
      if (!element)return;
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

  removeHandler: function(element,type,handler) {//element&& ie11报错兼容
      if (element&&element.removeEventListener)
      {
          element.removeEventListener(type,handler,false);
      }
      else if(element&&element.detachEvent) {
          element.detachEvent('on' +type,handler);
      }
      else if(element){
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


/**
 * 将数值转化为货币类型
 * @param {*} number 数值
 * @param {*} places 精度
 * @param {*} thousand 是否展示千分位
 */
export function formatMoney(number, places, thousand) {
  number = number || 0;
  places = !isNaN(places = Math.abs(places)) ? places : 2;
  let thousandSymbol = thousand ? "," : '';
  let negative = number < 0 ? "-" : "";
  let i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "";
  let j = (j = i.length) > 3 ? j % 3 : 0;
  return negative + (j ? i.substr(0, j) + thousandSymbol : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousandSymbol) + (places ? '.' + Math.abs(number - i).toFixed(places).slice(2) : "");
}

export const Event = {
  addHandler,
  removeHandler,
  getEvent,
  getTarget,
  preventDefault,
  stopPropagation
}

/**
 * 将一维数组转换为树结构
 * @param {*} treeData  扁平结构的 List 数组
 * @param {*} attr 属性配置设置
 * @param {*} flatTreeKeysMap 存储所有 key-value 的映射，方便获取各节点信息
 */
export function convertListToTree(treeData, attr, flatTreeKeysMap) {
  let tree = []; //存储所有一级节点
    let resData = treeData, //resData 存储截取的节点 + 父节点（除一级节点外）
        resKeysMap = {}, //resData 的Map映射
        treeKeysMap = {}; //tree 的Map映射
    resData.map((element) => {
      let key = attr.id;
      resKeysMap[element[key]] = element;
    });
    // 查找父节点，为了补充不完整的数据结构
    let findParentNode = (node) => {
      let parentKey = node[attr.parendId];
      if(parentKey !== attr.rootId) { //如果不是根节点，则继续递归
        let item = flatTreeKeysMap[parentKey];
        // 用 resKeysMap 判断，避免重复计算某节点的父节点
        if(resKeysMap.hasOwnProperty(item[attr.id])) return;
        resData.unshift(item);
        resKeysMap[item[attr.id]] = item;
        findParentNode(item);
      }else{
        // 用 treeKeysMap 判断，避免重复累加
        if (!treeKeysMap.hasOwnProperty(node[attr.id]) ) {
          let { key, title, children, _isLeaf, ...otherProps } = node;
          let obj = {
                key,
                title,
                _isLeaf,
                children: []
              }
          tree.push(Object.assign(obj, {...otherProps}));
          treeKeysMap[key] = node;
        }
      }
    }
    // 遍历 resData ，找到所有的一级节点
    for (let i = 0; i < resData.length; i++) {
        let item = resData[i];
        if (item[attr.parendId] === attr.rootId && !treeKeysMap.hasOwnProperty(item[attr.id])) { //如果是根节点，就存放进 tree 对象中
            let { key, title, children, ...otherProps } = item;
            let obj = {
                key: item[attr.id],
                _isLeaf: item[attr._isLeaf],
                children: []
            };
            tree.push(Object.assign(obj, {...otherProps}));
            treeKeysMap[key] = item;
            resData.splice(i, 1);
            i--;
        }else { //递归查找根节点信息
          findParentNode(item);
        }
    }
    // console.log('resData',resKeysMap);
    var run = function(treeArrs) {
        if (resData.length > 0) {
            for (let i = 0; i < treeArrs.length; i++) {
                for (let j = 0; j < resData.length; j++) {
                    let item = resData[j];
                    if (treeArrs[i].key === item[attr.parendId]) {
                        let { key, title, children, ...otherProps } = item;
                        let obj = {
                            key: item[attr.id],
                            _isLeaf: item[attr._isLeaf],
                            children: []
                        };
                        treeArrs[i].children.push(Object.assign(obj, {...otherProps}));
                        resData.splice(j, 1);
                        j--;
                    }
                }
                run(treeArrs[i].children);
            }
        }
    };
    run(tree);
    return tree;
}
