import React, { Component } from "react";
import Icon from "bee-icon";
import DatePicker from "bee-datepicker";
import moment from "moment";

export default class DateRender extends Component {
  state = {
    value: this.props.value,
    editable: false
  };
  handleChange = e => {
    let { format } = this.props || "YYYY-MM-DD";
    const value = e.format(format);
    this.setState({ value, editable: false });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
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
    let date_value = moment(value);
    if (editable) {
      cellContent = isclickTrigger ? (
        <div className="editable-cell-input-wrapper">
          <DatePicker
            {...this.props}
            value={date_value}
            onChange={this.handleChange}
          />
          <Icon
            type="uf-correct"
            className="editable-cell-icon-check"
            onClick={this.check}
          />
        </div>
      ) : (
        <div className="editable-cell-input-wrapper">
          <DatePicker
            {...this.props}
            value={date_value}
            onChange={this.handleChange}
          />
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
