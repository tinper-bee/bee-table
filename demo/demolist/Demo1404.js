/**
* @title 层级树大数据场景
* @parent 无限滚动 Infinite-scroll
* @description
* demo1404
*/
import React, { Component } from "react";
import { Button } from "tinper-bee";

import Table from "../../src";
import BigData from "../../src/lib/bigData";
const BigDataTable = BigData(Table);
const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        width: '150',
        key: 'index',
        render: (text, record, index) => {
            return record.index ? record.index : index
        }
    },
    { title: "用户名", dataIndex: "a", key: "a", width: 580, className: "rowClassName" },
    { id: "123", title: "性别", dataIndex: "b", key: "b", width: 80 },
    { title: "年龄", dataIndex: "c", key: "c", width: 200 }
];

const data = [...new Array(10)].map((e, i) => {
    const rs = { a: i + 'a', b: i + 'b', c: i + 'c', d: i + 'd', key: i };
    if (i % 3 == 0) {
        rs.b = '女';
        rs.children = [];
        for (let subi = 0; subi < 3; subi++) {
            rs.children.push({ a: i + subi + 'asub', b: i + subi + 'bsub', c: i + subi + 'csub', d: i + subi + 'dsub', key: i + `${subi} sub` });
            rs.children[subi].children = []
            for (let subj = 0; subj < 100; subj++) {
                rs.children[subi].children.push({ a: 333 + ' ' + subj, b: 333 + ' ' + subj, c: 333 + ' ' + subj, d: 333 + ' ' + subj, key: i + `${subj} sub1` });
            }
        }
    } else {
        rs.children = [];
        for (let subi = 0; subi < 3; subi++) {
            rs.children.push({ a: i + subi + 'asub', b: i + subi + 'bsub', c: i + subi + 'csub', d: i + subi + 'dsub', key: i + `${subi} sub` });
        }
    }
    return rs;
})

const data2 = [...new Array(10000)].map((e, i) => {
    const rs = { a: i + 'a', b: i + 'b', c: i + 'c', d: i + 'd', key: i };
    if (i % 3 == 0) {
        rs.b = '女';
    }
    return rs;
})

class Demo34 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data
        }
    }

    /**
     * expanded : 当前的状态
     * record : 当前行的数据
     */
    onExpand = (expanded, record) => {
        console.log('当前的状态---' + expanded, ' 当前行的数据---' , record);
    }
    handleClick = () => {
        this.setState({
            data: data2
        })
    }
    render () {
        return (
            <div>
                <Button onClick={this.handleClick} colors="secondary" style={{ marginBottom: '8px' }}>改变数据源</Button>
                <BigDataTable
                    columns={columns}
                    data={this.state.data}
                    parentNodeId='parent'
                    scroll={{ y: 300 }}
                    onExpand={this.onExpand}
                    onRowClick={(record, index, indent) => {
                        console.log('currentIndex--' + index);
                    }}
                />
            </div>

        );
    }
}

export default Demo34;