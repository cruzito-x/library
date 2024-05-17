import { React, useState, useEffect } from "react";
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
  message,
} from "antd";

const GenresTable = ({genresData, refreshTable, setRefreshTable }) => {
  const [modal1Open, setModal1Open] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editedGenre, setEditedGenre] = useState(null);
  const [defaultValue, setDefaultValue] = useState("");
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

  const saveChanges = () => {
    form.validateFields().then((values) => {
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
          if (data.status === 200) {
            message.success(data.message);
          } else if (data.status === 400) {
            message.error(data.message);
          } else if (data.status === 500) {
            message.error(data.message);
          } else {
            message.error(data.message);
          }

          setModal1Open(false);
          setGenres(genres.filter((genre) => genre.idGenero !== editedGenre.idGenero)); // Actualizar la tabla después de la eliminación
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
        if(data.status === 200) {
          message.success(data.message);
        } else if(data.status === 500) {
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
      key: "genre"
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "quantity"
    },
    {
      title: "Creado el",
      dataIndex: "created at",
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
    }
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
    </div>
  );
};

export default GenresTable;
