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

export default function newMultiSelect(Table, Checkbox) {

  return class NewMultiSelect extends Component {
    static defaultProps = {
      prefixCls: "u-table-mult-select"
    }

    constructor(props) {
      super(props);
      let checkedAll = this.setChecked(props.data);
      this.state = {
        checkedAll,
        data:ObjectAssign(props.data),
      }
    }

    componentWillReceiveProps(nextProps){
      if(this.props.data != nextProps.data){
        this.setState({
          data:ObjectAssign(nextProps.data),
          checkedAll:this.setChecked(nextProps.data),
        })
      }
    }

    setChecked(data){
      let allCheck = true;
      if(data){
        for (const da of data) {
          if(!da._checked){
            allCheck = false;
            break;
          }
        }
      }
      return allCheck;
    }

    onAllCheckChange=()=>{
      let {data,checkedAll} = this.state;
      let selectList = [];
      let check = checkedAll?false:true;
      data.forEach(item => {
        item._checked = check;
        if(item._checked){
          selectList.push(item);
        }
      });
      this.setState({
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
      let checkedAll = true;
      for(let i=0;i<data.length;i++){
        let item = data[i];
        if(!item._checked || item._checked == false){
          checkedAll = false;
          break;
        }
      }
      this.setState({
        ...this.state,
        checkedAll
      })
      data.forEach((da)=>{
        if(da._checked){
          selectList.push(da);
        }
      })
      this.props.getSelectedDataFunc(selectList,record,index);
    };

    

    getDefaultColumns=(columns)=>{
      // let checkedAll = init?false:this.state.checkedAll;
      let {checkedAll} = this.state;
      let _defaultColumns =[{
          title: (
            <Checkbox
              className="table-checkbox"
              checked={checkedAll}
              // indeterminate={indeterminate_bool && !this.state.checkedAll}
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