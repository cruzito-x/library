const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');

const app = express();
const port = 3001;

// Middleware para parsear el body de las solicitudes como JSON
app.use(bodyParser.json());

// Aceptar CORS de diferentes endpoints fuera del servidor
app.use(cors({ origin: "*" }));

// Configuración de las rutas
const auth = require("./routes/auth");
const books = require("./routes/books");

app.use("/auth", auth);
app.use("/books", books);

// Configura morgan para que escriba en el archivo de registro
app.use(morgan('combined'));

// Levantar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
