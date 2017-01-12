# bee-table

[![npm version](https://img.shields.io/npm/v/bee-table.svg)](https://www.npmjs.com/package/bee-table)
[![Build Status](https://img.shields.io/travis/tinper-bee/bee-table/master.svg)](https://travis-ci.org/tinper-bee/bee-table)
[![Coverage Status](https://coveralls.io/repos/github/tinper-bee/bee-table/badge.svg?branch=master)](https://coveralls.io/github/tinper-bee/bee-table?branch=master)
[![devDependency Status](https://img.shields.io/david/dev/tinper-bee/bee-table.svg)](https://david-dm.org/tinper-bee/bee-table#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/bee-table.svg?style=flat)](https://npmjs.org/package/bee-table)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/tinper-bee/bee-table.svg)](http://isitmaintained.com/project/tinper-bee/bee-table "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/tinper-bee/bee-table.svg)](http://isitmaintained.com/project/tinper-bee/bee-table "Percentage of issues still open")

## Browser Support

|![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)|
| --- | --- | --- | --- | --- |
| IE 9+ ✔ | Chrome 31.0+ ✔ | Firefox 31.0+ ✔ | Opera 30.0+ ✔ | Safari 7.0+ ✔ |


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

|参数|说明|类型|默认值|
|:--|:---:|:--:|---:|

#### 开发调试

```sh
$ npm install -g bee-tools
$ git clone https://github.com/tinper-bee/bee-table
$ cd bee-table
$ npm install
$ npm run dev
```
