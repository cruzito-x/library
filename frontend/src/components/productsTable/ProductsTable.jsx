import { React, useState, useEffect } from "react";
import {
  Card,
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
  Select,
  InputNumber,
  message,
} from "antd";

const ProductsTable = ( { refreshTable, setRefreshTable } ) => {
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

  const handleRowClick = (record) => {
    setSelectedRowData(record);
    setModal1Open(true);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    fetch("http://localhost:3001/books/genres")
      .then((response) => response.json())
      .then((data) => {
        setGenres(data);
        if (data.length > 0) {
          setDefaultValue(genres[0].value);
        }
      })
      .catch((error) => {
        console.error("Error al cargar los géneros:", error);
      });
  }, []);

  const handleEdit = (record) => {
    setSelectedRowData(record);
    setEditedBook(record);
    setModal2Open(true);
    form.setFieldsValue(record);
  };

  const saveChanges = () => {
    form.validateFields().then((values) => {
      fetch(`http://localhost:3001/books/updateBook/${editedBook.idLibro}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al actualizar el libro");
          }
          return response.json();
        })
        .then((data) => {
          message.success("Libro actualizado exitosamente");
          setModal2Open(false);
          setBooks(
            books.map((book) =>
              book.idLibro === editedBook.idLibro
                ? { ...book, ...values }
                : book
            )
          );
        })
        .catch((error) => {
          console.error("Error al actualizar el libro:", error);
          message.error("Error al actualizar el libro");
        });
    });
  };

  const confirmDelete = (record) => {
    fetch(
      `http://localhost:3001/books/deleteBookUpdatedDeletedAt/${record.idLibro}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar el libro");
        }
        return response.json();
      })
      .then((data) => {
        message.success("Libro eliminado exitosamente");
        setBooks(books.filter((book) => book.idLibro !== record.idLibro)); // Actualizar la tabla después de la eliminación
      })
      .catch((error) => {
        console.error("Error al eliminar el libro:", error);
        message.error("Error al eliminar el libro");
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
    },
    {
      title: "Acciones",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <>
          <Button type="primary"
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
            <Button type="primary" danger>Eliminar</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    fetch("http://localhost:3001/books/")
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
        console.error("Error al obtener la lista de libros:", error);
        setLoading(false);
        message.error("Error al obtener la lista de libros");
      });
  }, [refreshTable]); 

  return (
    <Card style={{ marginTop: "20px" }}>
      <Row gutter={16}>
        <Col span={24}>
          <Spin spinning={loading} size="large" tip="Cargando...">
            <Table
              columns={columns}
              dataSource={books}
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
            />
          </Spin>

          <Modal
            title="Detalles del libro"
            open={modal1Open}
            onCancel={() => setModal1Open(false)}
            footer={[
              <Button key="back" primary onClick={() => setModal1Open(false)}>
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
                    src={selectedRowData.portada === null ? "logo512.png" : `http://localhost:3001${selectedRowData.portada}`}
                    style={{ width: "300px", height: "350px" }}
                    alt="Product photo"
                  />
                </div>
                <p> <strong> Nombre del libro: </strong> <br />
                  {selectedRowData.titulo} <Tag bordered={false} color="blue"> {selectedRowData.genero} </Tag>
                </p>
                <p>
                  <strong> Existencia: </strong> <br />
                  <Tag bordered={false} color={ selectedRowData.existencia === 0 ? "error" : selectedRowData.existencia < 20 ? "orange" : "success" }> {selectedRowData.existencia === 0 ? "Agotado" : selectedRowData.existencia < 20 ? "Últimas unidades" : "En Existencia"} </Tag>
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
            title="Editar Libro"
            open={modal2Open}
            onCancel={() => setModal2Open(false)}
            footer={[
              <Button key="back" onClick={() => setModal2Open(false)}>
                Cancelar
              </Button>,
              <Button key="submit" type="primary" onClick={saveChanges}>
                Guardar Cambios
              </Button>
            ]}
          >
            <Form form={form}>
              <Form.Item label="Libro:" name="titulo">
                <Input placeholder="ej. Jícaras tristes" name="titulo" />
              </Form.Item>
              <Form.Item label="Autor:" name="autor">
                <Input placeholder="ej. Alfredo Espino" name="autor" />
              </Form.Item>
              <Form.Item label="F. Publicación:" name="fechaPublicacion">
                <Input placeholder="23-07-2016" name="fechaPublicacion" />
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
                <Input placeholder="978-8484050421" name="isbn" />
              </Form.Item>
              <Form.Item label="Ingreso:" name="existencia">
                <InputNumber
                  min={1}
                  max={100}
                  defaultValue={1}
                  name="existencia"
                />
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
    </Card>
  );
};

export default ProductsTable;