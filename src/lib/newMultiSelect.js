import React, { Component } from "react";
import Checkbox from 'bee-checkbox';
import {ObjectAssign} from '../utils';
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
      this.state = {
        checkedAll:false,
        // columns:this.getDefaultColumns(props.columns,"init"),
        data:ObjectAssign(props.data),
      }
    }

    componentWillReceiveProps(nextProps){
      // if(this.props.columns != nextProps.columns){
      //   this.setState({
      //     columns:this.getDefaultColumns(nextProps.columns)
      //   })
      // }
      if(this.props.data != nextProps.data){
        this.setState({
          data:ObjectAssign(nextProps.data)
        })
      }
    }

    onAllCheckChange=()=>{
      let {data,checkedAll} = this.state;
      let check = checkedAll?false:true;
      data.forEach(item => {
        item.checked = check;
      });
      this.setState({
        checkedAll:check
      })
    }

    handleClick=()=>{
      
    }
 
    onCheckboxChange = (text, record, index) => () => {
      let {data} = this.state;
      record.checked = record.checked?false:true;
      let checkedAll = true;
      for(let i=0;i<data.length;i++){
        let item = data[i];
        if(!item.checked || item.checked == false){
          checkedAll = false;
          break;
        }
      }
      this.setState({
        ...this.state,
        checkedAll
      })
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
            return <Checkbox
                key={index}
                className="table-checkbox"
                checked={record.checked}
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
