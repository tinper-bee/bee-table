import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import Icon from 'bee-icon';

const propTypes = {
    record: PropTypes.object,
    clsPrefix: PropTypes.string,
    expandable: PropTypes.any,
    expanded: PropTypes.bool,
    needIndentSpaced: PropTypes.bool,
    onExpand: PropTypes.func,
};

class ExpandIcon extends Component{
  constructor(props){
      super(props);
  }
  shouldComponentUpdate(nextProps) {
    return !shallowequal(nextProps, this.props);
  }
  render() {
    const { expandable, clsPrefix, onExpand, needIndentSpaced, expanded, record, isHiddenExpandIcon,expandedIcon,collapsedIcon } = this.props;
    if (expandable && !isHiddenExpandIcon) {
      const expandClassName = expanded ? 'expanded' : 'collapsed';
      let currentIcon =  <Icon
                          className={`${clsPrefix}-expand-icon ${clsPrefix}-${expandClassName}`}
                          type={expanded ? 'uf-triangle-down' : 'uf-triangle-right'}
                        
                        />;
      if(expanded && expandedIcon){
        currentIcon = expandedIcon;
      }else if(!expanded && collapsedIcon){
        currentIcon = collapsedIcon;
      }
      return (<span onClick={(e) => onExpand(!expanded, record, e)} className='expand-icon-con'>{currentIcon}</span>);
    } else if (needIndentSpaced || isHiddenExpandIcon) {
      return <span className={`${clsPrefix}-expand-icon ${clsPrefix}-spaced`} />;
    }
    return null;
  }
};

ExpandIcon.propTypes = propTypes;

export default ExpandIcon;
