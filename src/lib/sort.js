import React, { Component } from "react";

/**
 * 参数：prefixCls，默认bee-table,用于设置图标的样式
 * @param {*} Table
 * @param {*} Icon
 */
export default function sort(Table, Icon) {
  const IconType = [{
    'type':'flat',
    'icon':'uf-symlist',
    'order':'flatscend',
  },{
      'type':'up',
      'icon':'uf-sortup',
      'order':'ascend',
    },{
      'type':'down',
      'icon':'uf-sortdown',
      'order':'descend',
    }
  ]
   
  return class SortTable extends Component {
    constructor(props) {
      super(props);
      let flatColumns = [];
      this._toFlatColumn(props.columns,-1,flatColumns);
      this.state = { data: this.props.data, columns: props.columns,flatColumns:flatColumns };
      
    }
    static defaultProps = { sort: { mode: "single", backSource: false } }; //默认是前端排序，值为true为后端排序
    componentWillReceiveProps(nextProps) {
     
      if (nextProps.data !== this.props.data) {
        this.setState({
          data: nextProps.data,
          oldData: nextProps.data.concat()
        });
      }
      if (nextProps.columns !== this.props.columns) {
        let flatColumns = [];
        this._toFlatColumn(nextProps.columns,-1,flatColumns);
        this.setState({ columns: nextProps.columns ,flatColumns});
       
      }
    }
    /**
     *column扁平化处理，适应多表头避免递归操作
     *
     */
    _toFlatColumn(columns,parentIndex = -1,flatColumns=[]) {
      const _this = this;
      let children = [];
      // const flatColumns = _this.state;
      columns.forEach((item,index)=>{
        item.parentIndex = parentIndex;
        children = item.children;
        flatColumns.push(item);
        if(children){
          item.children = [];
          _this._toFlatColumn(children,flatColumns.length - 1,flatColumns);
        }
      });
    }
    getOrderNum = () => {
      let orderNum = 0;
      //todo 1
      this.state.flatColumns.forEach((item, index) => {
        if (item.order == "ascend" || item.order == "descend") {
          orderNum++;
        }
      });
      return orderNum ? orderNum : 1;
    };

    /**
     * column 当前的排序的列
     * 当有的列不排序时，将该列的orderNum置为‘’，并动态的修改其他列的orderNum。
     */
    changeOrderNum = column => {
      let { flatColumns } = this.state;
      //todo 2
      flatColumns.forEach(col => {
        if (col.orderNum > column.orderNum) {
          col.orderNum--;
        }
        if (column.key == col.key) {
          col.orderNum = "";
        }
      });
      this.setState({ flatColumns });
    };
    /**
     * 获取排序字段
     */
    getOrderCols = columns => {
      let orderCols = [];
      //todo 3
      columns.forEach(item => {
        if (item.order == "ascend" || item.order == "descend") {
          orderCols.push({
            order: item.order,
            field: item.dataIndex,
            orderNum: item.orderNum
          });
        }
      });
      return orderCols;
    };

    /**
     * pre：前一条数据
     * after:后一条数据
     * orderType:升序、降序
     */
    _sortBy = (pre, after, orderCols, orderColslen, currentIndex) => {
      const currentCol = orderCols[currentIndex];
      const preKey = pre[currentCol.key];
      const afterKey = after[currentCol.key];
      let colSortFun = currentCol.sorter;
      if(typeof colSortFun !== 'function'){
        colSortFun = () => preKey - afterKey;
      }
      if (preKey == afterKey && currentIndex + 1 <= orderColslen) {
        return this._sortBy(pre, after, orderCols, orderColslen, currentIndex + 1);
      }
      if (currentCol.order == "ascend") {
       return colSortFun(pre,after);
      } else { 
        return -colSortFun(pre,after);
      }
    };
    /**
     * 多列排序 先排order为1的，其他的基于已排序的数据排
     */
    multiSort = columns => {
      let { data, oldData } = this.state;
      const self = this;
      let orderCols = {},
        orderColslen = 0;
      //todo 4
      columns.forEach(item => {
        if (item.orderNum) {
          orderColslen++;
          orderCols[item.orderNum] = item;
        }
      });
      if (orderColslen > 0) {
        data = data.sort(function(a, b) {
          return self._sortBy(a, b, orderCols, orderColslen, 1);
        });
      } else {
        data = oldData.concat();
      }
      return data;
    };

    toggleSortOrder = (order, column) => {
      let { data, oldData, flatColumns } = this.state;
      let { sort } = this.props;
      let seleObj;
      if (!oldData) {
        oldData = data.concat();
      }
      let  sortCol ;
      //单列排序，清空其他列的排序
      if (sort.mode == "single") {
        //todo 5
        flatColumns.forEach(da => {
          if (da.key == column.key) {
            seleObj = da;
          } else {
            if (da.order) {
              da.order = "flatscend";
            }
          }
        });
        seleObj.order = order;
        sortCol = [{ order: order, field: seleObj.dataIndex }]
        //通过后端请求
        if (sort.backSource && typeof sort.sortFun === "function") {
          //获取排序的字段和方式
          sort.sortFun(sortCol);
          
        } else {
          if (order === "ascend") {
            data = data.sort(function(a, b) {
              return column.sorter(a, b);
            });
          } else if (order === "descend") {
            data = data.sort(function(a, b) {
              return column.sorter(b, a);
            });
          } else {
            data = oldData.concat();
          }
          typeof sort.sortFun === "function" && sort.sortFun(sortCol,data);
        }
      } else {
        seleObj = flatColumns.find(da => da.key == column.key);
        seleObj.order = order;
        if (order === "flatscend") {
          this.changeOrderNum(column);
        }
        if (!seleObj.orderNum && (order == "ascend" || order == "descend")) {
          seleObj.orderNum = this.getOrderNum();
        }
        sortCol = this.getOrderCols(flatColumns);
        if (sort.backSource && typeof sort.sortFun === "function") {
          sort.sortFun(sortCol);
        } else {
          data = this.multiSort(flatColumns);
          typeof sort.sortFun === "function" && sort.sortFun(sortCol,data);
        }
      }
      this.setState({ data, oldData, flatColumns });
    };
    //每个column上添加orderNum属性，不排序时为“”。
    //点击时orderNum有值则不重新赋值，如果没有值，则取当前column下的有oderNum的length值。并排序
    //点击置为“”时，动态的设置相关column的orderNum值。并排序
    renderColumnsDropdown = columns => {
      let tempColumns = [],rsColumns = [];
      tempColumns = columns.map(originColumn => {
        let column = Object.assign({}, originColumn);
        return this.sortColumn(column);
      });
      rsColumns = this._flatToColumn(tempColumns);
      return rsColumns;
    };

    sortColumn = column => {
      const { mode } = this.props.sort;
      const prefixCls = "bee-table";
      let iconTypeIndex = 0;
      let sorterClass = "flat";

      if (column.order === "ascend") {
        iconTypeIndex = 1;
        sorterClass = "up";
      } else if (column.order === "descend") {
        iconTypeIndex = 2;
        sorterClass = "down";
      }

      let sortButton;

      // sorter和sortEnable均可触发排序,且sorter优先级更高
      if (column.sorter || column.sortEnable ) {
        //大于0说明不是升序就是降序，判断orderNum有没有值，没有值赋值
        if ( column.sortEnable && !column.sorter) {
          switch(column.fieldType){
            case 'number':{
              column.sorter = this.numberSortFn(column.dataIndex);
              break;
            }
            case 'stringChinese':{
              column.sorter = this.chineseSortFn(column.dataIndex);
              break;
            }
            default:{
              column.sorter = this.defaultSortFn(column.dataIndex);
              break;
            }
          }
        }
        if (iconTypeIndex > 0 && !column.orderNum && mode == "multiple") {
          column.orderNum = this.getOrderNum();
        }
        sortButton = <div className={`${prefixCls}-column-sorter`}>
            <span className={`${prefixCls}-column-sorter-${sorterClass}`} onClick={() => {
                this.toggleSortOrder(IconType[iconTypeIndex == 2 ? 0 : iconTypeIndex + 1].order, column);

                if (column.sorterClick) {
                  column.sorterClick(column, IconType[iconTypeIndex].type);
                }
              }}>
              {/* <Icon type='{IconType[iconTypeIndex].icon}' /> */}
              <i className={`uf ${IconType[iconTypeIndex].icon}`} />
              <span>{column.orderNum}</span>
            </span>
          </div>;
      }
      column.title = <span>
          {column.title}
          {sortButton}
        </span>;
      return column;
    };

    // 默认的比较函数,即字符串比较函数
    defaultSortFn = (key) => (a, b)=> {
      return a[key] >= b[key] ? 1 : -1;
    }
    // 数值比较函数
    numberSortFn = (key) => (a, b)=> {
        let numberA = parseFloat(a[key]);
        let numberB = parseFloat(b[key]);
        return numberA >= numberB ? 1 : -1;
    }

    // 中文比较函数，按拼音排序
    chineseSortFn = (key) => (a, b)=>{
      return a[key].localeCompare(b[key], 'zh-Hans-CN',{sensitivity: 'accent'});
    } 

    _flatToColumn(flatColumns){
      const colLen = flatColumns.length;
      let parentIndex,rsColumns = [];
      //每次渲染需要将父类的children置空，避免重复
      flatColumns.forEach(item=>{
        if(item.children){
          item.children = [];
        }
      })
      for(let i = colLen-1;i>=0;i--){
        parentIndex = flatColumns[i].parentIndex;
         if(parentIndex >= 0){
          flatColumns[parentIndex].children.unshift(flatColumns[i]);
         }
      }
      rsColumns = flatColumns.filter(item=>{
        return item.parentIndex == -1
      })
      return rsColumns;
    }
    render() {
      let columns = this.renderColumnsDropdown(this.state.flatColumns.concat());
      return <Table {...this.props} columns={columns} data={this.state.data} />;
    }
  };
}
