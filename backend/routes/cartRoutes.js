const express = require("express");
const router = express.Router();

const cartControlRoom = require("../controlRoom/cartControlRoom");

// Add product to cart
router.post("/", cartControlRoom.addToCart);

// Get user's cart
router.get("/", cartControlRoom.getCart);

// Update quantity
router.put("/:productId", cartControlRoom.updateCart);

// Remove product from cart
router.delete("/:productId", cartControlRoom.removeFromCart);

// Clear cart
router.delete("/", cartControlRoom.clearCart);

module.exports = router;