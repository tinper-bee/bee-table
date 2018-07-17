## mixin

Table拓展功能方法。注：拼接成复杂功能的table组件不能在render中定义，需要像此例子声明在组件的外侧，不然在操作state会导致功能出现异常

## 如何引用
需要单独的去引用相应的js文件，目录在lib文件夹，示例如下：

```js
import multiSelect from "tinper-bee/lib/multiSelect.js";
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
| selectDisabled | 设置某一行数据无法被选中，使用类似于rowClassName       | Function(record, index):bool | 无        |
| selectedRow | 设置某一行数据是否被选中，使用类似于rowClassName       | Function(record, index):bool | 无        |


#### 使用

```js
import multiSelect from "tinper-bee/lib/multiSelect.js";
import { Table, Checkbox } from 'tinper-bee';

const MultiSelectTable = multiSelect(Table, Checkbox);

```

### sort

排序功能

#### Column新增参数

| 参数     | 说明         | 类型       | 默认值  |
| ------ | ---------- | -------- | ---- |
| sorter | 排序函数，可以自定义 | Function | 无    |
| sorterClick | 排序钩子函数| Function | (coloum,type)    |

#### 使用

```js
import sort from "tinper-bee/lib/sort.js";
import { Table, Icon } from 'tinper-bee';

const SortTable = sort(Table, Icon);

```

### sum

合计功能

#### Column新增参数
 
| 参数     | 说明         | 类型       | 默认值  |
| ------ | ---------- | -------- | ---- |
| sumCol | 该列设置为合计列，合计行中会显示合计数据 | boolean | false |

#### 使用

```js
import sum from "tinper-bee/lib/sum.js";
import { Table } from 'tinper-bee';

const SumTable = sum(Table);

```

### dragColumn

拖拽列功能

#### dragColumn新增参数

| 参数     | 说明         | 类型       | 默认值  |
| ------ | ---------- | -------- | ---- |
| dragborder | 显示拖拽边框 | boolean | false |
| draggable | 是否可拖拽 | boolean | false |
| onDragStart | 拖拽开始回调函数 | function | () => {} |
| onDragEnter |拖拽进入回调函数 | function | () => {} |
| onDragOver | 拖拽划过回调函数 | function | () => {} |
| onDrop | 拖拽释放回调函数 | function | () => {} |

#### 使用

```js
import dragColumn from "tinper-bee/lib/dragColumn.js";
import { Table } from 'tinper-bee';

const DragColumnTable = dragColumn(Table);

```

### filterColumn

过滤功能

#### filterColumn新增参数

无

#### 使用

```js
import filterColumn from "tinper-bee/lib/filterColumn.js";
import { Table, Checkbox, Popover, Icon } from 'tinper-bee';

const DragColumnTable = filterColumn(Table, Checkbox, Popover, Icon);

```

