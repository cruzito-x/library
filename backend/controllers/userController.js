const db = require("../config/db");
const crypto = require("crypto");

exports.getUsers = (req, res) => {
  db.query("select idUsuario, nombreUsuario, rol, created_at, deleted_at from usuarios where deleted_at is null", (error, results) => {
    if (error) {
      res.status(500).json({ message: "Error interno del servidor" });
      console.error("Error interno del servidor", error);
      return;
    }
    res.status(200).json(results);
  });
}