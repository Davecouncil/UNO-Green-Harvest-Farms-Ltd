const express = require("express");
const router = express.Router();

const userControlRoom = require("../controlRoom/userControlRoom");

router.get("/", userControlRoom.getUsers);
router.get("/:id", userControlRoom.getUserById);
router.put("/:id", userControlRoom.updateUser);
router.delete("/:id", userControlRoom.deleteUser);

module.exports = router;