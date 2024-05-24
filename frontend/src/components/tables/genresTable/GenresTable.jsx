import { React, useState, useEffect } from "react";
import { InfoCircleOutlined, EditOutlined } from '@ant-design/icons';
import {
  Button,
  Modal,
  Row,
  Col,
  Table,
  Popconfirm,
  Spin,
  Form,
  Input,
  Empty,
  message,
} from "antd";

const GenresTable = ({ genresData, refreshTable, setRefreshTable }) => {
  const [modal1Open, setModal1Open] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editedGenre, setEditedGenre] = useState(null);
  const [modal2Open, setModal2Open] = useState(false);
  const [books, setBooks] = useState([]);
  const [form] = Form.useForm();
  const isSuperAdmin = localStorage.getItem("rol") === "superadmin";

  const handleEdit = (record) => {
    setSelectedRowData(record);
    setEditedGenre(record);
    setModal1Open(true);
    form.setFieldsValue(record);
  };

  useEffect(() => {
    fetch("http://localhost:3001/genres/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener la lista de géneros");
        }
        return response.json();
      })
      .then((data) => {
        setGenres(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        message.error(error.message);
      });
  }, [refreshTable]);

  const handleGenreClick = (idGenero) => {
    fetch(`http://localhost:3001/genres/booksByGenre/${idGenero}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los libros del género");
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data);
        setModal2Open(true);
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const saveChanges = () => {
    form.validateFields().then((values) => {
      if (!values.nombreGenero) {
        message.warning("Por favor, complete los campos requeridos");
        return;
      }

      fetch(
        `http://localhost:3001/genres/updateGenre/${editedGenre.idGenero}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      )
        .then((response) => {
          if (!response.ok) {
            console.log(response);
            if (response.status === 400) {
              throw new Error("El género literario ya está registrado");
            } else if (response.status === 500) {
              throw new Error("Error interno del servidor");
            }
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

          setModal1Open(false);
          setGenres(genres.filter((genre) => genre.idGenero !== editedGenre.idGenero)); // Actualizar la tabla después de la actualización
          setRefreshTable((prev) => !prev); // Forzar una actualización de la tabla
        })
        .catch((error) => {
          message.error(error.message);
        });
    });
  };

  const confirmDelete = (record) => {
    fetch(
      `http://localhost:3001/genres/deleteGenreUpdatedDeletedAt/${record.idGenero}`,
      {
        method: "delete",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar el género literario");
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

        setGenres(genres.filter((genre) => genre.idGenero !== editedGenre.idGenero)); // Actualizar la tabla después de la eliminación
        setRefreshTable((prev) => !prev); // Forzar una actualización de la tabla
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const columns = [
    {
      title: "Género",
      dataIndex: "nombreGenero",
      key: "genre",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "quantity",
    },
    {
      title: "Creado el",
      dataIndex: "created at",
      key: "createdAt",
      render: (text) => {
        const formattedDate = new Date(text)
          .toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-");
        return formattedDate;
      },
    },
  ];

  if (isSuperAdmin) {
    columns.push({
      title: "Acciones",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <>
          <Button
            type="primary"
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
            <Button type="primary" danger>
              Eliminar
            </Button>
          </Popconfirm>
        </>
      ),
    });
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <Row gutter={16}>
        <Col span={24}>
          <Spin spinning={loading} size="large" tip="Cargando...">
            <Table
              scroll={{ x: "max-content" }}
              columns={columns}
              dataSource={genresData}
              locale={{
                emptyText: <Empty description="No hay géneros disponibles" />,
              }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    if (
                      event.target.closest(".ant-table-cell:last-child") ||
                      event.target.closest(".ant-popover-inner-content")
                    ) {
                      return;
                    }
                    handleGenreClick(record.idGenero);
                  },
                };
              }}
            />
          </Spin>

          <Modal
            title={
              <>
                <EditOutlined style={{ color: '#fabc14', marginRight: '10px' }} />
                Editar información del género
              </>
            }
            open={modal1Open}
            onCancel={() => setModal1Open(false)}
            footer={[
              <Button key="back" onClick={() => setModal1Open(false)}>
                Cancelar
              </Button>,
              <Button key="submit" type="primary" onClick={saveChanges}>
                Guardar cambios
              </Button>,
            ]}
          >
            <Form form={form}>
              <Form.Item
                label="Género:"
                name="nombreGenero"
                rules={[{ required: true, message: "Introduzca un nuevo nombre de género" }]}
              >
                <Input placeholder="ej. Terror" name="nombreGenero" />
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title={
              <>
                <InfoCircleOutlined style={{ color: '#1890ff', marginRight: '10px' }} />
                Libros del género
              </>
            }
            open={modal2Open}
            onCancel={() => setModal2Open(false)}
            footer={[
              <Button key="back" type="primary" onClick={() => setModal2Open(false)}>
                Cerrar
              </Button>
            ]}
            width="50%"
          >
            <Table
              columns={[
                { title: "Libro", dataIndex: "titulo", key: "titulo" },
                { title: "Autor", dataIndex: "autor", key: "autor" },
                { title: "Precio", dataIndex: "precio", key: "precio", render: (precio) => `$${precio}` },
              ]}
              dataSource={books}
              pagination={true}
              rowKey="id"
            />
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default GenresTable;
