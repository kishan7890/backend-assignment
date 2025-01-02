const express = require('express');
const router = express.Router();
const { readDb, writeDb } = require('../utills/utills');

// Get users from db.json
router.get('/', (req, res) => {
    const db = readDb();
    res.json(db.users);
});

// Add a new user
router.post('/', (req, res) => {
    const db = readDb();
    const newUser = { id: db.users.length + 1, ...req.body };
    db.users.push(newUser);
    writeDb(db);
    res.status(201).json(newUser);
});

// Update a user by ID
router.put('/:id', (req, res) => {
    const db = readDb();
    const userIndex = db.users.findIndex(user => user.id === parseInt(req.params.id));

    if (userIndex !== -1) {
        db.users[userIndex] = { ...db.users[userIndex], ...req.body };
        writeDb(db);
        res.json(db.users[userIndex]);
    } else {
        res.status(404).send('User not found');
    }
});

// Delete a user by ID
router.delete('/:id', (req, res) => {
    const db = readDb();
    const userIndex = db.users.findIndex(user => user.id === parseInt(req.params.id));

    if (userIndex !== -1) {
        const deletedUser = db.users.splice(userIndex, 1);
        writeDb(db);
        res.json(deletedUser);
    } else {
        res.status(404).send('User not found');
    }
});

module.exports = router;
