import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * 渲染下拉框
 * @param Select
 * @param Icon
 * @returns {SelectRender}
 */
export default function renderSelect (Select, Icon) {
    return  class SelectRender extends Component {
        static propTypes = {
            dataSource: PropTypes.array
        };
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
            setTimeout(() => {
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
            let { value, editable } = this.state;
            let { isclickTrigger, dataSource } = this.props;
            let cellContent = "";
            if (editable) {
                cellContent = isclickTrigger ? (
                    <div className="editable-cell-input-wrapper">
                        <Select
                            {...this.props}
                            value={this.state.value}
                            onBlur={(value)=>{
                                console.log(value);
                                // this.props.onBlur();
                            }}

                            onFocus={(value)=>{
                                console.log(value);
                                // this.props.onBlur();
                            }}

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
                            onBlur={()=>{
                                this.setState({
                                    editable:true
                                });
                                this.props.onBlur();
                            }}
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
                if (dataSource && dataSource.length > 0) {
                    for (var index = 0; index < dataSource.length; index++) {
                        var element = dataSource[index];
                        if (element.value === value) {
                            value = element.key;
                            break;
                        }
                    }
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
}

