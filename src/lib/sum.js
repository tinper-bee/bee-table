import React from "react";

import {DicimalFormater} from "../utils";
export default function sum(Table) {
  return class SumTable extends React.Component {
    //无状态
    constructor(props) {
      super(props);
      //array , tree
      this.tableType = "array";
    }


    getNodeItem =(array,newArray)=>{
      array.forEach((da,i)=>{
        if(da.children){
          this.getNodeItem(da.children,newArray);
        }else{
          newArray.push(da);
        }
      });
    }

    /**
     * 获取当前的表格类型。
     * 
     */
    getTableType=()=>{
      const {columns} = this.props;
      let type = "array";
      columns.find((da,i)=>{
        if(da.children){
          type = "tree";
          return type;
        }
      })
      return type;
    }



    addSumData=()=>{
      let {data=[],columns=[]} = this.props;
      let sumdata = {},newColumns = [],newData = [];
      if (!Array.isArray(columns)) {console.log("columns type is error !");return;}
      let type = this.getTableType();
      if(type == 'tree'){
        this.getNodeItem(columns,newColumns);
      }else{
        newColumns = columns;
      }
      //返回一个新的数据
      newData = data.slice();
      newColumns.forEach((column,index)=>{
        sumdata[column.dataIndex] = "";
        if(column.sumCol){
          let count = 0;
          data.forEach((da,i)=>{
            
            let _num = parseFloat(da[column.key]);
            //排查字段值为NAN情况
            if(_num == _num){
              count += _num;
            }
            
          })
          sumdata[column.dataIndex] = DicimalFormater(count,2);
        }
        if(index == 0){
          sumdata[column.dataIndex] = "合计 "+sumdata[column.dataIndex];
        }
      })
       
      newData.push(sumdata);
      return newData;
    }

    render() {
      return (
        <Table
          {...this.props}
          columns={this.props.columns}
          showSum={true}
          data={this.addSumData()}
        />
      );
    }
  };
}
