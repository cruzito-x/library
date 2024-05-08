import React, { useState, useEffect } from "react";
import { Card, Row, Col, Table, Spin, Tag, message } from "antd";

const StockTable = ({ stockData, refreshTable, setRefreshTable }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/stock")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener stock");
        }
        return response.json();
      })
      .then((data) => {
        setRefreshTable(false); // Establecer refreshTable como falso después de obtener los datos
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener stock:", error);
        setLoading(false);
        message.error("Error al obtener stock");
      });
  }, [refreshTable, setRefreshTable]);

  const columns = [
    {
      title: "Libro",
      dataIndex: "titulo",
      key: "book",
    },
    {
      title: "Cantidad",
      dataIndex: "stock",
      key: "quantity",
    },
    {
      title: "Estado",
      render: (record) => (
        <Tag
          bordered={false}
          color={
            record.stock === 0
              ? "error"
              : record.stock < 20
              ? "orange"
              : "success"
          }
        >
          {record.stock === 0
            ? "Agotado"
            : record.stock < 20
            ? "Últimas unidades"
            : "En Existencia"}
        </Tag>
      ),
    },
  ];

  return (
    <Card style={{ marginTop: "20px" }}>
      <Row gutter={16}>
        <Col span={24}>
          <Spin spinning={loading} size="large" tip="Cargando...">
            <Table columns={columns} dataSource={stockData} />
          </Spin>
        </Col>
      </Row>
    </Card>
  );
};

export default StockTable;
