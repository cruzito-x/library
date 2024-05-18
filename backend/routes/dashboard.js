const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

router.get("/", dashboardController.getGenresComparative);
router.get("/salesResume", dashboardController.getSalesResume);
router.get("/topSellers", dashboardController.getTopSellers);
router.get("/latest", dashboardController.getLastFiveBooks);

module.exports = router;