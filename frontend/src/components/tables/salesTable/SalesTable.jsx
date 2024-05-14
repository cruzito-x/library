import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Row,
  Col,
  Table,
  Spin,
  Form,
  message
} from "antd";

const SalesTable = ({ salesData, refreshTable, setRefreshTable }) => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/sales")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las ventas");
        }
        return response.json();
      })
      .then((data) => {
        setSales(data);
        setRefreshTable(false);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        message.error(error.message);
      });
  }, [refreshTable, setRefreshTable]);

  const columns = [
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
      render(text) {
        return `$${text}`;
      }
    },
    {
      title: "Descuento",
      dataIndex: "descuento",
      key: "discount",
      render(text) {
        return `$${text}`;
      }
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render(text) {
        return `$${text}`;
      }
    },
    {
      title: "Cliente",
      dataIndex: "cliente",
      key: "client",
    },
    {
      title: "Facturado el",
      dataIndex: "fecha",
      key: "date",
      render: (date) => moment(date).format("YYYY-MM-DD HH:mm:ss")
    }
  ];

  return (
    <div style={{ marginTop: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Spin spinning={loading} size="large" tip="Cargando...">
            <Table scroll={{ x: "max-content" }} columns={columns} dataSource={salesData} />
          </Spin>
        </Col>
      </Row>
    </div>
  );
};

export default SalesTable;
