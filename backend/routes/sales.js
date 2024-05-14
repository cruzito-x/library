const express = require("express");
const router = express.Router();
const saleController = require("../controllers/saleController");

router.get("/", saleController.getSales);
router.get("/getSalesReportData", saleController.getSalesReportData);

module.exports = router;