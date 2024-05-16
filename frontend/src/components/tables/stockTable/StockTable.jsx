import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Spin,
  Tag,
  Button,
  Popconfirm,
  Form,
  Modal,
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
  const isSuperAdmin = localStorage.getItem("rol") === "superadmin";

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
        setStock(data);
        setRefreshTable(false);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        message.error(error.message);
      });
  }, [refreshTable, setRefreshTable]);

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
          if(data.status !== 200) {
            message.error(data.message);
          } else {
            message.success(data.message);
          }
          setModal1Open(false);
          setStock(stock.map(item =>
            item.idLibro === editedStock.idLibro ? { ...item, ...values } : item
          ));
          setRefreshTable(prev => !prev);
        })
        .catch((error) => {
          message.error(error.message);
        });
    });
  };

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
        if(data.status !== 200) {
          message.error(data.message);
        } else {
          message.success(data.message);
        }
        setStock(stock.filter(item => item.idLibro !== record.idLibro));
        setRefreshTable(prev => !prev);
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const activateStock = (record) => {
    fetch(`http://localhost:3001/stock/activateStock/${record.idLibro}`, {
      method: "put",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al activar el libro en el stock");
        }
        return response.json();
      })
      .then((data) => {
        if(data.status !== 200) {
          message.error(data.message);
        } else {
          message.success(data.message);
        }
        setRefreshTable(prev => !prev);
      })
      .catch((error) => {
        message.error(error.message);
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
        <>
          <Tag
            bordered={false}
            color={
              record.stock === 0
                ? "error"
                : record.stock < 75
                ? "warning"
                : "success"
            }
          >
            {record.stock === 0
              ? "Agotado"
              : record.stock < 75
              ? "Últimas unidades"
              : "En Existencia"}
          </Tag>
          <Tag
            bordered={false}
            color={record.deleted_at != null ? "error" : "success"}
          >
            {record.deleted_at != null ? "Retirado" : "Activo"}
          </Tag>
        </>
      ),
    }];

    if (isSuperAdmin) {
     columns.push({
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
             <Button type="primary" danger style={{ marginRight: "20px" }}>
               Eliminar
             </Button>
           </Popconfirm>
           <Button type="primary" onClick={() => activateStock(record)}>
            Activar
           </Button>
         </>
      ),
     });
    }

  return (
    <div style={{ marginTop: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Spin spinning={loading} size="large" tip="Cargando...">
            <Table scroll={{ x: "max-content" }} columns={columns} dataSource={stockData} />
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
                    message: "Por favor, ingrese la cantidad de existencia",
                  },
                ]}
              >
                <InputNumber min={0} style={{ width: "100%"}} />
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default StockTable;
