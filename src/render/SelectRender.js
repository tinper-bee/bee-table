import React, { Component } from "react";
import Icon from "bee-icon";
import Select from "bee-select";

export default class SelectRender extends Component {
  state = {
    value: this.props.value,
    editable: false
  };
  handleChange = e => {
    const value = e;
    if (this.props.onChange) {
      this.props.onChange(value);
    }
    this.setState({ value: value });
    setTimeout(()=> {
      this.setState({ editable: false });
    }, 0);
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
  render() {
    const { value, editable } = this.state;
    let { isclickTrigger } = this.props;
    let cellContent = "";
    if (editable) {
      cellContent = isclickTrigger ? (
        <div className="editable-cell-input-wrapper">
          <Select
            {...this.props}
            value={this.state.value}
            onChange={this.handleChange}
          >
            {this.props.children}
          </Select>
          <Icon
            type="uf-correct"
            className="editable-cell-icon-check"
            onClick={this.check}
          />
        </div>
      ) : (
        <div className="editable-cell-input-wrapper">
          <Select
            {...this.props}
            value={this.state.value}
            onChange={this.handleChange}
          >
            {this.props.children}
          </Select>
          <Icon
            type="uf-correct"
            className="editable-cell-icon-check"
            onClick={this.check}
          />
        </div>
      );
    } else {
      cellContent = isclickTrigger ? (
        <div className="editable-cell-text-wrapper" onClick={this.edit}>
          {value || " "}
        </div>
      ) : (
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
