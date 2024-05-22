const db = require("../config/db");

exports.getGenresComparative = (req, res) => {
  const period = req.query.period || 7; // Valor predeterminado: últimos 7 días
  const selectSalesByGenre = "select g.nombreGenero as Genero, sum(dv.subtotal) as VentasTotales from ventas v inner join detalles_venta dv on v.idVenta = dv.idVenta inner join libros l on dv.idLibro = l.idLibro inner join genero g on l.genero = g.idGenero where v.estado = 'completado' and (g.deleted_at is null and v.deleted_at is null and dv.deleted_at is null) and v.fecha >= now() - interval ? day group by g.nombreGenero  order by VentasTotales asc;";

  db.query(selectSalesByGenre, [period], (error, results) => {
    if (error) {
      res.status(500).json({ status: 500, error: "Error al obtener los datos de ventas por género" });
    } else {
      res.json(results);
    }
  });
};

exports.getSalesResume = (req, res) => {
  const period = parseInt(req.query.period) || 7; 
  let selectSalesByPeriod = ``;

  if(period == 7) {
    selectSalesByPeriod = 'select created_at as fecha, sum(total) as total_venta from ventas where created_at between curdate() - interval ? day and curdate() group by created_at limit 7;';
  }
  if(period == 14) {
    selectSalesByPeriod = `select concat("Semana del ", date_format(fecha_inicio, "%d-%m-%Y"), " al ", date_format(fecha_fin, "%d-%m-%Y")) as fecha, sum(total) as total_venta from (select date_sub(created_at, interval weekday(created_at) day) as fecha_inicio, date_add(date_sub(created_at, interval weekday(created_at) day), interval 1 week) as fecha_fin, total from ventas 
    where created_at between curdate() - interval ? day and curdate()) as fecha 
    group by fecha_inicio, fecha_fin 
    order by fecha_inicio asc 
    limit 2;`;
  }
  if(period == 30) {
    selectSalesByPeriod = `select concat("Desde el ", date_format(min(fecha), "%d-%m-%Y"), " hasta el ", date_format(max(fecha), "%d-%m-%Y")) as fecha, sum(total) as total_venta from ventas
    where fecha between curdate() - interval ? day and curdate();`;
  }
  if(period == 90) {
    selectSalesByPeriod = `select concat(monthname(fecha), " ", year(fecha)) as fecha, sum(total) as total_venta from ventas 
      where fecha between curdate() - interval ? day and curdate() 
      group by year(fecha), month(fecha) 
      order by year(fecha) asc, month(fecha) asc 
      limit 3;`;
  }
  
  if(period == 180) {
    selectSalesByPeriod = `select concat(monthname(fecha), " ", year(fecha)) as fecha, sum(total) as total_venta from ventas
      where fecha between curdate() - interval ? day and curdate() 
      group by year(fecha), month(fecha) 
      order by year(fecha) asc, month(fecha) asc 
      limit 6;`;
  }
  if(period == 365) {
    selectSalesByPeriod = `select concat(monthname(fecha), " ", year(fecha)) as fecha, sum(total) as total_venta from ventas
      where fecha between curdate() - interval ? day and curdate() 
      group by year(fecha), month(fecha) 
      order by year(fecha) asc, month(fecha) asc 
      limit 12;`;
  }

  db.query(selectSalesByPeriod, [period], (error, results) => {
    if (error) {
      res.status(500).json({ status: 500, message: "Error al obtener el resumen de ventas" });
      console.error(error);
    } else {
      res.json(results);
    }
  });
};

exports.getTopSellers = (req, res) => {
  const period = req.query.period || 7;
  const selectTopSellers =
    "select l.idLibro, l.titulo, sum(dv.cantidad) as totalVendido from libros l join detalles_venta dv on l.idLibro = dv.idLibro join ventas v on dv.idVenta = v.idVenta where v.estado = 'completado' and v.fecha >= now() - interval ? day group by l.idLibro, l.titulo order by totalVendido desc limit 5;";

  db.query(selectTopSellers, [period], (error, results) => {
    if (error) {
      console.error("Error en la consulta SQL:", error.message);
      res.status(500).json({ status: 500, error: "Error al obtener los libros más vendidos" });
    } else {
      const topSellers = results.map((sellers) => ({
        titulo: sellers.titulo,
        totalVendido: sellers.totalVendido,
      }));
      res.json(topSellers);
    }
  });
};

exports.getLastFiveBooks = (req, res) => {
  db.query(
    "select *, e.existencia as stock from libros l inner join existencias e on e.idLibro = l.idLibro inner join genero g on g.idGenero = l.genero where (l.deleted_at is null and e.deleted_at is null and g.deleted_at is null and l.deleted_at is null) order by l.id desc limit 5",
    (error, results) => {
      if (error) {
        console.error("Error al obtener los libros:", error.message);
        res.status(500).json({ status: 500, message: "Error interno del servidor" });
        return;
      }
      res.status(200).json(results);
    }
  );
};