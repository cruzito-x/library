import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ReportTemplate = ({ reportData, period }) => {
  const [pdfGenerated, setPdfGenerated] = useState(false);

  useEffect(() => {
    if (reportData.length > 0 && !pdfGenerated) {
      // Crear un nuevo documento PDF
      const doc = new jsPDF();

      // Definir el encabezado del PDF
      doc.setFontSize(20);
      doc.text(`${
        period == 14 ? "Informe de ventas de los últimos 14 días" : period == 6 ? "Informe de ventas de los últimos 7 días" : period == 30 ? "Informe de ventas mensual" : period == 180 ? "Informe de ventas de los últimos 6 meses" : period == 365 ? "Informe de ventas anual" : ""}`, 105, 15, {
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
      doc.text("Resumen empresarial:", 10, 80);
      doc.setFontSize(12);
      doc.text(`${ period == 14 ? "Durante las" : (period == 6 ? "Durante la" : (period == 30 ? "Durante el" : (period == 180 ? "Durante los meses" : (period == 365 ? "Durante el año" : ""))))} ${ (period == 14 || period == 6) ? reportData[1][0].week : (period == 30 ? reportData[1][0].month : (period == 180 ? reportData[1][0].semester : (period == 365 ? reportData[1][0].year : "")))}, hemos observado un desempeño notable en las ventas de libros. Se ha registrado un ${ reportData[5][0].porcentaje_incremento_decremento === ("incremento del [incremento infinito]%" || "decremento del [incremento infinito]%") ? "0% de incremento o decremento" : reportData[5][0].porcentaje_incremento_decremento } en comparación a ${ period == 14 ? "las 2 semanas anteriores" : (period == 6 ? "la semana pasada" : (period == 30 ? "el mes pasado" : (period == 180 ? "los últimos 6 meses" : (period == 365 ? "el último año" : "")))) }, lo que indica una tendencia ${ reportData[5][0].ventas_hoy < (reportData[5][0].ventas_hace_7_dias || reportData[5][0].ventas_hace_14_dias || reportData[5][0].ventas_hace_1_mes || reportData[5][0].ventas_hace_6_meses || reportData[5][0].ventas_hace_1_año) ? "negativa" : "positiva" } en el mercado de libros. Este informe detalla los aspectos clave de nuestras ventas, destacando los géneros más populares, los títulos más vendidos y otros datos relevantes para la toma de decisiones estratégicas.`,
        10,
        90,
        { maxWidth: 190 }
      );

      // Análisis de Ventas
      doc.setFontSize(16);
      doc.text("Análisis de ventas:", 10, 120);
      doc.setFontSize(12);
      doc.text(
        `${ period == 14 ? "Durante estas últimas 2 semanas" : (period == 6 ? "Durante esta semana" :  (period == 30 ? "Durante este mes" :  (period == 180 ? "Durante estos últimos 6 meses" : (period == 365 ? "Durante este último año" : "")))) }, hemos vendido un total de ${reportData[1][0].total_libros_vendidos} libros en nuestra sucursal, obteniendo así una ganancia de $${reportData[3][0].total_ganancias} dólares. Estas cifras pueden atribuirse en gran medida a nuestras estrategias de marketing y promoción, así como a la diversificación de nuestro inventario para satisfacer las necesidades de una amplia gama de lectores.`,
        10,
        130,
        { maxWidth: 190 }
      );

      // Géneros más Populares
      doc.setFontSize(16);
      const posYGeneros = 160;
      doc.text("Géneros más populares:", 10, posYGeneros);
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

      // Libros Más Vendidos
      doc.setFontSize(16);
      const posYTitulos = doc.autoTable.previous.finalY + 20;
      doc.text("Títulos más vendidos:", 10, posYTitulos);
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

      // Títulos Más Vendidos
      doc.setFontSize(16);
      const posYRecientes = doc.autoTable.previous.finalY + 20;
      doc.text(`Títulos añadidos en los últimos ${(period == 6 ? "7" : period)} días:`, 10, posYRecientes);
      doc.setFontSize(12);
      if (reportData[4].length > 15) {
        doc.text(
          `${ period == 14 ? "En estas últimas 2 semanas" : (period == 6 ? "En esta semana" : (period == 30 ? "En este mes" : (period == 180 ? "En estos últimos 6 meses" : (period == 365 ? "En este último año" : "")))) } se adjuntaron múltiples registros nuevos a la base de datos, adyacente a esto, se presentan las últimas adiciones:`,
          10,
          posYRecientes + 10,
          { maxWidth: 190 }
        );
      } else {
        doc.text(
          `${ period == 14 ? "En estas últimas 2 semanas" : (period == 6 ? "En esta semana" : (period == 30 ? "En este mes" : (period == 180 ? "En estos últimos 6 meses" : (period == 365 ? "En este último año" : "")))) } no se adquirio mucha mercadería, por lo cual no se añadieron muchos registros nuevos a la base de datos, adyacente a esto, se presentan las últimas adiciones`,
          10,
          posYRecientes + 10,
          { maxWidth: 190 }
        );
      }

      const recientesData = reportData[4].map((item, index) => [
        index + 1,
        item.titulo,
        item.precio,
      ]); // Debes definir cómo obtener estos datos de reportData
      doc.autoTable({
        startY: posYRecientes + 20,
        head: [["#", "Título", "Precio"]],
        body: recientesData,
      });

      // Desafíos y oportunidades
      doc.setFontSize(16);
      const posYDesafios = doc.autoTable.previous.finalY + 20;
      doc.text("Desafíos y oportunidades:", 10, posYDesafios);
      doc.setFontSize(12);
      doc.text(
        "A pesar del éxito general, siempre identificando algunos desafíos potenciales, como la competencia de tiendas en línea y los cambios en las preferencias de los consumidores, vemos a su vez oportunidades para expandir nuestro mercado objetivo mediante la introducción de programas de fidelización, eventos literarios y colaboraciones con autores locales.",
        10,
        posYDesafios + 10,
        { maxWidth: 190 }
      );

      let now = new Date();
      let formattedNow =
        now.getFullYear().toString() +
        pad(now.getMonth() + 1) +
        pad(now.getDate()) +
        pad(now.getHours()) +
        pad(now.getMinutes()) +
        pad(now.getSeconds());

      window.location.href = "/dashboard";

      let pageCount = doc.internal.getNumberOfPages(); //Total Page Number
      for (let n = 0; n < pageCount; n++) {
        doc.setPage(n);
        let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; //Current Page
        doc.setFontSize(8);
        doc.text(
          "Página: " + pageCurrent + " de " + pageCount,
          10,
          doc.internal.pageSize.height - 10
        );
      }

      // Guardar o mostrar el documento PDF
      doc.save("Reporte_" + formattedNow + ".pdf"); // Para guardar el PDF
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
