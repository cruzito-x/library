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

// Crea un stream de escritura para el archivo de registro
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Configura morgan para que escriba en el archivo de registro
app.use(morgan('combined', { stream: accessLogStream }));

// Redirige stdout y stderr al mismo stream
process.stdout.write = accessLogStream.write.bind(accessLogStream);
process.stderr.write = accessLogStream.write.bind(accessLogStream);

// Configuración de Passport.js para la autenticación local
passport.use(new LocalStrategy(
  function(username, password, done) {
    // Consulta a la base de datos para verificar las credenciales del usuario
    const query = `select * from usuarios where nombreUsuario = ? and password = ?`;
    connection.query(query, [username, password], (err, results) => {
      if (err) {
        return done(err);
      }
      if (results.length === 0) {
        return done(null, false, { message: "Nombre de usuario o contraseña incorrectos" });
      }
      return done(null, results[0]);
    });
  }
));

// Middleware para validar la sesión del usuario
const validarSesion = (req, res, next) => {
  if (req.isAuthenticated()) { // Verificar si el usuario está autenticado
    return next(); // Si está autenticado, permitir el acceso a la siguiente ruta
  } else {
    return res.status(401).json({ message: "Debe iniciar sesión para acceder a esta ruta" }); // Si no está autenticado, devolver un error de acceso no autorizado
  }
};

// Middleware para parsear el body de las solicitudes como JSON
app.use(bodyParser.json());

// Aceptar accesos de origen diferente al local
app.use(cors({ origin: "*" }));

// Inicializar Passport.js
app.use(passport.initialize());

// Conectar a la base de datos
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "librarydb",
  port: 3307,
});

connection.connect((error) => {
  if (error) {
    console.error("Error de conexión a la base de datos:", error);
    return;
  }
  console.log("Conexión a la base de datos MySQL exitosa");
});

// Endpoint para manejar el inicio de sesión
app.post("/login", passport.authenticate('local'), (req, res) => {
  res.status(200).json({ message: "Inicio de sesión exitoso" });
});

// Middleware para validar la sesión del usuario en todas las rutas excepto en /login
app.use((req, res, next) => {
  if (req.path !== "/login") {
    validarSesion(req, res, next);
  } else {
    next();
  }
});

// Levantar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
