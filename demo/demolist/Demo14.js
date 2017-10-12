/**
*
* @title 编辑态表格
* @description 这是带有多种不同格式的编辑态表格（编辑态是通过使用不同的render来达到不同编辑格式）
*
*/

import Button from "bee-button";
import React, { Component } from "react";
import Table from "../../src";
import Animate from "bee-animate";
import Icon from "bee-icon";
import Input from "bee-form-control";
import Checkbox from "bee-checkbox";
import Select from "bee-select";
import Popconfirm from "bee-popconfirm";
import InputRender from "../../src/render/InputRender.js";
import DateRender from "../../src/render/DateRender.js";
import SelectRender from "../../src/render/SelectRender.js";

//日期控件引入
import DatePicker from "bee-datepicker";
import MonthPicker, { WeekPicker, RangePicker } from "bee-datepicker";

const format = "YYYY-MM-DD";
const format2 = "YYYY-MM";
const format3 = "YYYY-MM-DD HH:mm:ss";

const dateInputPlaceholder = "选择日期";
const dateInputPlaceholder2 = "选择年月";

class Demo14 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          key: "0",
          name: "沉鱼",
          age: "y",
          address: "111",
          datepicker: "2017-06-12",
          MonthPicker: "2017-02",
          TimePicker: "2017-09-14 14:24:48"
        },
        {
          key: "1",
          name: "落雁",
          age: "y",
          address: "lucy",
          datepicker: "2017-06-12",
          MonthPicker: "2017-02",
          TimePicker: "2017-09-14 14:24:48"
        },
        {
          key: "2",
          name: "闭月",
          age: "n",
          address: "lucy",
          datepicker: "2017-06-12",
          MonthPicker: "2017-02",
          TimePicker: "2017-09-14 14:24:48"
        },
        {
          key: "3",
          name: "羞花",
          age: "y",
          address: "lucy",
          datepicker: "2017-06-12",
          MonthPicker: "2017-02",
          TimePicker: "2017-09-14 14:24:48"
        }
      ],
      count: 4
    };
    this.columns = [
      {
        title: "普通输入",
        dataIndex: "name",
        key: "name",
        width: "100px",
        render: (text, record, index) => (
          <InputRender
            value={text}
            isclickTrigger={true}
            onChange={this.onInputChange(index, "name")}
          />
        )
      },
      {
        title: "复选",
        dataIndex: "age",
        key: "age",
        width: "100px",
        render: (text, record, index) => (
          <Checkbox
            checked={record.age}
            onChange={this.onCheckChange(index, "age")}
          />
        )
      },
      {
        title: "下拉框",
        dataIndex: "address",
        key: "address",
        width: "200px",
        render: (text, record, index) => {
          return (
            <SelectRender
              isclickTrigger={true}
              value={text}
              onChange={this.onSelectChange}
            >
              <Option value="jack">boyuzhou</Option>
              <Option value="lucy">renhualiu</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="yiminghe">yuzhao</Option>
            </SelectRender>
          );
        }
      },
      {
        title: "年月日",
        dataIndex: "datepicker",
        key: "datepicker",
        width: "200px",
        render: (text, record, index) => {
          return (
            <DateRender
              value={text}
              isclickTrigger={true}
              format={format}
              onSelect={this.onDateSelect}
              onChange={this.onDateChange}
              placeholder={dateInputPlaceholder}
            />
          );
        }
      },
      {
        title: "年月",
        dataIndex: "MonthPicker",
        key: "MonthPicker",
        width: "200px",
        render: (text, record, index) => {
          return (
            <DateRender
              value={text}
              isclickTrigger={true}
              format={format2}
              onSelect={this.onSelect}
              onChange={this.onChange}
              placeholder={dateInputPlaceholder2}
            />
          );
        }
      },
      {
        title: "日期",
        dataIndex: "TimePicker",
        key: "TimePicker",
        render: (text, record, index) => {
          return (
            <DateRender
              value={text}
              format={format3}
              isclickTrigger={true}
              onSelect={this.onDateSelect}
              onChange={this.onDateChange}
              placeholder={dateInputPlaceholder}
            />
          );
        }
      }
    ];
  }

  onInputChange = (index, key) => {
    return value => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  };
  onCheckChange = (index, key) => {
    return value => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  };
  onSelectChange = value => {
    console.log(`selected ${value}`);
  };
  onDateChange = d => {
    console.log(d);
  };
  onDateSelect = d => {
    console.log(d);
  };
  onDelete = index => {
    return () => {
      const dataSource = [...this.state.dataSource];
      dataSource.splice(index, 1);
      this.setState({ dataSource });
    };
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `凤姐 ${count}`,
      age: 32,
      address: "jack",
      datepicker: "2017-06-12",
      MonthPicker: "2017-02",
      TimePicker: "2017-09-14 14:24:48"
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1
    });
  };

  getBodyWrapper = body => {
    return (
      <Animate
        transitionName="move"
        component="tbody"
        className={body.props.className}
      >
        {body.props.children}
      </Animate>
    );
  };
  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div>
        <Button
          className="editable-add-btn"
          type="ghost"
          onClick={this.handleAdd}
        >
          添加
        </Button>
        <Table
          bordered
          data={dataSource}
          columns={columns}
          getBodyWrapper={this.getBodyWrapper}
        />
      </div>
    );
  }
}

export default Demo14;
