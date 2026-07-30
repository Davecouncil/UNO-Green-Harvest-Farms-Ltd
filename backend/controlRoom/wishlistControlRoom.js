const mongoose = require("mongoose");
const Wishlist = require("../models/wishlistModel");
const Product = require("../models/productModel");

// ==========================
// Get Wishlist
// ==========================
exports.getWishlist = async (req, res) => {
    try {

        const { userId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID."
            });
        }

        const wishlist = await Wishlist.findOne({ user: userId })
            .populate("products");

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist not found."
            });
        }

        res.status(200).json({
            success: true,
            wishlist
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ==========================
// Add Product to Wishlist
// ==========================
exports.addToWishlist = async (req, res) => {
    try {

        const { userId, productId } = req.body;

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

        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = await Wishlist.create({
                user: userId,
                products: []
            });
        }

        const exists = wishlist.products.some(
            id => id.toString() === productId
        );

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Product already in wishlist."
            });
        }

        wishlist.products.push(productId);

        await wishlist.save();

        res.status(200).json({
            success: true,
            message: "Product added to wishlist.",
            wishlist
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ==========================
// Remove Product From Wishlist
// ==========================
exports.removeFromWishlist = async (req, res) => {
    try {

        const { userId } = req.body;
        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist not found."
            });
        }

        wishlist.products = wishlist.products.filter(
            id => id.toString() !== productId
        );

        await wishlist.save();

        res.status(200).json({
            success: true,
            message: "Product removed from wishlist.",
            wishlist
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ==========================
// Clear Wishlist
// ==========================
exports.clearWishlist = async (req, res) => {
    try {

        const { userId } = req.body;

        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist not found."
            });
        }

        wishlist.products = [];

        await wishlist.save();

        res.status(200).json({
            success: true,
            message: "Wishlist cleared.",
            wishlist
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};