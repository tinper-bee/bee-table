/**
 *
 * @title 多列排序、全选功能、合计
 * @description 多列排序、全选功能、合计（通过使用的封装好的功能方法实现复杂功能，简单易用！）新增回调函数(sorterClick)
 *
 */

import React, { Component } from "react";
import Table from "../../src";
import Checkbox from "bee-checkbox";
import Button from "bee-button";
import Icon from "bee-icon";
import multiSelect from "../../src/lib/multiSelect.js";
import sort from "../../src/lib/sort.js";
import sum from "../../src/lib/sum.js";
const ComplexTable = sum(Table);
const columns13 = [


  // {
  //     title: "项目期数主键",
  //     dataIndex: "cprojectId",
  //     key: "cprojectId",
  //     width: 150,
  //     render: (text, record, index) => this.
  //         renderReflc_qs
  //         (text, record, index, "cprojectId", this.editFlag)
  // },

  // {
  //     title: "项目期数编码",
  //     dataIndex: "cprojectPeriodCode",
  //     key: "cprojectPeriodCode",
  //     width: 150,
  //     render: (text, record, index) => this.
  //         renderColumns

  //         (text, record, index, "cprojectPeriodCode", this.editFlag)
  // },
  {
      title: "序号",
      dataIndex: "index",
      key: "index",
      width: 100,
      render(record, text, index) {
          return index + 1;
      }
  },

  {
      title: "项目期数",
      dataIndex: "cprojectPeriod",
      key: "cprojectPeriod",
      width: 150,
      // render: (text, record, index) => this.
      //     renderColumns
      //     (text, record, index, "cprojectPeriod", this.editFlag)
  },
  // {
  //     title: "期数",
  //     dataIndex: "cprojectShow",
  //     key: "cprojectShow",
  //     width: 150,
  //     render: (text, record, index) => this.
  //         renderColumns
  //         (text, record, index, "cprojectShow", this.editFlag)
  // },
  {
      title: "业态",
      dataIndex: "ctype",
      key: "ctype",
      width: 150,
      
      // render: (text, record, index) => this.

      //     renderReflc_yt
      //     (text, record, index, "cType", this.editFlag)
  },
  // {
  //     title: "业态",
  //     dataIndex: "ctypeShow",
  //     key: "ctypeShow",
  //     width: 150,
  //     render: (text, record, index) => this.
  //         renderColumns
  //         (text, record, index, "ctypeShow", this.editFlag)
  // },

  // {
  //     title: "房间id",
  //     dataIndex: "croomId",
  //     key: "croomId",
  //     width: 150,
  //     render: (text, record, index) => this.
  //         renderColumns
  //         (text, record, index, "croomId", this.editFlag)
  // },
  {
      title: "房间号码",
      dataIndex: "croomNumber",
      key: "croomNumber",
      width: 200,
      
      
  },
  {
      title: "客户",
      dataIndex: "ccustomer",
      key: "ccustomer",
      width: 150,
      
  },
  {
      title: "合同面积",
      dataIndex: "carea",
      key: "carea",
      width: 250,
      sumCol: true,
    
  },
  {
      title: "合同金额",
      dataIndex: "camount",
      key: "camount",
      width: 250,
      sumCol: true,
     
  },
  {
      title: "是否网签/备案",
      dataIndex: "crecord",
      key: "crecord",
      width: 150,
      // render: (text, record, index) => this.
      //     renderSelect
      //     (text, record, index, "crecord", this.editFlag)
  },
  {
      title: "付款方式",
      dataIndex: "cpayType",
      key: "cpayType",
      width: 150,
     
  },
  {
      title: "是否清款",
      dataIndex: "coverbz",
      key: "coverbz",
      width: 150,
      // render: (text, record, index) => this.
      //     renderSelect
      //     (text, record, index, "coverbz", this.editFlag)
  },
  {
      title: "签订日期",
      dataIndex: "corderDate",
      key: "corderDate",
      width: 140,
     
  },
  {
      title: "应收日期",
      dataIndex: "cpayDate",
      key: "cpayDate",
      width: 140,
      
  },
  {
      title: "营改增前预收款",
      dataIndex: "cbeforeFee",
      key: "cbeforeFee",
      width: 250,
      sumCol: true,

  },
  {
      title: "财务收款额",
      dataIndex: "cncAccount",
      key: "cncAccount",
      width: 250,
      sumCol: true,
      
  },
  {
      title: "营改增后预收款",
      dataIndex: "cafterFee",
      key: "cafterFee",
      width: 250,
      sumCol: true,
      
  },
  {
      title: "预收房款余额",
      dataIndex: "chouseFee",
      key: "chouseFee",
      width: 250,
      sumCol: true,
    
  },
  {
      title: "完工进度(%)",
      dataIndex: "cprogress",
      key: "cprogress",
      width: 150,
      // render: (text, record, index) => this.
      //     renderColumnsFloat
      //     (text, record, index, "cProgress", this.editFlag)
  },
  {
      title: "上期累计营业税",
      dataIndex: "cpreviousBusinessTax",
      key: "cpreviousBusinessTax",
      width: 250,
      sumCol: true,
     
  },
  {
      title: "上期累计增值税",
      dataIndex: "cpreviousAddTax",
      key: "cpreviousAddTax",
      width: 250,
      sumCol: true,
      
  },
  {
      title: "本期营业税",
      dataIndex: "cnowBusinessTax",
      key: "cnowBusinessTax",
      width: 250,
      sumCol: true,
     
  },
  {
      title: "本期增值税",
      dataIndex: "cnowAddTax",
      key: "cnowAddTax",
      width: 250,
      sumCol: true,
    
  },
  {
      title: "上期营改增前累计收入金额",
      dataIndex: "cpreviousBeforeTotalfee",
      key: "cpreviousBeforeTotalfee",
      width: 250,
      sumCol: true,
      
  },
  {
      title: "上期营改增后累计收入金额",
      dataIndex: "cpreviousAfterTotalfee",
      key: "cpreviousAfterTotalfee",
      width: 250,
      sumCol: true,

  },
  {
      title: "本期营改增前收入金额",
      dataIndex: "cnowBeforeTotalfee",
      key: "cnowBeforeTotalfee",
      width: 250,
      sumCol: true,
     
  },
  {
      title: "本期营改增后收入金额",
      dataIndex: "cnowAfterTotalfee",
      key: "cnowAfterTotalfee",
      width: 250,
      sumCol: true,
     
  },
  // {
  //     title: "合计",
  //     dataIndex: "d",
  //     key: "d",
  //     fixed: "right",
  //     width: 150
  // }
  {
      title: "操作",
      dataIndex: "d",
      key: "d",
      width: 100,
      fixed: "right",
      
  }
];

 const data13 =[{"id":"06f2acea44df4b009bced2a31deb89ec","createTime":"2018-12-21 15:14:39","createUser":"8458fab111d34dbb8295d7a66660194c","lastModified":"2018-12-21 15:14:39","lastModifyUser":"8458fab111d34dbb8295d7a66660194c","ts":"2018-12-21 15:14:39","newTs":"2018-12-21 15:20:04 225","dr":0,"bpmState":null,"taskKey":null,"taskId":null,"processInstanceId":null,"processDefineCode":null,"comment":null,"pkFatherRowId":"01667fcea1c34a58ac094f10609dbf46","pzbz":null,"pzscman":null,"pzscdate":null,"ncConsumer":null,"ncIdCard":null,"ncRoomNo":null,"ncPeriodNo":null,"ncTypeNo":null,"tenantid":"tenant","cdef1":null,"cdef2":null,"cdef3":null,"cdef4":null,"cdef5":null,"cdef6":null,"cdef7":null,"cdef8":null,"cdef9":null,"cdef10":null,"cdef11":null,"cdef12":null,"cdef13":null,"cdef14":null,"cdef15":null,"cdef16":null,"cdef17":null,"cdef18":null,"cdef19":null,"cdef20":null,"cprojectPeriod":"一期","ctype":"高层公寓","carea":241,"bpmBillCode":"201812211520042","cprogress":100,"ccustomer":"姚雅珍,高照","croomNumber":"杭州柳岸晓风->12幢->105","cnowBeforeTotalfee":0,"cnowAfterTotalfee":17735733.64,"chouseFee":19509307,"crecord":"是","cprojectPeriodCode":null,"cpayType":"一次性付款","corderDate":"2018-06-09","cpayDate":"2018-06-09","coverbz":"是","cprojectId":null,"camount":19509307,"croomId":null,"ctypeShow":null,"cbeforeFee":0,"cncAccount":19509307,"cafterFee":19509307,"cnowBusinessTax":0,"cnowAddTax":1773573.36,"cpreviousBusinessTax":0,"cpreviousAddTax":0,"cpreviousBeforeTotalfee":0,"cpreviousAfterTotalfee":0,"mainBoCode":"lc_xsr_income_dtl","coverbzEnumValue":null,"crecordEnumValue":null,"cprojectShow":null},{"id":"06f2acea44df4b009bced2a31deb89ec","createTime":"2018-12-21 15:14:39","createUser":"8458fab111d34dbb8295d7a66660194c","lastModified":"2018-12-21 15:14:39","lastModifyUser":"8458fab111d34dbb8295d7a66660194c","ts":"2018-12-21 15:14:39","newTs":"2018-12-21 15:20:04 225","dr":0,"bpmState":null,"taskKey":null,"taskId":null,"processInstanceId":null,"processDefineCode":null,"comment":null,"pkFatherRowId":"01667fcea1c34a58ac094f10609dbf46","pzbz":null,"pzscman":null,"pzscdate":null,"ncConsumer":null,"ncIdCard":null,"ncRoomNo":null,"ncPeriodNo":null,"ncTypeNo":null,"tenantid":"tenant","cdef1":null,"cdef2":null,"cdef3":null,"cdef4":null,"cdef5":null,"cdef6":null,"cdef7":null,"cdef8":null,"cdef9":null,"cdef10":null,"cdef11":null,"cdef12":null,"cdef13":null,"cdef14":null,"cdef15":null,"cdef16":null,"cdef17":null,"cdef18":null,"cdef19":null,"cdef20":null,"cprojectPeriod":"一期","ctype":"高层公寓","carea":241,"bpmBillCode":"201812211520042","cprogress":100,"ccustomer":"姚雅珍,高照","croomNumber":"杭州柳岸晓风->12幢->105","cnowBeforeTotalfee":0,"cnowAfterTotalfee":17735733.64,"chouseFee":19509307,"crecord":"是","cprojectPeriodCode":null,"cpayType":"一次性付款","corderDate":"2018-06-09","cpayDate":"2018-06-09","coverbz":"是","cprojectId":null,"camount":19509307,"croomId":null,"ctypeShow":null,"cbeforeFee":0,"cncAccount":19509307,"cafterFee":19509307,"cnowBusinessTax":0,"cnowAddTax":1773573.36,"cpreviousBusinessTax":0,"cpreviousAddTax":0,"cpreviousBeforeTotalfee":0,"cpreviousAfterTotalfee":0,"mainBoCode":"lc_xsr_income_dtl","coverbzEnumValue":null,"crecordEnumValue":null,"cprojectShow":null},{"id":"06f2acea44df4b009bced2a31deb89ec","createTime":"2018-12-21 15:14:39","createUser":"8458fab111d34dbb8295d7a66660194c","lastModified":"2018-12-21 15:14:39","lastModifyUser":"8458fab111d34dbb8295d7a66660194c","ts":"2018-12-21 15:14:39","newTs":"2018-12-21 15:20:04 225","dr":0,"bpmState":null,"taskKey":null,"taskId":null,"processInstanceId":null,"processDefineCode":null,"comment":null,"pkFatherRowId":"01667fcea1c34a58ac094f10609dbf46","pzbz":null,"pzscman":null,"pzscdate":null,"ncConsumer":null,"ncIdCard":null,"ncRoomNo":null,"ncPeriodNo":null,"ncTypeNo":null,"tenantid":"tenant","cdef1":null,"cdef2":null,"cdef3":null,"cdef4":null,"cdef5":null,"cdef6":null,"cdef7":null,"cdef8":null,"cdef9":null,"cdef10":null,"cdef11":null,"cdef12":null,"cdef13":null,"cdef14":null,"cdef15":null,"cdef16":null,"cdef17":null,"cdef18":null,"cdef19":null,"cdef20":null,"cprojectPeriod":"一期","ctype":"高层公寓","carea":241,"bpmBillCode":"201812211520042","cprogress":100,"ccustomer":"姚雅珍,高照","croomNumber":"杭州柳岸晓风->12幢->105","cnowBeforeTotalfee":0,"cnowAfterTotalfee":17735733.64,"chouseFee":19509307,"crecord":"是","cprojectPeriodCode":null,"cpayType":"一次性付款","corderDate":"2018-06-09","cpayDate":"2018-06-09","coverbz":"是","cprojectId":null,"camount":19509307,"croomId":null,"ctypeShow":null,"cbeforeFee":0,"cncAccount":19509307,"cafterFee":19509307,"cnowBusinessTax":0,"cnowAddTax":1773573.36,"cpreviousBusinessTax":0,"cpreviousAddTax":0,"cpreviousBeforeTotalfee":0,"cpreviousAfterTotalfee":0,"mainBoCode":"lc_xsr_income_dtl","coverbzEnumValue":null,"crecordEnumValue":null,"cprojectShow":null},{"id":"06f2acea44df4b009bced2a31deb89ec","createTime":"2018-12-21 15:14:39","createUser":"8458fab111d34dbb8295d7a66660194c","lastModified":"2018-12-21 15:14:39","lastModifyUser":"8458fab111d34dbb8295d7a66660194c","ts":"2018-12-21 15:14:39","newTs":"2018-12-21 15:20:04 225","dr":0,"bpmState":null,"taskKey":null,"taskId":null,"processInstanceId":null,"processDefineCode":null,"comment":null,"pkFatherRowId":"01667fcea1c34a58ac094f10609dbf46","pzbz":null,"pzscman":null,"pzscdate":null,"ncConsumer":null,"ncIdCard":null,"ncRoomNo":null,"ncPeriodNo":null,"ncTypeNo":null,"tenantid":"tenant","cdef1":null,"cdef2":null,"cdef3":null,"cdef4":null,"cdef5":null,"cdef6":null,"cdef7":null,"cdef8":null,"cdef9":null,"cdef10":null,"cdef11":null,"cdef12":null,"cdef13":null,"cdef14":null,"cdef15":null,"cdef16":null,"cdef17":null,"cdef18":null,"cdef19":null,"cdef20":null,"cprojectPeriod":"一期","ctype":"高层公寓","carea":241,"bpmBillCode":"201812211520042","cprogress":100,"ccustomer":"姚雅珍,高照","croomNumber":"杭州柳岸晓风->12幢->105","cnowBeforeTotalfee":0,"cnowAfterTotalfee":17735733.64,"chouseFee":19509307,"crecord":"是","cprojectPeriodCode":null,"cpayType":"一次性付款","corderDate":"2018-06-09","cpayDate":"2018-06-09","coverbz":"是","cprojectId":null,"camount":19509307,"croomId":null,"ctypeShow":null,"cbeforeFee":0,"cncAccount":19509307,"cafterFee":19509307,"cnowBusinessTax":0,"cnowAddTax":1773573.36,"cpreviousBusinessTax":0,"cpreviousAddTax":0,"cpreviousBeforeTotalfee":0,"cpreviousAfterTotalfee":0,"mainBoCode":"lc_xsr_income_dtl","coverbzEnumValue":null,"crecordEnumValue":null,"cprojectShow":null},{"id":"06f2acea44df4b009bced2a31deb89ec","createTime":"2018-12-21 15:14:39","createUser":"8458fab111d34dbb8295d7a66660194c","lastModified":"2018-12-21 15:14:39","lastModifyUser":"8458fab111d34dbb8295d7a66660194c","ts":"2018-12-21 15:14:39","newTs":"2018-12-21 15:20:04 225","dr":0,"bpmState":null,"taskKey":null,"taskId":null,"processInstanceId":null,"processDefineCode":null,"comment":null,"pkFatherRowId":"01667fcea1c34a58ac094f10609dbf46","pzbz":null,"pzscman":null,"pzscdate":null,"ncConsumer":null,"ncIdCard":null,"ncRoomNo":null,"ncPeriodNo":null,"ncTypeNo":null,"tenantid":"tenant","cdef1":null,"cdef2":null,"cdef3":null,"cdef4":null,"cdef5":null,"cdef6":null,"cdef7":null,"cdef8":null,"cdef9":null,"cdef10":null,"cdef11":null,"cdef12":null,"cdef13":null,"cdef14":null,"cdef15":null,"cdef16":null,"cdef17":null,"cdef18":null,"cdef19":null,"cdef20":null,"cprojectPeriod":"一期","ctype":"高层公寓","carea":241,"bpmBillCode":"201812211520042","cprogress":100,"ccustomer":"姚雅珍,高照","croomNumber":"杭州柳岸晓风->12幢->105","cnowBeforeTotalfee":0,"cnowAfterTotalfee":17735733.64,"chouseFee":19509307,"crecord":"是","cprojectPeriodCode":null,"cpayType":"一次性付款","corderDate":"2018-06-09","cpayDate":"2018-06-09","coverbz":"是","cprojectId":null,"camount":19509307,"croomId":null,"ctypeShow":null,"cbeforeFee":0,"cncAccount":19509307,"cafterFee":19509307,"cnowBusinessTax":0,"cnowAddTax":1773573.36,"cpreviousBusinessTax":0,"cpreviousAddTax":0,"cpreviousBeforeTotalfee":0,"cpreviousAfterTotalfee":0,"mainBoCode":"lc_xsr_income_dtl","coverbzEnumValue":null,"crecordEnumValue":null,"cprojectShow":null}]
//拼接成复杂功能的table组件不能在render中定义，需要像此例子声明在组件的外侧，不然操作state会导致功能出现异常
// let ComplexTable = multiSelect(sum(sort(Table, Icon)), Checkbox);

class Demo13 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data13: data13,
      selectedRow: this.selectedRow,
      selectDisabled: this.selectDisabled
    };
  }
  getSelectedDataFunc = data => {
    console.log(data);
  };
  selectDisabled = (record, index) => {
    // console.log(record);
    if (index === 1) {
      return true;
    }
    return false;
  };
  selectedRow = (record, index) => {
    // console.log(record);
    if (index === 0) {
      return true;
    }
    return false;
  };
  onClick = () => {
    this.setState({
      selectedRow: function() {}
    });
  };

  render() {
    let multiObj = {
      type: "checkbox"
    };
    let sortObj = {
      mode:'multiple'
    }
   
    return (
      <div>
        <Button className="editable-add-btn" onClick={this.onClick}>
          change selectedRow
        </Button>
        <ComplexTable
          selectDisabled={this.state.selectDisabled}
          selectedRow={this.state.selectedRow}
          columns={columns13}
          data={this.state.data13}
          multiSelect={multiObj}
          bordered
          scroll={{ x: '100%', y: 100 }}
          getSelectedDataFunc={this.getSelectedDataFunc}
        />
      </div>
    );
  }
}
export default Demo13;
