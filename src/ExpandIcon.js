import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';

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

  onExpand = (status, record, e) => {
    const { onExpand } = this.props;
    e.stopPropagation();
    onExpand(status, record, e);
  };
  render() {
    const { expandable, clsPrefix, onExpand, needIndentSpaced, expanded, record, isHiddenExpandIcon,expandedIcon,collapsedIcon } = this.props;
    if (expandable && !isHiddenExpandIcon) {
      const expandClassName = expanded ? 'expanded' : 'collapsed';
      let currentIcon =  <span
                          className={`${clsPrefix}-expand-icon ${clsPrefix}-${expandClassName}`}
                        />;
      if(expanded && expandedIcon){
        currentIcon = expandedIcon;
      }else if(!expanded && collapsedIcon){
        currentIcon = collapsedIcon;
      }
      return (<span onClick={(e) => this.onExpand(!expanded, record, e)} className='expand-icon-con'>{currentIcon}</span>);
    } else if (needIndentSpaced || isHiddenExpandIcon) {
      return <span className={`${clsPrefix}-expand-icon ${clsPrefix}-spaced`} />;
    }
    return null;
  }
};

ExpandIcon.propTypes = propTypes;

export default ExpandIcon;
