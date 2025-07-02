const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },

  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },

  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, default: "Pending" }, // Optional

  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      qty: Number
    }
  ],

  total: { type: Number, required: true },

  deliveryDate: { type: String },
  deliveryTime: { type: String },
  status: { type: String, default: "Order Confirmed" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);