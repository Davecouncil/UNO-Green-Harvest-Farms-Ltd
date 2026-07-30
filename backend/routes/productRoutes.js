const express = require("express");
const router = express.Router();

const productControlRoom = require("../ControlRoom/productControlRoom");

// Create a product
router.post("/", productControlRoom.createProduct);

// Get all products
router.get("/", productControlRoom.getProducts);

// Get a single product
router.get("/:id", productControlRoom.getProductById);

// Update a product
router.put("/:id", productControlRoom.updateProduct);

// Delete a product
router.delete("/:id", productControlRoom.deleteProduct);

module.exports = router;