const createProduct = (req, res) => {
  res.status(201).json({ message: 'Product created (admin)' });
};

const updateProduct = (req, res) => {
  res.json({ message: `Product ${req.params.id} updated (admin)` });
};

const deleteProduct = (req, res) => {
  res.json({ message: `Product ${req.params.id} deleted (admin)` });
};

const getAllProductsAdmin = (req, res) => {
  res.json({ message: 'All products for admin' });
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductsAdmin,
};
