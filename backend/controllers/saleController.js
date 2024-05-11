const db = require("../config/db");

exports.getSalesData = (req, res) => {
  const period = parseInt(req.query.period) || 7;
  let selectSalesByPeriod = [];

  if (period == 7) {
    selectSalesByPeriod.push(
      "select l.titulo, count(dv.idLibro) as ventas from detalles_venta dv join libros l on dv.idLibro = l.idLibro join ventas v on dv.idVenta = v.idVenta where v.fecha >= date_sub(curdate(), interval 7 day) group by dv.idLibro order by ventas desc limit 5;"
    ); // Obtener los 5 libros más vendidos en los últimos 7 días.

    selectSalesByPeriod.push(
      'select sum(dv.cantidad) as total_libros_vendidos, concat("semana del ", date_sub(curdate(), interval 7 day), " al ", curdate()) as semana from detalles_venta dv join ventas v on dv.idVenta = v.idVenta where v.fecha >= date_sub(curdate(), interval 7 day);'
    ); // Obtener semana de reporte y total de libros vendidos.

    selectSalesByPeriod.push(
      "select g.nombreGenero, count(dv.idLibro) as ventas from detalles_venta dv join libros l on dv.idLibro = l.idLibro join genero g on l.genero = g.idGenero join ventas v on dv.idVenta = v.idVenta where v.fecha >= date_sub(curdate(), interval 7 day) group by l.genero order by ventas desc limit 5;"
    ); // Obtener los géneros más populares en los últimos 7 días.

    selectSalesByPeriod.push(
      "select sum(dv.subtotal) as total_ganancias from detalles_venta dv join ventas v on dv.idVenta = v.idVenta where v.fecha >= date_sub(curdate(), interval 7 day);"
    ); // Obtener el total de ganancias en los últimos 7 días.

    selectSalesByPeriod.push(
      "select titulo, precio from libros where created_at >= date_sub(now(), interval 7 day) and deleted_at is null order by created_at desc limit 10;"
    ); // Obtener la lista de los 10 registros más recientes de libros

    selectSalesByPeriod.push(`select sum(case when fecha = date_sub(curdate(), interval 7 day) then total else 0 end) as ventas_hace_7_dias, 
    sum(case when fecha = curdate() then total else 0 end) as ventas_hoy,
    concat(case when sum(case when fecha = curdate() then total else 0 end) > sum(case when fecha = date_sub(curdate(), interval 7 day)
    then total else 0 end) then "incremento del " else "decremento del " end,
    case when sum(case when fecha = date_sub(curdate(), interval 7 day) then total else 0 end) = 0 then "[incremento infinito]" else
    round(abs(((sum(case when fecha = curdate() then total else 0 end) - sum(case when fecha = date_sub(curdate(), interval 7 day)
    then total else 0 end)) / sum(case when fecha = date_sub(curdate(), interval 7 day)
    then total else 0 end)) * 100)) end,"%") as porcentaje_incremento_decremento from ventas where fecha >= date_sub(curdate(), interval 7 day) and fecha <= curdate();`);
  }
  if (period == 14) {
    selectSalesByPeriod.push(
      "select l.titulo, count(dv.idLibro) as ventas from detalles_venta dv join libros l on dv.idLibro = l.idLibro join ventas v on dv.idVenta = v.idVenta where v.fecha >= date_sub(curdate(), interval 14 day) group by dv.idLibro order by ventas desc limit 5;"
    ); // Obtener los 5 libros más vendidos en los últimos 14 días.

    selectSalesByPeriod.push(
      'select sum(dv.cantidad) as total_libros_vendidos, concat("semanas del ", date_sub(curdate(), interval 14 day), " al ", curdate()) as semana from detalles_venta dv join ventas v on dv.idVenta = v.idVenta where v.fecha >= date_sub(curdate(), interval 14 day);'
    ); // Obtener semana de reporte y total de libros vendidos.

    selectSalesByPeriod.push(
      "select g.nombreGenero, count(dv.idLibro) as ventas from detalles_venta dv join libros l on dv.idLibro = l.idLibro join genero g on l.genero = g.idGenero join ventas v on dv.idVenta = v.idVenta where v.fecha >= date_sub(curdate(), interval 14 day) group by l.genero order by ventas desc limit 5;"
    ); // Obtener los géneros más populares en los últimos 14 días.

    selectSalesByPeriod.push(
      "select sum(dv.subtotal) as total_ganancias from detalles_venta dv join ventas v on dv.idVenta = v.idVenta where v.fecha >= date_sub(curdate(), interval 14 day);"
    ); // Obtener el total de ganancias en los últimos 14 días.

    selectSalesByPeriod.push(
      "select titulo, precio from libros where created_at >= date_sub(now(), interval 14 day) and deleted_at is null order by created_at desc limit 10;"
    ); // Obtener la lista de los 10 registros más recientes de libros

    selectSalesByPeriod.push(`select sum(case when fecha = date_sub(curdate(), interval 14 day) then total else 0 end) as ventas_hace_7_dias, 
    sum(case when fecha = curdate() then total else 0 end) as ventas_hoy,
    concat(case when sum(case when fecha = curdate() then total else 0 end) > sum(case when fecha = date_sub(curdate(), interval 14 day)
    then total else 0 end) then "incremento del " else "decremento del " end,
    case when sum(case when fecha = date_sub(curdate(), interval 14 day) then total else 0 end) = 0 then "[incremento infinito]" else
    round(abs(((sum(case when fecha = curdate() then total else 0 end) - sum(case when fecha = date_sub(curdate(), interval 14 day)
    then total else 0 end)) / sum(case when fecha = date_sub(curdate(), interval 14 day)
    then total else 0 end)) * 100)) end,"%") as porcentaje_incremento_decremento from ventas where fecha >= date_sub(curdate(), interval 14 day) and fecha <= curdate();`);
  }
  if (period == 30) {
    selectSalesByPeriod.push(
      "select l.titulo, count(dv.idLibro) as ventas from detalles_venta dv join libros l on dv.idLibro = l.idLibro join ventas v on dv.idVenta = v.idVenta where v.fecha >= date_sub(curdate(), interval 1 month) group by dv.idLibro order by ventas desc limit 5;"
    ); // Obtener los 5 libros más vendidos en el último mes.

    selectSalesByPeriod.push(
      'select sum(dv.cantidad) as total_libros_vendidos, concat("mes de ", date_sub(curdate(), interval 1 month), " al ", curdate()) as mes from detalles_venta dv join ventas v on dv.idVenta = v.idVenta where v.fecha >= date_sub(curdate(), interval 1 month);'
    ); // Obtener mes de reporte y total de libros vendidos.

    selectSalesByPeriod.push(
      "select g.nombreGenero, count(dv.idLibro) as ventas from detalles_venta dv join libros l on dv.idLibro = l.idLibro join genero g on l.genero = g.idGenero join ventas v on dv.idVenta = v.idVenta where v.fecha >= date_sub(curdate(), interval 1 month) group by l.genero order by ventas desc limit 5;"
    ); // Obtener los géneros más populares en el último mes.

    selectSalesByPeriod.push(
      "select sum(dv.subtotal) as total_ganancias from detalles_venta dv join ventas v on dv.idVenta = v.idVenta where v.fecha >= date_sub(curdate(), interval 1 month);"
    ); // Obtener el total de ganancias en el último mes.

    selectSalesByPeriod.push(
      "select titulo, precio from libros where created_at >= date_sub(now(), interval 1 month) and deleted_at is null order by created_at desc limit 10;"
    ); // Obtener la lista de los 10 registros más recientes de libros del último mes

    selectSalesByPeriod.push(`select sum(case when fecha = date_sub(curdate(), interval 1 month) then total else 0 end) as ventas_hace_1_mes, 
    sum(case when fecha = curdate() then total else 0 end) as ventas_hoy, concat(
      case when sum(case when fecha = curdate() then total else 0 end) > sum(case when fecha = date_sub(curdate(), interval 1 month) then total else 0 end) then "incremento del " else "decremento del " end,
      case when sum (case when fecha = date_sub(curdate(), interval 1 month) then total else 0 end) = 0 then "[incremento infinito]"
      else round(abs(((sum(case when fecha = curdate() then total else 0 end) - sum(case when fecha = date_sub(curdate(), interval 1 month) then total else 0 end)) / sum(case
        when fecha = date_sub(curdate(), interval 1 month) then total else 0 end)) * 100)) end,"%") as porcentaje_incremento_decremento
    from ventas 
    where fecha >= date_sub(curdate(), interval 1 month) and fecha <= curdate();`);
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
      res.status(500).json({
        error: "Error al obtener las ventas del periodo especificado",
      });
      console.error(error.message);
    });
};
