const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUsers);
router.post("/save", userController.saveUser);
router.delete("/deleteUserUpdatedDeletedAt/:idUsuario", userController.deleteUserUpdatedAt);

module.exports = router;