const db = require("../config/db");
const crypto = require("crypto");

exports.getUsers = (req, res) => {
  const selectUsers = "select idUsuario, nombreUsuario, rol, created_at, deleted_at from usuarios;";

  db.query(selectUsers, (error, results) => {
      if (error) {
        res.status(500).json({ status: 500, message: "Error interno del servidor" });
        console.error("Error interno del servidor", error.message);
        return;
      }
      res.status(200).json(results);
    }
  );
};

exports.saveUser = (req, res) => {
  const idUsuario = crypto.createHash("md5").update(new Date().toISOString()).digest("hex");
  const username = req.body.nombreUsuario;
  const password = crypto.createHash("md5").update(req.body.password).digest("hex");
  const rol = req.body.rol;

  if (!username || !password || !rol) {
    return res.status(400).json({ status: 400, message: "Por favor, complete los campos requeridos" });
  }

  const insertUser = "insert into usuarios (idUsuario, nombreUsuario, password, rol, created_at) values (?, ?, ?, ?, curdate());";
  const userValues = [idUsuario, username, password, rol];

  db.query(insertUser, userValues, (error, results) => {
    if (error) {
      res.status(500).json({ status: 500, message: "Error interno del servidor" });
      return;
    }
    res.status(200).json({ status: 200, message: "Usuario agregado exitosamente" });
  });
};

exports.deleteUserUpdatedAt = (req, res) => {
  const { idUsuario } = req.params;
  const deleteUser = "update usuarios set deleted_at = curdate() where idUsuario = ?;";
  const userValues = [idUsuario];

  db.query(deleteUser, userValues, (error, result) => {
    if (error) {
      console.error("Error al eliminar el usuario:", error.message);
      res.status(500).json({ status: 500, message: "Error interno del servidor" });
      return;
    }
    res.status(200).json({ status: 200, message: "Usuario eliminado exitosamente" });
  });
}

exports.updateUser = (req, res) => {
  const { idUsuario } = req.params;
  const { nombreUsuario, rol } = req.body;
  const password = crypto.createHash("md5").update(req.body.password).digest("hex");

  const updateUser = "update usuarios set nombreUsuario = ?, password = ?, rol = ? where idUsuario = ?;";
  const userValues = [nombreUsuario, password, rol, idUsuario];

  db.query(updateUser, userValues, (error, result) => {
    if (error) {
      console.error("Error al actualizar el usuario:", error.message);
      res.status(500).json({ status: 500, message: "Error interno del servidor" });
      return;
    }
    res.status(200).json({ status: 200, message: "Usuario actualizado exitosamente" });
  });
}