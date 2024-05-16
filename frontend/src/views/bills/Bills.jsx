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
import "jspdf-autotable";

const Bills = () => {
  const { Content } = Layout;
  const [books, setBooks] = useState([]);
  const [form] = Form.useForm();
  const [selectedBooks, setSelectedBooks] = useState([]);
  const { Title } = Typography;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleChange = (value) => {};

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
        console.error(error.message);
      });
  }, [form]);

  const handleSaveBill = () => {
    const { nombre, apellido } = form.getFieldsValue(["nombre", "apellido"]);
    let idUsuario = localStorage.getItem("idUsuario");

    if (selectedBooks.length === 0 || !nombre || !apellido) {
      message.error("Por favor, complete los campos requeridos.");
      return;
    }

    const request = {
      selectedBooks,
      nombre,
      apellido,
      idUsuario
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
        generatePDF(request, selectedBooks);
        setSelectedBooks([]);
        form.setFieldsValue({ nombre: "", apellido: "" });
      })
      .catch((error) => {
        message.error(error.message);
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
      const descuento =
        values.descuento > 0 && values.descuento < 10
          ? (subtotal * ("0.0" + values.descuento)).toFixed(2)
          : values.descuento > 9 && values.descuento < 90
          ? (subtotal * ("0." + values.descuento)).toFixed(2)
          : 0;
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
        descuento: 0,
      });
    });
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
    return selectedBooks.reduce(
      (acumuladorTotal, book) => acumuladorTotal + book.total,
      0
    );
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

  const generatePDF = (data, selectedBooks) => {
    const doc = new jsPDF();

    // Agregar el logo y el título "Factura"
    const logo = new Image();
    logo.src = "logo512.png";
    doc.addImage(
      logo,
      "PNG",
      doc.internal.pageSize.getWidth() - 37,
      15,
      27,
      27
    );
    doc.setTextColor("#001529");
    doc.setFontSize(32);
    doc.text("FACTURA", 15, 30);
    doc.setFont("Helvetica", "bold");

    // Agregar detalles del cliente y factura
    doc.setFontSize(12);
    doc.text("Facturado por:", 15, 50);
    doc.setFont("Helvetica");
    doc.text(localStorage.getItem("username"), 15, 55);
    doc.text(`Cliente: ${data.nombre} ${data.apellido}`, 15, 65);
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
    doc.text("Fecha:", doc.internal.pageSize.getWidth() - 23, 50, {
      align: "right",
    });
    doc.setFont("Helvetica");
    doc.text(formattedDate, doc.internal.pageSize.getWidth() - 15, 55, {
      align: "right",
    });

    // Agregar una línea arriba de la tabla (10 unidades más arriba)
    doc.setLineWidth(0.2);
    doc.setDrawColor("#001529");
    doc.line(15, 80, doc.internal.pageSize.getWidth() - 15, 80);

    // Agregar la tabla centrada
    const tableData = [];
    let totalPagar = 0;

    selectedBooks.forEach((book, index) => {
      const rowData = [
        { content: book.label, styles: { halign: "left" } },
        { content: `$${book.precio}`, styles: { halign: "center" } },
        { content: book.cantidad, styles: { halign: "center" } },
        { content: `$${book.total}`, styles: { halign: "center" } },
      ];
      tableData.push(rowData);
      totalPagar += book.total;
    });
    doc.autoTable({
      head: [
        [
          { content: "Nombre libro", styles: { halign: "left" } },
          { content: "Precio", styles: { halign: "center" } },
          { content: "Cantidad", styles: { halign: "center" } },
          { content: "Total", styles: { halign: "center" } },
        ],
      ],
      body: tableData,
      startY: 85,
      theme: "plain",
      styles: {
        textColor: "#001529",
      },
    });

    // Agregar una línea abajo de la tabla
    doc.setLineWidth(0.2);
    doc.setDrawColor("#001529");
    doc.line(
      15,
      doc.autoTable.previous.finalY + 5,
      doc.internal.pageSize.getWidth() - 15,
      doc.autoTable.previous.finalY + 5
    );

    // Agregar Método de Pago (sin negrita/bold)
    doc.text("Método de pago", 15, doc.autoTable.previous.finalY + 15);
    doc.setFont("Helvetica");
    doc.text("Efectivo", 15, doc.autoTable.previous.finalY + 20);

    // Agregar Subtotal a la misma altura que Método de pago (sin negrita/bold)
    doc.text(
      "Subtotal:",
      doc.internal.pageSize.getWidth() - 75,
      doc.autoTable.previous.finalY + 15
    );
    doc.text(
      `$${totalSubTotal}`,
      doc.internal.pageSize.getWidth() - 15,
      doc.autoTable.previous.finalY + 15,
      { align: "right" }
    );

    // Agregar Descuento y Total
    doc.text(
      "Descuento:",
      doc.internal.pageSize.getWidth() - 75,
      doc.autoTable.previous.finalY + 20
    );
    doc.text(
      `$${totalDiscount}`,
      doc.internal.pageSize.getWidth() - 15,
      doc.autoTable.previous.finalY + 20,
      { align: "right" }
    );
    doc.text(
      "Total:",
      doc.internal.pageSize.getWidth() - 75,
      doc.autoTable.previous.finalY + 25
    );
    doc.text(
      `$${totalPagar.toFixed(2)}`,
      doc.internal.pageSize.getWidth() - 15,
      doc.autoTable.previous.finalY + 25,
      { align: "right" }
    );

    let now = new Date();
    let formattedNow =
      now.getFullYear().toString() +
      pad(now.getMonth() + 1) +
      pad(now.getDate()) +
      pad(now.getHours()) +
      pad(now.getMinutes()) +
      pad(now.getSeconds());

    // Guardar el PDF
    doc.save(formattedNow + ".pdf");
  };

  function pad(number) {
    if (number < 10) {
      return "0" + number;
    }
    return number;
  }

  const totalRow = [
    {
      label: "Total a pagar:",
      total: `${totalAmount.toFixed(2)}`,
      key: "totalPagar",
    },
  ];

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
      render(text) {
        return `${text !== undefined ? "$" + text : ""}`;
      },
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
      render(text) {
        return `${text !== undefined ? "$" + text : ""}`;
      },
    },
    {
      title: "Descuento",
      dataIndex: "descuento",
      key: "descuento",
      render(text) {
        return `${text !== undefined ? "$" + text : ""}`;
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render(text) {
        return `${text !== undefined ? "$" + text : ""}`;
      },
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
        <Form form={form}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
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
            <Col xs={24} sm={12}>
              <Form.Item label="Cantidad" name="cantidad">
                <InputNumber
                  min={1}
                  max={10}
                  defaultValue={1}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Precio unitario:" name="precioUnitario">
                <Input prefix={"$"} disabled defaultValue={books.precio} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Descuento:" name="descuento">
                <InputNumber
                  prefix={"%"}
                  min={0}
                  max={90}
                  defaultValue={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button type="primary" onClick={handleAddBook}>
                Añadir libro
              </Button>
            </Col>
          </Row>
        </Form>
        <Divider />
        <Title level={3} style={{ marginBottom: "25px" }}>
          Datos de cliente
        </Title>
        <Form form={form}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item label="Nombre" name="nombre">
                <Input placeholder="Nombre de cliente" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Apellido" name="apellido">
                <Input placeholder="Apellido de cliente" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24}>
              <Form.Item label="Método de pago:" name="metodoPago">
                <Checkbox checked={true}>Efectivo</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table
          scroll={{ x: "max-content" }}
          columns={columnsWithTotal}
          dataSource={selectedBooks.concat(totalRow)}
          pagination={false}
        />
        <br />
        <Button type="primary" onClick={handleSaveBill}>
          <PrinterOutlined /> Generar factura
        </Button>
      </div>
    </Content>
  );
};

export default Bills;
