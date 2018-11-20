import React, { Component } from "react";
import Checkbox from 'bee-checkbox';
import {ObjectAssign} from './util';
/**
 * 参数: 过滤表头
 * @param {*} Table
 * @param {*} Checkbox
 * @param {*} Popover
 * @param {*} Icon
 */

export default function multiSelect(Table, Checkbox) {

  return class NewMultiSelect extends Component {
    static defaultProps = {
      prefixCls: "u-table-mult-select"
    }

    constructor(props) {
      super(props);
      let obj = this.getCheckedOrIndeter(props.data);
      this.state = {
        ...obj,
        data:ObjectAssign(props.data),
      }
    }

    componentWillReceiveProps(nextProps){
      if(this.props.data != nextProps.data){
        let obj = this.getCheckedOrIndeter(nextProps.data);
        this.setState({
          ...obj,
          data:ObjectAssign(nextProps.data),
        })
      }
    }

    /**
     * @param {*} data 
     */
    getCheckedOrIndeter(data){
      let obj = {};
      let checkStatus = this.setChecked(data);
      if(!checkStatus){
        obj.checkedAll = false;
        obj.indeterminate = false;
        return obj;
      }
      if(checkStatus == 'indeter'){
        obj.indeterminate = true;
        obj.checkedAll = false;
      }else if(checkStatus == 'all'){
        obj.checkedAll = true;
        obj.indeterminate = false;
      }
      return obj;
    }

    /**
     * 判断数据是否全部选中
     * @param {*} data 
     * reutnr  string  all(全选)、indeter(半选)
     */
    setChecked(data){
      if(!this.isArray(data))return false;
      let count = 0;
      data.forEach(da=>{
        if(da._checked){
          count ++;
        }
      })

      if(data.length == count){
        return "all";
      }
      return count == 0?false:"indeter";
    }

    /**
     * 判断是否是数组
     * @param {*} o 
     */
    isArray(o){
        return Object.prototype.toString.call(o)=='[object Array]';
    }


    onAllCheckChange=()=>{
      let {data,checkedAll,indeterminate} = this.state;
      let check = false;
      if(checkedAll){
        check = false;
      }else{
        if(indeterminate){
          check = true;
        }else{
          check = true;
        }
      }
      let selectList = [];
      data.forEach(item => {
        item._checked = check;
        if(item._checked){
          selectList.push(item);
        }
      });
      this.setState({
        indeterminate:false,
        checkedAll:check
      });
      this.props.getSelectedDataFunc(selectList);
    }

    handleClick=()=>{
      
    }
 
    onCheckboxChange = (text, record, index) => () => {
      let {data} = this.state;
      let selectList = [];
      record._checked = record._checked?false:true;
      let obj = this.getCheckedOrIndeter(data);
      this.setState({
        data:data,
        ...obj
      })
      data.forEach((da)=>{
        if(da._checked){
          selectList.push(da);
        }
      })
      this.props.getSelectedDataFunc(selectList,record,index);
    };

    

    getDefaultColumns=(columns)=>{
      let {checkedAll,indeterminate} = this.state;
      let checkAttr = {checked:checkedAll?true:false};
      indeterminate?checkAttr.indeterminate = true:"";
      let _defaultColumns =[{
          title: (
            <Checkbox
              className="table-checkbox"
              {...checkAttr}
              onChange={this.onAllCheckChange}
            />
          ),
          key: "checkbox",
          dataIndex: "checkbox",
         fixed:"left",
          width: 50, 
          render: (text, record, index) => {
            let attr = {};
            record._disabled?attr.disabled = record._disabled:"";
            return <Checkbox
                key={index}
                className="table-checkbox"
                {...attr}
                checked={record._checked}
                onClick={this.handleClick}
                onChange={this.onCheckboxChange(text, record, index)}
              ></Checkbox>
          }
        }]
        return _defaultColumns.concat(columns);
    }

    render() {
      const {columns} = this.props;
      const {data} = this.state;
      return <Table {...this.props} columns={this.getDefaultColumns(columns)} data={data} />
    }
  };
}
