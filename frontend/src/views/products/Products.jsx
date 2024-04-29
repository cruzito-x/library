import React, { useState } from "react";
import { PlusCircleOutlined, PlusCircleFilled, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, Layout, Input, InputNumber, Tag, Button, Modal, Form, Row, Col, theme } from "antd";
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
  const [formLayout, setFormLayout] = useState('horizontal');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const showPromiseConfirm = () => {
    confirm({
      width: "35%",
      title: "Añadir libro",
      icon: <PlusCircleFilled />,
      content: (
        <Form
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
        >
          <Form.Item label="Libro:">
            <Input placeholder="ej. Jícaras tristes" />
          </Form.Item>
          <Form.Item label="Autor:">
            <Input placeholder="ej. Alfredo Espino" />
          </Form.Item>
          <Form.Item label="F. Publicación:">
            <Input placeholder="23-07-2016" />
          </Form.Item>
          <Form.Item label="Precio:">
            <Input prefix="$" placeholder="0.00" />
          </Form.Item>
          <Form.Item label="Género:">
            <Input placeholder="ej. Horror, Fantasía, Romance, etc." />
          </Form.Item>
          <Form.Item label="Ingreso:">
            <InputNumber min={1} max={100} defaultValue={1}/>
          </Form.Item>
          <Form.Item label="Descripción:">
            <TextArea rows={6} placeholder="Descripción del libro" showCount  maxLength={255} style={{ height: 120, resize: 'none' }}/>
          </Form.Item>
          <br />
          <Form.Item label="Portada:">
            <Uploader />
          </Form.Item>
          <Form.Item label="Registrado el:" style={{ display: 'none' }}>
            <Input value={ new Date().getDate()+'/'+(new Date().getMonth() + 1)+'/'+new Date().getFullYear() } disabled/>
          </Form.Item>
        </Form>
      ),
      cancelText: "Cancelar",
      okText: "Guardar",
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log("¡Oops, ocurrió un error!"));
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
          borderRadius: borderRadiusLG
        }}
      >
        <Row gutter={16}>
          <Col span={18}>
            <Button type="primary" icon={<PlusCircleOutlined />} size={size} onClick={showPromiseConfirm}> Añadir nuevo </Button>
          </Col>
          <Col span={6}>
            <Search
              placeholder="Buscar"
              onSearch={onSearch}
              enterButton
            />
          </Col>
        </Row>
        <ProductsTable />
      </div>
    </Content>
  );
};

export default Products;
