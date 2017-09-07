/**
*
* @title 无数据时显示
* @description 无数据时显示效果展示
*
*/

const columns10 = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "40%"
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "30%"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    }
  ];
  
  const data10 = [
    
  ];

  const emptyFunc = () => <span>这里没有数据！</span>
  
  export class Demo10 extends Component {
    render() {
      return <Table columns={columns10} data={data10} emptyText={emptyFunc} />;
    }
  }

