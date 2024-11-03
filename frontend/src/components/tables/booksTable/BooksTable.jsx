import { React, useState, useEffect } from "react";
import { InfoCircleOutlined, EditOutlined  } from '@ant-design/icons';
import {
  Tag,
  Button,
  Modal,
  Row,
  Col,
  Table,
  Image,
  Popconfirm,
  Spin,
  Form,
  Input,
  InputNumber,
  Select,
  Empty,
  message,
} from "antd";

const BooksTable = ( { booksData, refreshTable, setRefreshTable } ) => {
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editedBook, setEditedBook] = useState(null);
  const [genres, setGenres] = useState([]);
  const [defaultValue, setDefaultValue] = useState("");
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const isSuperAdmin = localStorage.getItem("rol") === "superadmin";

  const handleRowClick = (record) => {
    setSelectedRowData(record);
    setModal1Open(true);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:3001/books/genres")
      .then((response) => response.json())
      .then((data) => {
        setGenres(data);
        if (data.length > 0) {
          setDefaultValue(genres[0].value);
        }
      })
      .catch((error) => {
      });
  }, []);

  const handleEdit = (record) => {
    setSelectedRowData(record);
    setEditedBook(record);
    setModal2Open(true);
    form.setFieldsValue(record);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:3001/books/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener la lista de libros");
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        message.error(error.message);
      });
  }, [refreshTable, setRefreshTable]); 

  const saveChanges = () => {
    form.validateFields().then((values) => {
      fetch(`http://127.0.0.1:3001/books/updateBook/${editedBook.idLibro}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al actualizar los datos del libro, por favor intente de nuevo");
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === 200 || data.status === 304) {
            message.success(data.message);
          } else if (data.status === 400) {
            message.warning(data.message);
          } else if (data.status === 500) {
            message.error(data.message);
          } else {
            message.error(data.message);
          }

          setModal2Open(false);
          setBooks(books.filter((book) => book.idLibro !== editedBook.idLibro)); // Actualizar la tabla después de la actualización
          setRefreshTable((prev) => !prev); // Forzar una actualización de la tabla
        })
        .catch((error) => {
          message.error(error.message);
        });
    });
  };

  const confirmDelete = (record) => {
    fetch(
      `http://127.0.0.1:3001/books/deleteBookUpdatedDeletedAt/${record.idLibro}`,
      {
        method: "delete",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar el libro, por favor intente de nuevo");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 200 || data.status === 304) {
          message.success(data.message);
        } else if (data.status === 400) {
          message.warning(data.message);
        } else if (data.status === 500) {
          message.error(data.message);
        } else {
          message.error(data.message);
        }

        setBooks(books.filter((book) => book.idLibro !== record.idLibro)); // Actualizar la tabla después de la eliminación
        setRefreshTable((prev) => !prev); // Forzar una actualización de la tabla
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const columns = [
    {
      title: "Nombre del libro",
      dataIndex: "titulo",
      key: "name",
    },
    {
      title: "Autor",
      dataIndex: "autor",
      key: "author",
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "price",
      render: (precio) => `$${precio}`,
      sorter: (a, b) => a.precio - b.precio,
    }
  ];

    if (isSuperAdmin) {
      columns.push({
      title: "Acciones",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <>
          <Button type="primary"
            style={{ marginRight: "20px", backgroundColor: "#fbac14" }}
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
            <Button type="primary" danger>Eliminar</Button>
          </Popconfirm>
        </>
      ),
    });
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Spin spinning={loading} size="large" tip="Cargando...">
            <Table
              scroll={{ x: "max-content" }} 
              columns={columns}
              dataSource={booksData}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    if (
                      event.target.closest(".ant-table-cell:last-child") ||
                      event.target.closest(".ant-popover-inner-content")
                    ) {
                      return;
                    }
                    handleRowClick(record);
                  },
                };
              }}
              locale={{
                emptyText: <Empty description="No hay libros disponibles" />,
              }}
            />
          </Spin>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>

          <Modal
            title={
              <>
                <InfoCircleOutlined style={{ color: '#1890ff', marginRight: '10px' }} />
                Detalles del libro
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
              <>
                <div
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Image
                    src={selectedRowData.portada === null ? "logo512.png" : `http://127.0.0.1:3001${selectedRowData.portada}`}
                    style={{ width: "300px", height: "350px" }}
                    alt="Book photo"
                    preview={false}
                  />
                </div>
                <p> <strong> Título: </strong> <br />
                  {selectedRowData.titulo} <Tag bordered={false} color="blue"> {selectedRowData.genero} </Tag>
                </p>
                <p>
                  <strong> Existencia: </strong> <br />
                  <Tag bordered={false} color={ selectedRowData.existencia === 0 ? "error" : selectedRowData.existencia < 75 ? "warning" : "success" }> {selectedRowData.existencia === 0 ? "Agotado" : selectedRowData.existencia < 75 ? "Últimas unidades" : "En Existencia"} </Tag>
                </p>
                <p> <strong> Autor: </strong> <br />
                  {selectedRowData.autor}
                </p>
                <p> <strong> Precio: </strong> <br />
                  {"$" + selectedRowData.precio}
                </p>
                <p> <strong> Descripción: </strong> <br />
                  {selectedRowData.sinopsis}
                </p>
              </>
            )}
          </Modal>

          <Modal
            title={
              <>
                <EditOutlined style={{ color: '#fbac14', marginRight: '10px' }} />
                Editar información de libro
              </>
            }
            open={modal2Open}
            onCancel={() => setModal2Open(false)}
            footer={[
              <Button key="back" onClick={() => setModal2Open(false)}>
                Cancelar
              </Button>,
              <Button key="submit" type="primary" onClick={saveChanges}>
                Guardar cambios
              </Button>
            ]}
          >
            <Form form={form}>
              <Form.Item label="Título:" name="titulo">
                <Input placeholder="ej. Jícaras tristes" name="titulo" />
              </Form.Item>
              <Form.Item label="Autor:" name="autor">
                <Input placeholder="ej. Alfredo Espino" name="autor" />
              </Form.Item>
              <Form.Item label="Año de publicación:" name="fechaPublicacion">
                <InputNumber min={1901} max={2024} placeholder="Introduzca un año entre 1901 y 2024" name="fechaPublicacion" maxLength={4} style={{ width: "100%" }}/>
              </Form.Item>
              <Form.Item label="Precio:" name="precio">
                <Input prefix="$" placeholder="0.00" name="precio" />
              </Form.Item>
              <Form.Item label="Género:" name="genero">
                <Select
                defaultValue={defaultValue}
                onChange={handleChange}
                options={genres.map((genre) => ({
                  value: genre.value,
                  label: genre.label,
                }))}
                />
                </Form.Item>
              <Form.Item label="ISBN:" name="isbn">
                <Input placeholder="978-8484050421" name="isbn" maxLength={14} />
              </Form.Item>
              <Form.Item label="Descripción:" name="sinopsis">
                <TextArea
                  rows={6}
                  placeholder="Descripción del libro"
                  showCount
                  maxLength={255}
                  name="sinopsis"
                  style={{ height: 120, resize: "none" }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default BooksTable;