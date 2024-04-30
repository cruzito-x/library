const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// Rutas
router.get("/", bookController.getAllBooks);
router.post("/", bookController.saveBook);

module.exports = router;
