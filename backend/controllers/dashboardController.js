const db = require("../config/db");
const crypto = require("crypto");

exports.getSalesProgress = (req, res) => {
  
}

exports.getTopSellers = (req, res) => {
  // Consulta SQL para obtener los libros más vendidos
  const query = "select l.idLibro, l.titulo, sum(dv.cantidad) as totalVendido from libros l join detalles_venta dv on l.idLibro = dv.idLibro join ventas v on dv.idVenta = v.idVenta where v.estado = 'completado' group by l.idLibro, l.titulo order by totalVendido desc limit 5;";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error en la consulta SQL:", error);
      res.status(500).json({ error: 'Error al obtener los libros más vendidos' });
    } else {
      // Formatear los resultados en un JSON con título y totalVendido
      const topSellers = results.map(row => ({
        titulo: row.titulo,
        totalVendido: row.totalVendido
      }));
      res.json(topSellers);
    }
  });
};