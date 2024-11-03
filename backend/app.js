const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");

const app = express();
const port = 3001;
// const ip = "192.168.0.5";

const logsFolder = path.join(__dirname, "./logs"); // Ruta de la carpeta de logs

// Crear la carpeta de logs si no existe
if (!fs.existsSync(logsFolder)) {
  fs.mkdirSync(logsFolder);
}

// Configuración de Morgan para escribir en el archivo express.log
const expressLogStream = fs.createWriteStream(path.join(logsFolder, "express.log"), { flags: "a" });

app.use(helmet({
  contentSecurityPolicy: false, // Deshabilitar la política de seguridad de contenido para evitar problemas con CORS
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // Permitir solicitudes desde otros orígenes
}));
app.use(bodyParser.json()); // Middleware para parsear el body de las solicitudes como JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Permite solicitudes CORS de diferentes endpoints fuera del servidor
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Configurar el middleware para retornar archivos estáticos desde la carpeta 'uploads'
app.use(fileupload({ createParentPath: true })); // Middleware para subida de archivos, permite crear la carpeta si no existe
app.use(morgan("combined", { stream: expressLogStream }));

// Configuración de las rutas
const auth = require("./routes/auth");
const dashboard = require("./routes/dashboard");
const books = require("./routes/books");
const bills = require("./routes/bills");
const sales = require("./routes/sales");
const users = require("./routes/users");
const genres = require("./routes/genres");
const stock = require("./routes/stock");

app.use("/auth", auth);
app.use("/dashboard", dashboard);
app.use("/books", books);
app.use("/bills", bills);
app.use("/sales", sales);
app.use("/users", users);
app.use("/genres", genres);
app.use("/stock", stock);

// Redirigir console.log y console.error al archivo de registro
const logStream = fs.createWriteStream(path.join(logsFolder, "express.log"), { flags: "a" });
console.log = function(message) {
  logStream.write(`[LOG] ${message}\n`);
};

console.error = function(message) {
  logStream.write(`[ERROR] ${message}\n`);
};

// Levantar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en ${"http://", ":", port}`);
});
