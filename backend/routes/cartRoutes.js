const express = require("express");
const router = express.Router();

const cartControlRoom = require("../controlRoom/cartControlRoom");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, cartControlRoom.addToCart);
router.get("/", protect, cartControlRoom.getCart);
router.put("/:productId", protect, cartControlRoom.updateCart);
router.delete("/:productId", protect, cartControlRoom.removeFromCart);
router.delete("/", protect, cartControlRoom.clearCart);

module.exports = router;