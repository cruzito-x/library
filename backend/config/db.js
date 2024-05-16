const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "librarydb",
  port: 3307,
});

connection.connect((error) => {
  if (error) {
    console.error("Error de conexión a la base de datos:", error.message);
    return;
  }
  console.log("Conexión a la base de datos MySQL exitosa");
});

module.exports = connection;
