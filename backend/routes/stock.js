const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");

router.get("/", stockController.getStock);
router.delete("/deleteStockUpdatedDeletedAt/:idLibro", stockController.deleteStockUpdatedDeletedAt);
router.put("/updateStock/:idLibro", stockController.updateStock);

module.exports = router;