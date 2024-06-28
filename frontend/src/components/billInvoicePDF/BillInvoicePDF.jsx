import jsPDF from "jspdf";
import "jspdf-autotable";
import { PrinterOutlined } from "@ant-design/icons";
import { Button } from "antd";

const BillInvoicePDF = ({
  data,
  selectedBooks,
  totalSubTotal,
  totalDiscount,
  handleSaveBill
}) => {
  const generatePDF = () => {
    handleSaveBill();
    const doc = new jsPDF();

    // Añadir logo y título
    const logo = new Image();
    logo.src = "logo192.png";
    doc.addImage(
      logo,
      "PNG",
      doc.internal.pageSize.getWidth() - 52,
      12,
      50,
      27
    );
    doc.setTextColor("#001529");
    doc.setFontSize(32);
    doc.text("FACTURA", 15, 30);
    doc.setFont("Helvetica", "bold");

    // Añadir detalles de cliente
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

    // Añadir línea arriba de la tabla
    doc.setLineWidth(0.2);
    doc.setDrawColor("#001529");
    doc.line(15, 80, doc.internal.pageSize.getWidth() - 15, 80);

    // Añadir tabla
    const tableData = [];
    const totalPagar = selectedBooks.reduce(
      (acumuladorTotal, book) => acumuladorTotal + parseFloat(book.total),
      0
    );

    selectedBooks.forEach((book) => {
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

    // Añadir línea abajo de la tabla
    doc.setLineWidth(0.2);
    doc.setDrawColor("#001529");
    doc.line(
      15,
      doc.autoTable.previous.finalY + 5,
      doc.internal.pageSize.getWidth() - 15,
      doc.autoTable.previous.finalY + 5
    );

    // Añadir método de pago usado
    doc.text("Método de pago", 15, doc.autoTable.previous.finalY + 15);
    doc.setFont("Helvetica");
    doc.text("Efectivo", 15, doc.autoTable.previous.finalY + 20);

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

    const now = new Date();
    const formattedNow = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
      now.getDate()
    )}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

    doc.save(formattedNow + ".pdf");
  };

  const pad = (number) => (number < 10 ? `0${number}` : number.toString());

  return (
    <Button type="primary" onClick={generatePDF}>
      <PrinterOutlined /> Generar Factura
    </Button>
  );
};

export default BillInvoicePDF;