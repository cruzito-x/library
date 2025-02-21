import React, { useState, useEffect } from "react";
import {
  EditOutlined,
  SmileOutlined,
  FrownOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
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
  Select,
  Tag,
  Empty,
  message,
} from "antd";

const UsersTable = ({ usersData, refreshTable, setRefreshTable }) => {
  const [modal1Open, setModal1Open] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editedUser, setEditedUser] = useState(null);
  const [form] = Form.useForm();

  const handleEdit = (record) => {
    setSelectedRowData(record);
    setEditedUser(record);
    setModal1Open(true);
    form.setFieldsValue(record);
  };

  const handleChange = (value) => {};

  useEffect(() => {
    fetch("http://127.0.0.1:3001/users/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener la lista de usuarios");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [refreshTable]);

  const saveChanges = () => {
    form.validateFields().then((values) => {
      if (!values.nombreUsuario || !values.password || !values.rol) {
        message.warning("Por favor, complete los campos requeridos");
        return;
      }

      fetch(`http://127.0.0.1:3001/users/updateUser/${editedUser.idUsuario}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 400) {
              throw new Error("El usuario ya existe");
            } else if (response.status === 500) {
              throw new Error("Error interno de servidor");
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
          setUsers(users.filter((user) => user.idUsuario !== editedUser.idUsuario)); // Actualizar la tabla después de la eliminación
          setRefreshTable((prev) => !prev); // Forzar una actualización de la tabla
          form.resetFields(); // Limpiar formulario después de enviar
        })
        .catch((error) => {
          message.error(error.message);
        });
    });
  };

  const confirmDelete = (record) => {
    fetch(
      `http://127.0.0.1:3001/users/deleteUserUpdatedDeletedAt/${record.idUsuario}`,
      {
        method: "delete",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar el usuario, por favor intente de nuevo");
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

        setUsers(users.filter((user) => user.idUsuario !== record.idUsuario)); // Actualizar la tabla después de la eliminación
        setRefreshTable((prev) => !prev); // Forzar una actualización de la tabla
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const columns = [
    {
      title: "Usuario",
      dataIndex: "nombreUsuario",
      key: "username",
    },
    {
      title: "Rol",
      dataIndex: "rol",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "deleted_at",
      key: "status",
      render: (text) => {
        if (text == null) {
          return (
            <>
              {" "}
              <Tag bordered={false} color="success">
                 <SmileOutlined/> Activo
              </Tag>
            </>
          );
        } else {
          return (
            <>
              {" "}
              <Tag bordered={false} color="error">
                <FrownOutlined style={{ color: "#ff4d4f" }} /> Inactivo
              </Tag>
            </>
          );
        }
      },
    },
    {
      title: "Creado el",
      dataIndex: "created_at",
      key: "createdAt",
      render: (text) => {
        const formattedDate = new Date(text)
          .toLocaleDateString("es-ES", {
            // Formatear la fecha
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-");
        return formattedDate;
      },
    },
    {
      title: "Inactivo desde",
      dataIndex: "deleted_at",
      key: "deletedAt",
      render: (text) => {
        if (text === null) {
          return "-";
        } else {
          const formattedDate = new Date(text)
            .toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
            .replace(/\//g, "-");
          return formattedDate;
        }
      },
    },
    {
      title: "Acciones",
      dataIndex: "",
      key: "x",
      render: (record) => (
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
    },
  ];

  return (
    <div style={{ marginTop: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Spin spinning={loading} size="large" tip="Cargando...">
            <Table
              scroll={{ x: "max-content" }}
              columns={columns}
              dataSource={usersData}
              locale={{
                emptyText: <Empty description="No hay usuarios disponibles" />,
              }}
            />
          </Spin>
        </Col>
      </Row>

      <Modal
        title={
          <>
            <EditOutlined style={{ color: '#fbac14', marginRight: '10px' }} />
            Editar información de usuario
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
            label="Usuario:"
            name="nombreUsuario"
            rules={[
              {
                required: true,
                message: "Por favor, introduzca un nombre de usuario",
              },
            ]}
          >
            <Input placeholder="ej. David Cruz" name="nombreUsuario" />
          </Form.Item>
          <Form.Item
            label="Contraseña:"
            defaultValue=""
            name="password"
            rules={[
              {
                required: true,
                message: "Por favor, introduzca una contraseña",
              },
            ]}
          >
            <Input.Password
              placeholder="ej. 12345678"
              maxLength={8}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              name="password"
            />
          </Form.Item>
          <Form.Item
            label="Rol"
            name="rol"
            rules={[
              {
                required: true,
                message: "Por favor, seleccione un rol para este usuario",
              },
            ]}
          >
            <Select
              name="rol"
              defaultValue="admin"
              onChange={handleChange}
              options={[
                { value: "admin", label: "Administrador" },
                { value: "superadmin", label: "Super administrador" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersTable;
