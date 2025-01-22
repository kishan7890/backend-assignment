const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
require('dotenv').config();

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'Email is already registered' });
    }

    // Fetch salt rounds from .env
    const saltRounds = Number(process.env.SALT_ROUNDS);

    // Hash the password with the salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

module.exports = router;
