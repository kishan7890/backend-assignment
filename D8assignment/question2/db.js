const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017/"; 
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client.db("LMS_DB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

module.exports = connectDB;
