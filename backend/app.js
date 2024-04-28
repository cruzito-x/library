
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cors = require("cors");
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

// Middleware para parsear el body de las solicitudes como JSON
app.use(bodyParser.json());

// Aceptar CORS de diferentes endpoints fuera del servidor
app.use(cors({ origin: "*" }));

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

// Endpoint para manejar el inicio de sesión
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = `select * from usuarios where nombreUsuario = ? and password = ?`;
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }

    if (results.length > 0) {
      res.status(200).json({ message: "Inicio de sesión exitoso" }); // Usuario logueado exitosamente
    } else {
      res.status(401).json({ message: "Nombre de usuario o contraseña incorrectos" }); // Credenciales incorrectas, enviar una respuesta de error
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

// Crea un stream de escritura para el archivo de registro
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Configura morgan para que escriba en el archivo de registro
app.use(morgan('combined', { stream: accessLogStream }));

// Redirige stdout y stderr al mismo stream
process.stdout.write = accessLogStream.write.bind(accessLogStream);
process.stderr.write = accessLogStream.write.bind(accessLogStream);

// Levantar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});