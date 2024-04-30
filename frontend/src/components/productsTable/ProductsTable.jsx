import { React, useState, useEffect } from 'react';
import { Card, Tag, Button, Modal, Row, Col, Table, Image, Popconfirm, Spin, message } from "antd";

const ProductsTable = () => {
  const [modal1Open, setModal1Open] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleRowClick = (record) => {
    setSelectedRowData(record);
    setModal1Open(true);
  }

  const confirmDelete = (e) => {
    console.log(e);
    <Spin size='large' tip='Cargando...'/>
    message.success("Producto eliminado");
  };

  const cancelDelete = (e) => {
    console.log(e);
    message.error("Eliminación cancelada");
  };

  const columns = [
    {
      title: "Nombre del libro",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Autor",
      dataIndex: "author",
      key: "author"
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Acciones",
      dataIndex: "",
      key: "x",
      render: () => (
        <>
          <Button primary style={{ marginRight: "20px" }}>
            Editar
          </Button>
          <Popconfirm
            title="Eliminar registro"
            description="¿Está seguro de eliminar este registro?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
            okText="Sí"
            cancelText="No"
          >
            <Button danger>Eliminar</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    fetch("https://adb9-190-150-170-239.ngrok-free.app/books/")
      .then(response => response.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
        console.log(data);
      })
      .catch(error => {
        console.error("Error al obtener la lista de libros:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Card style={{ marginTop: "20px" }}>
      <Row gutter={16}>
        <Col span={24}>
        <Spin spinning={loading} size='large' tip='Cargando...'>
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>
                  {record.description}
                </p>
              ),
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}
            dataSource={books}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  if (event.target.closest('.ant-table-cell:last-child') || event.target.closest('.ant-popover-inner-content')) { // Verificar si el clic ocurrió en la última columna o en el Popconfirm
                    return; // No hacer nada si el clic fue en la última columna
                  }
                  handleRowClick(record); // Ejecutar handleRowClick en cualquier otro caso
                },
              };
            }}
          />
          </Spin>

          <Modal title="Detalles del libro" open={modal1Open} onCancel={() => setModal1Open(false)}
            footer={[<Button key="back" primary onClick={() => setModal1Open(false)}> Cerrar </Button>]}>
            {selectedRowData && (
              <>
                <div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
                  <Image src={"logo512.png"} style={{ width: "300px", height: "350px" }} alt="Product photo" />
                </div>
                <p> <strong> Nombre del libro: </strong> <br /> {selectedRowData.name} <Tag bordered={false} color='blue'> {selectedRowData.gender} </Tag> </p>
                <p> <strong> Existencia: </strong> <br /> <Tag bordered={false} color={selectedRowData.stock === 0 ? "error" : selectedRowData.stock < 20 ? "orange" : "success"}> {selectedRowData.stock === 0 ? "Agotado" : selectedRowData.stock < 20 ? "Últimas unidades" : "En Existencia"} </Tag> </p>
                <p> <strong> Autor: </strong> <br /> {selectedRowData.author}</p>
                <p> <strong> Precio: </strong> <br /> {'$'+selectedRowData.price}</p>
                <p> <strong> Descripción: </strong> <br /> {selectedRowData.description}</p>
              </>
            )}
          </Modal>
        </Col>
      </Row>
    </Card>
  )
}

export default ProductsTable;
