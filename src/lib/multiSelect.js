import React, { Component } from "react";
import PropTypes from 'prop-types';
import {ObjectAssign} from './util';
/**
 * 参数: 过滤表头
 * @param {*} Table
 * @param {*} Checkbox
 * @param {*} Popover
 * @param {*} Icon
 */

export default function multiSelect(Table, Checkbox) {

  return class MultiSelect extends Component {
    static propTypes = {
      autoCheckedByClickRows: PropTypes.bool, //行点击时，是否自动勾选复选框
    };
    static defaultProps = {
      prefixCls: "u-table-mult-select",
      getSelectedDataFunc:()=>{},
      autoSelect: false,
      autoCheckedByClickRows: true
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
      if('data' in nextProps){
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
      let checkStatus = this.checkAllSelected(data);
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
     * return  string  all(全选)、indeter(半选)
     */
    setChecked(data){
      if(!this.isArray(data))return false;
      if(data.length == 0)return false;
      let count = 0;
      let disabledCount = 0;
      data.forEach(da=>{
        if(da._checked && !da._disabled){
          count ++;
        }
        if(da._disabled){
          disabledCount ++;
        }
      })

      if(data.length == count + disabledCount && count>0){
        return "all";
      }
      return count == 0?false:"indeter";
    }

    /**
     * 重写：判断数据是否全部选中
     */
    checkAllSelected = ( data ) => {
      if(!this.isArray(data))return false;
      if(data.length == 0)return false;
      let count = 0;
      let disabledCount = 0;
      let length = 0;
      let getTree = ( arr ) => {
        arr.forEach( item  => {
          length++;
          if(item._checked && !item._disabled){
            count ++;
          }
          else if(item._disabled){
            disabledCount ++;
          }
          if(item.children){
            getTree(item.children);
          }
        })
      }
      getTree(data);
      if(length == count + disabledCount && count>0){
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
        // if(indeterminate){
        //   check = true;
        // }else{
        //   check = true;
        // }
        check = true;
      }
      let selectList = [];
      
      data.forEach(item => {
        if( item.children ){
          let res = this.setTree(item,check, true);
          selectList = selectList.concat(res);
        }
        else {
          if(!item._disabled){
            item._checked = check;
          }
         
          if(item._checked){
            selectList.push(item);
          }
        }
      });
      if(selectList.length > 0){
        indeterminate = true;
      }else{
        indeterminate = false;
      }
      this.setState({
        indeterminate:indeterminate,
        checkedAll:check
      });
      this.props.getSelectedDataFunc(selectList);
    }

    /**
     * 遍历树节点和它的子孙节点，设置_checked
     */
    setTree = ( node, flag, autoSelect) => {
      let res = [];
      let setTreeNodeFlag = ( node, flag) => {
        if(!node._disabled){
          node._checked = flag;
        }
        if(flag){
          res.push(node);
        }
        if(node.children && autoSelect){
          node.children.forEach( item => {
            setTreeNodeFlag(item, flag);
          })
        }
      }
      setTreeNodeFlag(node, flag);
      return res;
    }

    /**
     * 遍历树节点和它的子孙节点，获取对应状态的节点数组
     */
    getTree = ( node, key, value ) => {
      let res = [];
      let getTreeNodeByFlag = ( node) => {
        if(node[key] === value){
          res.push(node);
        }
        if(node.children){
          node.children.forEach( item => {
            getTreeNodeByFlag(item);
          })
        }
      }
      getTreeNodeByFlag(node);
      return res;
    }

    handleClick=()=>{
      
    }
 
    onCheckboxChange = (text, record, index) => () => {
      let {data} = this.state;
      let selectList = [];
      // record._checked = record._checked?false:true;
      let flag = record._checked ? false : true;
      if (record.children) {
        this.setTree(record, flag, this.props.autoSelect);
      }
      else {
        record._checked = flag;
      }
      let obj = this.getCheckedOrIndeter(data);
      this.setState({
        data:data,
        ...obj
      })
      data.forEach((da)=>{
        if(da.children){
          selectList = selectList.concat(this.getTree(da,'_checked',true))
        }
        else if(da._checked){
          selectList.push(da);
        }
      })
      this.props.getSelectedDataFunc(selectList,record,index);
    };

    

    getDefaultColumns=(columns)=>{
      let {checkedAll,indeterminate} = this.state;
      let checkAttr = {checked:checkedAll?true:false};
      const data = this.props.data;
      const dataLength = data.length;
      let disabledCount = 0;
      indeterminate?checkAttr.indeterminate = true:"";
      //设置表头Checkbox是否可以点击
      data.forEach((item,index,arr)=>{
        if(item._disabled){
          disabledCount++;
        }
      })

      let _defaultColumns =[{
          className: 'u-table-multiSelect-column',
          title: (
            <Checkbox
              className="table-checkbox"
              {...checkAttr}
              disabled={disabledCount==dataLength?true:false}
              onChange={this.onAllCheckChange}
            />
          ),
          key: "checkbox",
          dataIndex: "checkbox",
          fixed:"left",
          width: 49, 
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
              />
          }
        }]
        return _defaultColumns.concat(columns);
    }

    // 实现行点击时触发多选框勾选的需求
    onRowClick = (record,index,event) =>{
      if(record._disabled) return;
      let { autoCheckedByClickRows, onRowClick } = this.props;
      if(autoCheckedByClickRows) {
        this.onCheckboxChange('',record, index)();
      }
      onRowClick && onRowClick(record,index,event);
    }

    render() {
      const {columns, expandIconColumnIndex} = this.props;
      const {data} = this.state;
      return <Table {...this.props} 
        columns={this.getDefaultColumns(columns)} 
        data={data} 
        onRowClick={this.onRowClick}
        expandIconColumnIndex={expandIconColumnIndex ? expandIconColumnIndex+1 : 1}
        />
    }
  };
}
