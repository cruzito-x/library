import React, { useState, useEffect } from "react";
import moment from "moment";
import { InfoCircleOutlined } from '@ant-design/icons';
import {
  Row,
  Col,
  Table,
  Spin,
  Form,
  Modal,
  Button,
  Typography,
  Divider,
  Empty,
  message,
} from "antd";

const SalesTable = ({ salesData, refreshTable, setRefreshTable }) => {
  const [modal1Open, setModal1Open] = useState(false);
  const [sales, setSales] = useState([]);
  const [salesDetails, setSalesDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [idVenta, setIdVenta] = useState(null);
  const { Link } = Typography;

  const handleRowClick = (record) => {
    setSelectedRowData(record);
    setIdVenta(record.idVenta);
    setModal1Open(true);
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://192.168.0.6:3001/sales")
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

  useEffect(() => {
    if (idVenta !== null) {
      fetch(`http://192.168.0.6:3001/sales/getDetails?idVenta=${idVenta}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener el detalle de venta");
          }
          return response.json();
        })
        .then((data) => {
          setSalesDetails(data);
        })
        .catch((error) => {
          setLoading(false);
          message.error(error.message);
        });
    }
  }, [idVenta]);

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
              locale={{
                emptyText: <Empty description="No hay ventas disponibles" />,
              }}
            />
          </Spin>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Modal
            title={
              <>
                <InfoCircleOutlined style={{ color: '#1890ff', marginRight: '10px' }} />
                Detalles de venta
              </>
            }
            open={modal1Open}
            onCancel={() => setModal1Open(false)}
            footer={[
              <Button key="back" type="primary" onClick={() => setModal1Open(false)}>
                Cerrar
              </Button>
            ]}
          >
            {selectedRowData && (
              <div>
                <div>
                  <p>
                    <strong>Libros adquiridos:</strong>
                  </p>
                  {salesDetails.map((detail, index) => (
                    <p key={index}>{detail.titulo} <Link> <strong>({detail.cantidad})</strong> </Link> </p>
                  ))}
                </div>
                <div>
                  <p>
                    <strong>Descuentos realizados:</strong>
                  </p>
                  {salesDetails.map((detail, index) => (
                    <p key={index}>
                      {detail.titulo} <Link> <strong>(${detail.descuento})</strong> </Link>
                    </p>
                  ))}
                </div>
                <Divider />
                <p>
                  <strong>Subtotal:</strong> ${selectedRowData.subtotal}
                </p>
                <p>
                  <strong>Descuento:</strong> ${selectedRowData.descuento}
                </p>
                <p>
                  <strong>Total:</strong> ${selectedRowData.total}
                </p>
                <p>
                  <strong>Cliente:</strong>{" "}
                  {selectedRowData.cliente}
                </p>
                <p>
                  <strong>Facturado por:</strong>{" "}
                  {selectedRowData.nombreUsuario}
                </p>
              </div>
            )}
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default SalesTable;
