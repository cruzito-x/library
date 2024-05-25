const db = require("../config/db");

exports.getStock = (req, res) => {
  const selectStock = "select e.idLibro, l.titulo, e.existencia as stock, e.deleted_at from libros l inner join existencias e on e.idLibro = l.idLibro order by e.existencia desc;";

  db.query(selectStock, (error, results) => {
    if (error) {
      console.error("Error al obtener el stock:", error.message);
      res.status(500).json({ status: 500, message: "Error interno del servidor" });
      console.error("Error interno del servidor", error.message);
      return;
    }
    res.status(200).json(results);
  });
}

exports.deleteStockUpdatedDeletedAt = (req, res) => {
  const { idLibro } = req.params;
  const updateStockDeletedAt = "update existencias set deleted_at = curdate() where idLibro = ?;";

  db.query(updateStockDeletedAt, [idLibro], (error, results) => {
    if (error) {
      console.error("Error al retirar el libro del stock:", error.message);
      res.status(500).json({ status: 500, message: "Error interno del servidor" });
      console.error("Error interno del servidor", error.message);
      return;
    }
    res.status(200).json({ status: 200, message: "Libro retirado del stock exitosamente" });
  });
}

exports.updateStock = (req, res) => {
  const { idLibro } = req.params;
  const { stock } = req.body;
  const updateStock = "update existencias set existencia = ? where idLibro = ?;";

  db.query(updateStock, [stock, idLibro], (error, results) => {
    if (error) {
      console.error("Error al actualizar el stock:", error.message);
      res.status(500).json({ status: 500, message: "Error interno del servidor" });
      console.error("Error interno del servidor", error.message);
      return;
    }
    res.status(200).json({ status: 200, message: "Stock actualizado exitosamente" });
  });
}

exports.activateStock = (req, res) => {
  const { idLibro } = req.params;
  const updateBooksToStock = "update libros set deleted_at = null where idLibro = ?;";
  const updateStock = "update existencias set deleted_at = null where idLibro = ?;";

  db.beginTransaction((error) => {
    if (error) {
      res.status(500).json({ status: 500, message: "Error interno del servidor" });
      console.error("Error al iniciar transacción", error.message);
      return;
    }

    // Actualización de la tabla 'libros'
    db.query(updateBooksToStock, [idLibro], (error, results) => {
      if (error) {
        return db.rollback(() => {
          res.status(500).json({ status: 500, message: "Error interno del servidor" });
          console.error("Error al actualizar la tabla 'libros'", error.message);
        });
      }

      // Actualización de la tabla 'existencias'
      db.query(updateStock, [idLibro], (error, results) => {
        if (error) {
          return db.rollback(() => {
            res.status(500).json({ status: 500, message: "Error interno del servidor" });
            console.error("Error al actualizar la tabla 'existencias'", error.message);
          });
        }

        db.commit((error) => {
          if (error) {
            return db.rollback(() => {
              res.status(500).json({ status: 500, message: "Error interno del servidor" });
              console.error("Error al hacer commit de la transacción", error.message);
            });
          }
          res.status(200).json({ status: 200, message: "Libro activado en el stock exitosamente" });
        });
      });
    });
  });
}
