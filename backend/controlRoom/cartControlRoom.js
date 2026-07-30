const mongoose = require("mongoose");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// ==========================
// Get Cart
// ==========================
exports.getCart = async (req, res) => {
    try {

        const { userId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID."
            });
        }

        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found."
            });
        }

        res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ==========================
// Add Product to Cart
// ==========================
exports.addToCart = async (req, res) => {

    try {

        const { userId, productId, quantity } = req.body;

        if (
            !mongoose.Types.ObjectId.isValid(userId) ||
            !mongoose.Types.ObjectId.isValid(productId)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID."
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: []
            });
        }

        const existingItem = cart.items.find(
            item => item.product.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity || 1;
        } else {
            cart.items.push({
                product: productId,
                quantity: quantity || 1
            });
        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product added to cart.",
            cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==========================
// Update Cart
// ==========================
exports.updateCart = async (req, res) => {

    try {

        const { userId, quantity } = req.body;
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found."
            });
        }

        const item = cart.items.find(
            item => item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart."
            });
        }

        item.quantity = quantity;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart updated.",
            cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==========================
// Remove Item
// ==========================
exports.removeFromCart = async (req, res) => {

    try {

        const { userId } = req.body;
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found."
            });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product removed from cart.",
            cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==========================
// Clear Cart
// ==========================
exports.clearCart = async (req, res) => {

    try {

        const { userId } = req.body;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found."
            });
        }

        cart.items = [];

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart cleared.",
            cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};