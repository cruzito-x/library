const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const fileupload = require("express-fileupload");

const app = express();
const port = 3001;

app.use(bodyParser.json()); // Middleware para parsear el body de las solicitudes como JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Aceptar CORS de diferentes endpoints fuera del servidor
app.use(morgan("combined")); // Configura morgan para que escriba en el archivo de registro

// Configuración de las rutas
const auth = require("./routes/auth");
const books = require("./routes/books");

app.use(
  fileupload({
    createParentPath: true,
  })
);

app.use("/auth", auth);
app.use("/books", books);

// Levantar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
