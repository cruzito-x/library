const db = require("../config/db");
const crypto = require("crypto");

exports.login = (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

  const query = `select * from usuarios where nombreUsuario = ? and password = ? and deleted_at is null`;
  db.query(query, [username, hashedPassword], (error, results) => {
    if (error) {
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }

    if (results.length > 0) {
      const userRole = results[0].rol;
      res.status(200).json({ message: "Inicio de sesión exitoso", rol: userRole });
    } else {
      res.status(401).json({ message: "Nombre de usuario o contraseña incorrectos" });
    }
  });
};
