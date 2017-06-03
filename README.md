# bee-table

[![npm version](https://img.shields.io/npm/v/bee-table.svg)](https://www.npmjs.com/package/bee-table)
[![Build Status](https://img.shields.io/travis/tinper-bee/bee-table/master.svg)](https://travis-ci.org/tinper-bee/bee-table)
[![Coverage Status](https://coveralls.io/repos/github/tinper-bee/bee-table/badge.svg?branch=master)](https://coveralls.io/github/tinper-bee/bee-table?branch=master)
[![devDependency Status](https://img.shields.io/david/dev/tinper-bee/bee-table.svg)](https://david-dm.org/tinper-bee/bee-table#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/bee-table.svg?style=flat)](https://npmjs.org/package/bee-table)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/tinper-bee/bee-table.svg)](http://isitmaintained.com/project/tinper-bee/bee-table "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/tinper-bee/bee-table.svg)](http://isitmaintained.com/project/tinper-bee/bee-table "Percentage of issues still open")



react bee-table component for tinper-bee

some description...

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

|参数|说明|类型|默认值|
|:--|:---|:--|:---|
|data|传入的表格数据|array|[]|
|columns|列的配置表，具体配置见下表|array|-|
|defaultExpandAllRows|默认是否展开所有行|bool|false|
|expandedRowKeys|展开的行，控制属性|array|-|
|defaultExpandedRowKeys|初始扩展行键|array|[]|
|useFixedHeader|是否使用固定表头|bool|false|
|bodyStyle|添加到tablebody上的style|object|{}|
|style|添加到table上的style|object|{}|
|rowKey|如果rowKey是字符串，`record [rowKey]`将被用作键。如果rowKey是function，`rowKey（record）'的返回值将被用作键。|	string or Function(record):string|'key'|
|rowClassName|获取行的classname|Function(record, index, indent):string|() => ''|
|expandedRowClassName|获取展开行的className|Function(recode, index, indent):string|() => ''|
|onExpand|展开行时的钩子函数|Function(expanded, record)|() => ''|
|onExpandedRowsChange|函数在扩展行更改时调用|Function(expandedRows)|() => ''|
|indentSize|indentSize为每个级别的data.i.children，更好地使用column.width指定|number|15|
|onRowClick|行的点击事件钩子函数|Function(record, index)|() => ''|
|onRowDoubleClick|行的双击事件钩子函数|Function(record, index)|() => ''|
|expandIconAsCell|是否将expandIcon作为单元格|bool|false|
|expandIconColumnIndex|expandIcon的索引，当expandIconAsCell为false时，将插入哪个列|number|0|
|showHeader|是否显示表头|bool|true|
|title|表格标题|function|-|
|footer|表格尾部|function|-|
|emptyText|无数据时显示的内容|function|() => 'No Data'|
|scroll|横向或纵向支持滚动，也可用于指定滚动区域的宽高度：{{ x: true, y: 300 }}|object|{}|
|rowRef|获取行的ref|Function(record, index, indent):string|() => null|
|getBodyWrapper|添加对table body的包装|Function(body)|body => body|

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

#### 开发调试

```sh
$ git clone https://github.com/tinper-bee/bee-table
$ cd bee-table
$ npm install
$ npm run dev
```
