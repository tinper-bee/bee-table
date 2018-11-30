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
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            text: "",
            selectValue: "",
            dateValue: "",
            open: false,
            condition: props.filterDropdownType == 'string' ? 'LIKE' : 'EQ',
            number: 0
        }
    }

    /**
     * 清除过滤条件
     *
     */
    clearFilter = () => {
        let { onFilterClear, dataIndex } = this.props;
        this.setState({
            value: "",//清空值
            condition: this.props.filterDropdownType == 'string' ? 'LIKE' : 'EQ'//切回默认查询条件
        }, () => {
            //调用清除方法参数为当前字段的field
            onFilterClear && onFilterClear(dataIndex);
        });
    }

    /**
     * 设置输入文本的值
     *
     */
    changeText = (val) => {
        this.setState({
            value: val
        });
    }

    /**
     * 输入框回车执行回调
     *
     */
    changeTextCall = (e) => {
        let { onFilterChange, dataIndex } = this.props;
        if (e.keyCode == 13) {
            onFilterChange(dataIndex, e.target.value, this.state.condition);
        }
    }
    /**
     * 更改修改值
     *
     */
    changeValue = () => {
        this.setState({
            value: ""
        });
    }
    /**
     * 下拉条件的回调
     *
     * @param {*} key 字段
     * @param {*} value 值1,2,3...6
     */
    onSelectDropdown = (item) => {
        let { onFilterChange, dataIndex } = this.props;
        this.setState({
            condition: item.key
        }, () => {
            onFilterChange && onFilterChange(dataIndex, this.state.value, this.state.condition);
        });
    }

    /**
     * 修改数值型的值
     *
     */
    changeNumber = (value) => {
        let { onFilterChange, dataIndex } = this.props;
        this.setState({
            value
        }, () => {
            onFilterChange(dataIndex, value, this.state.condition);
        });
    }
    //清除数值
    clearNumber = () => {
        let { onChange } = this.props;
        onChange && onChange("");
        this.setState({
            value: ""
        });
    }

    //失去焦点后执行函数
    changeTextCallBlur = (val) => {
        let { onChange } = this.props;
        onChange && onChange(val);
    }
    //设置下拉值
    changeSelect = (value) => {
        let { onFilterChange, dataIndex } = this.props;
        if (onFilterChange) {
            onFilterChange(dataIndex, value, this.state.condition);
            this.setState({
                value
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
    changeDate = (value) => {
        let { onFilterChange, dataIndex } = this.props;
        if (onFilterChange) {
            onFilterChange(dataIndex, value, this.state.condition);
            this.setState({
                value,
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
        let { dataIndex, filterDropdown, filterDropdownType, format, className, onChange, onSelectDropdown, clsPrefix, locale } = this.props;
        switch (rendertype) {
            case 'text':
                return <div className={`${clsPrefix} filter-wrap`}>
                    <FormControl
                        value={this.state.value}
                        className={className}
                        onChange={this.changeText}
                        onKeyDown={this.changeTextCall}
                    //onBlur={this.changeTextCallBlur}
                    />
                    <FilterDropDown
                        locale={locale}
                        dataIndex={dataIndex}
                        dataText={this.state.value}
                        onSelectDropdown={this.onSelectDropdown}
                        onClickClear={this.clearFilter}
                        isShowClear={this.state.value}
                        isShowCondition={filterDropdown}
                        filterDropdownType={filterDropdownType}
                    >
                    </FilterDropDown>
                </div>
            case 'number':
                return <div className={`${clsPrefix} filter-wrap`}>
                    <InputNumber
                        className={className}
                        value={this.state.value}
                        onChange={this.changeNumber}
                        iconStyle="one"
                    />
                    <FilterDropDown
                        locale={locale}
                        dataIndex={dataIndex}
                        dataText={this.state.value}
                        onSelectDropdown={this.onSelectDropdown}
                        onClickClear={this.clearFilter}
                        isShowClear={this.state.value != 0}
                        isShowCondition={filterDropdown}
                        filterDropdownType={filterDropdownType}
                    >
                    </FilterDropDown>
                </div>
            case 'dropdown':
                return <div className={`${clsPrefix} filter-wrap`}>
                    <Select
                        {...this.props}
                        value={this.state.value}
                        onChange={this.changeSelect}
                    /><FilterDropDown
                        locale={locale}
                        dataIndex={dataIndex}
                        dataText={this.state.value}
                        onSelectDropdown={this.onSelectDropdown}
                        onClickClear={this.clearFilter}
                        isShowCondition={filterDropdown}
                        isShowClear={this.state.value}
                        filterDropdownType={filterDropdownType}
                    >
                    </FilterDropDown></div>
            case 'date':
                return <div className={`${clsPrefix} filter-wrap`}>
                    <DatePicker
                        {...this.props}
                        value={this.state.value}
                        onChange={this.changeDate}
                        open={this.state.open}
                        format={format}
                        locale={zhCN}
                    /><FilterDropDown
                        locale={locale}
                        dataIndex={dataIndex}
                        dataText={this.state.value}
                        onSelectDropdown={this.onSelectDropdown}
                        onClickClear={this.clearFilter}
                        isShowCondition={filterDropdown}
                        isShowClear={this.state.value}
                        filterDropdownType={filterDropdownType}
                    >
                    </FilterDropDown>
                </div>
            case 'daterange':
                return <div className={`${clsPrefix} filter-wrap`}>
                    <RangePicker
                        {...this.props}
                        value={this.state.value}
                        onChange={this.changeDate}
                        open={this.state.open}
                        format={format}
                        showTime={true}
                        locale={zhCN}
                        placeholder={'开始 ~ 结束'}
                        dateInputPlaceholder={['开始', '结束']}
                        showClear={true}
                    /><FilterDropDown
                        locale={locale}
                        dataIndex={dataIndex}
                        dataText={this.state.value}
                        onSelectDropdown={this.onSelectDropdown}
                        onClickClear={this.clearFilter}
                        isShowCondition={filterDropdown}
                        isShowClear={this.state.value}
                    >
                    </FilterDropDown>
                </div>
            case 'bool':
                return <div className={`${clsPrefix} filter-wrap`}>
                    <Switch
                        className={className}
                        onChange={onChange}
                    />
                    <FilterDropDown locale={locale}
                        onSelectDropdown={onSelectDropdown}
                    >
                    </FilterDropDown>
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
