/**
*
* @title 简单表格、文字过长，两种tip
* 【Tooltip】
* @description
*/

import React, { Component } from "react";
import Button from "bee-button";
import Tooltip from "bee-tooltip";
import Table from "../../src";

const columns =  [
    {
        title: "序号",
        dataIndex: "index",
        width: 50,
        key: "index",
        render(text,record,index){
            return(
                <span className="serial-number-center" title={text}>{index + 1}</span>
            )
        }
    },
    {
        title: "订单编号",
        dataIndex: "ebeln",
        key: "ebeln",
        width: 100,
        className:'text-center',//列内容居中
        onCellClick: (record) => this.cellClick(record, false),
        render(text,record,index){
            return(
                <span className="link">{text}</span>
            )
        }
    },
    {
        title: "供应商编码",
        width: 80,
        dataIndex: "lifnr",
        key: "lifnr",
        className:'text-center',
    },
    {
        title: "供应商名称",
        //width: 250,
        dataIndex: "lifnrName",
        className: "text-ellipsis",//溢出省略号,写了溢出省略号必须加上下面的render
        key: "lifnrName",
        render(text,record,index){
            return(
                <span title={text}>{text}</span>//title是鼠标放上去显示所有的内容
            )
        }
    },
    {
        title: "订单类型",
        width: 150,
        dataIndex: "bsart",
        key: "bsart",
        render(text,record,index) {
            return text=='NB'?'标准采购订单':(text=='YB'?'直发工地采购订单':(text=='Z100'?'跨公司重机采购6.0':(text=='ZCB'?'非生产材料领料单':(text=='ZDB'?'D02领料单':(text=='ZEB'?'配送转储采购订单':(text=='ZFB'?'维修采购订单':(text=='ZLB'?'网购订单':(text=='ZMB'?'委托加工采购订单':(text=='ZRB'?'退货采购订单':(text=='ZWB'?'工序外协采购订单':(text=='ZTB'?'紧急订单':(text=='ZWB'?'工序外协采购订单':(text=='UB'?'转储采购订单':'')))))))))))))
        }
    },
    {
        title: "采购组织",
        width: 80,
        dataIndex: "ekorg",
        key: "ekorg",
        className:'text-center',
    },
    {
        title: "采购组",
        width: 60,
        dataIndex: "ekgrp",
        key: "ekgrp",
        className:'text-center',
    },
    {
        title: "凭证日期",
        dataIndex: "bedat",
        width: 80,
        key: "bedat",
        className:'text-center',
        render(text,record,index) {
            return moment(text).format('YYYY-MM-DD')
        }
    },
    {
        title: "一级审批",
        dataIndex: "frgc1",
        width: 80,
        key: "frgc1",
        className:'text-center'
    },
    {
        title: "二级审批",
        dataIndex: "frgc2",
        width: 80,
        key: "frgc2",
        className:'text-center'
    },
    {
        title: "审批状态",
        dataIndex: "frgrl",
        width: 80,
        key: "frgrl",
        className:'text-center',
        render(text,record,index) {
            return text?(text=='X'?'未审批':''):'已审批'
        }
    },
    {
        title: "确认状态",
        dataIndex: "confirmResult",
        width: 80,
        key: "confirmResult",
        className:'text-center',
        render(text,record,index) {
            return text?(text=='1'?'已确认':'拒绝'):'未确认' 
        }
    },
    {
        title: "确认人",
        dataIndex: "confirmUsername",
        width: 150,
        key: "confirmUsername",
        className: "text-ellipsis",//溢出省略号,写了溢出省略号必须加上下面的render
        render(text,record,index){
            return(
                <span title={text}>{text}</span>//title是鼠标放上去显示所有的内容
            )
        }
    },
    {
        title: "确认时间",
        dataIndex: "confirmDate",
        width: 80,
        key: "confirmDate",
        className:'text-center',
        render(text,record,index) {
            return text?moment(text).format('YYYY-MM-DD hh:mm:ss'):''
        }
    },
    {
        title: "关闭状态",
        dataIndex: "elikz",
        width: 80,
        key: "elikz",
        className:'text-center',
        render(text,record,index) {
            return text?(text=='X'?'已关闭':''):'未关闭'
        }
    },
    {
        title: "沟通",
        dataIndex: "gt",
        width: 80,
        key: "gt",
        className:'text-center',
        render:(text,record,index)=>{
            return (
                <DelModal
                    hide={this.props.hideModal}
                    confirmFn={this.confirm} 
                    modalTitle="反馈" 
                    showFooter={false} 
                    dialogClassName="modal-communicate"
                    onShow={
                       ()=>{
                            this.getContent({"orderType":"purchase","ebeln":record.ebeln})
                        }
                    }
                    modalContent={
                    (
                        <div className="modal-communicate-con">                               
                                <Row>
                                    <Col md={6} xs={12}>
                                        <Label>采购订单号：</Label>
                                        <span>
                                            {record.ebeln}
                                        </span>
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <Label>供应商代码：</Label>
                                        <span>
                                            {record.lifnr}
                                        </span>
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <Label>供应商名称：</Label>
                                        <span>
                                            {record.lifnrName}
                                        </span>
                                    </Col>
                                </Row>
                                <div className="modal-communicate-record">                                            
                                {this.state.feedbacks.map((item,index)=>{					
                                    return (
                                        <p>
                                            <span>【{item.feedbackUsername}】</span> 
                                            <span style={{'color':'#555','padding':'0 10px'}}>{item.feedbackContent}</span>  
                                            <span>{moment(item.feedbackDate).format('YYYY-MM-DD HH:MM:SS')}</span>
                                        </p>
                                    )
                                    })}
                                </div>
                                <FormItem>
                                    <textarea name="feedbackContent" ref='textarea' className="modal-chat" placeholder=""></textarea>
                                    <span style={{'display':this.state.showError?'block':'none','color':'red'}}>反馈内容必填</span>
                                    <Button shape="border" colors="primary" size='sm' onClick={() => this.feedback(record.ebeln)}>发送</Button>
                                </FormItem>
                            </div>
                        )
                            
                    }>
                    <span className="text-center link"><i className="iconfont icon-xiaoxi"></i></span>
                </DelModal>
            )
        }
    }
];

const data = [
  { a: "令狐冲", b: "男", c: 41, d: "操作", key: "1" },
  { a: "杨过叔叔的女儿黄蓉", b: "男", c: 67, d: "操作", key: "2" },
  { a: "郭靖", b: "男", c: 25, d: "操作", key: "3" }
];

class Demo1 extends Component {

  constructor(props){
      super(props);
      this.state = {
        data: [],
        selectedRowIndex: 0
      }
  }

  render() {
    return (
      <Table
        columns={columns}
        data={this.state.data}
        scroll={{ x: 1560}}
        onRowClick={(record,index,indent)=>{
          this.setState({ 
              selectedRowIndex: index
          });
        }}
      /> 
    );
  }
}

export default Demo1;
