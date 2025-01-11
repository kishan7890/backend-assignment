const User = require("../models/users.model");

const createUser = async (req, res) => {
  const { payload } = req.body;

  try {
    if (!payload || !payload.email) {
      return res.status(400).json({ message: "Email is required in the payload" });
    }

    const { email } = payload;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create and save user
    const users = new User(payload);
    await users.save();

    res.status(201).json({ message: "User created successfully", users });
  } catch (error) {
    console.error("Error creating user:", error); // Log error details
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { email } = req.params;
  const updates = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required in params" });
    }

    const user = await User.findOneAndUpdate({ email }, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { email } = req.params;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required in params" });
    }

    const user = await User.findOneAndDelete({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createUser, getUsers, updateUser, deleteUser };
