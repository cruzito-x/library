const db = require("../config/db");
const crypto = require("crypto");

exports.getGenresComparative = (req, res) => {
  const selectSalesByGenre =
    "select g.nombreGenero as Genero, sum(dv.subtotal) as VentasTotales from ventas v inner join detalles_venta dv on v.idVenta = dv.idVenta inner join libros l on dv.idLibro = l.idLibro inner join genero g on l.genero = g.idGenero where v.estado = 'completado' group by g.nombreGenero order by VentasTotales asc;";

  db.query(selectSalesByGenre, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener los datos de ventas por género" });
    } else {
      res.json(results);
    }
  });
};

exports.getMonthSales = (req, res) => {
  // Obtener las ventas del mes actual
  const selectMonthSales =
    "select v.fecha, sum(v.total) as total_venta from ventas v inner join detalles_venta dv on v.idVenta = dv.idVenta where month(v.fecha) = month(current_date()) and year(v.fecha) = year(current_date()) group by v.fecha";

  db.query(selectMonthSales, (error, results) => {
    if (error) {
      res
        .status(500)
        .json({ error: "Error al obtener las ventas del mes actual" });
    } else {
      res.json(results);
    }
  });
};

exports.getTopSellers = (req, res) => {
  // Obtener los libros más vendidos
  const selectTopSellers =
    "select l.idLibro, l.titulo, sum(dv.cantidad) as totalVendido from libros l join detalles_venta dv on l.idLibro = dv.idLibro join ventas v on dv.idVenta = v.idVenta where v.estado = 'completado' group by l.idLibro, l.titulo order by totalVendido desc limit 5;";

  db.query(selectTopSellers, (error, results) => {
    if (error) {
      console.error("Error en la consulta SQL:", error);
      res
        .status(500)
        .json({ error: "Error al obtener los libros más vendidos" });
    } else {
      const topSellers = results.map((row) => ({
        titulo: row.titulo,
        totalVendido: row.totalVendido,
      }));
      res.json(topSellers);
    }
  });
};
