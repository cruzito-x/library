const db = require("../config/db");

exports.getGenresComparative = (req, res) => {
  const period = req.query.period || '7'; // Valor predeterminado: últimos 7 días
  const selectSalesByGenre = "select g.nombreGenero as Genero, sum(dv.subtotal) as VentasTotales from ventas v inner join detalles_venta dv on v.idVenta = dv.idVenta  inner join libros l on dv.idLibro = l.idLibro inner join genero g on l.genero = g.idGenero where v.estado = 'completado' and (g.deleted_at is null and v.deleted_at is null and dv.deleted_at is null) and v.fecha >= now() - interval ? day group by g.nombreGenero  order by VentasTotales asc;";

  db.query(selectSalesByGenre, [period], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener los datos de ventas por género" });
    } else {
      res.json(results);
    }
  });
};

exports.getMonthSales = (req, res) => {
  const period = parseInt(req.query.period) || 7; 
  let selectMonthSales = ``;

  if(period == 7) {
    selectMonthSales = 'select fecha, sum(total) as total_venta from ventas where fecha between curdate() - interval ? day and curdate() group by fecha;';
  }
  if(period == 14) {
    selectMonthSales = 'select concat("Semana del ", date_format(fecha_inicio, "%d-%m-%Y"), " al ", date_format(fecha_fin, "%d-%m-%Y")) as fecha, sum(total) as total_venta from (select date_sub(fecha, interval weekday(fecha) day) as fecha_inicio, date_add(date_sub(fecha, interval weekday(fecha) day), interval 7 day) as fecha_fin, total from ventas where fecha between curdate() - interval ? day and curdate()) as fecha group by fecha_inicio, fecha_fin;';
  }
  if(period == 30) {
    selectMonthSales = 'select concat("Desde el ", date_format(min(fecha), "%d-%m-%Y"), " hasta el ", date_format(max(fecha), "%d-%m-%Y")) as fecha, sum(total) as total_venta from ventas where fecha between curdate() - interval ? day and curdate();';
  }
  if(period == 90 || period == 180 || period == 365) {
    selectMonthSales = 'select concat(monthname(fecha), " ", year(fecha)) as fecha, sum(total) as total_venta from ventas where fecha between curdate() - interval ? day and curdate() group by year(fecha), month(fecha) order by year(fecha), month(fecha);';
  }

  db.query(selectMonthSales, [period], (error, results) => {
    if (error) {
      res
        .status(500)
        .json({ error: "Error al obtener las ventas del mes actual" });
        console.error(error);
    } else {
      res.json(results);
      console.log(JSON.stringify(results));
    }
  });
};

exports.getTopSellers = (req, res) => {
  const period = req.query.period || '7';
  const selectTopSellers =
    "select l.idLibro, l.titulo, sum(dv.cantidad) as totalVendido from libros l join detalles_venta dv on l.idLibro = dv.idLibro join ventas v on dv.idVenta = v.idVenta where v.estado = 'completado' and v.fecha >= now() - interval ? day group by l.idLibro, l.titulo order by totalVendido desc limit 5;";

  db.query(selectTopSellers, [period], (error, results) => {
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
