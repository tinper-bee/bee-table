/**
 *
 * @title 单元格编辑
 * @parent 编辑 Editor
 * @description 可以对单元格进行编辑的表格，示例中给出输入框、下拉框、参照的编辑模式，以及两类校验。（通过对 coloums 配置 render 属性实现渲染不同格式的编辑态单元格）
 * demo0502
 */
import React, { Component } from "react";
import Table from "../../src";
import { Icon, Select, Tooltip, Form } from "tinper-bee";
const Option = Select.Option;
import { RefTreeWithInput } from "ref-tree";

class StringEditCell extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      value: this.props.value,
      editable: false
    };
    this.editWarp = React.createRef();
  }

  commitChange = () => {
    if (this.state.value === "") return;
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  };

  edit = () => {
    this.setState({ editable: true });
  };

  handleKeydown = event => {
    if (event.keyCode == 13) {
      this.commitChange();
    }
  };

  handleChange = e => {
    if (e.target.value === "") this.editWarp.className += " verify-cell";
    this.setState({ value: e.target.value });
  };

  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {editable ? (
          <div ref={el => this.editWarp = el} className="editable-cell-input-wrapper">
            <input
              className={value ? "u-form-control" : "u-form-control error"}
              autoFocus
              defaultValue={this.props.value}
              value={value}
              onKeyDown={this.handleKeydown}
              onChange={this.handleChange}
              onBlur={this.commitChange}
            />
            {value === "" ? (
              <Tooltip
                inverse
                className="u-editable-table-tp"
                placement="bottom"
                overlay={
                  <div className="tp-content">
                    {"请输入" + this.props.colName}
                  </div>
                }
              >
                <Icon className="uf-exc-t require" />
              </Tooltip>
            ) : null}
          </div>
        ) : (
          <div className="editable-cell-text-wrapper" onClick={this.edit}>
            {value || " "}
          </div>
        )}
      </div>
    );
  }
}

const SELECT_SOURCE = ["男", "女"];

class SelectEditCell extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      value: this.props.value,
      editable: false
    };
  }

  handleSelect = value => {
    this.setState({ value });
  };

  commitChange = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  };

  edit = () => {
    this.setState({ editable: true });
  };

  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {editable ? (
          <div className="editable-cell-input-wrapper">
            <Select
              defaultValue={this.props.value}
              value={value}
              onSelect={this.handleSelect}
              onBlur={this.commitChange}
              autoFocus
            >
              {SELECT_SOURCE.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>
        ) : (
          <div className="editable-cell-text-wrapper" onClick={this.edit}>
            {value || " "}
          </div>
        )}
      </div>
    );
  }
}

const option = {
  title: "树",
  searchable: true,
  multiple: false,
  param: {
    refCode: "neworganizition_tree"
  },
  checkStrictly: true,
  disabled: false,
  nodeDisplay: record => {
    return record.refname;
  },
  displayField: record => {
    return record.refname;
  }, //显示内容的键
  valueField: "refpk", //真实 value 的键
  refModelUrl: {
    treeUrl: "https://mock.yonyoucloud.com/mock/358/blobRefTree",
    treeUrl: "/pap_basedoc/common-ref/blobRefTree"
  },
  matchUrl: "/pap_basedoc/common-ref/matchPKRefJSON",
  filterUrl: "/pap_basedoc/common-ref/filterRefJSON",
  lazyModal: false,
  strictMode: true,
  lang: "zh_CN",
  treeData: [
    {
      code: "org1",
      children: [
        {
          code: "bj",
          entityType: "mainEntity",
          name: "北京总部-简",
          pid: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
          refcode: "bj",
          refpk: "5305416e-e7b4-4051-90bd-12d12942295b",
          id: "5305416e-e7b4-4051-90bd-12d12942295b",
          isLeaf: "true",
          refname: "北京总部-简"
        },
        {
          code: "xd",
          entityType: "mainEntity",
          name: "新道-简",
          pid: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
          refcode: "xd",
          refpk: "b691afff-ea83-4a3f-affa-beb2be9cba52",
          id: "b691afff-ea83-4a3f-affa-beb2be9cba52",
          isLeaf: "true",
          refname: "新道-简"
        },
        {
          code: "yy3",
          entityType: "mainEntity",
          name: "test3",
          pid: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
          refcode: "yy3",
          refpk: "e75694d9-7c00-4e9e-9573-d29465ae79a9",
          id: "e75694d9-7c00-4e9e-9573-d29465ae79a9",
          isLeaf: "true",
          refname: "test3"
        },
        {
          code: "yy1",
          entityType: "mainEntity",
          name: "test1",
          pid: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
          refcode: "yy1",
          refpk: "fd32ceeb-57a8-4f44-816e-fa660f5715ab",
          id: "fd32ceeb-57a8-4f44-816e-fa660f5715ab",
          isLeaf: "true",
          refname: "test1"
        },
        {
          code: "dept2",
          children: [
            {
              code: "cs",
              entityType: "subEntity",
              organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
              name: "测试部-简",
              pid: "0ebbb6d8-250a-4d1d-a019-7ae951629a2c",
              refcode: "cs",
              refpk: "cc43a66a-438d-4106-937f-bec44406f771",
              id: "cc43a66a-438d-4106-937f-bec44406f771",
              isLeaf: "true",
              refname: "测试部-简"
            },
            {
              code: "qd",
              entityType: "subEntity",
              organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
              name: "前端部-简",
              pid: "0ebbb6d8-250a-4d1d-a019-7ae951629a2c",
              refcode: "qd",
              refpk: "73a10edd-aae8-4f31-af25-1f48f0a3b344",
              id: "73a10edd-aae8-4f31-af25-1f48f0a3b344",
              isLeaf: "true",
              refname: "前端部-简"
            }
          ],
          entityType: "subEntity",
          organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
          name: "生产处",
          refcode: "dept2",
          refpk: "0ebbb6d8-250a-4d1d-a019-7ae951629a2c",
          id: "0ebbb6d8-250a-4d1d-a019-7ae951629a2c",
          refname: "生产处"
        },
        {
          code: "dept1",
          children: [
            {
              code: "dept1_2",
              entityType: "subEntity",
              organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
              name: "财务二科",
              pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
              refcode: "dept1_2",
              refpk: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
              id: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
              isLeaf: "true",
              refname: "财务二科"
            },
            {
              code: "dept1_1",
              entityType: "subEntity",
              organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
              name: "财务一科",
              pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
              refcode: "dept1_1",
              refpk: "9711d912-3184-4063-90c5-1facc727813c",
              id: "9711d912-3184-4063-90c5-1facc727813c",
              isLeaf: "true",
              refname: "财务一科"
            }
          ],
          entityType: "subEntity",
          organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
          name: "财务处",
          refcode: "dept1",
          refpk: "95b60f35-ed0b-454e-b948-fb45ae30b911",
          id: "95b60f35-ed0b-454e-b948-fb45ae30b911",
          refname: "财务处"
        }
      ],
      entityType: "mainEntity",
      name: "用友集团",
      refcode: "org1",
      refpk: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
      id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
      refname: "用友集团"
    }
  ]
};

const RefEditCell = Form.createForm()(
  class RefComponentWarpper extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        value: this.props.value.d,
        editable: false
      };
      this.refWarp = React.createRef();
    }

    edit = () => {
      this.setState({ editable: true }, () => this.refWarp.focus());
    };

    handleSelect = values => {
      this.setState({ value: values[0] });
    };

    commitChange = () => {
      this.setState({ editable: false });
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    };

    onRefBlur = e => {
      // 消除点击子组件，父组件先失焦再聚焦的事件触发过程带来的副作用
      const __REF_CONTENT__ = document.querySelector("div.ref-core-modal");
      if (!__REF_CONTENT__ && e.target === this.refWarp) {
        this.commitChange();
      }
    };

    render() {
      const { getFieldProps, getFieldError } = this.props.form;
      const { value, editable } = this.state;
      return editable ? (
        <div
          ref={el => (this.refWarp = el)}
          className="editable-cell-input-wrapper"
          tabIndex={-1}
          onBlur={this.onRefBlur}
        >
          <RefTreeWithInput
            {...option}
            onSave={this.handleSelect}
            getRefTreeData={this.getRefTreeData}
            {...getFieldProps("code1", {
              initialValue: JSON.stringify(value),
              rules: [
                {
                  message: "请输入请选择",
                  pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
                }
              ]
            })}
          />
          <span
            className="error"
            style={{ display: "block", color: "#f53c32" }}
          >
            {getFieldError("code1")}
          </span>
        </div>
      ) : (
        <div className="editable-cell-text-wrapper" onClick={this.edit}>
          {value.name || " "}
        </div>
      );
    }
  }
);

const dataSource = [
  {
    a: "ASVAL_201903280005",
    b: "小张",
    c: "男",
    d: {
      code: "dept1_2",
      entityType: "subEntity",
      organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
      name: "财务二科",
      pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
      refcode: "dept1_2",
      refpk: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
      id: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
      isLeaf: "true",
      refname: "财务二科"
    },
    key: "1"
  },
  {
    a: "ASVAL_201903200004",
    b: "小明",
    c: "男",
    d: {
      code: "dept1_2",
      entityType: "subEntity",
      organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
      name: "财务二科",
      pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
      refcode: "dept1_2",
      refpk: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
      id: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
      isLeaf: "true",
      refname: "财务二科"
    },
    key: "2"
  },
  {
    a: "ASVAL_201903120002",
    b: "小红",
    c: "女",
    d: {
      code: "dept1_1",
      entityType: "subEntity",
      organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
      name: "财务一科",
      pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
      refcode: "dept1_1",
      refpk: "9711d912-3184-4063-90c5-1facc727813c",
      id: "9711d912-3184-4063-90c5-1facc727813c",
      isLeaf: "true",
      refname: "财务一科"
    },
    key: "3"
  }
];

class Demo0502 extends Component {
  constructor(props, context) {
    super(props);
    this.columns = [
      {
        title: "员工编号",
        dataIndex: "a",
        key: "a"
      },
      {
        title: "名字",
        dataIndex: "b",
        key: "b",
        render: (text, record, index) => (
          <StringEditCell
            colName="名字"
            value={text}
            onChange={this.onCellChange(index, "b")}
          />
        )
      },
      {
        title: "性别",
        dataIndex: "c",
        key: "c",
        width: 100,
        render: (text, record, index) => (
          <SelectEditCell
            value={text}
            onChange={this.onCellChange(index, "c")}
          />
        )
      },
      {
        title: "部门",
        dataIndex: "d",
        key: "d",
        width: 215,
        render: (text, record, index) => (
          <RefEditCell
            value={record}
            onChange={this.onCellChange(index, "d")}
          />
        )
      },
      {
        key: "placeholder"
      }
    ];

    this.state = {
      dataSource: dataSource
    };
  }

  onCellChange = (index, key) => {
    return value => {
      const { dataSource } = this.state;
      dataSource[index][key] = value;
      this.setState({ dataSource }, () => console.dir(this.state.dataSource));
    };
  };

  render() {
    return (
      <div className="demo0502 u-editable-table">
        <Table data={this.state.dataSource} columns={this.columns} height={40}/>
      </div>
    );
  }
}

export default Demo0502;
