import React, { useState } from "react";
import {
  PlusCircleOutlined,
  PlusCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Card,
  Layout,
  Input,
  InputNumber,
  Tag,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Select,
  theme,
  message,
} from "antd";
import Uploader from "../../components/uploader/Uploader";
import ProductsTable from "../../components/productsTable/ProductsTable";

const Products = () => {
  const { Content } = Layout;
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const [size, setSize] = useState("medium");
  const { confirm } = Modal;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const showPromiseConfirm = () => {
    confirm({
      width: "35%",
      title: "Añadir libro",
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
              defaultValue="Educativo"
              name="genero"
              onChange={handleChange}
              options={[
                {
                  value: "Educativo",
                  label: "Educativo",
                },
                {
                  value: "Fantasía",
                  label: "Fantasía",
                },
                {
                  value: "Novela",
                  label: "Novela",
                },
                {
                  value: "Romance",
                  label: "Romance",
                },
                {
                  value: "Sci-Fi",
                  label: "Sci-Fi",
                },
                {
                  value: "Terror",
                  label: "Terror",
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="ISBN:" name="isbn">
            <Input placeholder="978-8484050421" name="isbn" />
          </Form.Item>
          <Form.Item label="Ingreso:" name="ingreso">
            <InputNumber min={1} max={100} defaultValue={1} name="ingreso" />
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
          <br />
          <Form.Item label="Portada:" name="portada">
            <Uploader />
          </Form.Item>
        </Form>
      ),
      cancelText: "Cancelar",
      okText: "Guardar",
      onOk() {
        const formData = new FormData();
        const formValues = form.getFieldsValue(); // Obtener los valores del formulario

        formData.append("titulo", formValues.titulo);
        formData.append("autor", formValues.autor);
        formData.append("fechaPublicacion", formValues.fechaPublicacion);
        formData.append("genero", formValues.genero);
        formData.append("precio", formValues.precio);
        formData.append("isbn", formValues.isbn);
        formData.append("ingreso", formValues.ingreso);
        formData.append("sinopsis", formValues.sinopsis);

        if (formValues.portada && formValues.portada.file) { // Verificar si 'portada' está definido y contiene un archivo
          formData.append("portada", formValues.portada.file); // Agregar la imagen al FormData
        }
        console.log(formData);

        fetch("http://localhost:3001/books", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            message.success(data.message);
          })
          .catch((error) => {
            message.error("Error al crear el libro");
          });
      },
      onCancel() {},
    });
  };

  return (
    <Content style={{ margin: "0 16px" }}>
      <Breadcrumb style={{ margin: "0 0 16px 0" }}>
        <Breadcrumb.Item>
          <UserOutlined /> {localStorage.getItem("username")}
        </Breadcrumb.Item>
        <Breadcrumb.Item> Libros </Breadcrumb.Item>
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
              onClick={showPromiseConfirm}
            >
              {" "}
              Añadir nuevo{" "}
            </Button>
          </Col>
          <Col span={6}>
            <Search placeholder="Buscar" onSearch={onSearch} enterButton />
          </Col>
        </Row>
        <ProductsTable />
      </div>
    </Content>
  );
};

export default Products;
