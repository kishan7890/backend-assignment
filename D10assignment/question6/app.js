const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/products', productRoutes);

// MongoDB Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/Ecommerce')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;
