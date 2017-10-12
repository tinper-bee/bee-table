import React, { Component } from "react";
import Icon from "bee-icon";
import Checkbox from "bee-checkbox";

export default class CheckboxRender extends Component {
  state = {
    value: this.props.value,
    editable: false
  };
  handleChange = e => {
    const value = e.target.value;
    this.setState({ value });
  };
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  };
  edit = () => {
    this.setState({ editable: true });
  };
  handleKeydown = event => {
    if (event.keyCode == 13) {
      this.check();
    }
  };
  render() {
    const { value, editable } = this.state;
    let { isclickTrigger } = this.props;
    let cellContent = "";
    if (editable) {
      cellContent = (
        <div className="editable-cell-input-wrapper">
          <Checkbox
            onChange={this.handleChange}
            onKeyDown={this.handleKeydown}
            onBlur={this.check}
            autoFocus
            value={value}
          />
        </div>
      );
    } else {
      cellContent = (
        <div className="editable-cell-text-wrapper">
          {value || " "}
          <Icon
            type="uf-pencil"
            className="editable-cell-icon"
            onClick={this.edit}
          />
        </div>
      );
    }
    return <div className="editable-cell">{cellContent}</div>;
  }
}
