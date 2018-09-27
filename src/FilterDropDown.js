import React, { Component } from 'react';
import Dropdown from 'bee-dropdown';
import Menu from 'bee-menus';
import Button from 'bee-button';
import Icon from 'bee-icon';
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
                selectValue: s.key
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
        let dropmenu = (
            <Menu
                onSelect={this.onSelectDropdown}
                selectedKeys={this.state.selectValue}
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
        return (<div>
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
