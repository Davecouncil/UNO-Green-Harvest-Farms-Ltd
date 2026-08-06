const express = require("express");
const router = express.Router();

const userControlRoom = require("../controlRoom/userControlRoom");
const { protect } = require("../middleware/authMiddleware");

// Logged-in user's own profile — must come before "/:id" routes
router.get("/me", protect, userControlRoom.getMe);
router.put("/me", protect, userControlRoom.updateMyProfile);
router.put("/me/password", protect, userControlRoom.changeMyPassword);

// Admin-style routes (operate on any user by ID)
router.get("/", protect, userControlRoom.getUsers);
router.get("/:id", protect, userControlRoom.getUserById);
router.put("/:id", protect, userControlRoom.updateUser);
router.delete("/:id", protect, userControlRoom.deleteUser);

module.exports = router;