const express = require("express");
const router = express.Router();

const authControlRoom = require("../controlRoom/authControlRoom");

router.post("/signup", authControlRoom.signup);
router.post("/login", authControlRoom.login);
router.get("/profile", authControlRoom.profile);

module.exports = router;
