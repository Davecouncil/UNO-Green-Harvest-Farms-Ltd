const express = require("express");
const router = express.Router();

const productControlRoom = require("../controlRoom/productControlRoom");
const { protect } = require("../middleware/authMiddleware");
const { sellerOnly } = require("../middleware/sellerMiddleware");

router.post("/", protect, sellerOnly, productControlRoom.createProduct);

router.get("/", productControlRoom.getProducts);

router.get("/:id", productControlRoom.getProductById);

router.put("/:id", protect, sellerOnly, productControlRoom.updateProduct);

router.delete("/:id", protect, sellerOnly, productControlRoom.deleteProduct);

// router.get("/categories/list", productControlRoom.getCategories);

module.exports = router;