const express = require("express");
const router = express.Router();
const genreController = require("../controllers/genreController");

router.get("/", genreController.getGenres);
router.get("/:idGenero/libros", genreController.getBooksByGenre);
router.post("/save", genreController.saveGenre);
router.delete("/deleteGenreUpdatedDeletedAt/:idGenero", genreController.deleteGenreUpdatedDeletedAt);
router.put("/updateGenre/:idGenero", genreController.updateGenre);

module.exports = router;