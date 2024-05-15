import React, { useState, useEffect } from "react";
import moment from "moment";
import { Row, Col, Table, Spin, Form, Modal, Button, message } from "antd";

const SalesTable = ({ salesData, refreshTable, setRefreshTable }) => {
  const [modal1Open, setModal1Open] = useState(false);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleRowClick = (record) => {
    setSelectedRowData(record);
    setModal1Open(true);
  };

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
      },
    },
    {
      title: "Descuento",
      dataIndex: "descuento",
      key: "discount",
      render(text) {
        return `$${text}`;
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render(text) {
        return `$${text}`;
      },
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
      render: (date) => moment(date).format("YYYY-MM-DD HH:mm:ss"),
    },
  ];

  return (
    <div style={{ marginTop: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Spin spinning={loading} size="large" tip="Cargando...">
            <Table
              scroll={{ x: "max-content" }}
              columns={columns}
              dataSource={salesData}
              onRow={(record, rowIndex) => {
                return {
                  onClick: () => {
                    handleRowClick(record);
                  },
                };
              }}
            />
          </Spin>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Modal
            title="Detalles de venta"
            open={modal1Open}
            onCancel={() => setModal1Open(false)}
            footer={[
              <Button key="back" primary onClick={() => setModal1Open(false)}>
                Cerrar
              </Button>,
            ]}
          >
            {selectedRowData && (
              <>
                <p> <strong> Libros adquiridos: </strong> <br />
                  {selectedRowData.titulo} <strong>({selectedRowData.cantidad})</strong>
                </p>
                <p> <strong> Descuentos realizados: </strong> <br />
                  {selectedRowData.titulo} <strong>(-${selectedRowData.descuento})</strong>
                </p>
                <p> <strong> Subtotal: </strong> <br />
                  {"$" + selectedRowData.subtotal}
                </p>
                <p> <strong> Descuento: </strong> <br />
                  {"$" + selectedRowData.descuento}
                </p>
                <p> <strong> Total: </strong> <br />
                  {"$" + selectedRowData.total}
                </p>
                <p> <strong> Facturado por: </strong> <br />
                  {selectedRowData.nombreUsuario}
                </p>
              </>
            )}
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default SalesTable;
