import { React, useState, useEffect } from "react";
import {
  PlusCircleOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Input,
  Select,
  Button,
  Modal,
  Form,
  Row,
  Col,
  theme,
  message
} from "antd";
import UsersTable from "../../components/tables/usersTable/UsersTable";

const Users = () => {
  const { confirm } = Modal;
  const [form] = Form.useForm();
  const { Content } = Layout;
  const { Search } = Input;
  const [searchTerm, setSearchTerm] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleChange = (value) => { };

  useEffect(() => {
    fetch("http://127.0.0.1:3001/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener la lista de usuarios");
        }
        return response.json();
      })
      .then((data) => {
        setUsersData(data);
      })
      .catch((error) => {
        console.error(error.message);
        
      });
  }, [refreshTable]);

  const showAddModal = () => {
    confirm({
      width: "35%",
      title: 
        <>
          <PlusCircleOutlined style={{ color: '#1890ff', marginRight: '10px' }} />
          Añadir nuevo usuario
        </>,
      icon: null,
      style: { top: "5%" },
      content: (
        <Form
          layout="horizontal"
          form={form}
          initialValues={{
            layout: "vertical",
          }}
        >
          <Form.Item label="Usuario:" name="nombreUsuario" rules={[{ required: true, message: 'Por favor, introduzca un nombre de usuario' }]} >
            <Input placeholder="ej. David Cruz" name="nombreUsuario" />
          </Form.Item>
          <Form.Item label="Contraseña:" name="password" rules={[{ required: true, message: 'Por favor, introduzca una contraseña' }]} >
            <Input.Password
              placeholder="ej. 12345678"
              maxLength={8}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              name="password"
            />
          </Form.Item>
          <Form.Item label="Rol" name="rol" rules={[{ required: true, message: 'Por favor, seleccione un rol para este usuario' }]} >
            <Select
              name="rol"
              defaultValue="Seleccionar rol de usuario"
              onChange={handleChange}
              options={[
                { value: "admin", label: "Administrador" },
                { value: "superadmin", label: "Super administrador" }
              ]}
            />
          </Form.Item>
        </Form>
      ),
      cancelText: "Cancelar",
      okText: "Guardar",
      onOk() {
        const formData = new FormData();
        const formValues = form.getFieldsValue(); // Obtener los valores del formulario
        formData.append("nombreUsuario", formValues.nombreUsuario);
        formData.append("password", formValues.password);
        formData.append("rol", formValues.rol);

        if (!formValues.nombreUsuario || !formValues.password || !formValues.rol) {
          message.warning("Por favor, complete los campos requeridos");
          return;
        }

        fetch("http://127.0.0.1:3001/users/save", {
          method: "post",
          body: formData,
        })
          .then((response) => response.json())
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

            setRefreshTable(!refreshTable); // Actualiza la tabla
            form.resetFields(); // Limpiar formulario después de enviar
          })
          .catch((error) => {
            message.error(error.message);
          });
      },
      onCancel() {},
    });
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredUsersData = usersData.filter(item =>
    item.nombreUsuario && item.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Content style={{ margin: "0 16px" }}>
      <Breadcrumb style={{ margin: "50px 0 16px 0" }}>
        <Breadcrumb.Item>
          <UserOutlined /> {localStorage.getItem("username")}
        </Breadcrumb.Item>
        <Breadcrumb.Item> Usuarios </Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: "86vh",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={18} lg={18} xl={18}>
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={showAddModal}
            >
              Añadir nuevo
            </Button>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <Search placeholder="Buscar usuario" onSearch={handleSearch} enterButton />
          </Col>
        </Row>
        <UsersTable
          usersData={filteredUsersData}
          refreshTable={refreshTable}
          setRefreshTable={setRefreshTable}
        />
      </div>
    </Content>
  );
};

export default Users;
