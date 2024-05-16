const db = require("../config/db");
const crypto = require("crypto");

exports.getBooks = (req, res) => {
  db.query(
    "select *, e.existencia as existencia, g.nombreGenero as genero from libros l inner join existencias e on e.idLibro = l.idLibro inner join genero g on g.idGenero = l.genero where (l.deleted_at is null and e.deleted_at is null and g.deleted_at is null) and e.existencia != 0",
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

exports.getGenres = (req, res) => {
  db.query("select idGenero as value, nombreGenero as label from genero where deleted_at is null order by nombreGenero asc", (error, results) => {
    if (error) {
      console.error("Error al obtener los géneros:", error.message);
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
    isbn,
    fechaPublicacion,
    genero,
    precio,
    portada,
    sinopsis,
    existencia,
  } = req.body;
  const idLibro = crypto.createHash("md5").update(new Date().toISOString()).digest("hex")

  const insertLibros = `insert into libros (idLibro, titulo, autor, isbn, fechaPublicacion, genero, precio, portada, sinopsis, created_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, curdate())`;
  const insertExistencias = `insert into existencias (idLibro, existencia, created_at) values (?, ?, now())`;

  const librosValues = [
    idLibro,
    titulo,
    autor,
    isbn,
    fechaPublicacion,
    genero,
    precio,
    portada,
    sinopsis
  ];

  const existenciasValues = [
    idLibro,
    existencia, // Valor obtenido del frontend
  ];

  // Realizar ambas inserciones en una transacción
  db.beginTransaction((error) => {
    if (error) {
      console.error("Error al iniciar la transacción:", error.message);
      res.status(500).json({ message: "Error interno del servidor" });
      console.error("Error interno del servidor: ", error.message);
      return;
    }

    // Insertar en la tabla libros
    db.query(insertLibros, librosValues, (error, result) => {
      if (error) {
        console.error("Error al guardar el libro:", error.message);
        db.rollback(() => {
          res.status(500).json({ message: "Error interno del servidor" });
          console.error("Error interno del servidor: ", error.message);
        });
        return;
      }

      // Insertar en la tabla existencias
      db.query(insertExistencias, existenciasValues, (error, _result) => {
        if (error) {
          console.error("Error al guardar el stock:", error.message);
          db.rollback(() => {
            res.status(500).json({ message: "Error interno del servidor" });
            console.error("Error interno del servidor: ", error.message);
          });
          return;
        }

        // Commit la transacción si ambas inserciones son exitosas
        db.commit((error) => {
          if (error) {
            console.error("Error al hacer commit de la transacción:", error.message);
            db.rollback(() => {
              res.status(500).json({ message: "Error interno del servidor" });
              console.error("Error interno del servidor: ", error.message);
            });
            return;
          }
          res.status(200).json({ message: "Libro guardado exitosamente" });
        });
      });
    });
  });
};

exports.deleteBookUpdatedDeletedAt = (req, res) => {
  const { idLibro } = req.params;
  const deleteBookQuery = `update libros l, existencias e set l.deleted_at = now(), e.deleted_at = now() where l.idLibro = ? and e.idLibro = ?`;
  const values = [idLibro, idLibro];

  db.query(deleteBookQuery, values, (error, result) => {
    if (error) {
      console.error("Error al eliminar el libro:", error.message);
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
    sinopsis
  } = req.body;

  const updateLibros = `update libros set titulo = ?, autor = ?, isbn = ?, fechaPublicacion = ?, genero = ?, precio = ?, sinopsis = ? where idLibro = ?`;

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
  
  // Actualizar en la tabla libros
  db.query(updateLibros, libroValues, (error, result) => {
    if (error) {
      console.error("Error al actualizar el libro:", error.message);
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }

    res.status(200).json({ message: "Libro actualizado exitosamente" });
  });
};

exports.upload = async (req, res) => {
  try {
    if (!req.files) {
      res.status(400).json({ message: "No se subió ningún archivo" });
    } else {
      const file = req.files.portada;
      
      // Generar nombre de archivo basado en la fecha y hora actual
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString('es-ES', { timeZone: 'UTC' }).replace(/[\/\,\.\s\:]/g, '');
      const fileName = `${formattedDate}.${file.name.split('.').pop()}`; // Mantener la extensión original del archivo

      file.mv(`./uploads/${fileName}`, (error) => {
        if (error) {
          res.status(500).json({ message: "Error interno del servidor" });
        } else {
          res.status(200).json({ message: "Archivo subido exitosamente", data: { name: fileName, size: file.size, type: file.mimetype } });
          console.log('Archivo subido exitosamente', fileName + ', ' + file.size + ', ' + file.mimetype);
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};