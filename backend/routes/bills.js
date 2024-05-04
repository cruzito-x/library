const express = require("express");
const router = express.Router();
const billController = require("../controllers/billController");

router.get("/books", billController.getBooks);

module.exports = router;