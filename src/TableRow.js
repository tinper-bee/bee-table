import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableCell from './TableCell';
import ExpandIcon from './ExpandIcon';

const propTypes = {
    onDestroy: PropTypes.func,
    onRowClick: PropTypes.func,
    onRowDoubleClick: PropTypes.func,
    record: PropTypes.object,
    clsPrefix: PropTypes.string,
    expandIconColumnIndex: PropTypes.number,
    onHover: PropTypes.func,
    columns: PropTypes.array,
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    visible: PropTypes.bool,
    index: PropTypes.number,
    hoverKey: PropTypes.any,
    expanded: PropTypes.bool,
    expandable: PropTypes.any,
    onExpand: PropTypes.func,
    needIndentSpaced: PropTypes.bool,
    className: PropTypes.string,
    indent: PropTypes.number,
    indentSize: PropTypes.number,
    expandIconAsCell: PropTypes.bool,
    expandRowByClick: PropTypes.bool,
    store: PropTypes.object.isRequired,
};

const defaultProps = {
    onRowClick() {},
    onRowDoubleClick() {},
    onDestroy() {},
    expandIconColumnIndex: 0,
    expandRowByClick: false,
    onHover() {},
    className:''
};

class TableRow extends Component{
 constructor(props){
     super(props);
     this._timeout = null;
     this.state = {
         hovered: false,
     };
     this.onRowClick = this.onRowClick.bind(this);
     this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
     this.onMouseEnter = this.onMouseEnter.bind(this);
     this.onMouseLeave = this.onMouseLeave.bind(this);
     this.expandHeight = 0;
 }


  componentDidMount() {
    const { store, hoverKey } = this.props;
    this.unsubscribe = store.subscribe(() => {
      if (store.getState().currentHoverKey === hoverKey) {
        this.setState({ hovered: true });
      } else if (this.state.hovered === true) {
        this.setState({ hovered: false });
      }
    });

    this.setRowHeight()
  }


  componentDidUpdate(prevProps) {
    if (this.props.index !== prevProps.index) {
      this.setRowHeight()
    }
  }
  componentWillUnmount() {
    const { record, onDestroy, index } = this.props;
    onDestroy(record, index);
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }


  setRowHeight() {
    const { setRowHeight , expandedContentHeight=0,lazyCurrentIndex=0,fixed} = this.props
    if (!setRowHeight || !this.element || fixed) return
    setRowHeight(this.element.clientHeight + expandedContentHeight, this.props.index+lazyCurrentIndex)
  }

  onRowClick(event) {
    const {
      record,
      index,
      onRowClick,
      expandable,
      expandRowByClick,
      expanded,
      onExpand,
    } = this.props;
    if (expandable && expandRowByClick) {
      onExpand(!expanded, record, index,event);
    }
    this.set((e)=> {  
      onRowClick(record, index, event);
    });
  }

  onRowDoubleClick(event) {
    const { record, index, onRowDoubleClick } = this.props;
    this.clear();
    onRowDoubleClick(record, index, event);
  }

  onMouseEnter() {
    const { onHover, hoverKey } = this.props;
    onHover(true, hoverKey);
  }

  onMouseLeave() {
    const { onHover, hoverKey } = this.props;
    onHover(false, hoverKey);
  }

  set =(fn)=> {
      this.clear();
      this._timeout = window.setTimeout(fn, 300);  
  }

  clear =(event)=> {
    if (this._timeout) {  
        window.clearTimeout(this._timeout);  
    }
  }

  bindElement = (el)=> {
    this.element = el
  }
 
  render() {
    const {
      clsPrefix, columns, record, height, visible, index,
      expandIconColumnIndex, expandIconAsCell, expanded, expandRowByClick,
      expandable, onExpand, needIndentSpaced, indent, indentSize,isHiddenExpandIcon,fixed,lazyCurrentIndex=0
    } = this.props;
    let showSum = false;
    let { className } = this.props;

    if (this.state.hovered) {
      className += ` ${clsPrefix}-hover`;
    }
    
    //判断是否为合计行
    if(className.indexOf('sumrow')>-1){
      showSum = true;
    }
    const cells = [];

    const expandIcon = (
      <ExpandIcon
        expandable={expandable}
        clsPrefix={clsPrefix}
        onExpand={onExpand}
        needIndentSpaced={needIndentSpaced}
        expanded={expanded}
        record={record}
        isHiddenExpandIcon={isHiddenExpandIcon}
      />
    );

    for (let i = 0; i < columns.length; i++) {
      if (expandIconAsCell && i === 0 && !showSum ) {
        cells.push(
          <td
            className={`${clsPrefix}-expand-icon-cell`}
            key="rc-table-expand-icon-cell"
          >
            {expandIcon}
          </td>
        );
      }
      const isColumnHaveExpandIcon = (expandIconAsCell || expandRowByClick || showSum)
        ? false : (i === expandIconColumnIndex);
      cells.push(
        <TableCell
          clsPrefix={clsPrefix}
          record={record}
          indentSize={indentSize}
          indent={indent}
          index={index+lazyCurrentIndex}
          column={columns[i]}
          key={columns[i].key}
          fixed= {fixed}
          showSum={showSum}
          expandIcon={(isColumnHaveExpandIcon) ? expandIcon : null}
        />
      );
    }
    const style = { height };
    if (!visible) {
      style.display = 'none';
    }
 
    return (
      <tr
        onClick={this.onRowClick}
        onDoubleClick={this.onRowDoubleClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        className={`${clsPrefix} ${className} ${clsPrefix}-level-${indent}`}
        style={style}
        ref={this.bindElement}
      >
        {cells.length>0?cells:<td></td>}
      </tr>
    );
  }
};

TableRow.propTypes = propTypes;
TableRow.defaultProps = defaultProps;

export default TableRow;
