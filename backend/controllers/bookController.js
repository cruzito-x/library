const db = require("../config/db");

exports.getAllBooks = (req, res) => {
  db.query("select *, e.existencia as stock from libros l inner join existencias e on e.idLibro = l.idLibro where (l.deleted_at is null and e.deleted_at is null)", (err, results) => {
    if (err) {
      console.error("Error al obtener los libros:", err);
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }
    res.status(200).json(results);
  });
};

exports.getLastFiveBooks = (req, res) => {
  db.query("select *, e.existencia as stock from libros l inner join existencias e on e.idLibro = l.idLibro where (l.deleted_at is null and e.deleted_at is null) order by l.id desc limit 5", (err, results) => {
    if (err) {
      console.error("Error al obtener los libros:", err);
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }
    res.status(200).json(results);
  });
}

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

exports.deleteBookUpdatedDeletedAt = (req, res) => {
  const { idLibro } = req.params;

  const query = `update libros l, existencias e set l.deleted_at = now(), e.deleted_at = now() 
                 where l.idLibro = ? and e.idLibro = ?`;

  const values = [idLibro, idLibro];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error al eliminar el libro:", err);
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }
    res.status(200).json({ message: "Libro eliminado exitosamente" });
  });
};

