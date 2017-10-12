import React from "react";
import clonedeep from "lodash.clonedeep";

//创建新列存放  “合计”  字段
let columns2 = {
  title: "合计",
  key: "showSum",
  dataIndex: "showSum"
};

let sum = Table => {
  return class SumTable extends React.Component {
    //无状态
    constructor(props) {
      super(props);
    }
    //合计数字列,并将计算所得数据存储到一个obj对象中
    currentFooter = () => {
      let data_2 = this.props.data;
      let columns_sum = clonedeep(this.props.columns);
      let sumCol_index;
      //用一个对象存储合计数据，这里合计对象的属性对应每列字段
      for (let i = 0; i < columns_sum.length; i++) {
        if (columns_sum[i].sumCol) {
          sumCol_index = columns_sum[i].dataIndex;
          break;
        }
      }
      let obj = {};
      obj[sumCol_index] = 0;
      if (Array.isArray(data_2)) {
        for (let i = 0; i < data_2.length; i++) {
          if (typeof data_2[i][sumCol_index] == "number") {
            obj[sumCol_index] += data_2[i][sumCol_index];
          } else {
            obj[sumCol_index] = "";
          }
        }
      }
      obj.key = "sumData";
      obj.showSum = "合计";
      obj = [obj];
      //将设置的和用户传入的合并属性
      //   if (columns_sum[0].dataIndex === "checkbox") {
      // columns_sum[1] = Object.assign({}, columns_sum[1], columns2);
      //   } else {
      columns_sum[0] = Object.assign({}, columns_sum[0], columns2);
      //   }
      //除去列为特殊渲染的，避免像a标签这种html代码写入到合计中
      columns_sum.map((item, index) => {
        if (typeof item.render == "function") {
          item.render = "";
        }
        return item;
      });
      return <Table showHeader={false} columns={columns_sum} data={obj} />;
    };
    render() {
      return (
        <Table
          columns={this.props.columns}
          data={this.props.data}
          footer={this.currentFooter}
        />
      );
    }
  };
};

export default sum;
