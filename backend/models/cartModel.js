// const mongoose = require('mongoose');

// const cartItemSchema = new mongoose.Schema(
//   {
//     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//     quantity: { type: Number, required: true, min: 1 },
//     priceAtAdd: { type: Number, required: true }, // snapshot so cart total doesn't shift if seller edits price
//   },
//   { _id: false }
// );

// const cartSchema = new mongoose.Schema(
//   {
//     buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
//     items: [cartItemSchema],
//   },
//   { timestamps: true }
// );

// const Cart = mongoose.model('Cart', cartSchema);

// module.exports = Cart;
const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1
    }
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    items: [cartItemSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Cart", cartSchema);