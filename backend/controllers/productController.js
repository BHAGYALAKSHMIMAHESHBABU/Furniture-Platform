const Product = require('../models/Product');

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, discount, category, imageUrl } = req.body;
    const product = new Product({ name, description, price, discount, category, imageUrl });
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });
    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).json({ message: 'No products found in this category' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  getProductsByCategory,updateProduct
};
