const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const {readDb, writeDb} = require("./utills/utills")


const app = express()

app.use(express.json());

// Create a write stream for logs
const logStream = fs.createWriteStream(path.join(__dirname, "src", "access.log"), { flags: "a" });


app.use(morgan(':method :status :res[content-length] - :response-time ms :date[iso] HTTP/:http-version :url ', { stream: logStream }));

app.get("/", (req, res) => {
    res.status(200).send("Welcome to the Express server!");
  });

app.get("/get-users", (req, res) => {
    const db = readDb()
    res.status(200).json(db.users);
});

app.post("/get-users",(req,res)=>{
    const db = readDb();
    const newUser = { id: db.users.length + 1, ...req.body };
    db.users.push(newUser);
    writeDb(db);
    res.status(201).json(newUser);
})

app.put('/:id', (req, res) => {
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
app.delete('/:id', (req, res) => {
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




app.listen(8080,()=>{
    console.log(`app is running on http://localhost:8080`)
})