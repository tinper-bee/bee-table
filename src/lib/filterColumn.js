import React, { Component } from "react";
import Icon from "bee-icon";
import Popconfirm from "bee-popconfirm";
import Checkbox from "bee-checkbox";
/**
 * 参数: 过滤表头
 * @param {*} Table
 */
export default function filterColumn(Table) {

  return class filterColumn extends Component {

    // static  propTypes = {
    //   showFilterColumn:PropTypes.boolen,//是否需要过滤表头
    // }

    constructor(props) {
      super(props);
      // this.state = {
      //   sortOrder: "",
      //   data: this.props.data
      // };
    }
    // componentWillReceiveProps(nextProps){
    //   if(nextProps.data !== this.props.data){
    //     this.setState({
    //       sortOrder: "",
    //       data: nextProps.data,
    //       oldData: nextProps.data.concat(),
    //     });
    //   }
    // }

    getColumItem=()=>{
      const {columns,data} = this.props;
      debugger;
      columns.map((da,i)=>(<div>
        <div><Checkbox /></div>
        <div>111</div>
      </div>));
    }


    render() {
      const {columns,data} = this.props;
      return <div className="bee-table-column-filter-cont">
          <Table {...this.props} columns={columns} data={data} />
          <div className="bee-table-column-filter"><Icon type="uf-navmenu" /></div>

          <Popconfirm trigger="click" placement="right">
              <span>清除设置</span>
              <div>
                  ssss
              </div>
          </Popconfirm>
        </div>;
    }
  };
}