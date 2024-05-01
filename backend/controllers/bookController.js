const db = require("../config/db");
const fs = require("fs");
const crypto = require("crypto");

exports.getAllBooks = (req, res) => {
  db.query(
    "select *, e.existencia as stock from libros l inner join existencias e on e.idLibro = l.idLibro where (l.deleted_at is null and e.deleted_at is null)",
    (err, results) => {
      if (err) {
        console.error("Error al obtener los libros:", err);
        res.status(500).json({ message: "Error interno del servidor" });
        return;
      }
      res.status(200).json(results);
    }
  );
};

exports.getLastFiveBooks = (req, res) => {
  db.query(
    "select *, e.existencia as stock from libros l inner join existencias e on e.idLibro = l.idLibro where (l.deleted_at is null and e.deleted_at is null) order by l.id desc limit 5",
    (err, results) => {
      if (err) {
        console.error("Error al obtener los libros:", err);
        res.status(500).json({ message: "Error interno del servidor" });
        return;
      }
      res.status(200).json(results);
    }
  );
};

exports.saveBook = (req, res) => {
  const {
    titulo,
    autor,
    isbn,
    fechaPublicacion,
    genero,
    precio,
    sinopsis,
    ingreso,
  } = req.body;
  const portada = req.file ? req.file.path : null; // Ruta temporal de la imagen cargada
  const idLibro = crypto
    .createHash("md5")
    .update(`${Date.now()}`)
    .digest("hex");

  const insertLibros = `insert into libros (idLibro, titulo, autor, isbn, fechaPublicacion, genero, precio, sinopsis, portada, created_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, curdate())`;
  const insertExistencias = `insert into existencias (idLibro, existencia, created_at) values (?, ?, now())`;

  const librosValues = [
    idLibro,
    titulo,
    autor,
    isbn,
    fechaPublicacion,
    genero,
    precio,
    sinopsis,
    portada || null,
  ];

  const existenciasValues = [
    idLibro,
    ingreso, // Valor obtenido del frontend
  ];

  // Realizar ambas inserciones en una transacción
  db.beginTransaction((err) => {
    if (err) {
      console.error("Error al iniciar la transacción:", err);
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }

    // Insertar en la tabla libros
    db.query(insertLibros, librosValues, (err, result) => {
      if (err) {
        console.error("Error al guardar el libro:", err);
        db.rollback(() => {
          res.status(500).json({ message: "Error interno del servidor" });
        });
        return;
      }

      // Insertar en la tabla existencias
      db.query(insertExistencias, existenciasValues, (err, _result) => {
        if (err) {
          console.error("Error al guardar la existencia:", err);
          db.rollback(() => {
            res.status(500).json({ message: "Error interno del servidor" });
          });
          return;
        }

        // Commit la transacción si ambas inserciones son exitosas
        db.commit((err) => {
          if (err) {
            console.error("Error al hacer commit de la transacción:", err);
            db.rollback(() => {
              res.status(500).json({ message: "Error interno del servidor" });
            });
            return;
          }
          res
            .status(200)
            .json({
              message: "Libro guardado exitosamente",
              id: result.insertId,
            });
        });
      });
    });
  });
};

exports.deleteBookUpdatedDeletedAt = (req, res) => {
  const { idLibro } = req.params;
  const query = `update libros l, existencias e set l.deleted_at = now(), e.deleted_at = now() where l.idLibro = ? and e.idLibro = ?`;
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

exports.updateBook = (req, res) => {
  const { idLibro } = req.params;
  const {
    titulo,
    autor,
    isbn,
    fechaPublicacion,
    genero,
    precio,
    sinopsis,
    ingreso
  } = req.body;

  const updateLibros = `update libros set titulo = ?, autor = ?, isbn = ?, fechaPublicacion = ?, genero = ?, precio = ?, sinopsis = ? where idLibro = ?`;
  const updateExistencias = `update existencias set existencia = ? where idLibro = ?`;

  const libroValues = [
    titulo,
    autor,
    isbn,
    fechaPublicacion,
    genero,
    precio,
    sinopsis,
    idLibro
  ];

  const existenciaValues = [ingreso, idLibro];

  db.beginTransaction((err) => {
    if (err) {
      console.error("Error al iniciar la transacción:", err);
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }

    // Actualizar en la tabla libros
    db.query(updateLibros, libroValues, (err, result) => {
      if (err) {
        console.error("Error al actualizar el libro:", err);
        db.rollback(() => {
          res.status(500).json({ message: "Error interno del servidor" });
        });
        return;
      }

      // Actualizar en la tabla existencias
      db.query(updateExistencias, existenciaValues, (err, result) => {
        if (err) {
          console.error("Error al actualizar la existencia:", err);
          db.rollback(() => {
            res.status(500).json({ message: "Error interno del servidor" });
          });
          return;
        }

        // Commit a la transacción si ambas actualizaciones son exitosas
        db.commit((err) => {
          if (err) {
            console.error("Error al hacer commit de la transacción:", err);
            db.rollback(() => {
              res.status(500).json({ message: "Error interno del servidor" });
            });
            return;
          }
          res.status(200).json({ message: "Libro actualizado exitosamente" });
        });
      });
    });
  });
};