import React, { useState, useEffect } from "react";
import { UserOutlined, PrinterOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Form,
  Input,
  Button,
  Select,
  Layout,
  Typography,
  Divider,
  Row,
  Col,
  Table,
  theme,
  InputNumber,
  Checkbox,
} from "antd";

const Bills = () => {
  const { Content } = Layout;
  const [books, setBooks] = useState([]);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const [selectedBooks, setSelectedBooks] = useState([]);
  const { Title } = Typography;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    fetch("http://localhost:3001/bills/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        if (data.length > 0) {
          form.setFieldsValue({ libro: data[0].value });
        }
      })
      .catch((error) => {
        console.error("Error al cargar los libros: ", error);
      });
  }, [form]);

  const handleAddBook = () => {
    form.validateFields().then((values) => {
      const selectedBook = books.find((book) => book.value === values.libro);
      const subtotal = (values.cantidad * values.precioUnitario).toFixed(2);
      const descuento = 0;
      const total = subtotal - descuento;
      const newBook = {
        ...selectedBook,
        cantidad: values.cantidad,
        precioUnitario: values.precioUnitario,
        subtotal,
        descuento,
        total,
      };
      setSelectedBooks([...selectedBooks, newBook]);

      // Resetear los valores del formulario
      form.setFieldsValue({
        libro: books[0]?.value,
        cantidad: 1,
        precioUnitario: undefined,
      });
    });
  };

  const getTotalAmount = () => {
    return selectedBooks.reduce((acc, book) => acc + book.total, 0);
  };

  const totalAmount = getTotalAmount();

  const totalRow = {
    label: "Total:",
    total: `$${totalAmount.toFixed(2)}`,
    key: "total",
  };

  const columns = [
    {
      title: "Libro",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
    },
    {
      title: "Precio Unitario",
      dataIndex: "precioUnitario",
      key: "precioUnitario",
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
    },
    {
      title: "Descuento",
      dataIndex: "descuento",
      key: "descuento",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];

  const columnsWithTotal = [...columns, totalRow];

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
          paddingTop: 3,
          minHeight: "86vh",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Title level={3} style={{ marginBottom: "25px" }}>
          Datos de libro
        </Title>
        <Form
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Libro:" name="libro">
                <Select
                  onChange={handleChange}
                  options={books.map((book) => ({
                    value: book.value,
                    label: book.label + " - " + book.autor,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Cantidad" name="cantidad">
                <InputNumber min={1} max={100} defaultValue={1} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Precio unitario:" name="precioUnitario">
                <Input prefix={"$"} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Descuento:" name="descuento">
                <Input prefix={"$"} />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" onClick={handleAddBook}>
            Añadir libro
          </Button>

          <Divider />

          <Title level={3} style={{ marginBottom: "25px" }}>
            Datos de cliente
          </Title>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Nombre" name="nombre">
                <Input placeholder="Nombre de cliente" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Apellido" name="apellido">
                <Input placeholder="Apellido de cliente" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Método de pago:" name="metodoPago">
                <Checkbox checked={true}>Efectivo</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Table
            columns={columnsWithTotal}
            dataSource={selectedBooks.concat(totalRow)}
          />
          <br />
          <Button type="primary">
            <PrinterOutlined /> Generar factura
          </Button>
        </Form>
      </div>
    </Content>
  );
};

export default Bills;
