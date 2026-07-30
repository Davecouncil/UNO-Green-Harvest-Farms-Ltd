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
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    category: {
      type: String,
      required: true
    },

    image: {
      type: String,
      required: true
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    reviews: {
      type: Number,
      default: 0
    },

    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);