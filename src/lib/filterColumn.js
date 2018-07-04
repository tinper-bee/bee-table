import React, { Component } from "react";
import Checkbox from 'bee-checkbox';
import Icon from "bee-icon";
/**
 * 参数: 过滤表头
 * @param {*} Table
 * @param {*} Popover
 * @param {*} Icon
 */

export default function filterColumn(Table,Popover) {

  return class FilterColumn extends Component {
    static defaultProps = {
      prefixCls: "u-table-filter-column"
    }

    constructor(props) {
      super(props);
      const {columns} = props;
      let _column = [];
      Object.assign(_column,columns);
      _column.forEach(da => {
        da.checked = true;
        da.disable = true;
      });
      this.state = { 
        columns:_column,
        showModal:false,
        screenY:0
      };
    }

    componentWillReceiveProps(nextProps){
      this.setState({
        showModal:false
      })
    }

    checkedColumItemClick = (da)=>{
      da.checked = da.checked?false:true;
      da.disable  = da.checked?true:false;
      this.setState({
        ...this.state
      })
    }
  
    openCloumList = ()=>{
      this.setState({ 
        showModal:true
      });
    }

    getCloumItem=()=>{
      const {prefixCls} = this.props;
      const {columns} = this.state;
      return columns.map((da,i)=> (<div key={da.key+"_"+i} className={`${prefixCls}-pop-cont-item`} onClick={()=>{this.checkedColumItemClick(da)}}>
          <Checkbox id={da.key} checked={da.checked}/> 
          <span>{da.title}</span>
        </div>))
    }

    clear=()=>{
      const {columns} = this.state; 
      columns.forEach(da => {
        da.checked = true;
        da.disable  = true;
      });
      this.setState({
        ...this.state
      })
    }

    render() {
      const {data,prefixCls} = this.props;
      const {columns,showModal} = this.state;
      let _columns = [];
      columns.forEach((da)=>{
        if(da.disable){
          _columns.push(da);
        }
      });

      let content = (
        <div className={`${prefixCls}-pop-cont`}> 
        <span className={`${prefixCls}-clear-setting`} onClick={this.clear}>清除设置</span>
        <div>
           {
            this.getCloumItem()
           }
        </div>
      </div>);

      return <div className={`${prefixCls}-cont`}>
          <Table {...this.props} columns={_columns} data={data} />
          <div className={`${prefixCls}-filter-icon`}>
            <Popover
              id="filter_column_popover"
              placement="leftTop"
              content={content}
              show={showModal}   >
                <div className={`${prefixCls}-pop-column-filter-cont`}>
                  <Icon type="uf-navmenu" onClick={this.openCloumList}/>
                </div>
            </Popover>
          </div>
        </div>;
    }
  };
}
