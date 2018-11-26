/**
 * 过滤行功能内的下拉条件
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'bee-dropdown';
import Menu from 'bee-menus';
import Button from 'bee-button';
import Icon from 'bee-icon';
import i18n from './i18n';
import { getComponentLocale } from 'bee-locale/build/tool';
const { Item } = Menu;


class FilterDropDown extends Component {
    constructor() {
        super();
        this.state = {
            selectValue: []//选择的条件的值
        }
    }
    /**
     * 点击下拉菜单
     *
     * @param {*} s 选中的selectRecord
     */
    onSelectDropdown = (s) => {
        let { onSelectDropdown } = this.props;
        if (onSelectDropdown) {
            this.setState({
                selectValue: [s.key]
            }, () => {
                onSelectDropdown(s);
            });
        }
    }

    /**
     * 清除事件
     *
     */
    onClickClear = () => {
        let { onClickClear } = this.props;
        if (onClickClear) {
            this.setState({
                selectValue: []
            }, () => {
                onClickClear();
            });
        }
    }

    /**
     * 根据props来获得指定的Menu
     *
     * @returns JSX Menu
     */
    getMenu = () => {
        let { selectValue } = this.state;
        let { filterDropdownType } = this.props;
        let locale = getComponentLocale(this.props, this.context, 'Table', () => i18n);
        switch (filterDropdownType) {
            case 'string':
                return <Menu
                    onSelect={this.onSelectDropdown}
                    selectedKeys={selectValue}
                >
                    <Item key="2">{locale['include']}</Item>
                    <Item key="6">{locale['exclusive']}</Item>
                    <Item key="1">{locale['equal']}</Item>
                    <Item key="5">{locale['unequal']}</Item>
                    <Item key="7">{locale['begin']}</Item>
                    <Item key="3">{locale['end']}</Item>
                </Menu>
            case 'number':
                return <Menu
                    onSelect={this.onSelectDropdown}
                    selectedKeys={selectValue}
                >
                    <Item key="1">{locale['greater_than']}</Item>
                    <Item key="2">{locale['great_than_equal_to']}</Item>
                    <Item key="3">{locale['less_than']}</Item>
                    <Item key="4">{locale['less_than_equal_to']}</Item>
                    <Item key="5">{locale['be_equal_to']}</Item>
                    <Item key="6">{locale['not_equal_to']}</Item>
                </Menu>
            default:
                return null;
        }
    }
    render() {
        let { isShowCondition } = this.props;

        return (<div className="filter-btns">
            {isShowCondition == 'show' && <Dropdown
                trigger={['click']}
                overlay={this.getMenu()}
                animation="slide-up"
            >
                <Button
                    shape="border"
                    style={{ marginLeft: "3px", minWidth: "0px", width: "24px", padding: 0 }}
                >
                    <Icon style={{ padding: 0, color: '#585858' }} type="uf-filter" />
                </Button>
            </Dropdown>}
            <Button
                onClick={this.onClickClear}
                shape="border"
                style={{ marginLeft: "1px", minWidth: "0px", width: "24px", padding: 0, "visibility": this.props.isShowClear || this.state.selectValue.length > 0 ? "visible" : "hidden" }}
            >
                <Icon style={{ padding: 0, color: '#585858', "visibility": this.props.isShowClear || this.state.selectValue.length > 0 ? "visible" : "hidden" }} type="uf-filterno" />
            </Button>
        </div>
        );
    }
}

FilterDropDown.propTypes = {
    isShowCondition: PropTypes.string,
    filterDropdownType: PropTypes.oneOf(['string', 'number'])
}

FilterDropDown.defaultProps = {
    isShowCondition: 'show',
    filterDropdownType: 'number'
}

export default FilterDropDown;
