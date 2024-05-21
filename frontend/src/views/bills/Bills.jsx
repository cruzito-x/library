import React, { useState, useEffect } from "react";
import { UserOutlined, MinusOutlined, PrinterOutlined } from "@ant-design/icons";
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
    const formValues = form.getFieldsValue(); // Obtener los valores del formulario
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

      const subtotal = (values.cantidad * values.precioUnitario).toFixed(2);
      const descuento =
        values.descuento > 0 && values.descuento < 10
          ? (subtotal * ("0.0" + values.descuento)).toFixed(2)
          : values.descuento > 9 && values.descuento < 90
          ? (subtotal * ("0." + values.descuento)).toFixed(2)
          : 0;
      const total = (subtotal - descuento).toFixed(2);

      const existingBook = selectedBooks.find(
        (book) => book.value === values.libro
      );

      if (existingBook) {
        const updatedBooks = selectedBooks.map((book) => {
          if (book.value === values.libro) {
            const newCantidad = book.cantidad + values.cantidad;
            if (newCantidad > selectedBook.existencia) {
              message.warning(
                `Sólo hay ${selectedBook.existencia} libros disponibles.`
              );
              return book;
            }
            const newSubtotal = (newCantidad * book.precioUnitario).toFixed(2);
            const newDescuento =
              values.descuento > 0 && values.descuento < 10
                ? (newSubtotal * ("0.0" + values.descuento)).toFixed(2)
                : values.descuento > 9 && values.descuento < 90
                ? (newSubtotal * ("0." + values.descuento)).toFixed(2)
                : 0;
            const newTotal = (newSubtotal - newDescuento).toFixed(2);
            return {
              ...book,
              cantidad: newCantidad,
              subtotal: newSubtotal,
              descuento: newDescuento,
              total: newTotal,
            };
          }
          return book;
        });
        setSelectedBooks(updatedBooks);
      } else {
        const newBook = {
          ...selectedBook,
          cantidad: values.cantidad,
          precioUnitario: values.precioUnitario,
          subtotal,
          descuento,
          total,
        };
        setSelectedBooks([...selectedBooks, newBook]);
      }

      form.setFieldsValue({
        libro: books[0]?.value,
        cantidad: 1,
        precioUnitario: books[0]?.precio,
        descuento: 0,
      });
    });
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
    const totalPagar = selectedBooks.reduce(
      (acumuladorTotal, book) => acumuladorTotal + parseFloat(book.total),
      0
    );
    const totalPagarNumber = parseFloat(totalPagar);

    selectedBooks.forEach((book, index) => {
      const rowData = [
        { content: book.label, styles: { halign: "left" } },
        { content: `$${book.precio}`, styles: { halign: "center" } },
        { content: book.cantidad, styles: { halign: "center" } },
        { content: `$${book.total}`, styles: { halign: "center" } },
      ];
      tableData.push(rowData);
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
      `$${totalPagarNumber.toFixed(2)}`,
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
        <Button type="primary" danger onClick={() => handleReduceBook(record.value)}> <MinusOutlined /> </Button>
      ),
    },
  ];

  return (
    <Content style={{ margin: "0 16px" }}>
      <Breadcrumb style={{ margin: "50px 0 16px 0" }}>
        <Breadcrumb.Item><UserOutlined/> {localStorage.getItem("username")}</Breadcrumb.Item>
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
        <Title level={3}>Registrar Venta</Title>
        <Form layout="vertical" form={form}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: "Por favor ingrese el nombre" }]}>
                <Input prefix={<UserOutlined />} placeholder="Nombre" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Apellido" name="apellido" rules={[{ required: true, message: "Por favor ingrese el apellido" }]}>
                <Input prefix={<UserOutlined />} placeholder="Apellido" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Libros" name="libro" rules={[{ required: true, message: "Por favor seleccione un libro" }]}>
                <Select options={books} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Cantidad" name="cantidad" rules={[{ required: true, message: "Por favor ingrese la cantidad" }]}>
                <InputNumber min={1} defaultValue={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Precio Unitario" name="precioUnitario">
                <Input prefix="$" disabled style={{ backgroundColor: "#f5f5f5", color: "black" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Descuento (%)" name="descuento" initialValue={0} rules={[{ type: "number", min: 0, max: 90, message: "Ingrese un descuento válido (0-90)" }]}>
                <InputNumber min={0} max={90} defaultValue={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item>
                <Checkbox name="sinDescuento">Sin descuento</Checkbox>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item>
                <Button type="primary" onClick={handleAddBook} style={{ marginTop: "29px", width: "100%" }}>
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
                <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
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
        />
        <Divider />
        <Button type="primary" onClick={handleSaveBill}>
          <PrinterOutlined/> Generar Factura
        </Button>
      </div>
    </Content>
  );
};

export default Bills;