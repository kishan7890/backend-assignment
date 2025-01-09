const connectDB = require("./db");

async function run() {
  const db = await connectDB();

  const coursesCollection = db.collection("courses");
  const usersCollection = db.collection("users");

  // CRUD Operations for Courses
  // Create a course
  await coursesCollection.insertOne({
    title: "Introduction to MongoDB",
    instructor: "John Doe",
    capacity: 50,
    duration: "4 weeks",
    created_at: new Date(),
    updated_at: new Date(),
  });
  console.log("Course created!");

  // Read all courses
  const courses = await coursesCollection.find({}).toArray();
  console.log("Courses:", courses);

  // Update a course
  await coursesCollection.updateOne(
    { title: "Introduction to MongoDB" },
    { $set: { title: "Advanced MongoDB", updated_at: new Date() } }
  );
  console.log("Course updated!");

  // Delete a course
  await coursesCollection.deleteOne({ title: "Advanced MongoDB" });
  console.log("Course deleted!");

  // CRUD Operations for Users
  // Create a user
  await usersCollection.insertOne({
    name: "Alice",
    email: "alice@example.com",
    role: "student",
    created_at: new Date(),
    updated_at: new Date(),
  });
  console.log("User created!");

  // Read all users
  const users = await usersCollection.find({}).toArray();
  console.log("Users:", users);

  // Update a user
  await usersCollection.updateOne(
    { name: "Alice" },
    { $set: { email: "alice.new@example.com", updated_at: new Date() } }
  );
  console.log("User updated!");

  // Delete a user
  await usersCollection.deleteOne({ name: "Alice" });
  console.log("User deleted!");
}

run().catch(console.dir);
