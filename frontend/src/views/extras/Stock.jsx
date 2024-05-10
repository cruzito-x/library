import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Input, Row, Col, theme } from "antd";
import StockTable from "../../components/tables/stockTable/StockTable";

const Stock = () => {
  const { Content } = Layout;
  const { Search } = Input;
  const [searchTerm, setSearchTerm] = useState("");
  const [stockData, setStockData] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    fetch("http://localhost:3001/stock")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener stock");
        }
        return response.json();
      })
      .then((data) => {
        setStockData(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [refreshTable]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredStockData = stockData.filter((item) =>
    item.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <Col xs={24} sm={12} md={18} lg={18} xl={18}> </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <Search
              placeholder="Buscar por nombre de libro"
              onSearch={handleSearch}
              enterButton
            />
          </Col>
        </Row>
        <StockTable
          stockData={filteredStockData}
          refreshTable={refreshTable}
          setRefreshTable={setRefreshTable}
        />
      </div>
    </Content>
  );
};

export default Stock;
