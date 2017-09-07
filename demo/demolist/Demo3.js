/**
*
* @title 更灵活的表格
* @description 手写表格的头组件来达到更灵活的配置表格
*
*/


const { ColumnGroup, Column } = Table;

const data3 = [
  { a: '北京', b: '北京', c: '250', d: 2, key: '1' },
];

export class Demo3 extends Component {
    render () {
        return (

  <Table data={data3}>
    <ColumnGroup title="地址">
      <Column
        title="省"
        dataIndex="a"
        key="a"
        width={100}
      />
      <Column
        id="123"
        title="市"
        dataIndex="b"
        key="b"
        width={100}
      />
    </ColumnGroup>
    <Column
      title="数量"
      dataIndex="c"
      key="c"
      width={200}
    />
    <Column
      title="操作"
      dataIndex=""
      key="d"
      render={(text, record, index) => {
        return (
            <Button size="sm" colors="info" style={{ minWidth: 50 }}>增加</Button>
        );
      }}
    />
  </Table>
        )
    }
}
