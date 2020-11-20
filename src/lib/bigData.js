import React, { Component } from "react";
import PropTypes from "prop-types";
import { convertListToTree } from "./utils";
const defaultHeight = 30;
const rowDiff = 2; //行差值
let treeTypeIndex = 0;
export default function bigData(Table) {
  return class BigData extends Component {
    static defaultProps = {
      data: [],
      loadBuffer: 5,
      rowKey: "key",
      onExpand() {},
      scroll: {},
      currentIndex:-1,
      isTree:false
    };
    static propTypes = {
      loadBuffer: PropTypes.number
    };
    constructor(props) {
      super(props);
      this.state = {
        scrollLeft: 0,
        scrollTop: 0
      };
      const rowHeight = this.props.height ? this.props.height : defaultHeight;
      //默认显示25条，rowsInView根据定高算的。在非固定高下，这个只是一个大概的值。
      const scrollY = this.props.scroll.y ? parseInt(this.props.scroll.y) : 0;
      this.rowsInView = scrollY ? Math.floor(scrollY / rowHeight) : 20;
      this.currentIndex = 0;
      this.loadCount = props.loadBuffer
        ? this.rowsInView + props.loadBuffer * 2
        : 26; //一次加载多少数据
      this.cachedRowHeight = []; //缓存每行的高度
      this.cachedRowParentIndex = [];
      this.expandChildRowKeys = [];
      this.firstLevelKey = [];
      this.keys = [];
      this.lastScrollTop = 0;
      this.currentScrollTop = 0;
      this.startIndex = this.currentIndex; //数据开始位置
      this.endIndex = this.currentIndex + this.loadCount; //数据结束位置
      this.setRowHeight = this.setRowHeight.bind(this);
      this.setRowParentIndex = this.setRowParentIndex.bind(this);
      this.expandedRowKeys = props.expandedRowKeys || [];
      this.flatTreeKeysMap = {}; //树表，扁平结构数据的 Map 映射，方便获取各节点信息
      this.flatTreeData = []; //深度遍历处理后的data数组
      this.treeData = []; //树表的data数据
    }
    componentWillReceiveProps(nextProps) {
      const props = this.props;
      const {currentIndex ,data:newData, expandedRowKeys:newExpandedKeys} = nextProps;
      const _this = this,dataLen = newData.length;
      if (nextProps.scroll.y !== props.scroll.y) {
        const rowHeight = nextProps.height ? nextProps.height : defaultHeight;
        const scrollY = nextProps.scroll.y ? parseInt(nextProps.scroll.y) : 0;
        _this.rowsInView = scrollY ? Math.floor(scrollY / rowHeight) : 20;
        _this.loadCount = props.loadBuffer
          ? _this.rowsInView + props.loadBuffer * 2
          : 26; //一次加载多少数据
          _this.currentIndex = 0;
          _this.startIndex = _this.currentIndex; //数据开始位置
          _this.endIndex = _this.currentIndex + _this.loadCount; //数据结束位置
        
      }
      if('data' in nextProps){
        const isTreeType = nextProps.isTree ? true : _this.checkIsTreeType(newData);
        _this.treeType = isTreeType;
        //fix: 滚动加载场景中,数据动态改变下占位计算错误的问题(26 Jun)
        if (newData.toString() !== props.data.toString()) {
          _this.cachedRowHeight = []; //缓存每行的高度
          _this.cachedRowParentIndex = [];
          _this.computeCachedRowParentIndex(newData);
          // fix：切换数据源，startIndex、endIndex错误
          if(_this.scrollTop <= 0) { // 增加scrollTop 判断，ncc场景下滚动条不在最上层， 会出现空白，因为重置了currentIndex没有重置滚动条
            _this.currentIndex = 0;
            _this.startIndex = _this.currentIndex; //数据开始位置
            _this.endIndex = _this.currentIndex + _this.loadCount; 
          }
          
        }
        _this.treeData = [];
        _this.flatTreeData = [];
        if(newData.length>0){
          _this.endIndex = _this.currentIndex - nextProps.loadBuffer + _this.loadCount; //数据结束位置
        }
        if(isTreeType){
          _this.getTreeData(newExpandedKeys, newData);
        }
      }
      //如果传currentIndex，会判断该条数据是否在可视区域，如果没有的话，则重新计算startIndex和endIndex
      if(currentIndex != -1 && currentIndex !== this.currentIndex){
        _this.setStartAndEndIndex(currentIndex,dataLen);
      }
    }

    componentWillMount() {
      const { data,isTree } = this.props;
      const isTreeType = isTree?true:this.checkIsTreeType();
      //设置data中每个元素的parentIndex
      this.computeCachedRowParentIndex(data);
      //如果是树表，递归data
      if(isTreeType){
        this.treeType = isTreeType;
        this.getTreeData();
      } 
    }

    /**
     * 如果是树形表，需要对传入的 data 进行处理
     * @param expandedKeys: nextProps 中传入的新 expandedRowKeys 属性值
     * @param newData: nextProps 中传入的新 data 属性值
     */
    getTreeData = (expandedKeys, newData) => {
      let { startIndex, endIndex } = this; 
      const data = newData ? newData : this.props.data;
      this.cacheExpandedKeys = expandedKeys && new Set(expandedKeys);
      // 深递归 data，截取可视区 data 数组，再将扁平结构转换成嵌套结构
      let sliceTreeList = [];
      let flatTreeData = this.deepTraversal(data);
      this.flatTreeData = flatTreeData;
      sliceTreeList = flatTreeData.slice(startIndex, endIndex);
      this.handleTreeListChange(sliceTreeList);

      this.cacheExpandedKeys = expandedKeys && null;
    }

    /**
     * 深度遍历树形 data，把数据拍平，变为一维数组
     * @param {*} data 
     * @param {*} parentKey 标识父节点
     */
    deepTraversal = (treeData, parentKey=null) => {
      const _this = this;
      let {cacheExpandedKeys, expandedRowKeys = [], flatTreeKeysMap} = _this,
          expandedKeysSet = cacheExpandedKeys ? cacheExpandedKeys : new Set(expandedRowKeys),
          flatTreeData = [],
          dataCopy = treeData;
      if(Array.isArray(dataCopy)){
        for (let i=0, l=dataCopy.length; i<l; i++) {
          let { children, ...props } = dataCopy[i],
              key = this.getRowKey(dataCopy[i],i),//bugfix生成key字段，否则树无法展开
              dataCopyI = new Object(),
              _isLeaf = (children && children.length > 0) ? false : true,
              //如果父节点是收起状态，则子节点的展开状态无意义。（一级节点或根节点直接判断自身状态即可）
              isExpanded = (parentKey === null || expandedKeysSet.has(parentKey)) ? expandedKeysSet.has(key) : false;
          dataCopyI = Object.assign(dataCopyI,{
            key,
            isExpanded,
            parentKey : parentKey,
            _isLeaf,
            index: flatTreeData.length
          },{...props});

          flatTreeData.push(dataCopyI); // 取每项数据放入一个新数组
          flatTreeKeysMap[key] = dataCopyI;

          // 优化递归逻辑，如果当前节点是收起状态，则不遍历其子节点
          if (Array.isArray(children) && children.length > 0 && isExpanded){
            flatTreeData = flatTreeData.concat(this.deepTraversal(children, key));
          }
        }
      }
      return flatTreeData;
    }

    /**
     * 将截取后的 List 数组转换为 Tree 结构，并更新 state
     */
    handleTreeListChange = (treeList, startIndex, endIndex) => {
      // 属性配置设置
      let attr = {
        id: 'key',
        parendId: 'parentKey',
        rootId: null,
        _isLeaf: '_isLeaf'
      };
      let treeData = convertListToTree(treeList, attr, this.flatTreeKeysMap);

      this.startIndex = typeof(startIndex) !== "undefined" ? startIndex : this.startIndex;
      this.endIndex = typeof(endIndex) !== "undefined" ? endIndex : this.endIndex;

      this.treeData = treeData;
    }

    /**
     *设置data中每个元素的parentIndex
     *
     */
    computeCachedRowParentIndex = data => {
      const {isTree} = this.props;
      const isTreeType = isTree?true:this.checkIsTreeType();
      treeTypeIndex=0;
      if (isTreeType) {
        data.forEach((item, index) => {
          this.firstLevelKey[index] = this.getRowKey(item, index);
          this.cachedRowParentIndex[treeTypeIndex] = index;
          //保存所有的keys跟小标对应起来
          this.keys[treeTypeIndex] = this.getRowKey(item, index);
          treeTypeIndex++;
          if (item.children) {
            this.getData(item.children, index);
          }
        });
      }
    };

    setStartAndEndIndex(currentIndex,dataLen){
      const _this = this;
      if(currentIndex > _this.currentIndex + _this.rowsInView){
        _this.currentIndex = currentIndex;
        _this.endIndex = _this.currentIndex; //数据开始位置
        _this.startIndex = _this.currentIndex - _this.loadCount; //数据结束位置
        if(_this.endIndex > dataLen){
          _this.endIndex = dataLen;
        }
        if(_this.startIndex < 0){
          _this.startIndex = 0;
        }
         //重新设定scrollTop值
      _this.scrollTop = _this.getSumHeight(0, _this.endIndex - _this.rowsInView +2);
      }else if(currentIndex < _this.currentIndex){
        _this.currentIndex = currentIndex;
        _this.startIndex = currentIndex;
        _this.endIndex = currentIndex + _this.loadCount;
        if(_this.endIndex > dataLen){
          _this.endIndex = dataLen;
        }
        if(_this.startIndex < 0){
          _this.startIndex = 0;
        }
      //重新设定scrollTop值
      _this.scrollTop = _this.getSumHeight(0, _this.startIndex);
      }
     
    }

    getRowKey(record, index) {
      const rowKey = this.props.rowKey;
      const key =
        typeof rowKey === "function" ? rowKey(record, index) : record[rowKey];

      return key;
    }
    /**
     *判断是否是树形结构
     *
     */
    checkIsTreeType(newData) {
      const data = newData ? newData : this.props.data;
      let rs = false;
      const len = data.length > 30 ? 30 : data.length;
      //取前三十个看看是否有children属性，有则为树形结构
      for (let i = 0; i < len; i++) {
        if (data[i].children) {
          rs = true;
          break;
        }
      }
      return rs;
    }
    getData(data, parentIndex) {
      data.forEach((subItem, subIndex) => {
        this.cachedRowParentIndex[treeTypeIndex] = parentIndex;
        this.keys[treeTypeIndex] = this.getRowKey(subItem, subIndex);
        treeTypeIndex++;
        if (subItem.children) {
          this.getData(subItem.children, parentIndex);
        }
      });
    }
    componentWillUnmount() {
      this.cachedRowHeight = [];
      this.cachedRowParentIndex = [];
    }
    /**
     *获取数据区高度
     *
     *
     **/
    getContentHeight() {
      if (!this.props.data) return 0;
      return this.getSumHeight(0, this.props.data.length);
    }

    getSumHeight(start, end) {
      const { height } = this.props;
      let rowHeight = height ? height : defaultHeight;
      let sumHeight = 0,
        currentKey,
        currentRowHeight = rowHeight;

      for (let i = start; i < end; i++) {
        if (this.cachedRowHeight[i] == undefined) {
          if (this.treeType) {
            // currentKey = this.keys[i];
            currentKey = this.flatTreeData[i] && this.flatTreeData[i].key;
            currentRowHeight = 0;
            if (
              this.flatTreeKeysMap.hasOwnProperty(currentKey)
            ) {
              currentRowHeight = rowHeight;
            }
          }
          sumHeight += currentRowHeight;
        } else {
          sumHeight += this.cachedRowHeight[i];
        }
      }
      return sumHeight;
    }

    /**
     *@description  根据返回的scrollTop计算当前的索引。此处做了两次缓存一个是根据上一次的currentIndex计算当前currentIndex。另一个是根据当前内容区的数据是否在缓存中如果在则不重新render页面
     *@param 最新一次滚动的scrollTop
     *@param treeType是否是树状表
     *@param callback表体滚动过程中触发的回调
     */
    handleScrollY = (nextScrollTop, treeType, callback) => {
      //树表逻辑
      // 关键点是动态的获取startIndex和endIndex
      // 法子一：子节点也看成普通tr，最开始需要设置一共有多少行，哪行显示哪行不显示如何确定
      // 动态取start = current+buffer对应的父节点、end = start+loadCount+row的height为0的行数 展开节点的下一个节点作为end值，
      const _this = this;
      const { data, height, scroll = {}, loadBuffer } = _this.props;
      const rowHeight = height ? height : defaultHeight;
      const {
        currentIndex = 0,
        loadCount,
        scrollTop,
        currentScrollTop,
        flatTreeData
      } = _this;
      let { endIndex, startIndex } = _this;
      const { needRender } = _this.state;
      _this.scrollTop = nextScrollTop;
      const viewHeight = parseInt(scroll.y);
      _this.treeType = treeType;
      let index = 0;
      let temp = nextScrollTop;
      let currentKey;
      while (temp > 0) {
        let currentRowHeight = this.cachedRowHeight[index];
        if (currentRowHeight === undefined) {
          if (this.treeType) {
            // currentKey = this.keys[index];
            currentKey = this.flatTreeData[index].key;
            currentRowHeight = 0;
            if (
              this.flatTreeKeysMap.hasOwnProperty(currentKey)
            ) {
              currentRowHeight = rowHeight;
            }
          } else {
            currentRowHeight = rowHeight;
          }
        }
        temp -= currentRowHeight;
        if (temp > 0) {
          index += 1;
        }
      }
      // console.log('currentIndex****',index);
      const isOrder = index - currentIndex > 0 ? true : false;
      if (index < 0) index = 0;
      //如果之前的索引和下一次的不一样则重置索引和滚动的位置
      if (currentIndex !== index) {
        _this.currentIndex = index;
        let rowsInView = 0; //可视区域显示多少行
        let rowsHeight = 0; //可视区域内容高度
        let tempIndex = index;
        //如果可视区域中需要展示的数据已经在缓存中则不重现render。
        if (viewHeight) {
          //有时滚动过快时this.cachedRowHeight[rowsInView + index]为undifined

          while (
            rowsHeight < viewHeight &&
            tempIndex < this.cachedRowHeight.length
          ) {
            if (this.cachedRowHeight[tempIndex]) {
              rowsHeight += this.cachedRowHeight[tempIndex];
              // if (
              //   (treeType &&
              //     _this.cachedRowParentIndex[tempIndex] !== tempIndex) ||
              //   !treeType
              // ) {
                rowsInView++;
              // }
            }
            tempIndex++;
          }
          // if (treeType) {
          //   const treeIndex = index;
          //   index = _this.cachedRowParentIndex[treeIndex];
          //   if (index === undefined) {
          //     // console.log('index is undefined********'+treeIndex);
          //     index = this.getParentIndex(treeIndex);
          //     // console.log("getParentIndex****"+index);
          //   }
          // }
          // console.log('parentIndex*********',index);
          // 如果rowsInView 小于 缓存的数据则重新render
          // 向下滚动 下临界值超出缓存的endIndex则重新渲染
          if (rowsInView + index > endIndex - rowDiff && isOrder) {
            startIndex = index - loadBuffer > 0 ? index - loadBuffer : 0;
            // endIndex = startIndex + rowsInView + loadBuffer*2;
            endIndex = startIndex + loadCount;
            if (treeType && endIndex > flatTreeData.length || !treeType && endIndex > data.length) {
              endIndex = treeType ? flatTreeData.length : data.length;
            }
            if (endIndex > this.endIndex ) {
              this.startIndex = startIndex;
              this.endIndex = endIndex;
              if(treeType) {
                this.handleTreeListChange(flatTreeData.slice(startIndex,endIndex), startIndex, endIndex)
              }
              this.setState({ needRender: !needRender });
              callback(parseInt(currentIndex + rowsInView));
            }
          }
          // 向上滚动，当前的index是否已经加载（currentIndex），若干上临界值小于startIndex则重新渲染
          if (!isOrder && index < startIndex + rowDiff) {
            startIndex = index - loadBuffer;
            if (startIndex < 0) {
              startIndex = 0;
            }
            if (startIndex < this.startIndex) {
              this.startIndex = startIndex;
              this.endIndex = this.startIndex + loadCount;
              if(treeType) {
                this.handleTreeListChange(flatTreeData.slice(startIndex,this.endIndex), startIndex, this.endIndex)
              }
              this.setState({ needRender: !needRender });
              callback(parseInt(currentIndex + rowsInView));
            }
            // console.log(
            //   "**index**" + index,
            //   "**startIndex**" + this.startIndex,
            //   "**endIndex**" + this.endIndex
            // );
          }
        }
      }
    };

    setRowHeight(height, index) {
      this.cachedRowHeight[index] = height;
    }
    setRowParentIndex(parentIndex, index) {
      // this.cachedRowParentIndex[index] = parentIndex;
    }
    /**
     *
     *根据当前行号获取该行的父节点行号
     * @param {*} currentIndex 当前行号
     */
    getParentIndex(targetIndex) {
      const { data } = this.props;
      let parentIndex = -1;
      parentIndex = this.getIndex(data, -1, targetIndex);
      if (parentIndex < 0) {
        //小于0说明没有展开的子节点
        parentIndex = targetIndex;
      }
      return parentIndex;
    }
    getIndex(data, index, targetIndex) {
      const parentIndex = index;
      for (let i = 0; i < data.length; i++) {
        index++;
        if (targetIndex <= index) {
          break;
        }
        if (data[i].children) {
          this.getIndex(data[i].children, index, targetIndex);
        }
      }
      return parentIndex;
    }

    onExpand = (expandState, record,index) => {
      const _this = this;
      let {expandedRowKeys = []} =  _this;
      const {needRender} = _this.state;
      const { data } = _this.props;
      const rowKey = _this.getRowKey(record, index);
      // 记录展开子表行的key
      // 展开
      if( record.children){
        if (expandState) {
            record.children.forEach((item, index) => {
              _this.expandChildRowKeys.push(rowKey);
            });
  
        } else {
          // 收起
            record.children.forEach((item, index) => {
              _this.expandChildRowKeys.splice(
                _this.expandChildRowKeys.findIndex(
                  fitem => fitem.key === item.key
                ),
                1
              );
            });
        }
      }
      //滚动加载expandedRowKeys自己维护，否则有展开不全的问题
      if(!_this.props.expandedRowKeys){
        if(expandState){
          expandedRowKeys.push(rowKey);
          this.setState({ needRender: !needRender });
        }else{
           let index = -1;
           expandedRowKeys.forEach((r, i) => {
             if (r === rowKey) {
               index = i;
             }
           });
           if (index !== -1) {
             expandedRowKeys.splice(index, 1);
             this.setState({ needRender: !needRender });
           }
        }
      }
      
      // expandState为true时，记录下
      _this.props.onExpand(expandState, record);

      if(this.treeType) {
        //收起和展开时，缓存 expandedKeys
        _this.cacheExpandedKeys = new Set(expandedRowKeys);
        //重新递归数据
        let flatTreeData = _this.deepTraversal(data);
        let sliceTreeList = flatTreeData.slice(_this.startIndex, _this.endIndex);
        _this.flatTreeData = flatTreeData;
        _this.handleTreeListChange(sliceTreeList);
        _this.cacheExpandedKeys = null;
      }
    };

    
    render() {
      const { data } = this.props;
      const { scrollTop } = this;
      let { endIndex, startIndex, treeData, treeType, flatTreeData } = this;
      let expandedRowKeys = this.props.expandedRowKeys?this.props.expandedRowKeys: this.expandedRowKeys;
      if(startIndex < 0){
        startIndex = 0;
      }
      if(endIndex < 0 ){
        endIndex = 0;
      }
      if (treeType && endIndex > flatTreeData.length || !treeType && endIndex > data.length) {
        endIndex = treeType ? flatTreeData.length : data.length;
      }
      const lazyLoad = {
        startIndex: startIndex,
        endIndex:endIndex,
        startParentIndex: startIndex //为树状节点做准备
      };
      if (treeType) {
        lazyLoad.preHeight = this.getSumHeight(0, startIndex);
        lazyLoad.sufHeight = this.getSumHeight(endIndex, flatTreeData.length);
      } else {
        lazyLoad.preHeight = this.getSumHeight(0, startIndex);
        lazyLoad.sufHeight = this.getSumHeight(endIndex, data.length);
      }
      // console.log('*******expandedRowKeys*****'+expandedRowKeys);
      const dataSource = (treeType && Array.isArray(treeData) && treeData.length > 0) ? treeData : data.slice(startIndex, endIndex);
      return (
        <Table
          {...this.props}
          data={dataSource}
          lazyLoad={lazyLoad}
          handleScrollY={this.handleScrollY}
          scrollTop={scrollTop}
          setRowHeight={this.setRowHeight}
          setRowParentIndex={this.setRowParentIndex}
          onExpand={this.onExpand}
          onExpandedRowsChange={this.props.onExpandedRowsChange}
          expandedRowKeys={expandedRowKeys}
          //   className={'lazy-table'}
        />
      );
    }
  };
}
