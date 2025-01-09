const { MongoClient, ObjectId } = require("mongodb");

// MongoDB Connection URL and Database Name
const url = "mongodb://127.0.0.1:27017/";
const dbName = "LMS_DB";

async function setupDatabase() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db(dbName);

    // Create 'users' collection and insert sample data
    const usersCollection = db.collection("users");
    await usersCollection.insertMany([
      { name: "Alice Johnson", email: "alice@example.com", role: "admin" },
      { name: "Bob Smith", email: "bob@example.com", role: "instructor" },
      { name: "Charlie Brown", email: "charlie@example.com", role: "student" },
    ]);

    // Create 'courses' collection and insert sample data
    const coursesCollection = db.collection("courses");
    await coursesCollection.insertMany([
      { title: "Introduction to Programming", instructor: "Bob Smith", duration: "6 weeks", maximumCapacity: 30 },
      { title: "Data Structures", instructor: "Bob Smith", duration: "8 weeks", maximumCapacity: 25 },
      { title: "Database Systems", instructor: "Bob Smith", duration: "10 weeks", maximumCapacity: 20 },
      { title: "Web Development", instructor: "Alice Johnson", duration: "12 weeks", maximumCapacity: 40 },
      { title: "Machine Learning", instructor: "Bob Smith", duration: "14 weeks", maximumCapacity: 15 },
    ]);

    console.log("Sample data inserted successfully!");
  } catch (err) {
    console.error("Error setting up the database:", err);
  } finally {
    await client.close();
  }
}

setupDatabase();
