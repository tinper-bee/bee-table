import React, { Component } from "react";
import Checkbox from 'bee-checkbox';
import Icon from "bee-icon";
import {ObjectAssign} from '../utils';
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
      this.state = { 
        columns:this.setColumOrderByIndex(ObjectAssign(columns)),
        showModal:false,
        screenY:0
      };
    }

    setColumOrderByIndex = (_column)=>{
      _column.forEach(da => {
        da.checked = true;
        da.disable = true;
      });
      return _column; 
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.columns != this.props.columns){
        this.setState({
          columns:ObjectAssign(nextProps.columns)
        })
      }
      this.setState({
        showModal:false
      })
    }

    checkedColumItemClick = (da)=>{
      let {checkMinSize} = this.props;
      // if(checkMinSize)
      let sum = 0,leng=0;
      this.state.columns.forEach(da => {
        da.fixed?"":leng++;
        !da.fixed && da.checked?sum++:"";
      });
      if(sum < checkMinSize && da.checked){
        return;
      }else{
        if(sum<=1  && da.checked)return;
      }
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
      return columns.map((da,i)=> 
      {
        if(!da.fixed){
          return (<div key={da.key+"_"+i} className={`${prefixCls}-pop-cont-item`} onClick={()=>{this.checkedColumItemClick(da)}}>
            <Checkbox id={da.key} checked={da.checked}/> 
            <span>{da.title}</span>
          </div>)
        }
      })
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

    getCloumnsScroll=(columns)=>{
      let sum = 0;
      columns.forEach((da)=>{
        if(da.checked){
          sum += da.width;
        }
      })
      console.log("sum",sum);
      return (sum);
    }

    render() {
      const {data,prefixCls,scroll:scrollPro} = this.props;
      const {columns,showModal} = this.state;

      let _columns = [],widthState=0,scroll=scrollPro;
      columns.forEach((da)=>{
        if(da.disable){
          _columns.push(da);
        }
        if(da.width){
          widthState++;
        }
      });
      if(_columns.length == widthState){
        scroll.x = this.getCloumnsScroll(columns);
      }
      
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
          <Table {...this.props} columns={_columns} data={data}  
          scroll={scroll}
          //  scroll={{x:this.getCloumnsScroll(columns)}}
           />
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
