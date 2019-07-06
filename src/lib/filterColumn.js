import React, { Component } from "react";
import Checkbox from "bee-checkbox";
import Icon from "bee-icon";
import { ObjectAssign } from "./util";
import i18n from "./i18n";
import { getComponentLocale } from "bee-locale/build/tool";
import PropTypes from "prop-types";
function noop() {}
/**
 * 参数: 过滤表头
 * @param {*} Table
 * @param {*} Popover
 * @param {*} Icon
 */

export default function filterColumn(Table, Popover) {
  return class FilterColumn extends Component {
    static defaultProps = {
      prefixCls: "u-table-filter-column",
      afterFilter: noop,
      columnFilterAble: true,
      scroll: {}
    };
    static contextTypes = {
      beeLocale: PropTypes.object
    }
    constructor(props) {
      super(props);
      const { columns } = props;
      this.state = {
        columns: this.setColumOrderByIndex(ObjectAssign(columns)),
        showModal: false,
        screenY: 0
      };
    }

    setColumOrderByIndex = _column => {
      _column.forEach(da => {
        //默认所有的列都显示，如果传递ifshow属性，根据ifshow属性值来判断是否显示某列
        if (da.hasOwnProperty("ifshow")) {
          da.checked = da.ifshow ? true : false;
          da.ifshow = da.checked;
        } else {
          da.checked = true;
          da.ifshow = true;
        }
      });
      return _column;
    };
    componentWillReceiveProps(nextProps) {
      if (nextProps.columns != this.props.columns) {
        this.setState({
          columns: this.setColumOrderByIndex(ObjectAssign(nextProps.columns))
        });
      }
      this.setState({
        showModal: nextProps.showFilterPopover ? true : false
      });
    }

    checkedColumItemClick = da => {
      let { checkMinSize, afterFilter } = this.props;
      // if(checkMinSize)
      let sum = 0,
        leng = 0;
      this.state.columns.forEach(da => {
        da.fixed ? "" : leng++;
        !da.fixed && da.checked ? sum++ : "";
      });
      if (sum < checkMinSize && da.checked) {
        return;
      } else {
        if (sum <= 1 && da.checked) return;
      }
      da.checked = da.checked ? false : true;
      da.ifshow = da.checked ? true : false;

      this.setState({
        ...this.state
      });
      afterFilter(da, this.state.columns);
    };

    openCloumList = () => {
      this.setState({
        showModal: true
      });
    };

    onHide = () => {
      this.setState({
        showModal: false
      })
    }

    getCloumItem = () => {
      const { prefixCls } = this.props;
      const { columns } = this.state;
      return columns.map((da, i) => {
          let paramObj = {
            id:da.key,
            checked:da.checked
          }
          if(da.fixed){
            paramObj.disabled = true
          }else{
            paramObj.onClick = () => {
              this.checkedColumItemClick(da);
            }
          }
          return (
            <div
              key={da.key + "_" + i}
              className={`${prefixCls}-pop-cont-item`}
              onClick={paramObj.onClick?paramObj.onClick:null}
            >
            <Checkbox {...paramObj}>
            
              {da.title}
            </Checkbox>
            </div>
          );
        
      });
    };

    clear = () => {
      const { columns } = this.state;
      columns.forEach(da => {
        da.checked = true;
        da.ifshow = true;
      });
      this.setState({
        columns
      });
      this.props.afterFilter(this.state.columns, this.state.columns);
    };

    getCloumnsScroll = columns => {
      let sum = 0;
      columns.forEach(da => {
        if (da.checked) {
          sum += da.width;
        }
      });
      // console.log("sum",sum);
      return sum;
    };

    render() {
      const { data, prefixCls, scroll: scrollPro } = this.props;
      const { columns, showModal } = this.state;

   
      let locale = getComponentLocale(this.props, this.context, 'Table', () => i18n);

      let _columns = [],
        widthState = 0,
        scroll = scrollPro;
      columns.forEach(da => {
        if (da.ifshow) {
          _columns.push(da);
          if (da.width) {
            widthState++;
          }
        }
      });
      // if(_columns.length == widthState){
      //   scroll.x = this.getCloumnsScroll(columns);
      // }

      let content = (
        <div className={`${prefixCls}-pop-cont`}>
          <span className={`${prefixCls}-clear-setting`} onClick={this.clear}>
            {locale["resetSettings"]}
          </span>
          <div>{this.getCloumItem()}</div>
        </div>
      );

      return (
        <div className={`${prefixCls}-cont`}>
          <Table
            {...this.props}
            columns={_columns}
            data={data}
            // scroll={scroll}
            //  scroll={{x:this.getCloumnsScroll(columns)}}
          />
          {this.props.columnFilterAble == false ? (
            ""
          ) : (
            <div className={`${prefixCls}-filter-icon`}>
              <Popover
                id="filter_column_popover"
                placement="left"
                content={content}
                show={showModal}
                onHide={this.onHide}
              >
                <div className={`${prefixCls}-pop-column-filter-cont`}>
                  <Icon type="uf-grid" onClick={this.openCloumList} />
                </div>
              </Popover>
            </div>
          )}
        </div>
      );
    }
  };
}
