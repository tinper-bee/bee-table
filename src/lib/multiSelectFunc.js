import React, { Component } from "react";
import Checkbox from "bee-checkbox";
/**
 * multiSelect={
 *  type--默认值为checkbox
 *  param--可以设置返回的选中的数据属性；默认值：null；
 * }
 * getSelectedDataFunc--function，能获取到选中的数据
 * 使用全选时得注意，data中的key值一定要是唯一值
 */
module.exports = function multiTable(Table) {
  Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == val) return i;
    }
    return -1;
  };
  Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };
  return class BookLoader extends Component {
    constructor(props) {
      super(props);
      this.state = {
        checkedAll: false,
        checkedObj: {},
        selIds: [],
        data: this.props.data
      };
    }
    onAllCheckChange = () => {
      let self = this;
      let listData = self.state.data.concat();
      let checkedObj = Object.assign({}, self.state.checkedObj);
      let data = self.props.data;
      let selIds = [];
      let id = self.props.multiSelect.param;
      for (var i = 0; i < data.length; i++) {
        checkedObj[data[i]["key"]] = !self.state.checkedAll;
      }
      if (self.state.checkedAll) {
        selIds = [];
      } else {
        for (var i = 0; i < listData.length; i++) {
          if (id) {
            selIds[i] = listData[i][id];
          } else {
            selIds[i] = listData[i];
          }
        }
      }
      self.setState({
        checkedAll: !self.state.checkedAll,
        checkedObj: checkedObj,
        selIds: selIds
      });
      self.props.getSelectedDataFunc(selIds);
    };
    onCheckboxChange = (text, record, index) => {
      let self = this;
      let allFlag = false;
      let selIds = self.state.selIds;
      let id = self.props.multiSelect.param
        ? record[self.props.multiSelect.param]
        : record;
      let checkedObj = Object.assign({}, self.state.checkedObj);
      let checkedArray = Object.keys(checkedObj);
      if (checkedObj[record["key"]]) {
        selIds.remove(id);
      } else {
        selIds.push(id);
      }
      checkedObj[record["key"]] = !checkedObj[record["key"]];
      for (var i = 0; i < checkedArray.length; i++) {
        if (!checkedObj[checkedArray[i]]) {
          allFlag = false;
          break;
        } else {
          allFlag = true;
        }
      }
      self.setState({
        checkedAll: allFlag,
        checkedObj: checkedObj,
        selIds: selIds
      });
      self.props.getSelectedDataFunc(selIds);
    };
    renderColumnsMultiSelect(columns) {
      const { data } = this.state;
      let checkedObj = Object.assign({}, this.state.checkedObj);
      let checkedArray = Object.keys(checkedObj);
      let { multiSelect } = this.props;
      let select_column = {};
      let indeterminate_bool = false;
      if (!multiSelect || !multiSelect.type) {
        multiSelect = Object.assign({}, multiSelect, { type: "checkbox" });
      }
      if (multiSelect && multiSelect.type === "checkbox") {
        let i = checkedArray.length;
        while (i--) {
          if (checkedObj[checkedArray[i]]) {
            indeterminate_bool = true;
            break;
          }
        }
        let defaultColumns = [
          {
            title: (
              <Checkbox
                className="table-checkbox"
                checked={this.state.checkedAll}
                indeterminate={indeterminate_bool && !this.state.checkedAll}
                onChange={this.onAllCheckChange}
              />
            ),
            key: "checkbox",
            dataIndex: "checkbox",
            width: "5%",
            render: (text, record, index) => {
              return (
                <Checkbox
                  className="table-checkbox"
                  checked={checkedObj[record.key]}
                  onChange={this.onCheckboxChange.bind(
                    this,
                    text,
                    record,
                    index
                  )}
                />
              );
            }
          }
        ];
        columns = defaultColumns.concat(columns);
      }
      return columns;
    }
    render() {
      let { data } = this.props;
      let columns = this.renderColumnsMultiSelect(this.props.columns).concat();
      return <Table {...this.props} columns={columns} data={data} />;
    }
  };
};
