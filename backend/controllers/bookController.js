const db = require("../config/db");

exports.getAllBooks = (req, res) => {
  db.query("SELECT * FROM Libros", (err, results) => {
    if (err) {
      console.error("Error al obtener los libros:", err);
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }
    res.status(200).json(results);
    console.log(results);
  });
};

