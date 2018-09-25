import React, { Component } from 'react';
import Dropdown from 'bee-dropdown';
import Menu from 'bee-menus';
import Button from 'bee-button';
import Icon from 'bee-icon';
const { Item } = Menu;

class FilterDropDown extends Component {
    render() {
        let dropmenu = (
            <Menu
                onSelect={this.props.onSelectDropdown}
            >
                <Item key="1">等于</Item>
                <Item key="2">包含</Item>
                <Item key="3">以结尾</Item>
                <Item key="4">空</Item>
                <Item key="5">不等于</Item>
                <Item key="6">不包含</Item>
                <Item key="7">以开始</Item>
            </Menu>
        );
        return (
            <Dropdown
                trigger={['click']}
                overlay={dropmenu}
                animation="slide-up"
            >
                <Button shape="border" style={{ marginLeft: "5px", minWidth: "0px", width: "38px", padding: 0 }}><Icon style={{ padding: 0 }} type="uf-navmenu" /></Button>
            </Dropdown>
        );
    }
}

export default FilterDropDown;
