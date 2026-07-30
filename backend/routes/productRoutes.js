const express = require("express");
const router = express.Router();

// const productControlRoom = require("../controlRoom/productControlRoom");
const productControlRoom = require("../controlRoom/productControlRoom");

router.post("/", productControlRoom.createProduct);

router.get("/", productControlRoom.getProducts);

router.get("/:id", productControlRoom.getProductById);

router.put("/:id", productControlRoom.updateProduct);

router.delete("/:id", productControlRoom.deleteProduct);

module.exports = router;