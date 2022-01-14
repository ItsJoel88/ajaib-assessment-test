import React from "react";
import "./main.css";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RESET_FILTER_LISTS, FILTER_LISTS, SET_ATTRIBUTES } from "./redux/type";
import { RootState } from "./redux";

// API
import { fetchApi } from "./api";

// Config
import {
  TablePaginationConfig,
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/lib/table/interface";
import { genderFilter } from "./constants/filter";
import { createParams } from "./utils";

// Components ANTD
import { Table, Row, Col, Input, Select, Button } from "antd";
const { Search } = Input;
const { Option } = Select;

const App: React.FC = () => {
  // Redux
  const {
    filter,
    search,
    lists,
    loading,
    sort_type,
    sort_by,
    page,
    pageSize,
    readyToFetch,
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const columns: any[] = [
    {
      title: "Username",
      dataIndex: "login",
      render: (text: string, row: any) => {
        return <span>{row.login.username}</span>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string, row: any) => {
        return (
          <span>
            {row.name.first} {row.name.last}
          </span>
        );
      },
      sorter: true,
      sortOrder: sort_by === "name" && sort_type,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
      sortOrder: sort_by === "email" && sort_type,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      sorter: true,
      sortOrder: sort_by === "gender" && sort_type,
    },
    {
      title: "Registered Date",
      dataIndex: "registered",
      render: (text: string, row: any) => {
        return <span>{row.registered.date}</span>;
      },
      sorter: true,
      sortOrder: sort_by === "registered" && sort_type,
    },
  ];

  React.useEffect(() => {
    getUsers();
  }, []);

  React.useEffect(() => {
    if (readyToFetch) {
      getUsers();
    }
  }, [readyToFetch]);

  async function getUsers() {
    dispatch({ type: SET_ATTRIBUTES, value: { loading: true } });

    let parameter = createParams({
      filter,
      keyword: search,
      page,
      pageSize,
      sortType: sort_type,
      sortBy: sort_by,
      results: 10,
    });
    const response = await fetchApi(parameter);

    if (response.results) {
      dispatch({
        type: SET_ATTRIBUTES,
        value: { loading: false, lists: response.results, readyToFetch: false },
      });
    }
  }

  function onChange(
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: any,
    extra: TableCurrentDataSource<any>
  ) {
    if (extra.action === "sort") {
      dispatch({
        type: SET_ATTRIBUTES,
        value: {
          readyToFetch: true,
          sort_by: sorter.order ? sorter.field : "",
          sort_type: sorter.order || "ascend",
        },
      });
    } else if (extra.action === "paginate") {
      // pagination ??
    }
  }

  function onSearch(value: string) {
    dispatch({
      type: SET_ATTRIBUTES,
      value: { search: value, readyToFetch: true },
    });
  }

  function onSelectFilter(value: string) {
    dispatch({ type: FILTER_LISTS, key: "gender", value });
  }

  function onClearFilters() {
    dispatch({ type: RESET_FILTER_LISTS });
  }

  return (
    <div className="container">
      <Row gutter={16}>
        <Col span={6}>
          <span className="label">Search</span>
          <Search
            size="large"
            placeholder="Search"
            onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col span={3}>
          <span className="label">Gender</span>
          <Select
            size="large"
            value={filter.gender}
            onChange={onSelectFilter}
            className="full-width"
          >
            {genderFilter.map((gender) => {
              return <Option key={gender.key}>{gender.label}</Option>;
            })}
          </Select>
        </Col>
        <Col span={3}>
          <span className="label">&nbsp;</span>
          <Button size="large" block onClick={onClearFilters}>
            Reset Filter
          </Button>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Table
            bordered
            rowKey={(row: any) => row.login.username}
            loading={loading}
            columns={columns}
            dataSource={lists}
            onChange={onChange}
          />
        </Col>
      </Row>
    </div>
  );
};

export default App;
