const Wishlist = require("../models/wishlistModel");
const Product = require("../models/productModel");

// ==========================
// Get Wishlist
// ==========================
exports.getWishlist = async (req, res) => {

    try {

        // Code here

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

        // Code here

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

        // Code here

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

        // Code here

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};