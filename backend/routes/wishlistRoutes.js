const express = require("express");
const router = express.Router();

const wishlistControlRoom = require("../controlRoom/wishlistControlRoom");

// Add to wishlist
router.post("/", wishlistControlRoom.addToWishlist);

// Get wishlist
router.get("/", wishlistControlRoom.getWishlist);

// Remove from wishlist
router.delete("/:productId", wishlistControlRoom.removeFromWishlist);

// Clear wishlist
router.delete("/", wishlistControlRoom.clearWishlist);

module.exports = router;