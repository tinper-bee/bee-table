import React, { Component } from "react";

/**
 * 参数：prefixCls，默认bee-table,用于设置图标的样式
 * @param {*} Table
 * @param {*} Icon
 */
export default function sort(Table, Icon) {
  const IconType = [{
    'type':'noSort',
    'icon':'uf-symlist',
    'order':'',
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
      sort: {mode:'single'}
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
    //当有的列不排序时，将该列的orderNum置为‘’，并动态的修改其他列的orderNum。
    /**
     * column 当前的排序的列
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
     * 获取排序方式
     */
    getColAndOrderType = ()=>{

    }
    toggleSortOrder = (order, column) => {
      let { data, oldData ,columns} = this.state;
      let {sort} = this.props;
      // let ascend_sort = function(key) {
      //   return function(a, b) {
      //     return a.key - b.key;
      //   };
      // };
      // let descend_sort = function(key) {
      //   return function(a, b) {
      //     return b.key - a.key;
      //   };
      // };
     
      if (!oldData) {
        oldData = data.concat();
      }
      let seleObj = columns.find(da=>da.key == column.key);
      seleObj.order = order;
      if(!seleObj.orderNum && (order=='ascend'||order=='descend')){
        seleObj.orderNum = this.getOrderNum();
      }
      //通过后端请求
      if(sort.backSource){
        //获取排序的字段和方式
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
          this.changeOrderNum(column);
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
        
        if(column.order ){
          if(column.order === "ascend"){
            iconTypeIndex = 1;
          }
          if(column.order === "descend"){
            iconTypeIndex = 2;
          }
        }
        let sortButton;
        if (column.sorter) {
          // //大于0说明不是升序就是降序，判断orderNum有没有值，没有值赋值
          // if(iconTypeIndex>0 && !column.orderNum && mode=='multiple'){
          //   column.orderNum = this.getOrderNum();
          //   console.log(column.orderNum);
          // }
          sortButton = (
            <div className={`${prefixCls}-column-sorter`}>
              <span
                className={`${prefixCls}-column-sorter-up `}
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
