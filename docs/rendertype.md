## rendertype
在表格中提供了多种rendertype可以供选择，比如下拉框，输入框，日期等

## 如何引用
需要单独的去引用相应的js文件，目录在render文件夹，示例如下：

```js
import InputRender from "bee-table/build/render/InputRender.js"
```

## 安装依赖包
不同的render会依赖其他组件，因为此类render组件是作为bee-table的插件机制处理的，默认不会去自动下载所依赖的组件，所以在使用之前需要去安装相应的组件。

## 如何下载对应依赖的组件
1. 下载依赖。例如：`npm install bee-icon -S`或者`npm install bee-icon --save`
2. 引入css文件。**注：如果引入了CSS的cdn资源，即可忽略此步骤。**例如：`import 'bee-icon/build/Icon.css;'`

### InputRender
输入框类型render

#### 依赖的组件
该render依赖于`bee-icon`,`bee-form-control`,`bee-form`,`bee-tooltip`。


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


#### 配置
| 参数             | 说明                                       | 类型      | 默认值   |
| -------------- | ---------------------------------------- | ------- | ----- |
| isclickTrigger | 是否使用点击触发编辑状态                             | boolean | false |
| dataSource     | 数据的键值对，在表格浏览态的时候能显示真实的key值。比如`[{key:"张三",value:"01"}]` | array   | -     |



注:其他参数参见bee-select组件参数配置