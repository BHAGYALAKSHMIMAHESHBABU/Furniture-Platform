const express = require('express');
const router = express.Router();
const {
  getProducts,
  createProduct,
  getProductById,
  getProductsByCategory,
  updateProduct, // ✅ Add this
} = require('../controllers/productController');

// Routes
router.get('/', getProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct); // ✅ Works now!

module.exports = router;
