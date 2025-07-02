// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const productRoutes = require('./routes/productRoutes');
// const userRoutes = require('./routes/userRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// const adminProductRoutes = require('./routes/adminProductRoutes');
// const orderRoutes = require('./routes/orderRoutes');

// const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/products', productRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/admin/products', adminProductRoutes);
// app.use('/api/orders', orderRoutes);


// app.get('/', (req, res) => {
//   res.send('Furniture E-Commerce API is running');
// });
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); 
const connectDB = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminProductRoutes = require('./routes/adminProductRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const wishlistRoutes = require("./routes/wishlist");
const profileRoutes = require("./routes/profileRoutes");
// Connect to MongoDB
connectDB();

const app = express();
app.use(express.static(path.join(__dirname, "frontend")));
// Middleware
app.use(cors({
  origin: "*",
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/products', adminProductRoutes);
app.use('/api/orders', orderRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/profile", profileRoutes);

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Base route
app.get('/', (req, res) => {
  res.send('Furniture E-Commerce API is running');
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
