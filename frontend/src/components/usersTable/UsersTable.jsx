import { React, useState, useEffect } from "react";
  import { SmileOutlined, FrownOutlined } from "@ant-design/icons"
import {
  Card,
  Button,
  Modal,
  Row,
  Col,
  Table,
  Popconfirm,
  Spin,
  Form,
  Input,
  message,
} from "antd";

const UsersTable = () => {
  const [modal1Open, setModal1Open] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editedGenre, setEditedBook] = useState(null);
  const [defaultValue, setDefaultValue] = useState("");
  const [form] = Form.useForm();

  const handleEdit = (record) => {
    setSelectedRowData(record);
    setEditedBook(record);
    setModal1Open(true);
    form.setFieldsValue(record);
  };

  useEffect(() => {
    fetch("http://localhost:3001/users/")
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
        console.error("Error al obtener la lista de géneros:", error);
        setLoading(false);
        message.error("Error al obtener la lista de géneros");
      });
  }, []);

  const saveChanges = () => {
    form.validateFields().then((values) => {
      fetch(
        `http://localhost:3001/genres/updateGenre/${editedGenre.idGenero}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      )
        .then((response) => {
          if (!response.ok) {
            if (response.status === 400) {
              throw new Error("El género literario ya existe");
            } else if (response.status === 500) {
              throw new Error("Error interno de servidor");
            }
          }
          return response.json();
        })
        .then((data) => {
          message.success("Género literario actualizado exitosamente");
          setModal1Open(false);
          setGenres(
            genres.map((genre) =>
              genre.idGenero === editedGenre.idGenero
                ? { ...genre, ...values }
                : genre
            )
          );
        })
        .catch((error) => {
          message.error("Error al actualizar el género literario");
        });
    });
  };

  const confirmDelete = (record) => {
    fetch(
      `http://localhost:3001/genres/deleteGenreUpdatedDeletedAt/${record.idGenero}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar el género literario");
        }
        return response.json();
      })
      .then((data) => {
        message.success("Género literario eliminado exitosamente");
        setGenres(genres.filter((genre) => genre.idGenero !== record.idGenero)); // Actualizar la tabla después de la eliminación
      })
      .catch((error) => {
        message.error("Error al eliminar el género literario");
      });
  };

  const columns = [
    {
      title: "Usuario",
      dataIndex: "nombreUsuario",
      key: "username"
    },
    {
      title: "Rol",
      dataIndex: "rol",
      key: "role"
    },
    {
      title: "Status",
      dataIndex: "deleted_at",
      key: "status",
      render: (text) => {
        if(text == null) {
          return (<span> <SmileOutlined style={{ color: "#20c997" }} /> Activo </span>);
        } else {
          return (<span> <FrownOutlined style={{ color: "#ff4d4f" }} /> Inactivo </span>);
        }
      }
    },
    {
      title: "Creado el",
      dataIndex: "created_at",
      key: "createdAt",
      render: (text) => {
        const formattedDate = new Date(text).toLocaleDateString("es-ES", { // Formatear la fecha
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-");
        return formattedDate;
      }
    },
    {
      title: "Acciones",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
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
            <Button type="primary" danger>Eliminar</Button>
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
            <Table
              columns={columns}
              dataSource={genres}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {},
                };
              }}
            />
          </Spin>

          <Modal
            title="Editar género"
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
              <Form.Item label="Género:" name="nombreGenero">
                <Input placeholder="ej. Terror" name="nombreGenero" />
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
    </Card>
  );
};

export default UsersTable;