import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from 'bee-form-control';
import Select from 'bee-select';
import DatePicker from 'bee-datepicker';
import FilterDropDown from './FilterDropDown';

const propTypes = {
    filterDropdown: PropTypes.string
};

class FilterType extends Component {
    constructor() {
        super();
        this.state = {
            text: "",
            selectValue: "",
            dateValue: "",
            open: false
        }
    }
    //清除文本
    clearText = () => {
        this.setState({
            text: ""
        });
        let { onChange } = this.props;
        onChange && onChange("");
    }

    //设置文本
    changeText = (eve) => {
        this.setState({
            text: eve
        });
    }
    //回车执行函数
    changeTextCall = (eve) => {
        let { onChange } = this.props;
        if (eve.keyCode == 13) {
            onChange(eve.target.value);
        }
    }
    //失去焦点后执行函数
    changeTextCallBlur = (val) => {
        let { onChange } = this.props;
        onChange && onChange(val);
    }
    //设置下拉值
    changeSelect = (val) => {
        let { onChange } = this.props;
        if (onChange) {
            onChange(val);
            this.setState({
                selectValue: val
            });
        }
    }
    //清除下拉值
    clearSelectValue = () => {
        this.setState({
            selectValue: ""
        }, () => {
            this.changeSelect("");
        });
    }
    //清除日期值
    clearDateValue = () => {
        this.setState({
            dateValue: ""
        }, () => {
            this.changeDate("");
        });
    }
    //设置日期值
    changeDate = (val) => {
        let { onChange } = this.props;
        if (onChange) {
            onChange(val);
            this.setState({
                dateValue: val,
                open: false
            });
        }
    }
    //组件渲染
    renderControl = (rendertype) => {
        let { filterDropdown, className, onChange, onSelectDropdown, clsPrefix, locale } = this.props;
        switch (rendertype) {
            case 'text':
                return <div className={`${clsPrefix} filter-wrap`}><FormControl
                    ref={el => this.text = el}
                    value={this.state.text}
                    className={className}
                    onChange={this.changeText}
                    onKeyDown={this.changeTextCall}
                    onBlur={this.changeTextCallBlur}
                />
                    <FilterDropDown
                        locale={locale}
                        onSelectDropdown={onSelectDropdown}
                        onClickClear={this.clearText}
                        isShowClear={this.state.text}
                        isShowCondition={filterDropdown}
                    >
                    </FilterDropDown>
                </div>
            case 'dropdown':
                return <div className={`${clsPrefix} filter-wrap`}><Select
                    {...this.props}
                    value={this.state.selectValue}
                    onChange={this.changeSelect}
                /><FilterDropDown
                    locale={locale}
                    onSelectDropdown={onSelectDropdown}
                    onClickClear={this.clearSelectValue}
                    isShowCondition={filterDropdown}
                    isShowClear={this.state.selectValue}
                >
                    </FilterDropDown></div>
            case 'date':
                return <div className={`${clsPrefix} filter-wrap`}><DatePicker
                    {...this.props}
                    value={this.state.dateValue}
                    onChange={this.changeDate}
                    open={this.state.open}
                />{filterDropdown == 'show' && <FilterDropDown
                    locale={locale}
                    onSelectDropdown={onSelectDropdown}
                    onClickClear={this.clearDateValue}
                    isShowCondition={filterDropdown}
                    isShowClear={this.state.dateValue}
                >
                </FilterDropDown>}
                </div>
            case 'bool':
                return <div className={`${clsPrefix} filter-wrap`}><Switch
                    className={className}
                    onChange={onChange}
                />
                    {filterDropdown == 'show' && <FilterDropDown locale={locale}
                        onSelectDropdown={onSelectDropdown}
                    >
                    </FilterDropDown>}
                </div>
            default:
                break;
        }

    }
    render() {
        let { rendertype } = this.props;
        return (
            this.renderControl(rendertype)
        );
    }
}
FilterType.propTypes = propTypes;
FilterType.defaultProps = {
    filterDropdown: 'show'
}
export default FilterType;
