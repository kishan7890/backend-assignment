const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  stock: { type: Number, required: true, default: 0 },
  created_at: { type: Date, default: Date.now },
});


const Product = mongoose.model('Product', productSchema);

module.exports = {Product};