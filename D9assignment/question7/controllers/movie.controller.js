const Movie = require('../models/movie.model');

// Create a new movie
const createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json({ message: 'Movie created successfully', movie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all movies with filtering, sorting, and pagination
const getMovies = async (req, res) => {
  try {
    const { q, title, rating, sortBy, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (q) filter.title = { $regex: q, $options: 'i' };
    if (title) filter.title = title;
    if (rating) filter.rating = rating;

    const movies = await Movie.find(filter)
      .sort(sortBy ? { [sortBy]: 1 } : {})
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single movie by ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a movie by ID
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json({ message: 'Movie updated successfully', movie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a movie by ID
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};
