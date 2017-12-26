# bee-table

[![npm version](https://img.shields.io/npm/v/bee-table.svg)](https://www.npmjs.com/package/bee-table)
[![Build Status](https://img.shields.io/travis/tinper-bee/bee-table/master.svg)](https://travis-ci.org/tinper-bee/bee-table)
[![Coverage Status](https://coveralls.io/repos/github/tinper-bee/bee-table/badge.svg?branch=master)](https://coveralls.io/github/tinper-bee/bee-table?branch=master)
[![dependencies Status](https://david-dm.org/tinper-bee/bee-table/status.svg)](https://david-dm.org/tinper-bee/bee-table)
[![NPM downloads](http://img.shields.io/npm/dm/bee-table.svg?style=flat)](https://npmjs.org/package/bee-table)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/tinper-bee/bee-table.svg)](http://isitmaintained.com/project/tinper-bee/bee-table "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/tinper-bee/bee-table.svg)](http://isitmaintained.com/project/tinper-bee/bee-table "Percentage of issues still open")

react bee-table component for tinper-bee

some description...

## install

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
| data                   | 传入的表格数据                                  | array                                  | []              |
| bordered                | 是否展示外边框和列边框                            | boolean                                  | false               |
| columns                | 列的配置表，具体配置见下表                            | array                                  | -               |
| defaultExpandAllRows   | 默认是否展开所有行                                | bool                                   | false           |
| expandedRowKeys        | 展开的行，控制属性                                | array                                  | -               |
| defaultExpandedRowKeys | 初始扩展行键                                   | array                                  | []              |
| useFixedHeader         | 是否使用固定表头                                 | bool                                   | false           |
| bodyStyle              | 添加到tablebody上的style                      | object                                 | {}              |
| style                  | 添加到table上的style                          | object                                 | {}              |
| rowKey                 | 如果rowKey是字符串，`record [rowKey]`将被用作键。如果rowKey是function，`rowKey（record）'的返回值将被用作键。 | string or Function(record):string      | 'key'           |
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
| scroll                 | 横向或纵向支持滚动，也可用于指定滚动区域的宽高度：{ x: true, y: 300 } | object                                 | {}              |
| rowRef                 | 获取行的ref                                  | Function(record, index, indent):string | () => null      |
| getBodyWrapper         | 添加对table body的包装                         | Function(body)                         | body => body    |
| expandedRowRender      | 额外的展开行                                   | Function                               | -               |
| expandIconAsCell      | 展开按钮是否单独作为一个单元格                                   | bool                               | false               |
| expandRowByClick       | 设置展开行是否通过点击行触发，此参数需要与上面参数搭配使用（默认是通过点击行前面的加号展开行 | bool                                   | false           |
| footerScroll       | 表尾和body是否公用同一个横向滚动条。（ 如果footer中也是一个table组件，并且也具有滚动条，那么也需要加入footerScroll参数。 ） | bool                                   | false           |
*注意: 一旦使用了expandedRowRender参数，data参数中的key属性必须设置。否则会导致无法展开！*

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

## mixin

Table拓展功能方法。注：拼接成复杂功能的table组件不能在render中定义，需要像此例子声明在组件的外侧，不然在操作state会导致功能出现异常

## 如何引用
需要单独的去引用相应的js文件，目录在lib文件夹，示例如下：

```js
import multiSelect from "bee-table/build/lib/multiSelect.js"
```

### multiSelect

全选功能

#### Table新增参数

| 参数                  | 说明                         | 类型       | 默认值      |
| ------------------- | -------------------------- | -------- | -------- |
| multiSelect         | 全选功能的配置对象，属性参见下面           | obj      | {}       |
| multiSelect.type    | 全选功能的类型，多选或单选（暂时只支持多选）     | string   | checkbox |
| multiSelect.param   | 通过设置该参数来设计获取的数据数组，默认返还所有数据 | string   | ''       |
| getSelectedDataFunc | 返回当前选中的数据数组                | Function | 无        |



### sort

排序功能

#### Column新增参数

| 参数     | 说明         | 类型       | 默认值  |
| ------ | ---------- | -------- | ---- |
| sorter | 排序函数，可以自定义 | Function | 无    |



### sum

合计功能

#### Column新增参数

| 参数     | 说明         | 类型       | 默认值  |
| ------ | ---------- | -------- | ---- |
| sumCol | 该列设置为合计列，合计行中会显示合计数据 | boolean | false |


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
| isclickTrigger    | 是否使用点击触发编辑状态                             | boolean    | false  |

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
