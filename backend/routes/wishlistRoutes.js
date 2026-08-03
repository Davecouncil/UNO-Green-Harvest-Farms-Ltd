const express = require("express");
const router = express.Router();

const wishlistControlRoom = require("../controlRoom/wishlistControlRoom");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, wishlistControlRoom.addToWishlist);
router.get("/", protect, wishlistControlRoom.getWishlist);
router.delete("/:productId", protect, wishlistControlRoom.removeFromWishlist);
router.delete("/", protect, wishlistControlRoom.clearWishlist);

module.exports = router;