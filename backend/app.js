const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3001;

app.use(bodyParser.json()); // Middleware para parsear el body de las solicitudes como JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Aceptar CORS de diferentes endpoints fuera del servidor

const accessLogStream = fs.createWriteStream(path.join(__dirname, "express.log"), { flags: "a" }); // Configuración de Morgan para escribir en el archivo express.log
app.use(morgan("combined", { stream: accessLogStream }));

// Middleware para subida de archivos
app.use(
  fileupload({
    createParentPath: true,
  })
);

// Configuración de las rutas
const auth = require("./routes/auth");
const dashboard = require("./routes/dashboard");
const books = require("./routes/books");
const bills = require("./routes/bills");
const genres = require("./routes/genres");

app.use("/auth", auth);
app.use("/dashboard", dashboard);
app.use("/books", books);
app.use("/bills", bills);
app.use("/genres", genres);

// Redirigir console.log y console.error a un archivo de registro
const logStream = fs.createWriteStream(path.join(__dirname, "express.log"), { flags: "a" });
console.log = function(message) {
  logStream.write(`[LOG] ${message}\n`);
};

console.error = function(message) {
  logStream.write(`[ERROR] ${message}\n`);
};

// Levantar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});