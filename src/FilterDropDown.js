import React, { Component } from 'react';
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
            selectValue: []
        }
    }
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
    render() {
        let { isShowCondition } = this.props;

        let locale = getComponentLocale(this.props, this.context, 'Table', () => i18n);

        let dropmenu = (
            <Menu
                onSelect={this.onSelectDropdown}
                selectedKeys={this.state.selectValue}
            >
                <Item key="2">{locale['include']}</Item>
                <Item key="6">{locale['exclusive']}</Item>
                <Item key="1">{locale['equal']}</Item>
                <Item key="5">{locale['unequal']}</Item>
                <Item key="7">{locale['begin']}</Item>
                <Item key="3">{locale['end']}</Item>
            </Menu>
        );
        return (<div className="filter-btns">
            {isShowCondition == 'show' && <Dropdown
                trigger={['click']}
                overlay={dropmenu}
                animation="slide-up"
            >
                <Button shape="border" style={{ marginLeft: "3px", minWidth: "0px", width: "24px", padding: 0 }}><Icon style={{ padding: 0 }} type="uf-filter" /></Button>
            </Dropdown>}
            <Button onClick={this.onClickClear} shape="border" style={{ marginLeft: "1px", minWidth: "0px", width: "24px", padding: 0, "visibility": this.props.isShowClear || this.state.selectValue.length > 0 ? "visible" : "hidden" }}><Icon style={{ padding: 0, "visibility": this.props.isShowClear || this.state.selectValue.length > 0 ? "visible" : "hidden" }} type="uf-filterno" /></Button>
        </div>
        );
    }
}

export default FilterDropDown;
