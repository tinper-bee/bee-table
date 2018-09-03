import React, { Component } from "react";

/**
 * 参数：prefixCls，默认bee-table,用于设置图标的样式
 * @param {*} Table
 * @param {*} Icon
 */
export default function sort(Table, Icon) {
  return class SortTable extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: this.props.data,
        columns:props.columns, 
      };
    }
    componentWillReceiveProps(nextProps){
      if(nextProps.data !== this.props.data){
        this.setState({ 
          data: nextProps.data,
          oldData: nextProps.data.concat(),
        });
      }
      if(nextProps.columns !== this.props.columns){
        this.setState({
          columns: nextProps.columns, 
        });
      }
    }
    toggleSortOrder = (order, column) => {
      let { data, oldData ,columns} = this.state;
      let ascend_sort = function(key) {
        return function(a, b) {
          return a.key - b.key;
        };
      };
      let descend_sort = function(key) {
        return function(a, b) {
          return b.key - a.key;
        };
      };
      // if (sortOrder === order) {
      //   // 切换为未排序状态
      //   order = "";
      // }
      if (!oldData) {
        oldData = data.concat();
      }
      if (order === "ascend") {
        data = data.sort(function(a, b) {
          return column.sorter(a, b);
        });
      } else if (order === "descend") {
        data = data.sort(function(a, b) {
          return column.sorter(b, a);
        });
      } else {
        data = oldData.concat();
      }
      let seleObj = columns.find(da=>da.key == column.key);
      seleObj.order = order;
      this.setState({ 
        data,
        oldData,
        columns
      });
    };
    renderColumnsDropdown=(columns)=>{
      const prefixCls = "bee-table";
      return columns.map(originColumn => {
        let column = Object.assign({}, originColumn);
        let sortButton;
        if (column.sorter) {
          let isAscend = column.order && column.order === "ascend";
          let isDescend = column.order && column.order === "descend";
          sortButton = (
            <div className={`${prefixCls}-column-sorter`}>
              <span
                className={`${prefixCls}-column-sorter-up ${
                  isAscend ? "on" : "off"
                }`}
                title="↑"
                onClick={() =>{ 
                  this.toggleSortOrder("ascend", column);

                  if(column.sorterClick){
                    column.sorterClick(column,"up");
                  }
                } }
              >
                <Icon type="uf-triangle-up" />
              </span>
              <span
                className={`${prefixCls}-column-sorter-down ${
                  isDescend ? "on" : "off"
                }`}
                title="↓"
                onClick={() => {
                  this.toggleSortOrder("descend", column);
                  if(column.sorterClick){
                    column.sorterClick(column,"down");
                  }
                }}
              >
                <Icon type="uf-triangle-down" />
              </span>
            </div>
          );
        }
        column.title = (
          <span>
            {column.title}
            {sortButton}
          </span>
        );
        return column;
      });
    }
    render() {
      let columns = this.renderColumnsDropdown(this.state.columns.concat());
      return <Table {...this.props} columns={columns} data={this.state.data} />;
    }
  };
}
