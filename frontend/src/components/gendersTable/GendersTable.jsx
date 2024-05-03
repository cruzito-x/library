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

const GendersTable = () => {
  const [modal1Open, setModal1Open] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editedBook, setEditedBook] = useState(null);
  const [defaultValue, setDefaultValue] = useState("");
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const handleEdit = (record) => {
    setSelectedRowData(record);
    setEditedBook(record);
    setModal1Open(true);
    form.setFieldsValue(record);
  };

  const saveChanges = () => {
    form.validateFields().then((values) => {
      // Enviar solicitud de actualización al servidor
      fetch(`http://localhost:3001/genres/updateGenre/${editedBook.idLibro}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al actualizar el género literario");
          }
          return response.json();
        })
        .then((data) => {
          message.success("Género literario actualizado exitosamente");
          setModal1Open(false);
          setGenres(
            genres.map((book) =>
              book.idLibro === editedBook.idLibro
                ? { ...book, ...values }
                : book
            )
          );
        })
        .catch((error) => {
          console.error("Error al actualizar el género literario:", error);
          message.error("Error al actualizar el género literario");
        });
    });
  };

  const confirmDelete = (record) => {
    fetch(
      `http://localhost:3001/genres/deleteBookUpdatedDeletedAt/${record.idLibro}`,
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
        setGenres(genres.filter((book) => book.idLibro !== record.idLibro)); // Actualizar la tabla después de la eliminación
      })
      .catch((error) => {
        console.error("Error al eliminar el libro:", error);
        message.error("Error al eliminar el libro");
      });
  };

  const columns = [
    {
      title: "Género",
      dataIndex: "genero",
      key: "genre"
    },
    {
      title: "Creado el",
      dataIndex: "created at",
      key: "createdAt"
    },
    {
      title: "Acciones",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <>
          <Button
            primary
            style={{ marginRight: "20px" }}
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
            <Button danger>Eliminar</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

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
        console.error("Error al obtener la lista de géneros:", error);
        setLoading(false);
        message.error("Error al obtener la lista de géneros");
      });
  }, []);

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
                  onClick: (event) => {
                  },
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
              </Button>
            ]}
          >
            <Form form={form}>
              <Form.Item label="Género:" name="genero">
                <Input placeholder="ej. Jícaras tristes" name="genero" />
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
    </Card>
  );
};

export default GendersTable;