const mongoose = require('mongoose');

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

// Models
const Category = mongoose.model('Category', categorySchema);

module.exports = {Category};
