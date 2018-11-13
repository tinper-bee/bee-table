import React from "react";

//创建新列存放  “合计”  字段
let columns2 = {
  title: "合计",
  key: "showSum",
  dataIndex: "showSum"
};

export default function sum(Table) {
  return class SumTable extends React.Component {
    //无状态
    constructor(props) {
      super(props);
      //array , tree
      this.tableType = "array";
    }

    componentWillReceiveProps(nextProps){
      const {columns} = this.props;
      if(columns != nextProps.columns){
        this.setFooterRender();
      }
    }

    //合计数字列,并将计算所得数据存储到一个obj对象中
    currentFooter = () => {
      let data_2 = this.props.data;
      let columns_sum = this.props.columns.concat();
      let sumCol_index,sumColIndexArr=[];
      //用一个对象存储合计数据，这里合计对象的属性对应每列字段
      for (let i = 0; i < columns_sum.length; i++) {
        if (columns_sum[i].sumCol) {
          sumColIndexArr.push(columns_sum[i].dataIndex);
        }
      }
      let obj = {};
      sumColIndexArr.forEach(sumCol_index=>{
        
        obj[sumCol_index] = 0;
        if (Array.isArray(data_2)) {
          for (let i = 0; i < data_2.length; i++) {
            if (
              typeof data_2[i][sumCol_index] == "number" ||
              !isNaN(data_2[i][sumCol_index])
            ) {
              obj[sumCol_index] -= -data_2[i][sumCol_index];
            } else {
              obj[sumCol_index] = "";
            }
          }
        }
        obj.key = sumCol_index+"sumData";
        
      })
      obj.showSum = "合计";
      obj = [obj];
      //将设置的和用户传入的合并属性
      columns_sum[0] = Object.assign({}, columns_sum[0], columns2);
      //除去列为特殊渲染的，避免像a标签这种html代码写入到合计中
      columns_sum.map((item, index) => {
        if (typeof item.render == "function" && !item.sumCol) {
          item.render = "";
        }
        return item;
      });
      return <Table{...this.props} loading={false} footerScroll showHeader={false} columns={columns_sum} data={obj} originWidth={true}/>;
    };

    currentTreeFooter =()=>{
      const {columns,data} = this.props;
      let _columns = [];
      this.getNodeItem(columns,_columns);
      let _countObj = {};
      for (let column of _columns) {
        if (typeof column.render == "function" && !column.sumCol) {
          column.render = "";
        }
        if(column.sumCol){
          let count = 0;
          data.forEach((da,i)=>{
            let _num = da[column.key];
            count += _num;
          })
          _countObj[column.key] = count;
        }
      }
      let _sumArray = [{key:"sumData",showSum:"合计",..._countObj}];
      columns[0] = Object.assign({}, columns[0], columns2);
      return <Table{...this.props} bordered={false} loading={false} footerScroll showHeader={false} columns={columns} data={_sumArray} originWidth={true}/>;
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

    setFooterRender=()=>{
      const {columns} = this.props;
      if (!Array.isArray(columns)) {console.log("data type is error !");return;}
      let type = this.getTableType();
      if(type == "tree"){
        return this.currentTreeFooter();
      }else{
        return this.currentFooter();
      }
    }

    render() {
      return (
        <Table
          {...this.props}
          footerScroll
          columns={this.props.columns}
          data={this.props.data}
          footer={this.setFooterRender}
          // originWidth={true}
        />
      );
    }
  };
}
