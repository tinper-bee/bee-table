import React, { Component } from 'react';
import FormControl from 'bee-form-control';
import Button from 'bee-button';
import Icon from 'bee-icon';
import Select from 'bee-select';
import DatePicker from 'bee-datepicker';
import Menu from 'bee-menus';
import Dropdown from 'bee-dropdown';
const { Item } = Menu;
const format = "YYYY-MM-DD dddd";

class FilterType extends Component {
    renderControl = (rendertype) => {
        switch (rendertype) {
            case 'text':
                const dropmenu = (
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
                return <div><FormControl
                    className={this.props.className}
                    onChange={this.props.onChange}
                    style={{ width: "70%" }}
                />
                    <Dropdown
                        trigger={['click']}
                        overlay={dropmenu}
                        animation="slide-up"
                    >
                        <Button shape="border" style={{ marginLeft: "5px", minWidth: "26px", width: "26px", padding: 0, marginBottom: "4px" }}><Icon style={{ padding: 0 }} type="uf-arrow-c-o-down" /></Button>
                    </Dropdown>
                </div>
            case 'dropdown':
                return <Select
                    {...this.props}
                />
            case 'date':
                return <DatePicker
                    {...this.props}
                />
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

export default FilterType;
