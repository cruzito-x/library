const db = require("../config/db");

exports.getStock = (req, res) => {
  db.query("select l.titulo, e.existencia as stock from libros l inner join existencias e on e.idLibro = l.idLibro where l.deleted_at is null order by e.existencia desc;", (error, results) => {
    if (error) {
      console.error("Error al obtener el stock:", error);
      res.status(500).json({ message: "Error interno del servidor" });
      console.error("Error interno del servidor", error);
      return;
    }
    res.status(200).json(results);
  });
}