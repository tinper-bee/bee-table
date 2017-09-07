/**
*
* @title 主子表
* @description 主表点击子表联动
*
*/


const columns7 = [
  { title: "用户名", dataIndex: "a", key: "a"},
  { id: "123", title: "性别", dataIndex: "b", key: "b"},
  { title: "年龄", dataIndex: "c", key: "c"},
  {
    title: "操作",
    dataIndex: "",
    key: "d",
    render() {
      return <a href="#">一些操作</a>;
    }
  }
];

const data7 = [
  { a: "令狐冲", b: "男", c: 41, key: "1" },
  { a: "杨过", b: "男", c: 67, key: "2" },
  { a: "郭靖", b: "男", c: 25, key: "3" }
];

const columns7_1 = [
  { title: "用户名", dataIndex: "a", key: "a"},
  { id: "123", title: "班级", dataIndex: "b", key: "b"},
  { title: "系别", dataIndex: "c", key: "c"}
];

export class Demo7 extends Component {
  constructor(props){
    super(props);
    this.state = {
      children_data : []
    }
  }
  rowclick = (record, index) => {
    console.log(record)
    console.log(index)
    if(record.a === '令狐冲'){
      this.setState({
        children_data: [
          { a: "令狐冲", b: "01班", c: '文学系', key: "1" },
        ]
      })
    }else if(record.a === '杨过'){
      this.setState({
        children_data: [
          { a: "杨过", b: "01班", c: '外语系', key: "2" },
        ]
      })
    }else if(record.a === '郭靖'){
      this.setState({
        children_data: [
          { a: "郭靖", b: "02班", c: '美术系', key: "3" }
        ]
      })
    }
  }
  render() {
    return (
      <div>
        <Table
          columns={columns7_1}
          data={data7}
          onRowClick={this.rowclick}
          title={currentData => <div>标题: 我是主表</div>}
        />
        <Table
          columns={columns7}
          data={this.state.children_data}
          title={currentData => <div>标题: 我是子表</div>}
        />
      </div>
    );
  }
}

