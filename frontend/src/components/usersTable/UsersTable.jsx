import { React, useState, useEffect } from "react";
import {
  SmileOutlined,
  FrownOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
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
  Select,
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
    fetch("http://localhost:3001/users/")
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
      if (values.nombreUsuario === "" || values.password === "" || values.rol === "") {
        message.error("Todos los campos son obligatorios");
        return;
      } else {
        fetch(
          `http://localhost:3001/users/updateUser/${editedUser.idUsuario}`,
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
              if (response.status === 400) {
                throw new Error("El usuario ya existe");
              } else if (response.status === 500) {
                throw new Error("Error interno de servidor");
              }
            }
            return response.json();
          })
          .then((data) => {
            message.success("Usuario actualizado exitosamente");
            setModal1Open(false);
            setUsers(
              users.map((user) =>
                user.idUsuario === editedUser.idUsuario
                  ? { ...user, ...values }
                  : user
              )
            );
          })
          .catch((error) => {
            message.error("Error al actualizar el usuario");
          });
      }
    });
  };

  const confirmDelete = (record) => {
    fetch(
      `http://localhost:3001/users/deleteUserUpdatedDeletedAt/${record.idUsuario}`,
      {
        method: "delete",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar el usuario");
        }
        return response.json();
      })
      .then((data) => {
        message.success("Usuario eliminado exitosamente");
        setUsers(users.filter((user) => user.idUsuario !== record.idUsuario)); // Actualizar la tabla después de la eliminación
      })
      .catch((error) => {
        message.error("Error al eliminar el usuario");
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
            <span>
              {" "}
              <SmileOutlined style={{ color: "#20c997" }} /> Activo{" "}
            </span>
          );
        } else {
          return (
            <span>
              {" "}
              <FrownOutlined style={{ color: "#ff4d4f" }} /> Inactivo{" "}
            </span>
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
            <Button type="primary" danger>
              Eliminar
            </Button>
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
            <Table columns={columns} dataSource={usersData} />
          </Spin>

          <Modal
            title="Editar usuario"
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
                label="Usuario:"
                name="nombreUsuario"
                rules={[{ required: true, message: 'Por favor, ingrese un nombre de usuario' }]}
              >
                <Input placeholder="ej. David Cruz" name="nombreUsuario" />
              </Form.Item>
              <Form.Item
                label="Contraseña:"
                defaultValue=""
                name="password"
                rules={[{ required: true, message: 'Por favor, ingrese una contraseña' }]}
              >
                <Input.Password
                  placeholder="ej. 12345678"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  name="password"
                />
              </Form.Item>
              <Form.Item
                label="Rol"
                name="rol"
                rules={[{ required: true, message: 'Por favor, seleccione un rol para este usuario' }]}
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
        </Col>
      </Row>
    </Card>
  );
};

export default UsersTable;
