const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist"); // You must create this model
const Product = require("../models/Product");   // Optional: for .populate()

// 🟢 GET: Fetch user's wishlist
router.get("/:userId", async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId }).populate("items.productId");
    res.json(wishlist?.items || []);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
});

// 🟢 POST: Add a product to user's wishlist
router.post("/", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [{ productId }] });
    } else {
      const alreadyExists = wishlist.items.some(item => item.productId.toString() === productId);
      if (!alreadyExists) {
        wishlist.items.push({ productId });
      }
    }

    await wishlist.save();
    res.json(wishlist.items);
  } catch (err) {
    res.status(500).json({ error: "Failed to update wishlist" });
  }
});

// PATCH: Remove item from wishlist
router.patch('/:userId/remove', async (req, res) => {
  const { productId } = req.body;
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { userId: req.params.userId },
      { $pull: { items: { productId } } },
      { new: true }
    );
    res.json(wishlist.items);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item" });
  }
});

module.exports = router;
