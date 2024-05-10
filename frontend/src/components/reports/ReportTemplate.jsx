import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ReportTemplate = ({ reportData }) => {
  const [pdfGenerated, setPdfGenerated] = useState(false);
  
  useEffect(() => {
    if (reportData.length > 0 && !pdfGenerated) {
      // Crear un nuevo documento PDF
      const doc = new jsPDF();

      // Definir el encabezado del PDF
      doc.setFontSize(20);
      doc.text("Informe semanal de ventas de libros", 105, 15, {
        align: "center",
      });

      // Agregar la imagen del logo centrada debajo del título
      const imgWidth = 40;
      const imgHeight = 40;
      const imgX = (doc.internal.pageSize.getWidth() - imgWidth) / 2;
      doc.addImage("/logo512.png", "PNG", imgX, 20, imgWidth, imgHeight);

      // Añadir espacio considerable
      doc.setFontSize(12);
      doc.text("", 10, 30);

      // Fecha del informe
      const fechaInforme = new Date().toLocaleDateString("es-ES");
      doc.text(`Fecha: ${fechaInforme}`, 10, 70);

      doc.setFontSize(16);
      doc.text("Sucursal:", 10, 80);
      doc.setFontSize(12);
      doc.text(
        `Durante la ${reportData[1][0].semana}, hemos observado un desempeño notable en las ventas de libros. Este informe detalla los aspectos clave de nuestras ventas, destacando los géneros más populares, los títulos más vendidos y otros datos relevantes para la toma de decisiones estratégicas.`,
        10,
        90,
        { maxWidth: 190 }
      );

      // Análisis de Ventas
      doc.setFontSize(16);
      doc.text("Análisis de Ventas:", 10, 120);
      doc.setFontSize(12);
      doc.text(
        `Durante esta semana, hemos vendido un total de ${reportData[1][0].total_libros_vendidos} libros en nuestra sucursal. Esta cifra puede atribuirse en gran medida a nuestras estrategias de marketing y promoción, así como a la diversificación de nuestro inventario para satisfacer las necesidades de una amplia gama de lectores.`,
        10,
        130,
        { maxWidth: 190 }
      );

      // Géneros más Populares
      doc.setFontSize(16);
      const posYGeneros = 160;
      doc.text("Géneros más Populares:", 10, posYGeneros);
      const generosData = reportData[2].map((item, index) => [
        index + 1,
        item.nombreGenero,
        item.ventas,
      ]);
      doc.autoTable({
        startY: posYGeneros + 10,
        head: [["#", "Género", "Ventas"]],
        body: generosData,
      });

      // Títulos Más Vendidos
      doc.setFontSize(16);
      const posYTitulos = doc.autoTable.previous.finalY + 20;
      doc.text("Títulos Más Vendidos:", 10, posYTitulos);
      const titulosData = reportData[0].map((item, index) => [
        index + 1,
        item.titulo,
        item.ventas,
      ]); // Debes definir cómo obtener estos datos de reportData
      doc.autoTable({
        startY: posYTitulos + 10,
        head: [["#", "Título", "Ventas"]],
        body: titulosData,
      });

      // Desafíos y oportunidades
      doc.setFontSize(16);
      const posYDesafios = doc.autoTable.previous.finalY + 20;
      doc.text("Desafíos y oportunidades:", 10, posYDesafios);
      doc.setFontSize(12);
      doc.text('A pesar del éxito general, hemos identificado algunos desafíos potenciales, como la competencia de tiendas en línea y los cambios en las preferencias de los consumidores. Sin embargo, también vemos oportunidades para expandir nuestro mercado objetivo mediante la introducción de programas de fidelización, eventos literarios y colaboraciones con autores locales.', 10, (posYDesafios + 10), { maxWidth: 190 });

      let now = new Date();
      let formattedNow =
      now.getFullYear().toString() +
      pad(now.getMonth() + 1) +
      pad(now.getDate()) +
      pad(now.getHours()) +
      pad(now.getMinutes()) +
      pad(now.getSeconds());

      // Guardar o mostrar el documento PDF
      doc.save("Reporte_"+formattedNow+".pdf"); // Para guardar el PDF
    }
  }, [reportData]);

  function pad(number) {
    if (number < 10) {
      return "0" + number;
    }
    return number;
  }

  return (
    <div>
      {/* Este div está aquí para evitar un error de "Rendered more hooks than during the previous render" */}
    </div>
  );
};

export default ReportTemplate;
