const db = require("../config/db");

exports.getAllBooks = (req, res) => {
  db.query("select * from libros", (err, results) => {
    if (err) {
      console.error("Error al obtener los libros:", err);
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }
    res.status(200).json(results);
  });
};

exports.saveBook = (req, res) => {
  const {
    titulo,
    autor,
    fechaPublicacion,
    genero,
    precio,
    sinopsis,
    portada
  } = req.body;
  
  const query = `insert into libros (titulo, autor, fechaPublicacion, genero, precio, sinopsis, portada, created_at) values (?, ?, ?, ?, ?, ?, ?, curdate())`;

  const values = [
    titulo,
    autor,
    fechaPublicacion,
    genero,
    precio,
    sinopsis,
    portada
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error al crear el libro:", err);
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }
    res.status(200).json({ message: "Libro guardado exitosamente", id: result.insertId });
  });
};
