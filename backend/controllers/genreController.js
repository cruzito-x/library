const db = require("../config/db");
const crypto = require("crypto");

exports.getGenres = (req, res) => {
  db.query("select g.idGenero, g.nombreGenero, g.created_at as 'created at', count(l.id) as 'cantidad' from genero g left join libros l on g.idGenero = l.genero and l.deleted_at is null where g.deleted_at is null group by g.idGenero, g.nombreGenero, g.created_at order by g.nombreGenero asc", (error, results) => {
    if (error) {
      console.error("Error al obtener los géneros:", error.message);
      res.status(500).json({ status: 500, message: "Error interno del servidor" });
      console.error("Error interno del servidor", error.message);
      return;
    }
    res.status(200).json(results);
  });
}

exports.getBooksByGenre = (req, res) => {
  const { idGenero } = req.params;
  const query = "select l.titulo, l.autor, l.precio from libros l where l.genero = ? and l.deleted_at is null";
  db.query(query, [idGenero], (error, results) => {
    if (error) {
      console.error("Error al obtener los libros del género:", error.message);
      res.status(500).json({ status: 500, message: "Error interno del servidor" });
      return;
    }
    res.status(200).json(results);
  });
};


exports.saveGenre = (req, res) => {
  const idGenero = crypto.createHash("md5").update(new Date().toISOString()).digest("hex");

  const { nombreGenero } = req.body;
  const selectGenero = `select * from genero where nombreGenero = ?`;
  const insertGenero = `insert into genero (idGenero, nombreGenero, created_at) values (?, ?, curdate())`;
  const generoValues = [idGenero, nombreGenero];

  if (!nombreGenero) {
    return res.status(400).json({ status: 400, message: "Por favor, complete los campos requeridos" });
  }

  db.query(selectGenero, nombreGenero, (error, results) => {  // Verificamos si el género ya existe
    if (error) {
      res.status(500).json({ status: 500, message: "Error interno del servidor" });
      return;
    }

    if (results.length > 0) { // Si hay resultados, significa que el género ya existe
      res.status(400).json({ status: 400, message: "Este género ya está registrado" });
      return;
    }

    db.query(insertGenero, generoValues, (error, results) => { // Si no hay resultados, procedemos a insertar el nuevo género
      if (error) {
        res.status(500).json({ status: 500, message: "Error interno del servidor" });
        return;
      }
      res.status(200).json({ status: 200, message: "Género agregado exitosamente" });
    });
  });
};

exports.deleteGenreUpdatedDeletedAt = (req, res) => {
  const { idGenero } = req.params;
  const deleteGenreQuery = `update genero set deleted_at = curdate() where idGenero = ?`;
  const generoValues = [idGenero, idGenero];

  db.query(deleteGenreQuery, generoValues, (error, result) => {
    if (error) {
      console.error("Error al eliminar el género:", error.message);
      res.status(500).json({ status: 500, message: "Error interno del servidor" });
      return;
    }
    res.status(200).json({ status: 200, message: "Género eliminado exitosamente" });
  });
}

exports.updateGenre = (req, res) => {
  const { idGenero } = req.params;
  const { nombreGenero } = req.body;
  const selectGenero = `select * from genero where nombreGenero = ?`;
  const updateGenero = `update genero set nombreGenero = ? where idGenero = ?`;
  const generoValues = [nombreGenero, idGenero];

  db.query(selectGenero, [nombreGenero], (error, results) => { // Verificamos si el nuevo nombre del género ya existe
    if (error) { // Ocurrió un error al ejecutar la consulta
      console.error("Error al verificar el nombre del género:", error.message);
      res.status(500).json({ status: 500, message: "Error interno del servidor" });
    } else {
      if (results.length === 0) { // Si no hay resultados, el nombre no existe, entonces actualiza el género
        db.query(updateGenero, generoValues, (error, results) => {
          if (error) {
            console.error("Error al actualizar el género:", error.message);
            res.status(500).json({ status: 500, message: "Error interno del servidor" });
          } else {
            res.status(200).json({ status: 200, message: "Género actualizado exitosamente" });
          }
        });
      } else {
        res.status(400).json({ status: 400, message: "El nombre del género ya existe" });
      }
    }
  });
};
