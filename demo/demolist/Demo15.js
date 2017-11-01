/**
 *
 * @title 编辑态表格（包含校验）
 * @description 块级布局
 *
 */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Form from "bee-form";
import FormControl from "bee-form-control";
import Label from "bee-label";
import FormGroup from "bee-form-group";
class Demo15 extends Component {
  check = (flag, obj) => {
    console.log(flag);
    console.log(obj);
  };
  render() {
    return (
      <Form.FormItem
       mesClassName="mesclassname"
        labelName="姓名"
        isRequire={true}
        method="blur"
        reg={/^[0-9]+$/}
        check={this.check}
      >
        <FormControl name="age" placeholder="请输入数字" />
      </Form.FormItem>
    );
  }
}
export default Demo15;
