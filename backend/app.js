const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3001;
app.use(cors());

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "librarydb",
  port: 3307,
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Middleware para parsear el body de las solicitudes como JSON
app.use(bodyParser.json());

// Endpoint para manejar el inicio de sesión
app.post("/srvr/login", (req, res) => {
  const { username, password } = req.body;

  // Consulta a la base de datos para verificar las credenciales del usuario
  const query = `SELECT * FROM usuarios WHERE nombreUsuario = ? AND password = ?`;
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }

    if (results.length > 0) {
      // Usuario autenticado, enviar una respuesta exitosa
      res.status(200).json({ message: "Inicio de sesión exitoso" });
    } else {
      // Credenciales incorrectas, enviar una respuesta de error
      res.status(401).json({ message: "Nombre de usuario o contraseña incorrectos" });
    }
  });
});

// Conectar a la base de datos
connection.connect((error) => {
  if (error) {
    console.error("Error de conexión a la base de datos:", error);
    return;
  }
  console.log("Conexión a la base de datos MySQL exitosa");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
