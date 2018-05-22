import React, { Component } from "react";
import Icon from "bee-icon";

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
        sortOrder: "",
        data: this.props.data
      };
    }
    componentWillReceiveProps(nextProps){
      if(nextProps.data !== this.props.data){
        this.setState({
          sortOrder: "",
          data: nextProps.data,
          oldData: nextProps.data.concat(),
        });
      }
    }
    toggleSortOrder = (order, column) => {
      let { sortOrder, data, oldData } = this.state;
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
      if (sortOrder === order) {
        // 切换为未排序状态
        order = "";
      }
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
      this.setState({
        sortOrder: order,
        data: data,
        oldData: oldData
      });
    };
    renderColumnsDropdown(columns) {
      const { sortOrder } = this.state;
      const prefixCls = this.props.prefixCls || "bee-table";
      return columns.map(originColumn => {
        let column = Object.assign({}, originColumn);
        let sortButton;
        if (column.sorter) {
          const isAscend = sortOrder === "ascend";
          const isDescend = sortOrder === "descend";
          sortButton = (
            <div className={`${prefixCls}-column-sorter`}>
              <span
                className={`${prefixCls}-column-sorter-up ${
                  isAscend ? "on" : "off"
                }`}
                title="↑"
                onClick={() => this.toggleSortOrder("ascend", column)}
              >
                <Icon type="uf-triangle-up" />
              </span>
              <span
                className={`${prefixCls}-column-sorter-down ${
                  isDescend ? "on" : "off"
                }`}
                title="↓"
                onClick={() => this.toggleSortOrder("descend", column)}
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
      let columns = this.renderColumnsDropdown(this.props.columns.concat());
      return <Table {...this.props} columns={columns} data={this.state.data} />;
    }
  };
}
