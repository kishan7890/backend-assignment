const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
  releaseYear: { type: Number },
  description: { type: String },
});

module.exports = mongoose.model('Movie', movieSchema);
