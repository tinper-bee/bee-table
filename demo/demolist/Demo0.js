/**
*
* @title 自定义设置行高和字号
* @description canConfigureTableSize 设置是否显示toolbar设置按钮，getToolbarContainer 设置按钮放置的容器。
*/

import React, { Component } from "react";
import Table from "../../src";

const columns = [
    { title: "订单编号", dataIndex: "orderNum", key: "orderNum", width: 100 },
    { title: "采购组织", dataIndex: "org", key: "org", width: 200 },
    { title: "供应商", dataIndex: "supplier", key: "supplier", width: 100 },
    { title: "订单日期", dataIndex: "orderDate", key: "orderDate", width: 150 },
    { title: "总数量", dataIndex: "quantity", key: "quantity", width: 100 },
    { title: "单据状态", dataIndex: "status", key: "status", width: 100 },
    { title: "提交人", dataIndex: "submitter", key: "submitter", width: 100 },
    { title: "单位", dataIndex: "unit", key: "unit", width: 100 },
    { title: "总税价合计", dataIndex: "sum", key: "sum", width: 100 },
];

const data = [
    {
        orderNum: "NU0391025",
        org: "用友网络科技股份有限公司",
        supplier: "xx供应商",
        orderDate: '2018年03月18日',
        quantity: '100.00',
        status: '正常',
        submitter: '小张',
        unit: 'pc',
        sum: '8,487.00',
        key: "1"
    },
    {
        orderNum: "NU0391026",
        org: "用友网络科技股份有限公司",
        supplier: "xx供应商",
        orderDate: '2018年02月05日',
        quantity: '91.00',
        status: '异常',
        submitter: '小红',
        unit: 'pc',
        sum: '675.00',
        key: "2"
    },
    {
        orderNum: "NU0391027",
        org: "用友网络科技股份有限公司",
        supplier: "xx供应商",
        orderDate: '2018年07月01日',
        quantity: '98.00',
        status: '正常',
        submitter: '小李',
        unit: 'pc',
        sum: '1,531.00',
        key: "3"
    }
];

class Demo0 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: data,
            selectedRowIndex: 0,
        }
    }

    getToolbarContainer = () => {
        return document.getElementById('table-toolbar-container');
    }

    render () {
        return (
            <div className="demo0">
                <div id="table-toolbar-container"></div>
                <Table
                    canConfigureTableSize={true}
                    getToolbarContainer={this.getToolbarContainer}
                    columns={columns}
                    data={data}
                    onRowClick={(record, index, indent) => {
                        this.setState({
                            selectedRowIndex: index
                        });
                    }}
                />
            </div>
        );
    }
}

export default Demo0;
