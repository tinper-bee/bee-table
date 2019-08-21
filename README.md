# bee-table

[![npm version](https://img.shields.io/npm/v/bee-table.svg)](https://www.npmjs.com/package/bee-table)
[![Build Status](https://img.shields.io/travis/tinper-bee/bee-table/master.svg)](https://travis-ci.org/tinper-bee/bee-table)
[![Coverage Status](https://coveralls.io/repos/github/tinper-bee/bee-table/badge.svg?branch=master)](https://coveralls.io/github/tinper-bee/bee-table?branch=master)
[![dependencies Status](https://david-dm.org/tinper-bee/bee-table/status.svg)](https://david-dm.org/tinper-bee/bee-table)
[![NPM downloads](http://img.shields.io/npm/dm/bee-table.svg?style=flat)](https://npmjs.org/package/bee-table)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/tinper-bee/bee-table.svg)](http://isitmaintained.com/project/tinper-bee/bee-table "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/tinper-bee/bee-table.svg)](http://isitmaintained.com/project/tinper-bee/bee-table "Percentage of issues still open")

react bee-table component for tinper-bee

该table组件除了基本表格功能之外，还提供了一下功能。
  * 动态设置过滤列
  * 排序合计
  * 多选
  * 主子表
  * 固定表头
  * 拖拽表头进行列交换
  * 拖拽调整列宽度
  * 嵌套子表格
  * 行、列合并
  
具体示例代码参考[!这里](http://bee.tinper.org/bee-table/)

<font color="#dd0000">为了响应大家对bee-table的需求，我们新增加了表格的高级组件 [bee-complex-grid](http://bee.tinper.org/bee-complex-grid/)</font>

## 安装

[![bee-table](https://nodei.co/npm/bee-table.png)](https://npmjs.org/package/bee-table)

## 使用方法

```js
const columns = [
  { title: '用户名', dataIndex: 'a', key: 'a', width: 100 },
  { id: '123', title: '性别', dataIndex: 'b', key: 'b', width: 100 },
  { title: '年龄', dataIndex: 'c', key: 'c', width: 200 },
  {
    title: '操作', dataIndex: '', key: 'd', render() {
      return <a href="#">一些操作</a>;
    },
  },
];

const data = [
  { a: '令狐冲', b: '男', c: 41, key: '1' },
  { a: '杨过', b: '男', c: 67, key: '2' },
  { a: '郭靖', b: '男', c: 25, key: '3' },
];

class Demo extends Component {
    render () {
        return (
              <Table
              columns={columns}
              data={data}
              title={currentData => <div>标题: 这是一个标题</div>}
              footer={currentData => <div>表尾: 我是小尾巴</div>}
              />
        )
    }
}

```



## API

### Table

| 参数                     | 说明                                       | 类型                                     | 默认值             |
| :--------------------- | :--------------------------------------- | :------------------------------------- | :-------------- |
| data                   | 传入的表格数据（key值必需，否则会导致部分功能出现问题。建议使用唯一的值，如id）    | array                                  | []              |
| bordered                | 是否展示外边框和列边框                            | boolean                                  | false               |
| columns                | 列的配置表，具体配置见下表                            | array                                  | -               |
| defaultExpandAllRows   | 默认是否展开所有行                                | bool                                   | false           |
| expandedRowKeys        | 展开的行，控制属性                                | array                                  | -               |
| defaultExpandedRowKeys | 初始扩展行键                                   | array                                  | []              |
| bodyStyle              | 添加到tablebody上的style                      | object                                 | {}              |
| style                  | 添加到table上的style                          | object                                 | {}              |
| rowKey                 | 如果rowKey是字符串，`record [rowKey]`将被用作键。如果rowKey是function，`rowKey（record, index）`的返回值将被用作键。 | string or Function(record, index):string      | 'key'           |
| rowClassName           | 获取行的classname                            | Function(record, index, indent):string | () => ''        |
| expandedRowClassName   | 获取展开行的className                          | Function(recode, index, indent):string | () => ''        |
| onExpand               | 展开行时的钩子函数                                | Function(expanded, record)             | () => ''        |
| onExpandedRowsChange   | 函数在扩展行更改时调用                              | Function(expandedRows)                 | () => ''        |
| indentSize             | indentSize为每个级别的data.i.children，更好地使用column.width指定 | number                                 | 15              |
| onRowClick             | 行的点击事件钩子函数                               | Function(record, index, event)         | () => ''        |
| onRowDoubleClick       | 行的双击事件钩子函数                               | Function(record, index, event)         | () => ''        |
| expandIconAsCell       | 是否将expandIcon作为单元格                       | bool                                   | false           |
| expandIconColumnIndex  | expandIcon的索引，当expandIconAsCell为false时，将插入哪个列 | number                                 | 0               |
| showHeader             | 是否显示表头                                   | bool                                   | true            |
| title                  | 表格标题                                     | Function                               | -               |
| footer                 | 表格尾部                                     | Function                               | -               |
| emptyText              | 无数据时显示的内容                                | Function                               | () => 'No Data' |
| scroll                 | 横向或纵向支持滚动，也可用于指定滚动区域的宽高度| `{ x: number / 百分比, y: number }`  | {}     |
| rowRef                 | 获取行的ref                                  | Function(record, index, indent):string | () => null      |
| getBodyWrapper         | 添加对table body的包装                         | Function(body)                         | body => body    |
| expandedRowRender      | 额外的展开行                                   | Function(record, index, indent):node | -               |
| expandIconAsCell      | 展开按钮是否单独作为一个单元格                                   | bool                               | false               |
| expandRowByClick       | 设置展开行是否通过点击行触发，此参数需要与上面参数搭配使用（默认是通过点击行前面的加号展开行 | bool                                   | false           |
| footerScroll       | 表尾和body是否公用同一个横向滚动条。（ 如果footer中也是一个table组件，并且也具有滚动条，那么也需要加入footerScroll参数。 ） | bool                                   | false           |
| loading       | 表格是否加载中 | bool|object(详情可以参考上面示例)                                   | false           |
| haveExpandIcon       | 控制是否显示行展开icon.**注：该参数只有在和expandedRowRender同时使用才生效** | Function(record, index):bool   | () =>false |
| filterable       | 是否开启根据条件来过滤数据 | bool | false
| filterDelay       | 触发过滤输入的时候的ms延迟时间 | number | 300
| onFilterChange       | 触发过滤输入操作以及下拉条件的回调 | function | (field,value,condition) => ()
| onFilterClear       | 清除过滤条件的回调函数，回调参数为清空的字段 | function | (field) => ()
| headerScroll       | 表头下是否显示滚动条 | bool| false
| syncHover       | 是否同步Hover状态到左侧Checkbox，关闭此功能有助于提升性能 | bool| true
| onKeyTab       | tab快捷键，可以处理默认选中第一条数据 | function| -
| onKeyUp       | up快捷键，可以处理table的上一条数据 | function| -
| onKeyDown       | up快捷键，可以处理table的下一条数据 | function| -
| onTableKeyDown       | 触发table的快捷键 | function| -
| tabIndex       | 设置焦点顺序 | number | 0
| loadBuffer       | 使用BigData高阶组件实现大数据加载时，上下加载的缓存 | number| 5
| height | 自定义表格行高 | number | - |
| headerHeight | 自定义表头行高 | number | - |
| size | 表格大小 | `sm | md | lg` | 'md' |

> 快捷键部分参考示例 (快捷键在table中的简单使用应用)

*注意: data参数中的key值必需，否则会导致部分功能出现问题！建议使用唯一的值，如id*


### Column

|参数|说明|类型|默认值|
|:--|:---|:--|:---|
|key|列的键|string|-|
|className|传入列的classname|String	|-|
|colSpan|该列的colSpan|Number|-|
|title|列的标题|node|-|
|dataIndex|	显示数据记录的字段|String|-|
|width|宽度的特定比例根据列的宽度计算|String/Number|-|
|fixed|	当表水平滚动时，此列将被固定：true或'left'或'right'| true/'left'/'right'|-|
|render|cell的render函数有三个参数：这个单元格的文本，这行的记录，这行的索引，它返回一个对象：{children：value，props：{colSpan：1，rowSpan：1}} ==>'children'是这个单元格的文本，props是这个单元格的一些设置|-|
|onCellClick|单击列的单元格时调用|Function(row, event)|-|
|onHeadCellClick|单击表头的单元格时调用|Function(row, event)|row 当前行的数据|
| order | 设置排序 | string（"descend"、"ascend"） | - |
| filterType | 过滤下拉的类型.可选`text(文本框)`,`dropdown(下拉)`,`date(日期)`,`daterange(日期范围)`,`number(数值)` | string | text |
| filterDropdown | 是否显示过滤下拉.可选`show`,`hide` | string | show |
| format | 针对过滤下拉设置日期类的格式 | string | YYYY-MM-DD |
| filterDropdownAuto | 设置下拉条件是否自动设置选项，`auto`自动根据当前数据生成，`manual`手动传入，可以使用`filterDropdownData`来传入自定义数据 | string | auto |
| filterDropdownData | 下拉条件自定义数据，filterDropdownAuto=manual生效，传入格式：[{ key : "自定义", value : "自定义" }] | array | [] |
| filterDropdownFocus | 触发点击下拉条件的回调，一般用于异步点击请求数据使用 | function | () => () |
| filterDropdownType | 下拉条件类型，分为 string 和 number 条件类型 | string | string
| filterDropdownIncludeKeys | 能够设置指定的下拉条件项，通过设置keys 其中string条件可设置:LIKE,ULIKE,EQ,UEQ,START,END.number条件可设置:GT,GTEQ,LT,LTEQ,EQ,UEQ | array | [] 不设置此属性为显示所有
| filterInputNumberOptions | 数值框接收的props，具体属性参考bee-input-number | object | null

## 快捷键API

| 快捷键  | 快捷键说明 | 类型 | 默认值 | 
| --- | :--- | --- |--- |
| onKeyTab       | tab快捷键，可以处理默认选中第一条数据 | function| -
| onKeyUp       |  ↑(上箭) 快捷键，可以处理table的上一条数据 | function| -
| onKeyDown       | ↓(下箭)快捷键，可以处理table的下一条数据 | function| -
| onTableKeyDown       | 触发table的所有快捷键 | function| -
| tabIndex       | 设置焦点顺序 | number | 0


## 如何引用
需要单独的去引用相应的js文件，目录在lib文件夹，示例如下：

* 在tinper-bee中引用

```js

import {Table} from 'tinper-bee'

```

* 单独安装bee-table 方式

```js

import Table from 'bee-table'

```

## 如何引用增强功能(multiSelect,sort,sum)


```js

import multiSelect from "bee-table/lib/multiSelect.js";

```

### multiSelect

全选功能

#### data 数据中新增参数

| 参数                  | 说明                         | 类型       | 默认值      |
| ------------------- | -------------------------- | -------- | -------- |
| _checked         | 设置当前数据是否选中           |  boolean      | true/false       |
| _disabled   | 禁用当前选中数据     |  boolean      | true/false     
| getSelectedDataFunc | 返回当前选中的数据数组                | Function | 无        |

### sort

排序功能

#### Column新增参数

| 参数     | 说明         | 类型       | 默认值  |
| ------ | ---------- | -------- | ---- |
| sorter | 排序函数，可以自定义 | Function | 无    |
| sorterClick | 排序钩子函数| Function | (coloum,type)    |




### sum

合计功能

#### Column新增参数

| 参数     | 说明         | 类型       | 默认值  |
| ------ | ---------- | -------- | ---- |
| sumCol | 该列设置为合计列，合计行中会显示合计数据 | boolean | false |


### filterColumn

过滤表头列[示例](https://github.com/tinper-bee/bee-table/tree/master/demo/demolist/Demo21.js)


### dragColumn

拖拽表头交换顺序[示例](https://github.com/tinper-bee/bee-table/tree/master/demo/demolist/Demo22.js)

#### dragColumn新增参数

| 参数     | 说明         | 类型       | 默认值  |
| ------ | ---------- | -------- | ---- |
| draggable | 可拖拽交换列 | boolean | false |
| dragborder | 可拖拽改变列宽 | boolean | false |
| checkMinSize | 当前表格显示最少列数 | boolean | false |
| onDragEnd | 交换列后的回调函数 | function | (event,data,columns) |
| onDrop | 交换列的回调函数 | function | (event,data,columns) |


 


## rendertype
在表格中提供了多种rendertype可以供选择，比如下拉框，输入框，日期等

## 如何引用
需要单独的去引用相应的js文件，目录在render文件夹，示例如下：

```js
import InputRender from "bee-table/render/InputRender.js"
```

## 安装依赖包
不同的render会依赖其他组件，因为此类render组件是作为bee-table的插件机制处理的，默认不会去自动下载所依赖的组件，所以在使用之前需要去安装相应的组件。

### InputRender
输入框类型render

#### 依赖的组件
该render依赖于`bee-icon`,`bee-form-control`,`bee-form`,`bee-tooltip`。

1. 下载依赖。例如：`npm install bee-icon -S`或者`npm install bee-icon --save`
2. 引入css文件。**注：如果引入了CSS的cdn资源，即可忽略此步骤。**例如：`import 'bee-icon/build/Icon.css;'`

#### 配置
| 参数                | 说明                                       | 类型         | 默认值    |
| ----------------- | ---------------------------------------- | ---------- | ------ |
| name              | 该输入框获取数据时的key值，该值不能设置重复且必填               | string     | -      |
| placeholder       | 输入框的提示信息                                 | string     | -      |
| value             | 输入框中的显示值                                 | string     | 无      |
| isclickTrigger    | 是否使用点击触发编辑状态                             | boolean    | false  |
| onChange          | 当值发生改变的时候触发的方法                           | Function   | 无      |
| format            | 浏览态格式化类型，Currency:货币数字;                  | string     | 无      |
| formItemClassName | FormItem的class                           | string     | -      |
| mesClassName      | 校验错误信息的class                             | string     | -      |
| isRequire         | 是否必填                                     | bool       | false  |
| check             | 验证的回调函数，参数两个，第一个为校验是否成功`true/false` 第二个为验证结果对象`{name: "", verify: false, value: ""}` | function   | -      |
| method            | 校验方式，change/blur                         | string     | -      |
| errorMessage      | 错误提示信息                                   | dom/string | "校验失败" |
| htmlType          | 数值类型，目前支持 email/tel/IDCard/chinese/password'类型 | string     | -      |
| reg               | 校验正则，注：设置 htmlType 后 reg 无效              | regExp     | -      |

### DateRender
日期类型render

#### 依赖的组件
该render依赖于`bee-icon`,`bee-datepicker`,`moment`

1. 下载依赖。例如：`npm install bee-icon -S`或者`npm install bee-icon --save`
2. 引入css文件。**注：如果引入了CSS的cdn资源，即可忽略此步骤。**例如：`import 'bee-icon/build/Icon.css;'`

#### 配置
| 参数                | 说明                                       | 类型         | 默认值    |
| ----------------- | ---------------------------------------- | ---------- | ------ |
| isclickTrigger    | 是否使用点击触发编辑状态                             | boolean    | false |
| type  | 控制日期的显示格式，DatePicker、MonthPicker或者WeekPicker，暂时不支持RangePicker | string | "DatePicker" |


注:其他参数参见bee-datepicker组件参数配置


### SelectRender
输入框类型render

#### 依赖的组件
该render依赖于`bee-icon`,`bee-select`

1. 下载依赖。例如：`npm install bee-icon -S`或者`npm install bee-icon --save`
2. 引入css文件。**注：如果引入了CSS的cdn资源，即可忽略此步骤。**例如：`import 'bee-icon/build/Icon.css;'`

#### 配置
| 参数             | 说明                                       | 类型      | 默认值   |
| -------------- | ---------------------------------------- | ------- | ----- |
| isclickTrigger | 是否使用点击触发编辑状态                             | boolean | false |
| dataSource     | 数据的键值对，在表格浏览态的时候能显示真实的key值。比如[{key:"张三",value:"01"}] | array   | -     |



注:其他参数参见bee-select组件参数配置


## 开发调试

```sh
$ git clone https://github.com/tinper-bee/bee-table
$ cd bee-table
$ npm install
$ npm run dev
```


