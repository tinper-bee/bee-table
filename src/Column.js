import { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    className: PropTypes.string,
    colSpan: PropTypes.number,
    title: PropTypes.node,
    dataIndex: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    fixed: PropTypes.oneOf([
      true,
      'left',
      'right',
    ]),
    render: PropTypes.func,
    onCellClick: PropTypes.func,
    ifshow:PropTypes.bool,
    fieldType: PropTypes.string, // 类型
}

class Column extends Component {
  static defaultProps = {
    ifshow:true
  }
}

Column.propTypes = propTypes;

export default Column;
