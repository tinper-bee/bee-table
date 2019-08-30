import React from 'react';
import Column from './Column';
import ColumnGroup from './ColumnGroup';
import Icon from 'bee-icon';

//行控制管理
export default class ColumnManager {
  _cached = {}

  constructor(columns, elements,originWidth,rowDraggAble,showRowNum) {
    //判断是否使用行拖拽
    if(rowDraggAble) {
      let dragHandleColumn =[{
        className: "drag-handle-column",
        title: "",
        key: "dragHandle",
        dataIndex: "dragHandle",
        // fixed:"left",
        width: 49,
        render: () => {
          return <Icon type="uf-navmenu" />
        }
      }]
      columns = dragHandleColumn.concat(columns);
    }
    columns = this.addOrderColumn(columns,showRowNum);
    
    this.columns = columns || this.normalize(elements);

    this.originWidth = originWidth;
  }

  // 向数据列中添加一列:序号
  addOrderColumn = (columns, showRowNum) => {
    if(!showRowNum){
      return columns
    }
    let { key, fixed, width, name, type, base } = showRowNum;
    let order = {
      dataIndex: key || '_index',
      key:'_index',
      fixed:fixed || 'left',
      width:width || 50,
      title: name || '序号',
      render:(text, record, index)=>{
        switch( type ){
          case 'ascii':{
            return (String.fromCharCode((base || 'a').charCodeAt() + index));
          }
          case 'number':
          default:{
            return ( (base || 0) + index);
          }
        }
      }
    }
    if(columns.length > 0 && columns[0].dataIndex !== 'checkbox' && columns[0].dataIndex !== 'radio'){ // 多选表格/单选表格时放在第二列,其他情况放到第一列
      columns = [order].concat(columns);
    }
    else{
      columns.splice(1,0,order); // splice方法改变原数组,返回切割出的数组,此处为[]
    }
    return columns;
  }

  isAnyColumnsFixed() {
    return this._cache('isAnyColumnsFixed', () => {
      return this.columns.some(column => !!column.fixed);
    });
  }

  isAnyColumnsLeftFixed() {
    return this._cache('isAnyColumnsLeftFixed', () => {
      return this.columns.some(
        column => column.fixed === 'left' || column.fixed === true
      );
    });
  }

  isAnyColumnsRightFixed() {
    return this._cache('isAnyColumnsRightFixed', () => {
      return this.columns.some(
        column => column.fixed === 'right'
      );
    });
  }

  leftColumns() {
    return this._cache('leftColumns', () => {
      return this.groupedColumns().filter(
        column => column.fixed === 'left' || column.fixed === true
      );
    });
  }

  rightColumns() {
    return this._cache('rightColumns', () => {
      return this.groupedColumns().filter(
        column => column.fixed === 'right'
      );
    });
  }

  centerColumns() {
    return this._cache('centerColumns', () => {
      return this.groupedColumns().filter(
        column => !column.fixed
      );
    });
  }

  leafColumns() {
    return this._cache('leafColumns', () =>
      this._leafColumns(this.columns)
    );
  }

  leftLeafColumns() {
    return this._cache('leftLeafColumns', () =>
      this._leafColumns(this.leftColumns())
    );
  }

  rightLeafColumns() {
    return this._cache('rightLeafColumns', () =>
      this._leafColumns(this.rightColumns())
    );
  }
  centerLeafColumns() {
    return this._cache('centerLeafColumns', () =>
      this._leafColumns(this.centerColumns())
    );
  }

  // add appropriate rowspan and colspan to column
  groupedColumns(type) {
    return this._cache('groupedColumns', () => {
      const _groupColumns = (columns, currentRow = 0, parentColumn = {}, rows = []) => {
        // track how many rows we got
        rows[currentRow] = rows[currentRow] || [];
        const grouped = [];
        const setRowSpan = column => {
          const rowSpan = rows.length - currentRow;
          if (column &&
            !column.children && // parent columns are supposed to be one row
            rowSpan > 1 &&
            (!column.rowSpan || column.rowSpan < rowSpan)
          ) {
            column.rowSpan = rowSpan;
          }
        };
        columns.forEach((column, index) => {
          let defaultOpt= {
            ifshow:true
          }
          if(!this.originWidth){
            defaultOpt.width = 200
          }
          //获取非固定列
          if(type=='nofixed' && column.fixed){
            return false;
          }
          const newColumn = { ...defaultOpt,...column };
          rows[currentRow].push(newColumn);
          parentColumn.colSpan = parentColumn.colSpan || 0;
          if (newColumn.children && newColumn.children.length > 0) {
            newColumn.children = _groupColumns(newColumn.children, currentRow + 1, newColumn, rows);
            parentColumn.colSpan = parentColumn.colSpan + newColumn.colSpan;
          } else {
            parentColumn.colSpan++;
          }
          // update rowspan to all same row columns
          for (let i = 0; i < rows[currentRow].length - 1; ++i) {
            setRowSpan(rows[currentRow][i]);
          }
          // last column, update rowspan immediately
          if (index + 1 === columns.length) {
            setRowSpan(newColumn);
          }
          grouped.push(newColumn);
        });
        return grouped;
      };
      return _groupColumns(this.columns);
    });
  }

  normalize(elements) {
    const columns = [];
    React.Children.forEach(elements, element => {
      if (!this.isColumnElement(element)) return;
      const column = { ...element.props };
      if (element.key) {
        column.key = element.key;
      }
      if (element.type === ColumnGroup) {
        column.children = this.normalize(column.children);
      }
      columns.push(column);
    });
    return columns;
  }

  isColumnElement(element) {
    return element && (element.type === Column || element.type === ColumnGroup);
  }

  reset(columns, elements, showRowNum) {
    columns = this.addOrderColumn(columns,showRowNum);
    this.columns = columns || this.normalize(elements);
    this._cached = {};
  }
  getColumnWidth(contentWidth){
    let columns = this.leafColumns();
    let res={computeWidth:0,lastShowIndex:-1};
    columns.forEach((col,index)=>{
      //如果列显示
      if(col.ifshow){
        let width = col.width;
        if(typeof(width) == 'string' && width.includes('%') ){
          width = contentWidth *  parseInt(col.width) /100;
        }
        res.computeWidth += parseInt(width);
        if(!col.fixed){
          res.lastShowIndex = index;
        }
      }
    })
    return res;
  }

  getLeftColumnsWidth(contentWidth=1) {
    return this._cache('leftColumnsWidth', () => {
       let leftColumnsWidth =0;
       this.groupedColumns().forEach(column =>{
        if (column.fixed === 'left' || column.fixed === true){
          let width = column.width;
          if(typeof(width) == 'string' && width.includes('%') ){
            width = contentWidth *  parseInt(column.width) /100;
          }
          leftColumnsWidth += parseInt(width)
        }
       });
       return leftColumnsWidth;
    });
  }

  getRightColumnsWidth(contentWidth=1) {
    return this._cache('rightColumnsWidth', () => {
      let rightColumnsWidth =0;
      this.groupedColumns().forEach(column =>{
       if (column.fixed === 'right'){
        let width = column.width;
        if(typeof(width) == 'string' && width.includes('%') ){
          width = contentWidth *  parseInt(column.width) /100;
        }
        rightColumnsWidth += parseInt(width)
       }
      });
      return rightColumnsWidth;
    });
  }

  _cache(name, fn) {
    if (name in this._cached) {
      return this._cached[name];
    }
    this._cached[name] = fn();
    return this._cached[name];
  }

  //todo 含有children的宽度计算
  _leafColumns(columns) {
    const leafColumns = [];

    columns.forEach(column => {
      if (!column.children) {

        let defaultOpt= {
          ifshow:true
        }
        if(!this.originWidth){
          defaultOpt.width = 200
        }
        const newColumn = { ...defaultOpt,...column };
        leafColumns.push(newColumn);
      } else {
        leafColumns.push(...this._leafColumns(column.children));
      }
    });
    return leafColumns;
  }
}
