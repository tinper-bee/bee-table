import React, { Component } from "react";
import Icon from "bee-icon";
import Input from "bee-form-control";

export default class InputRender extends Component {
  state = {
    value: this.props.value,
    editable: false
  };
  handleChange = e => {
    const value = e;
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
  //货币的格式化方法
  formatCurrency = money => {
    if (money && money != null && !!Number(money)) {
      money = String(money);
      let left = money.split(".")[0],
        right = money.split(".")[1];
      right = right
        ? right.length >= 2 ? "." + right.substr(0, 2) : "." + right + "0"
        : ".00";
      let temp = left
        .split("")
        .reverse()
        .join("")
        .match(/(\d{1,3})/g);
      return (
        (Number(money) < 0 ? "-" : "") +
        temp
          .join(",")
          .split("")
          .reverse()
          .join("") +
        right
      );
    } else if (money === 0) {
      //注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
      return "0.00";
    } else {
      return "";
    }
  };
  render() {
    let { value, editable } = this.state;
    let { isclickTrigger,format } = this.props;
    let cellContent = "";
    if (editable) {
      cellContent = isclickTrigger ? (
        <div className="editable-cell-input-wrapper">
          <Input
            onChange={this.handleChange}
            onKeyDown={this.handleKeydown}
            onBlur={this.check}
            autoFocus
            value={value}
          />
        </div>
      ) : (
        <div className="editable-cell-input-wrapper">
          <Input
            value={value}
            onChange={this.handleChange}
            onKeyDown={this.handleKeydown}
          />
          <Icon
            type="uf-correct"
            className="editable-cell-icon-check"
            onClick={this.check}
          />
        </div>
      );
    } else {
      if(format && format === "Currency"){
        value = this.formatCurrency(value);
      }
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
