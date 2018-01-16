<a name="1.0.10"></a> 
## [1.0.10](https://github.com/tinper-bee/bee-table/compare/v1.0.9...v1.0.10) (2018-01-03)



<a name="1.0.9"></a>
## [1.0.9](https://github.com/tinper-bee/bee-table/compare/1.0.9...v1.0.9) (2018-01-03)


### Bug Fixes

* **multiSelect.js:** 修复全选功能在更新数据时bug ([b9de7de](https://github.com/tinper-bee/bee-table/commit/b9de7de))
* **sort.js:** 修复使用排序功能时，更新数据不生效bug ([b63541c](https://github.com/tinper-bee/bee-table/commit/b63541c))


### Features

* **multiSelect.js:** 新增selectDisabled可以设置某一行数据无法被全选 ([d2d6d09](https://github.com/tinper-bee/bee-table/commit/d2d6d09))
* **multiSelect.js:** 新增selectedRow参数来控制某一行数据是否选中 ([3f0c3be](https://github.com/tinper-bee/bee-table/commit/3f0c3be))
* **Table.js:** 新增footerScroll参数来让表尾和表体公用同一个横向滚动条 ([e79234f](https://github.com/tinper-bee/bee-table/commit/e79234f))



<a name="1.0.8"></a>
## [1.0.8](https://github.com/tinper-bee/bee-table/compare/1.0.7...1.0.8) (2017-12-24)


### Features

* **Table.js:** 新增# bee-table ([8117b1c](https://github.com/tinper-bee/bee-table/commit/8117b1c))



<a name="1.0.7"></a>
## [1.0.7](https://github.com/tinper-bee/bee-table/compare/1.0.6...1.0.7) (2017-12-24)


### Bug Fixes

* **sum.js:** 修复合计功能会忽略其他参数，并导致render不生效的bug ([e2d6be5](https://github.com/tinper-bee/bee-table/commit/e2d6be5))



<a name="1.0.6"></a>
## [1.0.6](https://github.com/tinper-bee/bee-table/compare/69e0751...1.0.6) (2017-11-29)


### Bug Fixes

* 优化合计组件语法 ([3d4a400](https://github.com/tinper-bee/bee-table/commit/3d4a400))
* 修改checkbox属性修改 ([2398040](https://github.com/tinper-bee/bee-table/commit/2398040))
* 修改onRowClick的api ([d5e85d1](https://github.com/tinper-bee/bee-table/commit/d5e85d1))
* 修改合计行宽度没有对齐的bug ([e26f3b5](https://github.com/tinper-bee/bee-table/commit/e26f3b5))
* 修改方法名 ([350dc43](https://github.com/tinper-bee/bee-table/commit/350dc43))
* 删除多余demo，修改样式和优化合计功能代码 ([b01d24d](https://github.com/tinper-bee/bee-table/commit/b01d24d))
* 更新日期组件版本和提取dateRender组件 ([06e0091](https://github.com/tinper-bee/bee-table/commit/06e0091))
* 解决合计行与排序组合使用时的问题 ([6f6abe5](https://github.com/tinper-bee/bee-table/commit/6f6abe5))
* **DateRender.js:** 修复日期render中设置空字符串出错bug ([b7c1961](https://github.com/tinper-bee/bee-table/commit/b7c1961))
* **table.scss:** 修改demo中涉及到组件的样式转移到组件中 ([1f5a43f](https://github.com/tinper-bee/bee-table/commit/1f5a43f))


### Features

* 为合计功能增加列可配置，并且完善文档 ([c9f839b](https://github.com/tinper-bee/bee-table/commit/c9f839b))
* 抽离下拉框为selectRender ([b2acc8e](https://github.com/tinper-bee/bee-table/commit/b2acc8e))
* 提交edittype组件render ([9c05647](https://github.com/tinper-bee/bee-table/commit/9c05647))
* 新增demo ([269e6f1](https://github.com/tinper-bee/bee-table/commit/269e6f1))
* 新增多选示例 ([3a3df49](https://github.com/tinper-bee/bee-table/commit/3a3df49))
* 新增嵌套子表格功能和demo，文档。修复rowRef参数bug ([87a81b2](https://github.com/tinper-bee/bee-table/commit/87a81b2))
* 新增排序和全选高阶组件，并增加使用示例 ([f8a00fe](https://github.com/tinper-bee/bee-table/commit/f8a00fe))
* 新增组件示例 ([69e0751](https://github.com/tinper-bee/bee-table/commit/69e0751))
* **package.json:** 增加changelog和完善提交机制 ([6069320](https://github.com/tinper-bee/bee-table/commit/6069320))
* **SelectRender.js:** 增加键值对参数能在浏览态的时候显示key值 ([4f5cb9b](https://github.com/tinper-bee/bee-table/commit/4f5cb9b))
* **table.js && table.scss:** 修改固定表头的滚动条默认样式为auto ([e8bc09f](https://github.com/tinper-bee/bee-table/commit/e8bc09f))



