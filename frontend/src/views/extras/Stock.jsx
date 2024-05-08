import { React, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Input, Row, Col, theme } from "antd";
import StockTable from "../../components/stockTable/StockTable";

const Stock = () => {
  const { Content } = Layout;
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const [refreshTable, setRefreshTable] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content style={{ margin: "0 16px" }}>
      <Breadcrumb style={{ margin: "50px 0 16px 0" }}>
        <Breadcrumb.Item>
          <UserOutlined /> {localStorage.getItem("username")}
        </Breadcrumb.Item>
        <Breadcrumb.Item> Extras </Breadcrumb.Item>
        <Breadcrumb.Item> Existencias </Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: "86vh",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Row gutter={16}>
          <Col span={18}> </Col>
          <Col span={6}>
            <Search placeholder="Buscar" onSearch={onSearch} enterButton />
          </Col>
        </Row>
        <StockTable refreshTable={refreshTable} setRefreshTable={setRefreshTable} />
      </div>
    </Content>
  );
};

export default Stock;
