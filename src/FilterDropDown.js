/**
 * 过滤行功能内的下拉条件
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'bee-dropdown';
import Menu from 'bee-menus';
import Button from 'bee-button';
import Icon from 'bee-icon';
import i18n from './lib/i18n';
import { getComponentLocale } from 'bee-locale/build/tool';
const { Item } = Menu;


class FilterDropDown extends Component {
    constructor() {
        super();
        this.state = {
            selectValue: ['LIKE'],
            selectNumberValue: ['EQ']
        }
    }
    /**
     * 点击下拉菜单
     *
     * @param {*} s 选中的selectRecord
     */
    onSelectDropdown = (item) => {
        let { onSelectDropdown, filterDropdownType } = this.props;
        if (onSelectDropdown) {
            if (filterDropdownType == 'string') {
                this.setState({
                    selectValue: [item.key]
                }, () => {
                    onSelectDropdown(item);
                });
            }
            if (filterDropdownType == 'number') {
                this.setState({
                    selectNumberValue: [item.key]
                }, () => {
                    onSelectDropdown(item);
                });
            }
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
                // selectValue: [],
                // selectNumberValue: []
            }, () => {
                onClickClear();
            });
        }
    }

    /**
     * 根据props来获得指定的Menu,分为String和Number
     *
     * @returns JSX Menu
     */
    getMenu = () => {
        let { selectValue, selectNumberValue } = this.state;
        let { filterDropdownType, filterDropdownIncludeKeys } = this.props;
        let locale = getComponentLocale(this.props, this.context, 'Table', () => i18n);
        let stringEnum = {
            LIKE: 'include',
            ULIKE: 'exclusive',
            EQ: 'equal',
            UEQ: 'unequal',
            START: 'begin',
            END: 'end'
        };
        let numberEnum = {
            GT: 'greater_than',
            GTEQ: 'great_than_equal_to',
            LT: 'less_than',
            LTEQ: 'less_than_equal_to',
            EQ: 'be_equal_to',
            UEQ: 'not_equal_to'
        };
        if (filterDropdownIncludeKeys != undefined) {
            switch (filterDropdownType) {
                case 'string':
                    return <Menu
                        onClick={this.onSelectDropdown}
                        selectedKeys={selectValue}
                    >
                        {
                            filterDropdownIncludeKeys.map(item => {
                                return <Item key={item}>{locale[stringEnum[item]]}</Item>
                            })
                        }
                    </Menu>
                case 'number':
                    return <Menu
                         onClick={this.onSelectDropdown}
                        selectedKeys={selectNumberValue}
                    >
                        {
                            filterDropdownIncludeKeys.map(item => {
                                return <Item key={item}>{locale[numberEnum[item]]}</Item>
                            })
                        }
                    </Menu>
                default:
                    return <div></div>;
            }
        } else {
            switch (filterDropdownType) {
                case 'string':
                    return <Menu
                        onClick={this.onSelectDropdown}
                        selectedKeys={selectValue}
                    >
                        <Item key="LIKE">{locale['include']}</Item>
                        <Item key="ULIKE">{locale['exclusive']}</Item>
                        <Item key="EQ">{locale['equal']}</Item>
                        <Item key="UEQ">{locale['unequal']}</Item>
                        <Item key="RLIKE">{locale['begin']}</Item>
                        <Item key="LLIKE">{locale['end']}</Item>
                    </Menu>
                case 'number':
                    return <Menu
                        onClick={this.onSelectDropdown}
                        selectedKeys={selectNumberValue}
                    >
                        <Item key="GT">{locale['greater_than']}</Item>
                        <Item key="GTEQ">{locale['great_than_equal_to']}</Item>
                        <Item key="LT">{locale['less_than']}</Item>
                        <Item key="LTEQ">{locale['less_than_equal_to']}</Item>
                        <Item key="EQ">{locale['be_equal_to']}</Item>
                        <Item key="UEQ">{locale['not_equal_to']}</Item>
                    </Menu>
                default:
                    return <div></div>;
            }
        }
    }
    render() {
        let { isShowCondition } = this.props;

        return (<div className="filter-btns">
            {isShowCondition == 'show' && <Dropdown
                overlayClassName="u-filter-dropdown-menu-wrap"
                trigger={['click']}
                overlay={this.getMenu()}
                animation="slide-up"
            >
                <Button
                    shape="border"
                    style={{ marginLeft: "2px", minWidth: "0px", width: "26px", lineHeight: "24px", padding: 0 }}
                >
                    <Icon style={{ padding: 0, color: '#585858' }} type="uf-filter" />
                </Button>
            </Dropdown>}
            <Button
                onClick={this.onClickClear}
                shape="border"
                style={{ marginLeft: "2px", minWidth: "0px", width: "26px", lineHeight: "24px", padding: 0, "visibility": this.props.isShowClear || this.state.selectValue.length > 0 ? "visible" : "hidden" }}
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
    filterDropdownType: 'string'
}

export default FilterDropDown;
