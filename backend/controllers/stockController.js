const db = require("../config/db");

exports.getStock = (req, res) => {
  db.query("select e.idLibro, l.titulo, e.existencia as stock from libros l inner join existencias e on e.idLibro = l.idLibro where l.deleted_at is null order by e.existencia desc;", (error, results) => {
    if (error) {
      console.error("Error al obtener el stock:", error);
      res.status(500).json({ message: "Error interno del servidor" });
      console.error("Error interno del servidor", error);
      return;
    }
    res.status(200).json(results);
  });
}

exports.deleteStockUpdatedDeletedAt = (req, res) => {
  const { idLibro } = req.params;

  db.query("update existencias set deleted_at = now() where idLibro = ?;", [idLibro], (error, results) => {
    if (error) {
      console.error("Error al retirar el libro del stock:", error);
      res.status(500).json({ message: "Error interno del servidor" });
      console.error("Error interno del servidor", error);
      return;
    }
    res.status(200).json({ message: "Libro retirado del stock exitosamente" });
  });
}

exports.updateStock = (req, res) => {
  const { idLibro } = req.params;
  const { stock } = req.body;

  db.query("update existencias set existencia = ? where idLibro = ?;", [stock, idLibro], (error, results) => {
    if (error) {
      console.error("Error al actualizar el stock:", error);
      res.status(500).json({ message: "Error interno del servidor" });
      console.error("Error interno del servidor", error);
      return;
    }
    res.status(200).json({ message: "Stock actualizado exitosamente" });
  });
}