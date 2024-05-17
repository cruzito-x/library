import { React, useState, useEffect } from "react";
import {
  PlusCircleOutlined,
  PlusCircleFilled,
  UserOutlined
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Input,
  Button,
  Modal,
  Form,
  Row,
  Col,
  theme,
  message
} from "antd";
import GenresTable from "../../components/tables/genresTable/GenresTable";

const Genres = () => {
  const { confirm } = Modal;
  const [form] = Form.useForm();
  const { Content } = Layout;
  const { Search } = Input;
  const [searchTerm, setSearchTerm] = useState("");
  const [genresData, setGenresData] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const isSuperAdmin = localStorage.getItem("rol") === "superadmin";

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    fetch("http://localhost:3001/genres")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener la lista de géneros");
        }
        return response.json();
      })
      .then((data) => {
        setGenresData(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [refreshTable]);

  const showAddModal = () => {
    confirm({
      width: "35%",
      title: "Añadir género literario",
      icon: <PlusCircleFilled />,
      style: { top: "5%" },
      content: (
        <Form
          layout="horizontal"
          form={form}
          initialValues={{
            layout: "vertical",
          }}
        >
          <Form.Item label="Género:" name="nombreGenero">
            <Input placeholder="ej. Terror" name="nombreGenero" />
          </Form.Item>
        </Form>
      ),
      cancelText: "Cancelar",
      okText: "Guardar",
      onOk() {
        const formData = new FormData();
        const formValues = form.getFieldsValue(); // Obtener los valores del formulario
        formData.append("nombreGenero", formValues.nombreGenero);

        if (!formValues.nombreGenero) {
          message.warning("Por favor, complete los campos requeridos");
          return;
        }

        fetch("http://localhost:3001/genres/save", {
          method: "post",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === 200 || data.status === 304) {
              message.success(data.message);
              setRefreshTable(!refreshTable); // Actualiza la tabla
              form.resetFields(); // Limpiar formulario después de enviar
            } else if (data.status === 400) {
              message.error(data.message);
            } else if (data.status === 500) {
              message.error(data.message);
            } else {
              message.error(data.message);
            }
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

  const filteredGenresData = genresData.filter(item =>
    item.nombreGenero && item.nombreGenero.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Content style={{ margin: "0 16px" }}>
      <Breadcrumb style={{ margin: "50px 0 16px 0" }}>
        <Breadcrumb.Item>
          <UserOutlined /> {localStorage.getItem("username")}
        </Breadcrumb.Item>
        <Breadcrumb.Item> Extras </Breadcrumb.Item>
        <Breadcrumb.Item> Géneros </Breadcrumb.Item>
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
            { isSuperAdmin ? (
            <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={showAddModal}
            >
              Añadir nuevo
            </Button>
            ) : null}
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <Search placeholder="Buscar por género literario" onSearch={handleSearch} enterButton />
          </Col>
        </Row>
        <GenresTable
          genresData={filteredGenresData}
          refreshTable={refreshTable}
          setRefreshTable={setRefreshTable}
        />
      </div>
    </Content>
  );
};

export default Genres;
