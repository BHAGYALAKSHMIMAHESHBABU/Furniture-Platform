const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductsAdmin,
} = require('../controllers/adminController');

router.use(protect);
router.use(admin);

router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/products', getAllProductsAdmin);

module.exports = router;
