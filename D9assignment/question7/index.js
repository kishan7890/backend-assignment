const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const movieRoutes = require('./routes/movie.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use('/api', movieRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
  })
  .catch((error) => console.log('Error connecting to MongoDB:', error));
