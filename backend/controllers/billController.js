const db = require("../config/db");
const paypal = require('@paypal/checkout-server-sdk');
const crypto = require("crypto");
const { clientId, clientSecret } = require('../config/paypal');

exports.getBooks = (req, res) => {
  const selectBooks = "select l.idLibro as value, l.titulo as label, l.autor, l.precio from libros l inner join existencias e on e.idLibro = l.idLibro inner join genero g on g.idGenero = l.genero where (l.deleted_at is null and e.deleted_at is null and g.deleted_at is null) and e.existencia > 0;";

  db.query(selectBooks, (error, results) => {
    if (error) {
        console.error("Error al obtener los libros:", error.message);
        res.status(500).json({ status: 500, message: "Error interno del servidor" });
        return;
      }
      res.status(200).json(results);
    }
  );
};

exports.saveBill = (req, res) => {
  const { selectedBooks, nombre, apellido, idUsuario } = req.body;
  const idVenta = crypto.createHash("md5").update(new Date().toISOString()).digest("hex");
  const idCliente = crypto.createHash("md5").update(new Date().toISOString()).digest("hex");
  const total = selectedBooks.reduce((acumuladorTotal, book) => acumuladorTotal + parseFloat(book.total), 0).toFixed(2);
  const insertSale = "insert into ventas (idVenta, fecha, total, estado, created_at) values (?, now(), ?, 'completado', curdate());";
  const insertClient = "insert into clientes (idCliente, nombre, apellido, metodoPago, created_at) values (?, ?, ?, ?, curdate());";
  const updateStock = "update existencias as ex inner join detalles_venta as dv on ex.idLibro = dv.idLibro set ex.existencia = ex.existencia - dv.cantidad where dv.idVenta = ?;";
  const saleDetailsValues = selectedBooks.map(book => [idVenta, idVenta, idCliente, book.value, idUsuario, book.cantidad, book.precioUnitario, book.subtotal, book.descuento, new Date()]);
  const insertSaleDetails = "insert into detalles_venta (idDetalleVenta, idVenta, idCliente, idLibro, idUsuario, cantidad, precioUnitario, subtotal, descuento, created_at) values ?;";

  db.beginTransaction(error => {
    if (error) {
      console.error('Error starting transaction: ', error.message);
      res.status(500).json({ status: 500, message: 'Error interno del servidor' });
      return;
    }

    db.query(insertClient, [idCliente, nombre, apellido, "efectivo"], (error, result) => {
      if (error) {
        console.error("Error al insertar cliente: ", error.message);
        return db.rollback(() => {
          res.status(500).json({ status: 500, message: "Error interno del servidor" });
        });
      }
      
      db.query(insertSale, [idVenta, total], (error, result) => {
        if (error) {
          console.error("Error al insertar venta: ", error.message);
          return db.rollback(() => {
            res.status(500).json({ status: 500, message: "Error interno del servidor" });
          });
        }

        db.query(insertSaleDetails, [saleDetailsValues], (error, result) => {
          if (error) {
            console.error("Error al insertar detalles de venta: ", error.message);
            return db.rollback(() => {
              res.status(500).json({ status: 500, message: "Error interno del servidor" });
            });
          }

          db.query(updateStock, [idVenta], (error, result) => {
            if (error) {
              console.error("Error al actualizar existencia: ", error.message);
              return db.rollback(() => {
                res.status(500).json({ status: 500, message: "Error interno del servidor" });
              });
            }

            db.commit(error => {
              if (error) {
                console.error("Error committing transaction: ", error.message);
                return db.rollback(() => {
                  res.status(500).json({ status: 500, message: "Error interno del servidor" });
                });
              }
              res.status(200).json({ status: 200, message: "Factura guardada exitosamente" });
            });
          });
        });
      });
    });
  });
};

const environment = new paypal.core.LiveEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

exports.createOrder = async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: '10.00' // Aquí debes poner el total de la compra
      }
    }]
  });

  try {
    const response = await client.execute(request);
    res.json({ orderId: response.result.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.captureOrder = async (req, res) => {
  const orderId = req.body.orderId;
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const response = await client.execute(request);
    res.json(response.result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
