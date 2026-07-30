// const mongoose = require('mongoose');

// const orderItemSchema = new mongoose.Schema(
//   {
//     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//     title: { type: String, required: true },   // snapshot at checkout time
//     price: { type: Number, required: true },   // snapshot at checkout time
//     quantity: { type: Number, required: true, min: 1 },
//   },
//   { _id: false }
// );

// const orderSchema = new mongoose.Schema(
//   {
//     buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     items: [orderItemSchema],
//     totalAmount: { type: Number, required: true },
//     status: {
//       type: String,
//       enum: ['pending', 'paid', 'shipped', 'completed', 'cancelled'],
//       default: 'pending',
//     },
//   },
//   { timestamps: true }
// );

// const Order = mongoose.model('Order', orderSchema);

// module.exports = Order;
const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    price: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: [orderItemSchema],

    shippingAddress: {
      street: {
        type: String,
        required: true
      },

      city: {
        type: String,
        required: true
      },

      state: {
        type: String,
        required: true
      },

      postalCode: {
        type: String,
        required: true
      },

      country: {
        type: String,
        required: true
      }
    },

    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Card", "PayPal", "Mobile Money"],
      required: true
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending"
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled"
      ],
      default: "Pending"
    },

    subtotal: {
      type: Number,
      required: true
    },

    shippingFee: {
      type: Number,
      default: 0
    },

    totalPrice: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", orderSchema);