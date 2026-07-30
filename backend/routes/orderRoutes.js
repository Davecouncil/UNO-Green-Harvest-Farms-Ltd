const express = require("express");
const router = express.Router();

const orderControlRoom = require("../controlRoom/orderControlRoom");

// Create order
router.post("/", orderControlRoom.createOrder);

// Get all orders
router.get("/", orderControlRoom.getOrders);

// Get one order
router.get("/:id", orderControlRoom.getOrderById);

// Update order
router.put("/:id", orderControlRoom.updateOrder);

// Delete order
router.delete("/:id", orderControlRoom.deleteOrder);

module.exports = router;