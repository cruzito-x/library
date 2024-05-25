import React, { useState, useEffect } from "react";
import { UserOutlined, PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
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
  InputNumber,
  Popconfirm,
  Empty,
  theme,
  message
} from "antd";
import BillInvoicePDF from "../../components/billInvoicePDF/BillInvoicePDF";

const Bills = () => {
  const { Content } = Layout;
  const [books, setBooks] = useState([]);
  const [form] = Form.useForm();
  const [selectedBooks, setSelectedBooks] = useState([]);
  const { Title } = Typography;
  const [precioUnitario, setPrecioUnitario] = useState(0);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    fetch("http://localhost:3001/bills/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        if (data.length > 0) {
          form.setFieldsValue({
            libro: data[0].value,
            precioUnitario: data[0].precio,
            cantidad: 1,
          });
          setPrecioUnitario(data[0].precio);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [form]);

  const handleChange = (value) => {
    const selectedBook = books.find((book) => book.value === value);
    form.setFieldsValue({ precioUnitario: selectedBook.precio });
    setPrecioUnitario(selectedBook.precio);
  };

  const handleSaveBill = () => {
    const { nombre, apellido } = form.getFieldsValue(["nombre", "apellido"]);
    let idUsuario = localStorage.getItem("idUsuario");

    if (selectedBooks.length === 0 || !nombre || !apellido) {
      message.warning("Por favor, complete los campos requeridos.");
      return;
    }

    const request = {
      selectedBooks,
      nombre,
      apellido,
      idUsuario,
    };

    fetch("http://localhost:3001/bills/save", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .then((data) => {
        message.success(data.message);
        setSelectedBooks([]);
        form.setFieldsValue({ nombre: "", apellido: "" });
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const handleAddBook = () => {
    const formValues = form.getFieldsValue();
    if (!formValues.nombre || !formValues.apellido) {
      message.warning("Por favor, complete los campos requeridos");
      return;
    }

    form.validateFields().then((values) => {
      const selectedBook = books.find((book) => book.value === values.libro);

      if (selectedBook.existencia < values.cantidad) {
        message.warning(
          `Sólo hay ${selectedBook.existencia} libros disponibles.`
        );
        return;
      }

      const existingBook = selectedBooks.find(
        (book) => book.value === values.libro
      );

      if (existingBook) {
        message.warning("El libro ya está en la lista.");
        return;
      }

      const subtotal = (values.cantidad * values.precioUnitario).toFixed(2);
      const descuento =
        values.descuento > 0 && values.descuento < 10
          ? (subtotal * ("0.0" + values.descuento)).toFixed(2)
          : values.descuento > 9 && values.descuento < 90
          ? (subtotal * ("0." + values.descuento)).toFixed(2)
          : 0;
      const total = (subtotal - descuento).toFixed(2);

      const newBook = {
        ...selectedBook,
        cantidad: values.cantidad,
        precioUnitario: values.precioUnitario,
        subtotal,
        descuento,
        total,
      };
      setSelectedBooks([...selectedBooks, newBook]);

      form.setFieldsValue({
        libro: books[0]?.value,
        cantidad: 1,
        precioUnitario: books[0]?.precio,
        descuento: 0,
      });
    });
  };

  const handleIncreaseBook = (value) => {
    const updatedBooks = selectedBooks.map((book) => {
      if (book.value === value) {
        const newCantidad = book.cantidad + 1;
        const selectedBook = books.find((b) => b.value === value);
        if (newCantidad > selectedBook.existencia) {
          message.warning(
            `Sólo hay ${selectedBook.existencia} libros disponibles.`
          );
          return book;
        }
        if (newCantidad > 10) {
          message.warning("No se pueden añadir más de 10 unidades.");
          return book;
        }
        const newSubtotal = (newCantidad * book.precioUnitario).toFixed(2);
        const newDescuento = book.descuento;
        const newTotal = (newSubtotal - newDescuento).toFixed(2);
        return {
          ...book,
          cantidad: newCantidad,
          subtotal: newSubtotal,
          total: newTotal,
        };
      }
      return book;
    });
    setSelectedBooks(updatedBooks);
  };

  const handleReduceBook = (value) => {
    const updatedBooks = selectedBooks
      .map((book) => {
        if (book.value === value) {
          const newCantidad = book.cantidad - 1;
          if (newCantidad < 1) {
            return null;
          }
          const newSubtotal = (newCantidad * book.precioUnitario).toFixed(2);
          const newDescuento = book.descuento;
          const newTotal = (newSubtotal - newDescuento).toFixed(2);
          return {
            ...book,
            cantidad: newCantidad,
            subtotal: newSubtotal,
            total: newTotal,
          };
        }
        return book;
      })
      .filter((book) => book !== null);
    setSelectedBooks(updatedBooks);
  };

  const handleRemoveBook = (value) => {
    const updatedBooks = selectedBooks.filter((book) => book.value !== value);
    setSelectedBooks(updatedBooks);
  };

  const getTotalSubTotal = () => {
    return selectedBooks
      .reduce(
        (acumuladorTotal, book) =>
          acumuladorTotal + book.cantidad * book.precioUnitario,
        0
      )
      .toFixed(2);
  };

  const getTotalAmount = () => {
    return selectedBooks
      .reduce(
        (acumuladorTotal, book) => acumuladorTotal + parseFloat(book.total),
        0
      )
      .toFixed(2);
  };

  const getTotalDiscount = () => {
    return selectedBooks
      .reduce(
        (totalDiscount, book) => totalDiscount + parseFloat(book.descuento),
        0
      )
      .toFixed(2);
  };

  const totalSubTotal = getTotalSubTotal();
  const totalDiscount = getTotalDiscount();
  const totalAmount = getTotalAmount();

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
      render: (precioUnitario) => `$${Number(precioUnitario).toFixed(2)}`,
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
      render: (subtotal) => `$${Number(subtotal).toFixed(2)}`,
    },
    {
      title: "Descuento",
      dataIndex: "descuento",
      key: "descuento",
      render: (descuento) => `$${Number(descuento).toFixed(2)}`,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total) => `$${Number(total).toFixed(2)}`,
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleIncreaseBook(record.value)}
          >
            <PlusOutlined />
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleReduceBook(record.value)}
            style={{marginRight: "10px", marginLeft: "10px", backgroundColor: "#fbac14"}}
          >
            <MinusOutlined />
          </Button>
          <Popconfirm
            title="Eliminar registro"
            description="¿Está seguro de eliminar este registro?"
            onConfirm={() => handleRemoveBook(record.value)}
            onCancel={() => {}}
            okText="Sí"
            cancelText="No"
          >
            <Button
            type="primary"
            danger
            >
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Content style={{ margin: "0 16px" }}>
      <Breadcrumb style={{ margin: "50px 0 16px 0" }}>
        <Breadcrumb.Item>
          <UserOutlined /> {localStorage.getItem("username")}
        </Breadcrumb.Item>
        <Breadcrumb.Item>Facturar</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: '86vh',
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Title level={3}>Registrar venta</Title>
        <Form layout="vertical" form={form}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Libros"
                name="libro"
                rules={[{ required: true, message: "Por favor seleccione un libro" }]}
              >
                <Select options={books} onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Cantidad"
                name="cantidad"
                rules={[{ required: true, message: "Por favor introduzca la cantidad" }]}
              >
                <InputNumber
                  min={1}
                  max={10}
                  placeholder="Introduzca una cantidad entre 1 y 10"
                  defaultValue={1}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Nombre"
                name="nombre"
                rules={[{ required: true, message: "Por favor introduzca el nombre" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Nombre" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Precio Unitario" name="precioUnitario">
                <Input
                  prefix="$"
                  disabled
                  style={{ backgroundColor: "#f5f5f5", color: "black" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Descuento (%)"
                name="descuento"
                initialValue={0}
                rules={[{ type: "number", min: 0, max: 90, message: "Introduzca un descuento válido (0-90)" }]}
              >
                <InputNumber
                  min={0}
                  max={90}
                  defaultValue={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Apellido"
                name="apellido"
                rules={[{ required: true, message: "Por favor introduzca el apellido" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Apellido" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item>
                <Button
                  type="primary"
                  onClick={handleAddBook}
                  style={{ marginTop: "29px", width: "100%" }}
                >
                  Agregar Libro
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Divider />
        <Table
          dataSource={selectedBooks}
          columns={columns}
          pagination={false}
          scroll={{ x: "max-content" }}
          summary={() => {
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Total a pagar</Table.Summary.Cell>
                <Table.Summary.Cell index={1} />
                <Table.Summary.Cell index={2} />
                <Table.Summary.Cell index={3}>
                  ${totalSubTotal}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  ${totalDiscount}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5}>
                  ${totalAmount}
                </Table.Summary.Cell>
              </Table.Summary.Row>
            );
          }}
          locale={{
            emptyText: <Empty description="No hay datos para facturar" />
          }}
        />
        <Divider />
        <BillInvoicePDF
          data={form.getFieldsValue(["nombre", "apellido"])}
          selectedBooks={selectedBooks}
          totalSubTotal={totalSubTotal}
          totalDiscount={totalDiscount}
        />
      </div>
    </Content>
  );
};

export default Bills;