import React from 'react';
import Table from "../../src";

 //创建新列存放  “合计”  字段
 let columns2 = {};
 columns2 = {
 title: "合计",
     key: "showSum",
     dataIndex: "showSum",
     width: "5%"
 }

var Sum =  (Table)=>{
    class SumTable extends React.Component{
        //无状态
        constructor(props){
            super(props)
        }

        currentTitle = ()=>{
            return <div>{this.props.title}</div>;
        }

        //合计数字列,并将计算所得数据存储到一个obj对象中
        currentFooter = () =>{
            let data_2 = this.props.data;
            //用一个对象存储合计数据，这里合计对象的属性对应每列字段
            let obj ={};
            if(Array.isArray(data_2)){
                for(let i =0;i<data_2.length;i++){
                    for(let item in data_2[i]){
                        if(typeof obj[item] === 'undefined'){
                            obj[item] = data_2[i][item];
                        }
                        else if(typeof data_2[i][item] == 'number'){
                            obj[item] += data_2[i][item];
                        }
                        else{
                            obj[item] = ""
                        }
                    }
                }
            }
            //加key
            obj.key = 'sumData';
            //设置新建列的名称
            obj.showSum = "合计"
            obj =[obj];
            //添加合计行
            let columns_sum = this.props.columns;
            //针对多选除去多选框，即第一列，换为新建的列
            this.props.columns[0].dataIndex == "checkbox"?columns_sum[0] = columns2:columns_sum.unshift(columns2);
            console.log(columns_sum)
            //除去列为特殊渲染的，避免像a标签这种html代码写入到合计中
            columns_sum = columns_sum.map((item,index)=>{
                if(typeof item.render == "function"){
                    delete item.render;
                }
                return item;
            })
            
            return <Table
            showHeader={false}
            columns={columns_sum}
            data={obj}
            heji={true}
            />
        }
        render(){
            return <Table
                columns={this.props.columns}
                data={this.props.data}
                heji={true}
                title={this.currentTitle}
                footer={this.currentFooter}
                /> 
        }
    }
    return SumTable;
}

export default Sum;