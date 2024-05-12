const express = require("express");
const router = express.Router();
const salesController = require("../controllers/saleController");

router.get("/", salesController.getSales);
router.get("/getSalesReportData", salesController.getSalesReportData);

module.exports = router;