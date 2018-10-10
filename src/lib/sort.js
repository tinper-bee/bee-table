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
      this.state = {
        data: this.props.data,
        columns:props.columns, 
      };
    }
    static defaultProps = {
      sort: {
              mode:'single',
              backSource:false //默认是前端排序，值为true为后端排序
            }
   };
    componentWillReceiveProps(nextProps){
      if(nextProps.data !== this.props.data){
        this.setState({ 
          data: nextProps.data,
          oldData: nextProps.data.concat(),
        });
      }
      if(nextProps.columns !== this.props.columns){
        this.setState({
          columns: nextProps.columns, 
        });
      }
    }
    getOrderNum =()=>{
      let orderNum=0 ;
      this.state.columns.forEach((item,index)=>{
        if(item.order=='ascend' || item.order=='descend'){
          orderNum++;
        }
      })
      return orderNum?orderNum:1;
    }
    
    /**
     * column 当前的排序的列
     * 当有的列不排序时，将该列的orderNum置为‘’，并动态的修改其他列的orderNum。
     */
    changeOrderNum = (column)=>{
      let {columns} = this.state;
      columns.forEach((col)=>{
        if(col.orderNum>column.orderNum){
          col.orderNum--;
        }
        if(column.key == col.key){
          col.orderNum = '';
        }
      })
     this.setState({columns});

    }
    /**
     * 获取排序字段
     */
    getOrderCols = (columns)=>{
      let orderCols = [];
      columns.forEach(item=>{
        if(item.order=='ascend'||item.order=='descend'){
          orderCols.push({order:item.order,
            field:item.dataIndex,
            orderNum:item.orderNum
          });
        }
      })
      return orderCols;
    }
   
   /**
    * pre：前一条数据
    * after:后一条数据
    * orderType:升序、降序
    */
    _sortBy=(pre,after,orderCols,orderColslen,currentIndex)=>{
      const preKey = pre[orderCols[currentIndex].key];
      const afterKey = after[orderCols[currentIndex].key];
      if(preKey == afterKey && currentIndex+1<=orderColslen){
        return this._sortBy(pre,after,orderCols,orderColslen,currentIndex+1);
      }
      if(orderCols[currentIndex].order=='ascend'){
        return preKey  - afterKey
      }else{
        return afterKey - preKey
      }
    }
    /**
     * 多列排序 先排order为1的，其他的基于已排序的数据排
     */
    multiSort = (columns)=>{
      let {data, oldData} = this.state;
      const self = this;
      let orderCols = {},orderColslen=0;
      columns.forEach(item=>{
        if(item.orderNum){
          orderColslen++;
          orderCols[item.orderNum] = item;
        }
      })
      if(orderColslen>0){
        data = data.sort(function(a, b) {
          return self._sortBy(a,b,orderCols,orderColslen,1);
        });
      }else{
        data = oldData.concat();
      }
      return data;

    }

    toggleSortOrder = (order, column) => {
      let { data, oldData ,columns} = this.state;
      let {sort} = this.props;
      let seleObj;
      if (!oldData) {
        oldData = data.concat();
      }
      //单列排序，清空其他列的排序
      if(sort.mode == 'single'){
        columns.forEach(da=>{
          if(da.key == column.key){
            seleObj = da;
          }else{
            if(da.order){
              da.order = 'flatscend';
            }
          }
        })
        seleObj.order = order;
        //通过后端请求
        if(sort.backSource && typeof sort.sortFun === "function"){
          //获取排序的字段和方式
          sort.sortFun([{
            order:order,
            field:seleObj.dataIndex
          }]);
        }else{
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
        }
      }else{
        seleObj = columns.find(da=>da.key == column.key);
        seleObj.order = order;
        if(order === "flatscend"){
          this.changeOrderNum(column);
        }
        if(!seleObj.orderNum && (order=='ascend'||order=='descend')){
          seleObj.orderNum = this.getOrderNum();
        }
        if(sort.backSource && typeof sort.sortFun === "function"){
          sort.sortFun(this.getOrderCols(columns));
        }else{
          data = this.multiSort(columns);
        }
         
      }
      this.setState({ 
        data,
        oldData,
        columns
      });
    };
    //每个column上添加orderNum属性，不排序时为“”。
    //点击时orderNum有值则不重新赋值，如果没有值，则取当前column下的有oderNum的length值。并排序
    //点击置为“”时，动态的设置相关column的orderNum值。并排序
    renderColumnsDropdown=(columns)=>{
      const prefixCls = "bee-table";
      const {mode} = this.props.sort;
      return columns.map(originColumn => {
        let iconTypeIndex = 0;
        let column = Object.assign({}, originColumn);
        let sorterClass = 'flat';
     
        if(column.order === "ascend"){
          iconTypeIndex = 1;
          sorterClass = 'up'
        }else if(column.order === "descend"){
          iconTypeIndex = 2;
          sorterClass = 'down'
        }
        
        let sortButton;
        if (column.sorter) {
          //大于0说明不是升序就是降序，判断orderNum有没有值，没有值赋值
          if(iconTypeIndex>0 && !column.orderNum && mode=='multiple'){
            column.orderNum = this.getOrderNum();
          }
          sortButton = (
            <div className={`${prefixCls}-column-sorter`}>
              <span
                className={`${prefixCls}-column-sorter-${sorterClass}`}
                onClick={() =>{ 
                  this.toggleSortOrder(IconType[iconTypeIndex==2?0:iconTypeIndex+1].order, column);

                  if(column.sorterClick){
                    column.sorterClick(column,IconType[iconTypeIndex].type);
                  }
                } }
              >
                <Icon type={IconType[iconTypeIndex].icon} />
                <span >{column.orderNum}</span>
              </span>
              
            </div>
          );
        }
        column.title = (
          <span>
            {column.title}
            {sortButton}
          </span>
        );
        return column;
      });
    }
    render() {
      let columns = this.renderColumnsDropdown(this.state.columns.concat());
      return <Table {...this.props} columns={columns} data={this.state.data} />;
    }
  };
}
