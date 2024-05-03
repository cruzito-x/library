const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/", bookController.getBooks);
router.get("/latest", bookController.getLastFiveBooks);
router.get("/genres", bookController.getGenres);
router.post("/save", bookController.saveBook);
router.post("/images/upload", bookController.upload);
router.delete("/deleteBookUpdatedDeletedAt/:idLibro", bookController.deleteBookUpdatedDeletedAt);
router.put("/updateBook/:idLibro", bookController.updateBook);

module.exports = router;