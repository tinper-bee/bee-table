import React, { Component } from "react";
/**
 * 参数: 过滤表头
 * @param {*} Table
 * @param {*} Checkbox
 * @param {*} Popover
 * @param {*} Icon
 */

export default function filterColumn(Table, Checkbox, Popover, Icon) {

  return class FilterColumn extends Component {
    static defaultProps = {
      prefixCls: "u-table-filter-column"
    }

    constructor(props) {
      super(props);
      const {columns} = props;
      let _column = [];
      Object.assign(_column,columns);
      _column.forEach(da => {
        da.checked = true;
        da.disable = true;
      });
      this.state = { 
        columns:_column,
        showModal:false,
        width:props.width?props.width:150,
        screenX:0,
        screenY:0
      };
    }

    getShowModal=(event)=>{
      let {showModal} = this.state;
      if(showModal){
        this.setState({
          showModal:false
        })
      }
    }

    checkedColumItemClick = (da)=>{
      let {columns} = this.state;
      da.checked = da.checked?false:true;
      da.disable  = da.checked?true:false;
      this.setState({
        ...this.state
      })
    }
  
    openCloumList = (ev)=>{
      let oEvent=ev||event; 
      this.setState({
        screenX:oEvent.clientX,
        screenY:oEvent.clientY,
        showModal:true
      });
    }

    getCloumItem=()=>{
      const {prefixCls} = this.props;
      const {columns} = this.state;
      return columns.map((da,i)=> (<div key={da.key+"_"+i} className={`${prefixCls}-pop-cont-item`} onClick={()=>{this.checkedColumItemClick(da)}}>
          <Checkbox id={da.key} checked={da.checked}/> 
          <span>{da.title}</span>
        </div>))
    }

    clear=()=>{
      const {columns} = this.state;
      // let _chek = columns[0].checked?false:true;
      columns.forEach(da => {
        da.checked = true;
        da.disable  = true;
      });
      this.setState({
        ...this.state
      })
    }

    render() {
      const {data,prefixCls} = this.props;
      const {columns,showModal,width,screenX,screenY} = this.state;
      let _columns = [];
      columns.forEach((da)=>{
        if(da.disable){
          _columns.push(da);
        }
      });

      let content = (
        <div className={`${prefixCls}-pop-cont`}> 
        <span className={`${prefixCls}-clear-setting`} onClick={this.clear}>清除设置</span>
        <div>
           {
            this.getCloumItem()
           }
        </div>
      </div>);

      return <div className={`${prefixCls}-cont`}>
          <Table {...this.props} columns={_columns} data={data} />
          <Popover
            placement="leftTop"
            content={content} id="aa"
            show={showModal}   >
              <div className={`${prefixCls}-pop-column-filter`}><Icon type="uf-navmenu" onClick={this.openCloumList}/></div>
          </Popover> 
        </div>;
    }
  };
}
