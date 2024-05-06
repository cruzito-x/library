const db = require("../config/db");
const crypto = require("crypto");

exports.getBooks = (req, res) => {
  db.query("select idLibro as value, titulo as label, autor, precio from libros where deleted_at is null;",
  (error, results) => {
    if (error) {
        console.error("Error al obtener los libros:", error);
        res.status(500).json({ message: "Error interno del servidor" });
        return;
      }
      res.status(200).json(results);
    }
  );
};

exports.saveBill = (req, res) => {
  const { selectedBooks, nombre, apellido } = req.body;

  const idVenta = crypto.createHash("md5").update(`${Date.now()}`).digest("hex"); // idVenta
  const idCliente = crypto.createHash("md5").update(`${Date.now()}`).digest("hex"); // idCliente
  const fecha = new Date().toISOString().slice(0, 10); // Formato: YYYY-MM-DD esta servirá para created_at de todos los registros
  const total = selectedBooks.reduce((acumuladorTotal, book) => acumuladorTotal + parseFloat(book.total), 0).toFixed(2);   // Calcular el total de la venta

  // Insertar cliente en la tabla clientes
  const insertCliente = "insert into clientes (idCliente, nombre, apellido, metodoPago, created_at) values (?, ?, ?, ?, curdate())";
  db.query(insertCliente, [idCliente, nombre, apellido, "efectivo"], (error, result) => {
    if (error) {
      console.error("Error al insertar cliente: ", error);
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }

    // Insertar venta en la tabla ventas
      const insertVenta = "insert into ventas (idVenta, fecha, total, estado, created_at) values (?, ?, ?, 'completado', curdate())";
    db.query(insertVenta, [idVenta, fecha, total], (error, result) => {
      if (error) {
        console.error("Error al insertar venta: ", error);
        res.status(500).json({ message: "Error interno del servidor" });
        return;
      }

      // Insertar detalles de venta en la tabla detalles_venta
      const valuesDetalleVenta = selectedBooks.map(book => [idVenta, idCliente, book.value, book.cantidad, book.precioUnitario, book.subtotal, book.descuento, fecha]);
      const insertDetalleVenta = "insert into detalles_venta (idVenta, idCliente, idLibro, cantidad, precioUnitario, subtotal, descuento, created_at) values ?";
      db.query(insertDetalleVenta, [valuesDetalleVenta], (error, result) => {
        if (error) {
          console.error("Error al insertar detalles de venta: ", error);
          res.status(500).json({ message: "Error interno del servidor" });
          return;
        }

        res.status(200).json({ message: "Factura guardada exitosamente" });
      });
    });
  });
};