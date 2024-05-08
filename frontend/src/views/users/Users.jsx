import { React, useState } from "react";
import {
  PlusCircleOutlined,
  PlusCircleFilled,
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
import UsersTable from "../../components/usersTable/UsersTable";

const Users = () => {
  const { confirm } = Modal;
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const { Content } = Layout;
  const [size, setSize] = useState("medium");
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const [refreshTable, setRefreshTable] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const showAddModal = () => {
    confirm({
      width: "35%",
      title: "Añadir nuevo usuario",
      icon: <PlusCircleFilled />,
      style: { top: "5%" },
      content: (
        <Form
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
        >
          <Form.Item label="Usuario:" name="nombreUsuario">
            <Input placeholder="ej. David Cruz" name="nombreUsuario" />
          </Form.Item>
          <Form.Item label="Contraseña:" name="password">
            <Input.Password
              placeholder="ej. 12345678"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              name="password"
            />
          </Form.Item>
          <Form.Item label="Rol" name="rol">
            <Select
              name="rol"
              defaultValue="admin"
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

        fetch("http://localhost:3001/users/save", {
          method: "post",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            message.success(data.message);
            setRefreshTable(!refreshTable); // Actualiza la tabla
          })
          .catch((error) => {
            message.error("Error al registrar usuario");
          });
      },
      onCancel() {},
    });
  };

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
        <Row gutter={16}>
          <Col span={18}>
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              size={size}
              onClick={showAddModal}
            >
              {" "}
              Añadir nuevo{" "}
            </Button>
          </Col>
          <Col span={6}>
            <Search placeholder="Buscar" onSearch={onSearch} enterButton />
          </Col>
        </Row>
        <UsersTable refreshTable={refreshTable} setRefreshTable={setRefreshTable}/>
      </div>
    </Content>
  );
};

export default Users;
