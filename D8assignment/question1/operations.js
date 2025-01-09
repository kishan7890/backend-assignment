const { MongoClient } = require("mongodb");

// MongoDB Connection URL and Database Name
const url = "mongodb://127.0.0.1:27017/";
const dbName = "LMS_DB";

async function performOperations() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db(dbName);

    // Fetch all users
    const users = await db.collection("users").find().toArray();
    console.log("All Users:", users);

    // Fetch all courses
    const courses = await db.collection("courses").find().toArray();
    console.log("All Courses:", courses);

    // Fetch specific users based on role (e.g., instructors)
    const instructors = await db.collection("users").find({ role: "instructor" }).toArray();
    console.log("Instructors:", instructors);

  } catch (err) {
    console.error("Error performing operations:", err);
  } finally {
    await client.close();
  }
}

performOperations();
