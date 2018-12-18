/**
*
* @title 编辑态表格
* @description 这是带有多种不同格式的编辑态表格（编辑态是通过使用不同的render来达到不同编辑格式）
*
*/

import Button from "bee-button";
import React from "react";
import Table from "../../src";
import Animate from "bee-animate";
import Tooltip from "bee-tooltip";
import Icon from "bee-icon";
import Input from "bee-form-control";
import Form from "bee-form";
import Select from "bee-select";
import renderInput from "../../build/render/InputRender.js";
import renderSelect from "../../build/render/SelectRender.js";

const InputRender = renderInput(Form, Input, Icon);
const SelectRender = renderSelect(Select, Icon);

const Option = Select.Option;

const dataSource = [
  {
    key: "boyuzhou",
    value: "jack"
  },
  {
    key: "renhualiu",
    value: "lucy"
  },
  {
    key: "yuzhao",
    value: "yiminghe"
  }
];
class Demo19 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          key: "0",
          name: "沉鱼",
          number: "10",
          age: "y",
          address: "jack",
          datepicker: "2017-06-12",
          MonthPicker: "2017-02"
        },
        {
          key: "1",
          name: "落雁",
          number: "100",
          age: "y",
          address: "lucy",
          datepicker: "2017-06-12",
          MonthPicker: "2017-02"
        },
        {
          key: "2",
          name: "闭月",
          number: "1000",
          age: "n",
          address: "lucy",
          datepicker: "2017-06-12",
          MonthPicker: "2017-02"
        },
        {
          key: "3",
          name: "羞花",
          number: "9999",
          age: "y",
          address: "lucy",
          datepicker: "2017-06-12",
          MonthPicker: "2017-02"
        }
      ],
      count: 4
    };
    this.columns = [ 
      {
        title: "货币输入",
        dataIndex: "number",
        key: "number",
        width: "150px",
        render: (text, record, index) => (
          <InputRender
            format="Currency"
            name="name"
            placeholder="请输入姓名"
            value={text}
            isclickTrigger={true}
            check={this.check}
            onChange={this.onInputChange(index, "name")}
            isRequire={true}
            method="blur"
            errorMessage={
              <Tooltip overlay={"错误提示"}>
                <Icon type="uf-exc-c" className="" />
              </Tooltip>
            }
            reg={/^[0-9]+$/}
          />
        )
      },
       
      {
        title:(<div>下拉框的div</div>),
        dataIndex: "address",
        key: "address",
        width: "200px",
        render: (text, record, index) => {
          return (
            <SelectRender
              dataSource={dataSource}
              isclickTrigger={true}
              value={text}
              onChange={this.onSelectChange(index, "address")}
              onFocus={this.handFocus}
              onBlur={this.onBlur}
              autofocus
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
      }
    ];
  }
  check = (flag, obj) => {
    console.log(flag);
    console.log(obj);
  };

  handFocus = (value,e) => {
    console.log(value+` 获取焦点事件`);
  };
  onBlur = (value,e) => {
    console.log(value+` onBlur`);
  };

  onInputChange = (index, key) => {
    return value => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  };

  onSelectChange = (index, key) => {
    return value => {
      console.log(`selected ${value}`);
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
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
      MonthPicker: "2017-02"
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
  getData = () => {
    console.log(this.state.dataSource);
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
          添加一行
        </Button>
        <Button
          style={{marginLeft:"5px"}}
          className="editable-add-btn"
          type="ghost"
          onClick={this.getData}
        >
          获取数据
        </Button>
        <Table
          data={dataSource}
          columns={columns}
          getBodyWrapper={this.getBodyWrapper}
        />
      </div>
    );
  }
}

export default Demo19;
