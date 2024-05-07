const db = require("../config/db");
const crypto = require("crypto");

exports.getBooks = (req, res) => {
  db.query("select l.idLibro as value, l.titulo as label, l.autor, l.precio from libros l inner join existencias e on e.idLibro = l.idLibro where l.deleted_at is null and e.existencia > 0;",
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

  const idVenta = crypto.createHash("md5").update(`${Date.now()}`).digest("hex");
  const idCliente = crypto.createHash("md5").update(`${Date.now()}`).digest("hex");
  const total = selectedBooks.reduce((acumuladorTotal, book) => acumuladorTotal + parseFloat(book.total), 0).toFixed(2);

  // Begin transaction
  db.beginTransaction(err => {
    if (err) {
      console.error('Error starting transaction: ', err);
      res.status(500).json({ message: 'Error interno del servidor' });
      return;
    }

    const insertCliente = "INSERT INTO clientes (idCliente, nombre, apellido, metodoPago, created_at) VALUES (?, ?, ?, ?, CURDATE())";
    db.query(insertCliente, [idCliente, nombre, apellido, "efectivo"], (error, resultCliente) => {
      if (error) {
        console.error("Error al insertar cliente: ", error);
        return db.rollback(() => {
          res.status(500).json({ message: "Error interno del servidor" });
        });
      }

      const insertVenta = "INSERT INTO ventas (idVenta, fecha, total, estado, created_at) VALUES (?, CURDATE(), ?, 'completado', CURDATE())";
      db.query(insertVenta, [idVenta, total], (error, resultVenta) => {
        if (error) {
          console.error("Error al insertar venta: ", error);
          return db.rollback(() => {
            res.status(500).json({ message: "Error interno del servidor" });
          });
        }

        const valuesDetalleVenta = selectedBooks.map(book => [idVenta, idCliente, book.value, book.cantidad, book.precioUnitario, book.subtotal, book.descuento, new Date()]);
        const insertDetalleVenta = "INSERT INTO detalles_venta (idVenta, idCliente, idLibro, cantidad, precioUnitario, subtotal, descuento, created_at) VALUES ?";
        db.query(insertDetalleVenta, [valuesDetalleVenta], (error, resultDetalleVenta) => {
          if (error) {
            console.error("Error al insertar detalles de venta: ", error);
            return db.rollback(() => {
              res.status(500).json({ message: "Error interno del servidor" });
            });
          }

          const updateExistencia = "UPDATE existencias AS ex INNER JOIN detalles_venta AS dv ON ex.idLibro = dv.idLibro SET ex.existencia = ex.existencia - dv.cantidad WHERE dv.idVenta = ?";
          db.query(updateExistencia, [idVenta], (error, resultExistencia) => {
            if (error) {
              console.error("Error al actualizar existencia: ", error);
              return db.rollback(() => {
                res.status(500).json({ message: "Error interno del servidor" });
              });
            }

            // Commit the transaction if all queries were successful
            db.commit(err => {
              if (err) {
                console.error("Error committing transaction: ", err);
                return db.rollback(() => {
                  res.status(500).json({ message: "Error interno del servidor" });
                });
              }
              res.status(200).json({ message: "Factura guardada exitosamente" });
            });
          });
        });
      });
    });
  });
};
