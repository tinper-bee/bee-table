import React from 'react';
import Table from "../../src";

var Sum =  (Table)=>{
    class SumTable extends React.Component{
        //无状态
        constructor(props){
            super(props);
        }

        currentData = ()=>{
            return <div>{this.props.title}</div>;
        }

        //合计数字列
        currentData2 = () =>{
            let data_2 = this.props.data;
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
            return <Table
            showHeader={false}
            columns={this.props.columns}
            data={[obj]}
            heji={true}
            />
        }

        render(){
            return <Table
                columns={this.props.columns}
                data={this.props.data}
                heji={true}
                title={this.currentData}
                footer={this.currentData2}
                /> 
        }
    }
    return SumTable;
}

export default Sum;