// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order');
// const verifyToken = require('../middleware/verifyToken');

// // 🟢 POST: Place a new order
// router.post('/', async (req, res) => {
//   try {
//     const order = new Order(req.body);
//     const saved = await order.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to place order' });
//   }
// });

// // 🟢 GET: Get all orders
// router.get('/', async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch orders' });
//   }
// });

// router.get('/user/:userId', verifyToken, async (req, res) => {
//   console.log("🔍 Authenticated user ID:", req.user.id);
//   console.log("🧾 Requested user ID:", req.params.userId);

//   if (String(req.user.id) !== String(req.params.userId)) {
//     return res.status(403).json({ error: 'Unauthorized access' });
//   }

//   try {
//     const userOrders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//     res.json(userOrders);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch user orders' });
//   }
// });



// module.exports = router;
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const verifyToken = require('../middleware/verifyToken');

// 🟢 POST: Place a new order (used by users)
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to place order' });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name') // Correct field
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});


// 🟢 GET: Get user-specific orders (with token verification)
router.get('/user/:userId', verifyToken, async (req, res) => {
  console.log("🔍 Authenticated user ID:", req.user.id);
  console.log("🧾 Requested user ID:", req.params.userId);

  if (String(req.user.id) !== String(req.params.userId)) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }

  try {
    const userOrders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(userOrders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user orders' });
  }
});


// ✅ PUT: Toggle shipped status (admin only - no auth added for simplicity)
router.put('/:id/ship', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    order.shipped = !order.shipped;
    const updated = await order.save();
    res.json({ message: 'Shipped status updated', shipped: updated.shipped });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update shipped status' });
  }
});

// PATCH: Update order status
router.patch('/:orderId/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

module.exports = router;
