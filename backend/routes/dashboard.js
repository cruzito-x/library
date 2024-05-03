const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

router.get("/", dashboardController.getGenresComparative);
router.get("/monthSales", dashboardController.getMonthSales);
router.get("/topSellers", dashboardController.getTopSellers);

module.exports = router;