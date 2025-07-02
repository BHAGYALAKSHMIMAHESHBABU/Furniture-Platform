const express = require('express');
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/adminProductController');

const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.use(protect);
router.use(admin);

router.route('/')
  .get(getProducts)
  .post(createProduct);

router.route('/:id')
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
