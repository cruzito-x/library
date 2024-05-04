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