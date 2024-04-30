const db = require("../config/db");
const crypto = require("crypto");

exports.login = (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

  const query = `SELECT * FROM Usuarios WHERE nombreUsuario = ? AND password = ?`;
  db.query(query, [username, hashedPassword], (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }

    if (results.length > 0) {
      res.status(200).json({ message: "Inicio de sesión exitoso" });
    } else {
      res.status(401).json({ message: "Nombre de usuario o contraseña incorrectos" });
    }
  });
};
