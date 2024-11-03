import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Input, Row, Col, theme } from "antd";
import SalesTable from "../../components/tables/salesTable/SalesTable";

const Sales = () => {
  const { Content } = Layout;
  const { Search } = Input;
  const [searchTerm, setSearchTerm] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    fetch("http://127.0.0.1:3001/sales")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las ventas");
        }
        return response.json();
      })
      .then((data) => {
        setSalesData(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [refreshTable]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredSalesData = salesData.filter((item) =>
    item.nombreUsuario && item.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Content style={{ margin: "0 16px" }}>
      <Breadcrumb style={{ margin: "50px 0 16px 0" }}>
        <Breadcrumb.Item>
          <UserOutlined /> {localStorage.getItem("username")}
        </Breadcrumb.Item>
        <Breadcrumb.Item> Extras </Breadcrumb.Item>
        <Breadcrumb.Item> Ventas </Breadcrumb.Item>
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
              placeholder="Buscar por nombre de usuario"
              onSearch={handleSearch}
              enterButton
            />
          </Col>
        </Row>
        <SalesTable
          salesData={filteredSalesData}
          refreshTable={refreshTable}
          setRefreshTable={setRefreshTable}
        />
      </div>
    </Content>
  );
};

export default Sales;
