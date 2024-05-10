import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Table,
  Spin,
  Tag,
  Button,
  Popconfirm,
  Form,
  Modal,
  Input,
  message,
  InputNumber,
} from "antd";

const StockTable = ({ stockData, refreshTable, setRefreshTable }) => {
  const [modal1Open, setModal1Open] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editedStock, setEditedStock] = useState(null);
  const [form] = Form.useForm();

  const handleEdit = (record) => {
    setSelectedRowData(record);
    setEditedStock(record);
    setModal1Open(true);
    form.setFieldsValue(record);
  };

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
        setLoading(false);
        message.error(error.message);
      });
  }, [refreshTable, setRefreshTable]);

  const confirmDelete = (record) => {
    fetch(
      `http://localhost:3001/stock/deleteStockUpdatedDeletedAt/${record.idLibro}`,
      {
        method: "delete",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al retirar el libro del stock");
        }
        return response.json();
      })
      .then((data) => {
        message.success(data.message);
        setStock(stock.filter((stock) => stock.idLibro !== record.idLibro)); // Actualizar la tabla después de la eliminación
        setRefreshTable((prev) => !prev); // Forzar una actualización de la tabla
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const saveChanges = () => {
    form.validateFields().then((values) => {
      fetch(`http://localhost:3001/stock/updateStock/${editedStock.idLibro}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 500) {
              throw new Error("Error interno de servidor");
            }
          }
          return response.json();
        })
        .then((data) => {
          message.success(data.message);
          setModal1Open(false);
          setStock(
            stock.filter((stock) => stock.idLibro !== editedStock.idLibro)
          ); // Actualizar la tabla después de la eliminación
          setRefreshTable((prev) => !prev); // Forzar una actualización de la tabla
        })
        .catch((error) => {
          message.error(error.message);
        });
    });
  };

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
              : record.stock < 75
              ? "orange"
              : "success"
          }
        >
          {record.stock === 0
            ? "Agotado"
            : record.stock < 75
            ? "Últimas unidades"
            : "En Existencia"}
        </Tag>
      ),
    },
    {
      title: "Acciones",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: "20px", backgroundColor: "#20c997" }}
            onClick={() => handleEdit(record)}
          >
            Editar
          </Button>
          <Popconfirm
            title="Eliminar registro"
            description="¿Está seguro de eliminar este registro?"
            onConfirm={() => confirmDelete(record)}
            onCancel={() => {}}
            okText="Sí"
            cancelText="No"
          >
            <Button type="primary" danger>
              Eliminar
            </Button>
          </Popconfirm>
        </>
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

          <Modal
            title="Editar existencias"
            open={modal1Open}
            onCancel={() => setModal1Open(false)}
            footer={[
              <Button key="back" onClick={() => setModal1Open(false)}>
                Cancelar
              </Button>,
              <Button key="submit" type="primary" onClick={saveChanges}>
                Guardar Cambios
              </Button>,
            ]}
          >
            <Form form={form}>
              <Form.Item
                label="Existencia:"
                name="stock"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingrese un nombre de usuario",
                  },
                ]}
              >
                <InputNumber min={1} max={500} defaultValue={1} name="stock" />
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
    </Card>
  );
};

export default StockTable;