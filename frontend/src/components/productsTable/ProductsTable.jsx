import { React, useState } from 'react';
import { Card, Tag, Button, Modal, Row, Col, Table, Image, Popconfirm, Spin, message } from "antd";

const ProductsTable = () => {
  const [modal1Open, setModal1Open] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

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

  const data = [
    {
      key: 1,
      name: "Cien años de soledad",
      author: "Gabriel García Márquez",
      gender: "Novela",
      price: 20.99,
      description:
        "Cien años de soledad es una novela del escritor colombiano Gabriel García Márquez, ganador del Premio Nobel de Literatura en 1982.",
        stock: 30
    },
    {
      key: 2,
      name: "Don Quijote de la Mancha",
      author: "Miguel de Cervantes",
      gender: "Novela",
      price: 18.50,
      description:
        "Don Quijote de la Mancha es una novela escrita por el español Miguel de Cervantes Saavedra. Publicada su primera parte con el título de El ingenioso hidalgo don Quijote de la Mancha a comienzos de 1605.",
        stock: 50
    },
    {
      key: 3,
      name: "La sombra del viento",
      author: "Carlos Ruiz Zafón",
      gender: "Novela",
      price: 15.75,
      description:"La sombra del viento es una novela del escritor español Carlos Ruiz Zafón, publicada en 2001. Es la primera parte de la serie de cuatro libros El Cementerio de los Libros Olvidados.",
      stock: 10
    },
    {
      key: 4,
      name: "Rayuela",
      author: "Julio Cortázar",
      gender: "Novela",
      price: 22.25,
      description: "Rayuela es una novela del escritor argentino Julio Cortázar, publicada en 1963. Es considerada una de las obras cumbre de la literatura del siglo XX.",
      stock: 0
    },
    {
      key: 5,
      name: "Lazarillo de Tormes",
      author: "fray Juan de Ortega",
      gender: "Novela",
      price: 22.25,
      description: "Cuenta la vida de un niño llamado Lázaro que al principio era inocente, pero se convirtió en pícaro para poder sobrevivir",
      stock: 20
    }
  ];

  return (
    <Card style={{ marginTop: "20px" }}>
      <Row gutter={16}>
        <Col span={24}>
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
            dataSource={data}
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
