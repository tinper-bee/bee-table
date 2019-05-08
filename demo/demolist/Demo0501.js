/**
 *
 * @title 行内编辑
 * @parent 编辑 Editor
 * @description 可以对行进行编辑的表格
 * demo0501
 */
import React, { Component } from "react";
import Table from "../../src";
import { Select, Form, FormControl, Button, Icon, Tooltip } from "tinper-bee";
const Option = Select.Option;
import { RefTreeWithInput } from "ref-tree";

class StringEditCell extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.editable) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange = value => {
    const { onChange, throwError } = this.props;
    if (value === "") {
      throwError && throwError(true);
    } else {
      throwError && throwError(false);
    }
    this.setState({ value });
    onChange && onChange(value);
  };

  render() {
    const { editable, required, colName } = this.props;
    const { value } = this.state;
    let cls = "editable-cell-input-wrapper";
    if (required) cls += " required";
    if (value === "") cls += " verify-cell";
    return editable ? (
      <div className="editable-cell">
        <div className={cls}>
          <FormControl value={value} onChange={this.handleChange} />
          <span className="error">
            {value === "" ? (
              <Tooltip
                inverse
                className="u-editable-table-tp"
                placement="bottom"
                overlay={<div className="tp-content">{"请输入" + colName}</div>}
              >
                <Icon className="uf-exc-t required-icon" />
              </Tooltip>
            ) : null}
          </span>
        </div>
      </div>
    ) : (
      value || " "
    );
  }
}

const SELECT_SOURCE = ["男", "女"];

class SelectEditCell extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.editable) {
      this.setState({ value: nextProps.value });
    }
  }

  handleSelect = value => {
    this.setState({ value });
    this.props.onChange && this.props.onChange(value);
  };

  render() {
    const { editable } = this.props;
    const { value } = this.state;
    let cls = "editable-cell-input-wrapper";
    return editable ? (
      <div className="editable-cell">
        <div className={cls}>
          <Select value={value} onSelect={this.handleSelect}>
            {SELECT_SOURCE.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    ) : (
      value || " "
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
      super(props);
      this.state = {
        value: props.value
      };
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.editable) {
        this.setState({ value: nextProps.value });
      }
    }

    handleSelect = values => {
      this.setState({ value: values[0] });
      this.props.onChange && this.props.onChange(values[0]);
    };

    render() {
      const { getFieldProps, getFieldError } = this.props.form;
      const { editable, required } = this.props;
      const { value } = this.state;
      let cls = "editable-cell-input-wrapper";
      if (required) cls += " required";
      if (getFieldError("refValue")) cls += " verify-cell";
      return editable ? (
        <div className={cls}>
          <RefTreeWithInput
            {...option}
            onSave={this.handleSelect}
            getRefTreeData={this.getRefTreeData}
            {...getFieldProps("refValue", {
              initialValue: JSON.stringify(value),
              rules: [
                {
                  message: (
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
                      <Icon className="uf-exc-t required-icon" />
                    </Tooltip>
                  ),
                  pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
                }
              ]
            })}
          />
          <span className="error">{getFieldError("refValue")}</span>
        </div>
      ) : (
        value.name || " "
      );
    }
  }
);

let dataSource = [
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

class Demo0501 extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      dataSource: dataSource,
      editingRowsMap: {},
      currentIndex: null,
      errorEditFlag: false
    };

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
            colName={"名字"}
            editable={this.state.editingRowsMap[index] || false}
            required
            value={text}
            onChange={this.onCellChange(index, "b")}
            throwError={this.throwError}
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
            editable={this.state.editingRowsMap[index] || false}
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
            colName={"部门"}
            editable={this.state.editingRowsMap[index] || false}
            required
            value={record.d}
            onChange={this.onCellChange(index, "d")}
            throwError={this.throwError}
          />
        )
      },
      // 只是用来占位占宽度的
      {
        key: "placeholder"
      }
    ];

    this.state = {
      dataSource: dataSource,
      editingRowsMap: {},
      currentIndex: null,
      errorEditFlag: false
    };

    this.dataBuffer = {};
  }

  edit = index => () => {
    if (index === null) return;
    let editingRowsMap = { ...this.state.editingRowsMap };
    editingRowsMap[index] = index.toString();
    // 最好使用深复制
    this.dataBuffer[index] = { ...this.state.dataSource[index] };
    this.setState({ editingRowsMap });
  };

  abortEdit = index => () => {
    let editingRowsMap = { ...this.state.editingRowsMap };
    delete editingRowsMap[index];
    delete this.dataBuffer[index];
    this.setState({ editingRowsMap });
  };

  delete = index => () => {
    if (index === null) return;
    let { dataSource } = this.state;
    dataSource.splice(index,1);
    this.setState({
      dataSource:dataSource
    });
  }

  commitChange = index => () => {
    if (this.state.errorEditFlag) return;
    let editingRowsMap = { ...this.state.editingRowsMap };
    delete editingRowsMap[index];
    let dataSource = [...this.state.dataSource];
    dataSource[index] = { ...this.dataBuffer[index] };
    this.setState({ editingRowsMap,  dataSource });
  };

  onCellChange = (index, key) => value => {
    this.dataBuffer[index][key] = value;
  };

  throwError = isError => {
    if (isError !== this.state.errorEditFlag)
      this.setState({ errorEditFlag: isError });
  };

  handleRowHover = (index, record) => {
    this.currentRecord = record;
    this.setState({ currentIndex: index });
  };

  renderRowHover = () => {
    const { currentIndex } = this.state;
    return this.state.editingRowsMap[currentIndex] ? (
      <div className="cancel-btns">
        <Button
          size="sm"
          bordered
          onClick={this.abortEdit(currentIndex)}
        >
          取消
        </Button>
        <Button size="sm" colors="primary" onClick={this.commitChange(currentIndex)}>
          确认
        </Button>
      </div>
    ) : (
      <div className="opt-btns">
        <Button size="sm" onClick={this.edit(currentIndex)}>
          编辑
        </Button>
        <Button size="sm" onClick={this.delete(currentIndex)}>
          删除
        </Button>
      </div>
    );
  };

  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div className="demo0501 u-editable-table">
        <Table
          data={dataSource}
          columns={columns}
          height={40}
          onRowHover={this.handleRowHover}
          hoverContent={this.renderRowHover}
        />
      </div>
    );
  }
}

export default Demo0501;
