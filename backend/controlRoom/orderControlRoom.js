const mongoose = require("mongoose");
const Order = require("../models/orderModel");

// ==========================
// Create Order
// ==========================
exports.createOrder = async (req, res) => {

    try {

        const {
            user,
            items,
            shippingAddress,
            paymentMethod,
            subtotal,
            shippingFee,
            totalPrice
        } = req.body;

        if (
            !user ||
            !items ||
            items.length === 0 ||
            !shippingAddress ||
            !paymentMethod ||
            subtotal == null ||
            totalPrice == null
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields."
            });
        }

        const order = await Order.create({
            user,
            items,
            shippingAddress,
            paymentMethod,
            subtotal,
            shippingFee,
            totalPrice
        });

        res.status(201).json({
            success: true,
            message: "Order created successfully.",
            order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==========================
// Get User Orders
// ==========================
exports.getOrders = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("user")
            .populate("items.product");

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==========================
// Get Single Order
// ==========================
exports.getOrderById = async (req, res) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order ID."
            });
        }

        const order = await Order.findById(req.params.id)
            .populate("user")
            .populate("items.product");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }

        res.status(200).json({
            success: true,
            order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==========================
// Update Order Status
// ==========================
exports.updateOrder = async (req, res) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order ID."
            });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Order updated successfully.",
            updatedOrder
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Order

exports.deleteOrder = async (req, res) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order ID."
            });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }

        await Order.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Order deleted successfully."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};