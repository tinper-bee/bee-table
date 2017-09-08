/**
*
* @title 列排序
* @description 列排序
*
*/

const columns11 = [
  {
    title: "名字",
    dataIndex: "a",
    key: "a",
    width: 100
  },
  {
    title: "性别",
    dataIndex: "b",
    key: "b",
    width: 100
  },
  {
    title: "年龄",
    dataIndex: "c",
    key: "c",
    width: 200,
    sorter: (a, b) => a.c - b.c
  },
  {
    title: "操作",
    dataIndex: "",
    key: "d",
    render() {
      return <a href="#">一些操作</a>;
    }
  }
];

const data11 = [
  { a: "杨过", b: "男", c: 30, key: "2" },
  { a: "令狐冲", b: "男", c: 41, key: "1" },
  { a: "郭靖", b: "男", c: 25, key: "3" }
];

const defaultProps11 = {
  prefixCls: "bee-table"
};
export class Demo11 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOrder: "",
      data: data11
    };
  }
  toggleSortOrder=(order, column)=> {
    let { sortOrder, data, oldData } = this.state;
    let ascend_sort = function(key) {
      return function(a, b) {
        return a.key - b.key;
      };
    };
    let descend_sort = function(key) {
      return function(a, b) {
        return b.key - a.key;
      };
    };
    if (sortOrder === order) {
      // 切换为未排序状态
      order = "";
    }
    if (!oldData) {
      oldData = data.concat();
    }
    if (order === "ascend") {
      data = data.sort(function(a, b) {
        return column.sorter(a, b);
      });
    } else if (order === "descend") {
      data = data.sort(function(a, b) {
        return column.sorter(b, a);
      });
    } else {
      data = oldData.concat();
    }
    this.setState({
      sortOrder: order,
      data: data,
      oldData: oldData
    });
  }
  renderColumnsDropdown(columns) {
    const { sortOrder } = this.state;
    const { prefixCls } = this.props;

    return columns.map(originColumn => {
      let column = Object.assign({}, originColumn);
      let sortButton;
      if (column.sorter) {
        const isAscend = sortOrder === "ascend";
        const isDescend = sortOrder === "descend";
        sortButton = (
          <div className={`${prefixCls}-column-sorter`}>
            <span
              className={`${prefixCls}-column-sorter-up ${isAscend
                ? "on"
                : "off"}`}
              title="↑"
              onClick={() => this.toggleSortOrder("ascend", column)}
            >
              <Icon type="uf-triangle-up" />
            </span>
            <span
              className={`${prefixCls}-column-sorter-down ${isDescend
                ? "on"
                : "off"}`}
              title="↓"
              onClick={() => this.toggleSortOrder("descend", column)}
            >
              <Icon type="uf-triangle-down" />
            </span>
          </div>
        );
      }
      column.title = (
        <span>
          {column.title}
          {sortButton}
        </span>
      );
      return column;
    });
  }
  render() {
    let columns = this.renderColumnsDropdown(columns11);
    return <Table columns={columns} data={this.state.data} />;
  }
}
Demo11.defaultProps = defaultProps11;