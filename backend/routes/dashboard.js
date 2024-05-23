const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

router.get("/", dashboardController.getGenresComparative);
router.get("/totalBooks", dashboardController.getTotalBooks);
router.get("/totalRevenue", dashboardController.getTotalRevenue);
router.get("/totalSales", dashboardController.getTotalSales);
router.get("/totalInvoices", dashboardController.getTotalInvoices);
router.get("/salesResume", dashboardController.getSalesResume);
router.get("/topSellers", dashboardController.getTopSellers);
router.get("/latest", dashboardController.getLastFiveBooks);

module.exports = router;