const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/", bookController.getAllBooks);
router.get("/latest", bookController.getLastFiveBooks);
router.post("/", bookController.saveBook);
router.delete("/deleteBookUpdatedDeletedAt/:idLibro", bookController.deleteBookUpdatedDeletedAt); // Nuevo endpoint

module.exports = router;
