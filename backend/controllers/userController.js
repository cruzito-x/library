const db = require("../config/db");
const crypto = require("crypto");

exports.getUsers = (req, res) => {
  db.query(
    "select idUsuario, nombreUsuario, rol, created_at, deleted_at from usuarios",
    (error, results) => {
      if (error) {
        res.status(500).json({ message: "Error interno del servidor" });
        console.error("Error interno del servidor", error);
        return;
      }
      res.status(200).json(results);
    }
  );
};

exports.saveUser = (req, res) => {
  const idUsuario = crypto.createHash("md5").update(`${Date.now()}`).digest("hex");
  const nombreUsuario = req.body.nombreUsuario; // Accede a los datos del formulario usando req.body
  const password = crypto.createHash("md5").update(req.body.password).digest("hex");
  const rol = req.body.rol;

  const insertUsuario = `insert into usuarios (idUsuario, nombreUsuario, password, rol, created_at) values (?, ?, ?, ?, curdate())`;
  const usuarioValues = [idUsuario, nombreUsuario, password, rol];

  db.query(insertUsuario, usuarioValues, (error, results) => {
    if (error) {
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }
    res.status(200).json({ message: "Usuario agregado exitosamente" });
  });
};

exports.deleteUserUpdatedAt = (req, res) => {
  const { idUsuario } = req.params;
  const deleteUserQuery = `update usuarios set deleted_at = now() where idUsuario = ?`;
  const values = [idUsuario];

  db.query(deleteUserQuery, values, (error, result) => {
    if (error) {
      console.error("Error al eliminar el usuario:", error);
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  });
}

exports.updateUser = (req, res) => {
  const { idUsuario } = req.params;
  const { nombreUsuario, password, rol } = req.body;

  const updateUserQuery = `update usuarios set nombreUsuario = ?, password = ?, rol = ? where idUsuario = ?`;
  const usuarioValues = [nombreUsuario, password, rol, idUsuario];

  db.query(updateUserQuery, usuarioValues, (error, result) => {
    if (error) {
      console.error("Error al actualizar el usuario:", error);
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }
    res.status(200).json({ message: "Usuario actualizado exitosamente" });
  });
}