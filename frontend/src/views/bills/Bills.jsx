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
  InputNumber,
  Checkbox,
  theme,
  message,
} from "antd";
import jsPDF from "jspdf";
import 'jspdf-autotable';

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
          form.setFieldsValue({
            libro: data[0].value,
            precioUnitario: data[0].precio,
            cantidad: 1,
          });
        }
      })
      .catch((error) => {
        console.error("Error al cargar los libros: ", error);
      });
  }, [form]);

  const handleSaveBill = () => {
    const { nombre, apellido } = form.getFieldsValue(["nombre", "apellido"]);
    const request = {
      selectedBooks,
      nombre,
      apellido,
    };

    fetch("http://localhost:3001/bills/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .then((data) => {
        message.success(data.message);
        generatePDF(request, selectedBooks);
        setSelectedBooks([]);
        form.setFieldsValue({ nombre: "", apellido: "" });
      })
      .catch((error) => {
        message.error("Error al guardar la factura");
        console.error("Error al guardar la factura: ", error.message);
      });
  };

  const handleBookSelect = (value, option) => {
    const selectedBook = books.find((book) => book.value === value);
    form.setFieldsValue({ precioUnitario: selectedBook.precio });
  };

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
        precioUnitario: books[0]?.precio,
      });
    });
  };

  const getTotalAmount = () => {
    return selectedBooks.reduce((acumuladorTotal, book) => acumuladorTotal + book.total, 0);
  };

  const totalAmount = getTotalAmount();

  const generatePDF = (data, selectedBooks) => {
    // Crear un nuevo documento PDF
    const doc = new jsPDF();

    // Agregar el logo y el título "Factura"
    const logo = new Image();
    logo.src = "logo512.png";
    doc.addImage(logo, "PNG", 10, 10, 40, 40);
    doc.setFontSize(16);
    doc.text("Factura", 60, 30);

    // Agregar detalles del cliente
    doc.setFontSize(12);
    doc.text(`Cliente: ${data.nombre+' '+data.apellido}`, 10, 60);
    doc.text(`Facturado por: ${localStorage.getItem('username')}`, 10, 70);

    // Agregar la tabla
    const tableData = [];
    let totalPagar = 0;
    selectedBooks.forEach((book, index) => {
      console.log(book);
      const rowData = [
        book.label,
        book.cantidad,
        "$"+book.precio,
        "$"+book.subtotal,
        "$"+book.descuento,
        "$"+book.total,
      ];
      tableData.push(rowData);
      totalPagar += book.total;
    });
    doc.autoTable({
      head: [
        [
          "Nombre libro",
          "Cantidad",
          "Precio unitario",
          "Subtotal",
          "Descuento",
          "Total",
        ],
      ],
      body: tableData,
      startY: 80
    });

    // Agregar fila de Total a pagar
    const totalRow = [
      { content: "Total", colSpan: 5 }, // ColSpan para ocupar las primeras 5 columnas
      "", // Celdas vacías para las columnas intermedias
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "", // Quinta columna vacía para compensar el ColSpan
      { content: `$${totalPagar}`, colSpan: 2, styles: { cellWidth: "auto" } }, // ColSpan para ocupar las últimas 2 columnas
    ];
    doc.autoTable({
      body: [totalRow],
      startY: doc.autoTable.previous.finalY
    });

    // Agregar footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let n = 1; n <= pageCount; n++) {
      doc.setPage(n);
      doc.text("Gracias por preferirnos", 40, 280, "center");
    }

    var currentDate = new Date();
    var formattedDate = currentDate.getFullYear().toString() + 
    addZero(currentDate.getMonth() + 1) +
    addZero(currentDate.getDate()) + 
    addZero(currentDate.getHours()) +
    addZero(currentDate.getMinutes()) +
    addZero(currentDate.getSeconds());
    
    function addZero(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }
    
    doc.save(formattedDate + ".pdf");
  };
  
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
      <Breadcrumb style={{ margin: "50px 0 16px 0" }}>
        <Breadcrumb.Item>
          <UserOutlined /> {localStorage.getItem("username")}
        </Breadcrumb.Item>
        <Breadcrumb.Item> Facturar </Breadcrumb.Item>
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
                  onSelect={handleBookSelect}
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
                <Input prefix={"$"} disabled defaultValue={books.precio} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Descuento:" name="descuento">
                <Input prefix={"$"} placeholder="0.00" />
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
          <Button type="primary" onClick={handleSaveBill}>
            <PrinterOutlined /> Generar factura
          </Button>
        </Form>
      </div>
    </Content>
  );
};

export default Bills;
