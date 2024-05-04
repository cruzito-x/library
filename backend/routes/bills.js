const express = require("express");
const router = express.Router();
const billController = require("../controllers/billController");

router.get("/", billController.getBooks);

module.exports = router;