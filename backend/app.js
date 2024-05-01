const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');
const multer = require('multer');

const app = express();
const port = 3001;

app.use(bodyParser.json()); // Middleware para parsear el body de las solicitudes como JSON
app.use(multer().none()); // Middleware para manejar formularios multipart
app.use(cors({ origin: "*" })); // Aceptar CORS de diferentes endpoints fuera del servidor

// Configuración de las rutas
const auth = require("./routes/auth");
const books = require("./routes/books");

app.use("/auth", auth);
app.use("/books", books);
app.use(morgan('combined')); // Configura morgan para que escriba en el archivo de registro

// Levantar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});