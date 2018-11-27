import React, { Component } from 'react';
import PropTypes from 'prop-types';
import zhCN from "rc-calendar/lib/locale/zh_CN";
import FormControl from 'bee-form-control';
import Select from 'bee-select';
import InputNumber from 'bee-input-number';
import DatePicker from 'bee-datepicker';
import FilterDropDown from './FilterDropDown';

const { RangePicker } = DatePicker;

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
            open: false,
            number: 0
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
    //设置数值
    changeNumber = (number) => {
        let { onChange } = this.props;
        onChange && onChange(number);
        this.setState({
            number
        });
    }
    //清除数值
    clearNumber = () => {
        let { onChange } = this.props;
        onChange && onChange("");
        this.setState({
            number: ""
        });
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
    /**
     * 根据不同的类型生成对应的组件类型包含一些参数的适应
     *
     * @param {*} rendertype 参数类型，包括['text','dropdown','date','daterange','number']
     * @returns
     */
    renderControl = (rendertype) => {
        let { filterDropdown, filterDropdownType, format, className, onChange, onSelectDropdown, clsPrefix, locale } = this.props;
        switch (rendertype) {
            case 'text':
                return <div className={`${clsPrefix} filter-wrap`}>
                    <FormControl
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
                        filterDropdownType={filterDropdownType}
                    >
                    </FilterDropDown>
                </div>
            case 'number':
                return <div className={`${clsPrefix} filter-wrap`}>
                    <InputNumber
                        className={className}
                        value={this.state.number}
                        onChange={this.changeNumber}
                    />
                    <FilterDropDown
                        locale={locale}
                        onSelectDropdown={onSelectDropdown}
                        onClickClear={this.clearNumber}
                        isShowClear={this.state.number}
                        isShowCondition={filterDropdown}
                        filterDropdownType={filterDropdownType}
                    >
                    </FilterDropDown>
                </div>
            case 'dropdown':
                return <div className={`${clsPrefix} filter-wrap`}>
                    <Select
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
                return <div className={`${clsPrefix} filter-wrap`}>
                    <DatePicker
                        {...this.props}
                        value={this.state.dateValue}
                        onChange={this.changeDate}
                        open={this.state.open}
                        format={format}
                        locale={zhCN}
                    />{filterDropdown == 'show' && <FilterDropDown
                        locale={locale}
                        onSelectDropdown={onSelectDropdown}
                        onClickClear={this.clearDateValue}
                        isShowCondition={filterDropdown}
                        isShowClear={this.state.dateValue}
                    >
                    </FilterDropDown>}
                </div>
            case 'daterange':
                return <div className={`${clsPrefix} filter-wrap`}>
                    <RangePicker
                        {...this.props}
                        value={this.state.dateValue}
                        onChange={this.changeDate}
                        open={this.state.open}
                        format={format}
                        locale={zhCN}
                        placeholder={'开始 ~ 结束'}
                        dateInputPlaceholder={['开始', '结束']}
                        showClear={true}
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
                return <div className={`${clsPrefix} filter-wrap`}>
                    <Switch
                        className={className}
                        onChange={onChange}
                    />
                    {filterDropdown == 'show' && <FilterDropDown locale={locale}
                        onSelectDropdown={onSelectDropdown}
                    >
                    </FilterDropDown>}
                </div>
            default:
                return <div></div>;
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
