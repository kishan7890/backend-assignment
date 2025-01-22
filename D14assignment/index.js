const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', todoRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(3000, () => console.log('Server running on port 3000')))
  .catch((error) => console.error(error));
