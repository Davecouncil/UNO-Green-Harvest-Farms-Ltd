const User = require("../models/userModel");

exports.sellerOnly = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found.",
            });
        }

        if (user.role !== "seller") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Sellers only.",
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};