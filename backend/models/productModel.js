// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema(
//   {
//     sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true, min: 0 },
//     category: { type: String, required: true },
//     stock: { type: Number, required: true, min: 0, default: 0 },
//     images: [{ type: String }],
//   },
//   { timestamps: true }
// );

// const Product = mongoose.model('Product', productSchema);

// module.exports = Product;
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
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);