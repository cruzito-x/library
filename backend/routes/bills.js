const express = require("express");
const router = express.Router();
const billController = require("../controllers/billController");

router.get("/books", billController.getBooks);
router.post("/save", billController.saveBill);
router.post("/create-order", billController.createOrder);
router.post("/capture-order", billController.captureOrder);

module.exports = router;