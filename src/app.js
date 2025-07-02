const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users.routes.js');
const productRoutes = require('./routes/products.routes.js');
const authRoutes = require('./routes/auth.routes.js');
const { authMiddleware } = require('./middleware/auth.js');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/users',authMiddleware, userRoutes);
app.use('/api/products',authMiddleware, productRoutes);
app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

module.exports = app;