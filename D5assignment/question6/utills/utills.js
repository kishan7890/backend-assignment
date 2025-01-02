const fs = require("fs");
const path = require("path");

const dbFilePath = path.join(__dirname, "../db.json");

const readDb = () => {
    try {
        const data = fs.readFileSync(dbFilePath, "utf8");
        return data.trim() ? JSON.parse(data) : { users: [], todos: [] }; // Handle empty file
    } catch (error) {
        console.error("Error reading db.json:", error);
        return { users: [], todos: [] }; // Default structure if file is missing or unreadable
    }
};

const writeDb = (data) => {
    try {
        fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error writing to db.json:", error);
    }
};

module.exports = { readDb, writeDb };
