const express = require('express');
const router = express.Router();
const { readDb, writeDb } = require("../utills/utills");

// Get todos from db.json
router.get('/', (req, res) => {
    const db = readDb();
    res.json(db.todos);
});

// Add a new todo
router.post('/', (req, res) => {
    const db = readDb();
    const newTodo = { id: db.todos.length + 1, ...req.body };
    db.todos.push(newTodo);
    writeDb(db);
    res.status(201).json(newTodo);
});

// Update a todo by ID
router.put('/:id', (req, res) => {
    const db = readDb();
    const todoIndex = db.todos.findIndex(todo => todo.id === parseInt(req.params.id));

    if (todoIndex !== -1) {
        db.todos[todoIndex] = { ...db.todos[todoIndex], ...req.body };
        writeDb(db);
        res.json(db.todos[todoIndex]);
    } else {
        res.status(404).send('Todo not found');
    }
});

// Delete a todo by ID
router.delete('/:id', (req, res) => {
    const db = readDb();
    const todoIndex = db.todos.findIndex(todo => todo.id === parseInt(req.params.id));

    if (todoIndex !== -1) {
        const deletedTodo = db.todos.splice(todoIndex, 1);
        writeDb(db);
        res.json(deletedTodo);
    } else {
        res.status(404).send('Todo not found');
    }
});

module.exports = router;
