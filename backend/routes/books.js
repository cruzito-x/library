const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/", bookController.getAllBooks);
router.get("/latest", bookController.getLastFiveBooks);
router.get("/genres", bookController.getAllGenres);
router.post("/save", bookController.saveBook);
router.delete("/deleteBookUpdatedDeletedAt/:idLibro", bookController.deleteBookUpdatedDeletedAt);
router.put("/updateBook/:idLibro", bookController.updateBook);

module.exports = router;
