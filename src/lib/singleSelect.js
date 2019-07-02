import React, { Component } from "react";
import {ObjectAssign} from './util';
/**
 * 参数: 单选表头
 * @param {*} Table
 * @param {*} Radio
 */

export default function singleSelect(Table, Radio) {

  return class SingleSelect extends Component {
    static defaultProps = {
      prefixCls: "u-table-single-select",
      getSelectedDataFunc:()=>{},
      selectedRowIndex: ''
    }

    constructor(props) {
      super(props);
      this.state = {
        data:ObjectAssign(props.data),
        selectedRowIndex: props.selectedRowIndex
      }
    }

    componentWillReceiveProps(nextProps){
      if('data' in nextProps){
        this.setState({
          data: ObjectAssign(nextProps.data),
        })
      }
      if('selectedRowIndex' in nextProps){
        this.setState({
          selectedRowIndex: nextProps.selectedRowIndex
        })
      }
    }

    /**
     * 判断是否是数组
     * @param {*} o 
     */
    isArray(o){
        return Object.prototype.toString.call(o)=='[object Array]';
    }

    onRadioChange = (value, record, index) => {
      let { selectedRowIndex } = this.state;
      if(selectedRowIndex === index){
        this.setState({selectedRowIndex: ''});
        this.props.getSelectedDataFunc();
      }else{
        this.setState({selectedRowIndex: index});
        this.props.getSelectedDataFunc(record,index);
      }
    }

    getDefaultColumns=(columns)=>{
      let {selectedRowIndex} = this.state;

      let _defaultColumns =[{
          title: '',
          key: "radio",
          dataIndex: "radio",
          fixed:"left",
          width: 49, 
          render: (text, record, index) => {
            return <Radio.RadioGroup 
                    className="table-radio" 
                    name="table-radio" 
                    selectedValue={selectedRowIndex}
                    onChange={value => this.onRadioChange(value, record, index)}
                    style={{width:'14px', height:'14px', display:'block', marginLeft:'4px'}}>
                    <Radio value={index}/>
                  </Radio.RadioGroup>
          }
        }]
        return _defaultColumns.concat(columns);
    }

    render() {
      const {columns} = this.props;
      const {data} = this.state;
      return <Table 
              {...this.props} 
              columns={this.getDefaultColumns(columns)} 
              data={data} />
    }
  };
}
