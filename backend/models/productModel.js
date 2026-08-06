const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
        },

        description: {
            type: String,
            required: [true, "Product description is required"],
        },

        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: 0,
        },

        originalPrice: {
            type: Number,
            min: 0,
        },

        category: {
            type: String,
            required: [true, "Product category is required"],
        },

        stock: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },

        image: {
            type: String,
            default: "",
        },

        unit: {
            type: String,
            default: "kg",
        },

        badge: {
            type: String,
            default: "None",
        },

        origin: {
            type: String,
            default: "",
        },

        certifications: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);