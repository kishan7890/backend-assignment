const express = require('express');
const Todo = require('../models/todo');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create Todo
router.post('/todos', authMiddleware, async (req, res) => {
  try {
    const { title, description, isPublic } = req.body;
    const todo = new Todo({
      title,
      description,
      isPublic,
      userId: req.userId,
    });
    await todo.save();
    res.status(201).send(todo);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Read Todos
router.get('/todos', authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({
      $or: [{ userId: req.userId }, { isPublic: true }],
    });
    res.status(200).send(todos);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Update Todo
router.patch('/todos/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!updatedTodo) return res.status(404).send({ error: 'Todo not found' });
    res.status(200).send(updatedTodo);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Delete Todo
router.delete('/todos/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findOneAndDelete({ _id: id, userId: req.userId });
    if (!deletedTodo) return res.status(404).send({ error: 'Todo not found' });
    res.status(200).send({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
