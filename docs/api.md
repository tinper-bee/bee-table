# Table

表格是以结构化的方式来展示大量的信息最佳方法，使信息更易于阅读与理解。
表格轻易就能用简洁和易读的方式来组织数据。它们可用于保存和展示大量的数据，小量的信息，静态数据以及不断地变动的数据。

## 代码演示

## 引入机制

import Table from "bee-table";
import 'bee-table/build/Table.css';


## API

### Table

| 参数                     | 说明                                       | 类型                                     | 默认值             |
| :--------------------- | :--------------------------------------- | :------------------------------------- | :-------------- |
| data                   | 传入的表格数据（key值必需，否则会导致部分功能出现问题。建议使用唯一的值，如id）   | array                                  | []              |
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
| scroll                 | 横向或纵向支持滚动，也可用于指定滚动区域的宽高度：{ x: true, y: 300 } | object                                 | {}              |
| rowRef                 | 获取行的ref                                  | Function(record, index, indent):string | () => null      |
| getBodyWrapper         | 添加对table body的包装                         | Function(body)                         | body => body    |
| expandedRowRender      | 额外的展开行                                   | Function(record, index, indent):node | -               |
| expandIconAsCell      | 展开按钮是否单独作为一个单元格                                   | bool                               | false               |
| expandRowByClick       | 设置展开行是否通过点击行触发，此参数需要与上面参数搭配使用（默认是通过点击行前面的加号展开行 | bool                                   | false           |
| footerScroll       | 表尾和body是否公用同一个横向滚动条。（ 如果footer中也是一个table组件，并且也具有滚动条，那么也需要加入footerScroll参数，内层表格的footerScroll设置成false。 ） | bool                                   | false           |
| loading       | 表格是否加载中 | bool|object(详情可以参考上面示例)                                   | false           |
| haveExpandIcon       | 控制是否显示行展开icon.**注：该参数只有在和expandedRowRender同时使用才生效** | Function(record, index):bool   | () =>false |
| filterable       | 是否开启根据条件来过滤数据 | bool | false
| filterDelay       | 触发过滤输入的时候的ms延迟时间 | number | 300
| onFilterChange       | 触发过滤输入操作以及下拉条件的回调 | function | (field,value,condition) => ()
| onFilterClear       | 清除过滤条件的回调函数，回调参数为清空的字段 | function | (field) => ()
| headerScroll       | 表头下是否显示滚动条 | bool| false
| sort       | 排序的属性 | object| {  mode:'single'//单列排序,  backSource:false //默认是前端排序，值为true为后端排序 } mode:multiple-多列排序
| syncHover       | 是否同步Hover状态到左侧Checkbox，关闭此功能有助于提升性能 | bool| true
| loadBuffer       | 使用BigData高阶组件实现大数据加载时，上下加载的缓存 | number| 5
| resetScroll       | 将表格横向滚动条位置还原 | bool| false

> 快捷键部分参考示例 (快捷键在table中的简单使用应用)

*注意: data参数中的key值必需，否则会导致部分功能出现问题！建议使用唯一的值，如id*



### Column

|参数|说明|类型|默认值|
|:--|:---|:--|:---|
|key|列的键|string|-|
|className|传入列的classname|String	|-|
|colSpan|该列的colSpan，设置列合并|Number|-|
|title|列的标题|node|-|
|dataIndex|	显示数据记录的字段|String|-|
|width|宽度的特定比例根据列的宽度计算|String/Number|-|
|fixed|	当表水平滚动时，此列将被固定：true或'left'或'right'| true/'left'/'right'|-|
|sorter|前端列排序方法，只要列上有此属性就说明这列可排序。**注：默认是前端排序,排序方法书写时注意有些字段的值可能是undefined的情况，需要转换成0**| function|-|
|sorterClick|排序的回调函数|function|-|
|render|cell的render函数有三个参数：这个单元格的文本，这行的记录，这行的索引，它返回一个对象：{children：value，props：{colSpan：1，rowSpan：1}} ==>'children'是这个单元格的文本，props是这个单元格的一些设置，可以设置单元格行/列合并|-|
|onCellClick|单击列的单元格时调用|Function(row, event)|-|
| order | 设置排序 | string（"descend"、"ascend"） | -|
| filterType | 过滤下拉的类型.可选`text(文本框)`,`dropdown(下拉)`,`date(日期)`,`daterange(日期范围)`,`number(数值)` | string | text |
| filterDropdown | 是否显示过滤下拉.可选`show`,`hide` | string | show |
| format | 针对过滤下拉设置日期类的格式 | string | YYYY-MM-DD |
| filterDropdownAuto | 设置下拉条件是否自动设置选项，`auto`自动根据当前数据生成，`manual`手动传入，可以使用`filterDropdownData`来传入自定义数据 | string | auto |
| filterDropdownData | 下拉条件自定义数据，filterDropdownAuto=manual生效，传入格式：[{ key : "自定义", value : "自定义" }] | array | [] |
| filterDropdownFocus | 触发点击下拉条件的回调，一般用于异步点击请求数据使用 | function | () => () |
| filterDropdownType | 下拉条件类型，分为 string 和 number 条件类型 | string | string
| filterDropdownIncludeKeys | 能够设置指定的下拉条件项，通过设置keys 其中string条件可设置:LIKE,ULIKE,EQ,UEQ,START,END.number条件可设置:GT,GTEQ,LT,LTEQ,EQ,UEQ | array | [] 不设置此属性为显示所有
| filterInputNumberOptions | 数值框接收的props，具体属性参考bee-input-number | object | null
| textAlign | 内容对齐方式，默认是左对齐（'left、right、center'） | string | 


## 快捷键API

| 快捷键  | 快捷键说明 | 类型 | 默认值 | 
| --- | :--- | --- |--- |
| focusable       | 是否开启快捷键功能 | bool | -
| onKeyTab       | tab快捷键，可以处理默认选中第一条数据 | function| -
| onKeyUp       |  ↑(上箭) 快捷键，可以处理table的上一条数据 | function| -
| onKeyDown       | ↓(下箭)快捷键，可以处理table的下一条数据 | function| -
| onTableKeyDown       | 触发table的所有快捷键 | function| -
| tabIndex       | 设置焦点顺序 | number | 0

{% include "mixin.md"%}


{% include "rendertype.md"%}


### 使用注意

- 如果使用了固定列，请给固定的列设定固定宽度既width属性。

- 在使用expandedRowRender属性扩展表格时，如果同时使用了固定列。
需要给expandedRowRender中返回的对象添加`style=\{{height: xxx}\}`,来使扩展后的固定列扩展成一样高度。


> 当表格场景比较复杂时，可以使用[复杂表格ComplexGrid](http://bee.tinper.org/bee-complex-grid#bee-complex-grid)。ComplexGrid将常用的过滤、多选、分页、列交换、列拖拽等功能集成在一起。使用起来超级方便。
