const express = require("express");
const router = express.Router();
const billController = require("../controllers/billController");

router.get("/books", billController.getBooks);
router.post("/save", billController.saveBill);

module.exports = router;