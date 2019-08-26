import React, { Component } from 'react';
import PropTypes from 'prop-types';
import objectPath from 'object-path';
import i18n from './lib/i18n';
import { getComponentLocale } from 'bee-locale/build/tool';
import { formatMoney } from './lib/utils';
const propTypes = {
    record: PropTypes.object,
    clsPrefix: PropTypes.string,
    index: PropTypes.number,
    indent: PropTypes.number,
    indentSize: PropTypes.number,
    column: PropTypes.object,
    expandIcon: PropTypes.node
};

class TableCell extends Component{
 constructor(props){
     super(props);
     this.isInvalidRenderCellText = this.isInvalidRenderCellText.bind(this);
     this.handleClick = this.handleClick.bind(this);
 }
  isInvalidRenderCellText(text) {
    return text && !React.isValidElement(text) &&
      Object.prototype.toString.call(text) === '[object Object]';
  }
  handleClick(e) {
    const { record, column: { onCellClick } } = this.props;
    if (onCellClick) {
      onCellClick(record, e);
    }
  }

  //  渲染链接类型
  renderLinkType = ( data, record,  index, config={}) => {
    const { url, urlIndex, linkType, className, underline, descIndex, desc, linkColor } = config;
    let linkUrl = '';
    if(url){
      linkUrl = url(data, record, index);
    }
    else if(urlIndex){
      linkUrl = record[urlIndex];
    }
    if(linkUrl){
      let link = () => {
        window.open(linkUrl,linkType || '_blank');
      }
      let cls = 'u-table-link ';
      if(className){
        cls += `${className} `;
      }
      if(underline){
        cls += 'u-table-link-underline ';
      }
      let title = '';
      
      if(desc === true){
        title = linkUrl;
      }
      else if( typeof desc === 'string'){
        title = desc;
      }
      else if( typeof desc === 'function'){
        title = desc(data, record, index);
      }
      else if(descIndex){
        title = record[descIndex];
      }
      return <span onClick={link} className={cls} style={{color:linkColor || ''}} title={title}>{data}</span>
    }
    return data;
  }

  // 渲染布尔类型
  renderBoolType = ( data, config={} ) => {
    let locale = getComponentLocale(this.props, this.context, 'Table', () => i18n);
    let boolConfig = {...{ trueText: locale['bool_true'], falseText: locale['bool_false']},...config};
    if(typeof data === 'string'){
      if(data === 'false' || data === '0'){
        return boolConfig.falseText;
      }
    }
    else if(!data){
      return boolConfig.falseText;
    }
    return boolConfig.trueText;
  }

  // 渲染整数/货币类型
  renderNumber = (data, config={}, width=200) => {
    console.log(config);
    let number = formatMoney(data, config.precision, config.thousand);
    if(config.makeUp === false && number !== '0') {
      number = number.replace(/0*$/,'').replace(/\.$/,'');
    }
    let numberWidth = parseInt(width) - 16; // 减去默认的左右padding共计16px
    let res = <span className='u-table-currency-number' >{number}</span>;
    let pre = config.preSymbol ? <span className='u-table-currency-pre'>{config.preSymbol}</span> : null;
    let next = config.nextSymbol ? <span className='u-table-currency-next'>{config.nextSymbol}</span> : null;
    return <span className='u-table-currency' style={{width:numberWidth}}>
      {pre}
      {res}
      {next}
    </span>;
  }



  render() {
    const { record, indentSize, clsPrefix, indent,
            index, expandIcon, column ,fixed,showSum, bodyDisplayInRow,lazyStartIndex,lazyEndIndex} = this.props;
    const { dataIndex, render, fieldType, linkConfig, fontColor, bgColor } = column;
    let {className = ''} = column;

    let text = objectPath.get(record, dataIndex);
    let tdProps;
    let colSpan;
    let rowSpan,title;
    
    if (render && !showSum) {
      text = render(text, record, index);
      if (this.isInvalidRenderCellText(text)) {
        tdProps = text.props || {};
        rowSpan = (tdProps.rowSpan>lazyEndIndex && lazyEndIndex>5)?lazyEndIndex-index:tdProps.rowSpan;
        colSpan = tdProps.colSpan;
        text = text.children;
      }
    }

    // 根据 fieldType 来渲染数据
    if(!render){
      switch(column.fieldType){
        case 'link':{
          text = this.renderLinkType(text, record, index, column.linkConfig);
          break;
        }
        case 'bool':{
          text = this.renderBoolType(text, column.boolConfig);
          break;
        }
        case 'currency':{
          let config = {
            precision: 2, // 精度值,需要大于0
            thousand: true, // 是否显示千分符号
            makeUp: true, // 末位是否补零
            preSymbol: '', // 前置符号
            nextSymbol: '', // 后置符号
          }
          text = this.renderNumber(text, {...config,...column.currencyConfig}, column.width);
          break;
        }
        case 'number':{
          let config = {
            precision: 2, // 精度值,需要大于0
            thousand: true, // 是否显示千分符号
            makeUp: false, // 末位是否补零
            preSymbol: '', // 前置符号
            nextSymbol: '', // 后置符号
          }
          text = this.renderNumber(text, {...config,...column.numberConfig}, column.width);
          break;
        }
        default : {
          break;
        }
      }
    }

    if (this.isInvalidRenderCellText(text)) {
      text = null;
    }

    const indentText = expandIcon ? (
      <span
        style={{ paddingLeft: `${indentSize * indent}px` }}
        className={`${clsPrefix}-indent indent-level-${indent}`}
      />
    ) : null;

    if ((lazyStartIndex !==index) &&(rowSpan === 0 || colSpan === 0) ) {
      return null;
    }
    if(tdProps && tdProps.mergeEndIndex && index<tdProps.mergeEndIndex && rowSpan === 0){
      rowSpan = tdProps.mergeEndIndex - index;
      text = ''
    }
    //不是固定表格并且当前列是固定，则隐藏当前列
    if(column.fixed && !fixed){
      className = className+` ${clsPrefix}-fixed-columns-in-body`;
    }
    if(column.contentAlign){
      className =  className+` text-${column.contentAlign}`;
    }
    else if(column.textAlign){
      className =  className+` text-${column.textAlign}`;
    }
    if(typeof text == 'string' && bodyDisplayInRow){
      title = text
    }
    if(expandIcon && expandIcon.props.expandable){ 
      className = className+` ${clsPrefix}-has-expandIcon`
    }
    return (
      <td
        colSpan={colSpan}
        rowSpan={rowSpan}
        className={className}
        onClick={this.handleClick}
        title={title}
        style={{color:fontColor,backgroundColor:bgColor}}
      >
        {indentText}
        {expandIcon}
        {text}
      </td>
    );
  }
};

TableCell.propTypes = propTypes;

export default TableCell;
