// backend/controllers/adminProductController.js
const Product = require('../models/Product');

// @desc    Get all products (admin)
// @route   GET /api/admin/products
// @access  Private/Admin
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new product
// @route   POST /api/admin/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: 'Invalid product data' });
  }
};

// @desc    Update a product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    Object.assign(product, req.body);
    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update product' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.remove();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
