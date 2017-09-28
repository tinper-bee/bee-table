## mixin

Table拓展功能方法


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

排序功能

#### Column新增参数

| 参数     | 说明         | 类型       | 默认值  |
| ------ | ---------- | -------- | ---- |
| sorter | 排序函数，可以自定义 | Function | 无    |



