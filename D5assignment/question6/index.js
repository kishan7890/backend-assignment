const express = require('express');
const app = express();
const usersRouter = require('./routes/users.js');
const todosRouter = require('./routes/todos.js');

app.use(express.json()); // Middleware to parse JSON

// Routes
app.use('/users', usersRouter);
app.use('/todos', todosRouter);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
