const db = require("../config/db");

exports.getSalesData = (req, res) => {
  const period = parseInt(req.query.period) || 7;
  let selectSalesByPeriod = [];

  if (period == 7) {
    selectSalesByPeriod.push('select l.titulo, count(dv.idLibro) as ventas from detalles_venta dv join libros l on dv.idLibro = l.idLibro join ventas v on dv.idVenta = v.idVenta where v.fecha >= date_sub(curdate(), interval 7 day) group by dv.idLibro order by ventas desc limit 5;'); // Obtener los 5 libros más vendidos en los últimos 7 días.

    selectSalesByPeriod.push('select sum(dv.cantidad) as total_libros_vendidos, concat("semana del ", date_sub(curdate(), interval 7 day), " al ", curdate()) as semana from detalles_venta dv join ventas v on dv.idVenta = v.idVenta where v.fecha >= date_sub(curdate(), interval 7 day);'); // Obtener semana de reporte y total de libros vendidos.

    selectSalesByPeriod.push('select g.nombreGenero, count(dv.idLibro) as ventas from detalles_venta dv join libros l on dv.idLibro = l.idLibro join genero g on l.genero = g.idGenero join ventas v on dv.idVenta = v.idVenta where v.fecha >= date_sub(curdate(), interval 7 day) and l.deleted_at is null and g.deleted_at is null group by l.genero order by ventas desc limit 5;'); // Obtener los géneros más populares en los últimos 7 días.

    selectSalesByPeriod.push('select sum(dv.subtotal) as total_ganancias from detalles_venta dv join ventas v on dv.idVenta = v.idVenta where v.fecha >= date_sub(curdate(), interval 7 day);'); // Obtener el total de ganancias en los últimos 7 días.
  }
  if (period == 14) {
    
  }
  if (period == 30) {

  }
  if (period == 90) {
    
  }
  if (period == 180) {
  }
  if (period == 365) {
  }

  const promises = selectSalesByPeriod.map((query) => {
    return new Promise((resolve, reject) => {
      db.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  });

  Promise.all(promises)
    .then((results) => {
      res.json(results);
      console.log(JSON.stringify(results));
    })
    .catch((error) => {
      res
        .status(500)
        .json({
          error: "Error al obtener las ventas del periodo especificado",
        });
      console.error(error);
    });
};
