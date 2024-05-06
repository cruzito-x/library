const db = require("../config/db");
const crypto = require("crypto");

exports.getGenres = (req, res) => {
  db.query("select g.idGenero, g.nombreGenero, g.created_at as 'created at', count(l.id) as 'cantidad' from genero g left join libros l on g.idGenero = l.genero and l.deleted_at is null where g.deleted_at is null group by g.idGenero, g.nombreGenero, g.created_at order by g.nombreGenero asc", (error, results) => {
    if (error) {
      console.error("Error al obtener los géneros:", error);
      res.status(500).json({ message: "Error interno del servidor" });
      console.error("Error interno del servidor", error);
      return;
    }
    res.status(200).json(results);
  });
}

exports.saveGenre = (req, res) => {
  const idGenero = crypto.createHash("md5").update(`${Date.now()}`).digest("hex");

  const { nombreGenero } = req.body;
  const selectGenero = `select * from genero where nombreGenero = ?`;
  const insertGenero = `insert into genero (idGenero, nombreGenero, created_at) values (?, ?, curdate())`;
  const generoValues = [idGenero, nombreGenero];

  db.query(selectGenero, nombreGenero, (error, results) => {  // Verificamos si el género ya existe
    if (error) {
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }

    if (results.length > 0) { // Si hay resultados, significa que el género ya existe
      res.status(400).json({ message: "Este género ya está registrado" });
      return;
    }

    db.query(insertGenero, generoValues, (error, results) => { // Si no hay resultados, procedemos a insertar el nuevo género
      if (error) {
        res.status(500).json({ message: "Error interno del servidor" });
        return;
      }
      res.status(200).json({ message: "Género agregado exitosamente" });
    });
  });
};

exports.deleteGenreUpdatedDeletedAt = (req, res) => {
  const { idGenero } = req.params;
  const deleteGenreQuery = `update genero set deleted_at = now() where idGenero = ?`;
  const generoValues = [idGenero, idGenero];

  db.query(deleteGenreQuery, generoValues, (error, result) => {
    if (error) {
      console.error("Error al eliminar el género:", error);
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }
    res.status(200).json({ message: "Género eliminado exitosamente" });
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
      console.error("Error al verificar el nombre del género:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      if (results.length === 0) { // Si no hay resultados, el nombre no existe, entonces actualiza el género
        db.query(updateGenero, generoValues, (error, results) => {
          if (error) {
            console.error("Error al actualizar el género:", error);
            res.status(500).json({ error: "Error interno del servidor" });
          } else {
            res.status(200).json({ message: "Género actualizado exitosamente" });
          }
        });
      } else {
        res.status(400).json({ error: "El nombre del género ya existe" });
      }
    }
  });
};
