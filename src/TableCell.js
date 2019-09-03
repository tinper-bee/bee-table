import React, { Component } from 'react';
import PropTypes from 'prop-types';
import objectPath from 'object-path';
import i18n from './lib/i18n';
import { getComponentLocale } from 'bee-locale/build/tool';
import { formatMoney } from './lib/utils';
import Dropdown from 'bee-dropdown';
import Menu from 'bee-menus';
const { Item } = Menu;
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
     this.state = {
       showDropdowm: false
     }
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
      let cls = 'u-table-link u-table-fieldtype ';
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
    const { precision, thousand, makeUp, preSymbol, nextSymbol } = config;
    let number = formatMoney(data, precision, thousand);
    if(makeUp === false && number.indexOf('.') !== -1) {
      number = number.replace(/0*$/,'').replace(/\.$/,'');
    }
    let numberWidth = parseInt(width) - 16; // 减去默认的左右padding共计16px
    let res = <span className='u-table-currency-number' >{number}</span>;
    let pre = preSymbol ? <span className='u-table-currency-pre'>{preSymbol}</span> : null;
    let next = nextSymbol ? <span className='u-table-currency-next'>{nextSymbol}</span> : null;
    let title = '';
    title += typeof preSymbol === 'string' ? preSymbol : '';
    title += number;
    title += typeof nextSymbol === 'string' ? nextSymbol : '';
    return <span className='u-table-currency u-table-fieldtype' style={{width:numberWidth}} title={title}>
      {pre}
      {res}
      {next}
    </span>;
  }

  // 渲染时间类型-l
  renderDate = ( data, config={}) => {
    const { moment, format } = config;
    if(!moment)return data;
    return moment(data).format(format || 'YYYY-MM-DD');
  }

  // 渲染下拉类型，主要为编辑表格铺垫
  renderSelect = ( data, config={}) => {
    if(config.options){
      data = config.options[data] || config.defaultShow;
    }
    return data;
  }


  // 渲染行内菜单
  renderColumnMenu = (colMenu, text, record, index) => {
    if (!colMenu) return null;
    let { menu, trigger = 'hover', className = '', icon = <i className='uf uf-3dot-h' />, iconSize = 21 } = colMenu;
    let items = [];
    items = menu.map((item) => {
      return <Item key={item.key} onClick={() => { this.onClickColMenu(item.callback, text, record, index) }}>
        {item.icon}
        {item.text}
      </Item>
    })
    if (items.length === 0) return null;
    className += ' u-table-inline-op-dropdowm'
    let menus = <Menu className={className}>{items}</Menu>;
    let top = `calc(50% - ${iconSize / 2}px)`;
    let visibility = this.state.showDropdowm ? 'visible' : '';
    let iconClassName = `u-table-inline-op-icon u-table-inline-op-icon-hover`;
    return <Dropdown
      trigger={[trigger]}
      overlay={menus}
      animation="slide-up"
      onVisibleChange={this.changeShowDropdowm}
    >
      {<span className={iconClassName} style={{ fontSize: iconSize, top: top, visibility: visibility }}>{icon}</span>}
    </Dropdown>
  }

  // 下拉按钮状态改变，点击后保持图标常驻
  changeShowDropdowm = (val) => {
    this.setState({
      showDropdowm: val
    })
  }

  // 菜单点击事件
  onClickColMenu = (callback, text, record, index) => {
    if (callback) {
      callback(text, record, index);
    }
    this.setState({
      showDropdowm: false,
    })
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

    let colMenu = this.renderColumnMenu(column.cellMenu, text, record, index);
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
            precision: 0, // 精度值,需要大于0
            thousand: true, // 是否显示千分符号
            makeUp: false, // 末位是否补零
            preSymbol: '', // 前置符号
            nextSymbol: '', // 后置符号
          }
          text = this.renderNumber(text, {...config,...column.numberConfig}, column.width);
          break;
        }
        case 'date':{
          text = this.renderDate(text, column.dateConfig);
          break;
        }
        case 'select':{
          text = this.renderSelect(text, column.selectConfig);
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
    if((typeof text == 'string' || typeof text === 'number') && bodyDisplayInRow){
      title = text
    }
    if(expandIcon && expandIcon.props.expandable){ 
      className = className+` ${clsPrefix}-has-expandIcon`
    }
    if(colMenu){
      className += ' u-table-inline-icon'
    }
    return (
      <td
        colSpan={colSpan}
        rowSpan={rowSpan}
        className={className}
        onClick={this.handleClick}
        title={title}
        style={{color:fontColor,backgroundColor:bgColor,}}
      >
        {indentText}
        {expandIcon}
        {text}
        {colMenu}
      </td>
    );
  }
};

TableCell.propTypes = propTypes;

export default TableCell;
