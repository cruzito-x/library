const db = require("../config/db");
const crypto = require("crypto");

exports.getBooks = (req, res) => {
  db.query("select l.idLibro as value, l.titulo as label, l.autor, l.precio from libros l inner join existencias e on e.idLibro = l.idLibro inner join genero g on g.idGenero = l.genero where (l.deleted_at is null and e.deleted_at is null and g.deleted_at is null) and e.existencia > 0;",
  (error, results) => {
    if (error) {
        console.error("Error al obtener los libros:", error.message);
        res.status(500).json({ message: "Error interno del servidor" });
        return;
      }
      res.status(200).json(results);
    }
  );
};

exports.saveBill = (req, res) => {
  const { selectedBooks, nombre, apellido } = req.body;

  const idVenta = crypto.createHash("md5").update(new Date().toISOString()).digest("hex");
  const idCliente = crypto.createHash("md5").update(new Date().toISOString()).digest("hex");
  const total = selectedBooks.reduce((acumuladorTotal, book) => acumuladorTotal + parseFloat(book.total), 0).toFixed(2);

  // Begin transaction
  db.beginTransaction(error => {
    if (error) {
      console.error('Error starting transaction: ', error.message);
      res.status(500).json({ message: 'Error interno del servidor' });
      return;
    }

    const insertCliente = "insert into clientes (idCliente, nombre, apellido, metodoPago, created_at) values (?, ?, ?, ?, curdate())";
    db.query(insertCliente, [idCliente, nombre, apellido, "efectivo"], (error, result) => {
      if (error) {
        console.error("Error al insertar cliente: ", error.message);
        return db.rollback(() => {
          res.status(500).json({ message: "Error interno del servidor" });
        });
      }

      const insertVenta = "insert into ventas (idVenta, fecha, total, estado, created_at) values (?, now(), ?, 'completado', curdate())";
      db.query(insertVenta, [idVenta, total], (error, result) => {
        if (error) {
          console.error("Error al insertar venta: ", error.message);
          return db.rollback(() => {
            res.status(500).json({ message: "Error interno del servidor" });
          });
        }

        const valuesDetalleVenta = selectedBooks.map(book => [idVenta, idVenta, idCliente, book.value, book.cantidad, book.precioUnitario, book.subtotal, book.descuento, new Date()]);
        const insertDetalleVenta = "insert into detalles_venta (idDetalleVenta, idVenta, idCliente, idLibro, cantidad, precioUnitario, subtotal, descuento, created_at) values ?";
        db.query(insertDetalleVenta, [valuesDetalleVenta], (error, result) => {
          if (error) {
            console.error("Error al insertar detalles de venta: ", error.message);
            return db.rollback(() => {
              res.status(500).json({ message: "Error interno del servidor" });
            });
          }

          const updateExistencia = "update existencias as ex inner join detalles_venta as dv on ex.idLibro = dv.idLibro set ex.existencia = ex.existencia - dv.cantidad where dv.idVenta = ?";
          db.query(updateExistencia, [idVenta], (error, result) => {
            if (error) {
              console.error("Error al actualizar existencia: ", error.message);
              return db.rollback(() => {
                res.status(500).json({ message: "Error interno del servidor" });
              });
            }

            // Commit the transaction if all queries were successful
            db.commit(error => {
              if (error) {
                console.error("Error committing transaction: ", error.message);
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
