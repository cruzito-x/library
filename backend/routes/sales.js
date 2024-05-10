const express = require("express");
const router = express.Router();
const salesController = require("../controllers/saleController");

router.get("/", salesController.getSalesData);

module.exports = router;