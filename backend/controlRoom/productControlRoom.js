const Product = require("../Models/productModel");

// Create Product
const createProduct = async (req, res) => {
    try {

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            image: req.body.image,
            price: req.body.price,
            stock: req.body.stock,
            featured: req.body.featured
        });

        await product.save();

        res.status(201).json({
            success: true,
            message: "Product created successfully.",
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Products
const getProducts = async (req, res) => {

    try {

        const products = await Product.find();

        res.status(200).json({
            success: true,
            total: products.length,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Single Product
const getProductById = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found."
            });

        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Product
const updateProduct = async (req, res) => {

    try {

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found."
            });

        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Product
const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found."
            });

        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};