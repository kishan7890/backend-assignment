const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/signup") {
    // Render the signup form
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Signup</title>
      </head>
      <body>
        <h2>Signup Form</h2>
        <form action="/signup" method="POST">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required><br><br>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required><br><br>
          <button type="submit">Signup</button>
        </form>
      </body>
      </html>
    `);
  } else if (req.method === "POST" && req.url === "/signup") {
    // Handle form submission
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const formData = new URLSearchParams(body);
      const username = formData.get("username");
      const password = formData.get("password");

      // Store username and password in user.txt
      const userEntry = `Username: ${username}, Password: ${password}\n`;
      fs.appendFile("user.txt", userEntry, (err) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/plain");
          res.end("Server Error");
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/plain");
          res.end("Thank You for Signup...!!!");
        }
      });
    });
  } else if (req.method === "GET" && req.url === "/allusers") {
    // Display all users (excluding passwords)
    fs.readFile("user.txt", "utf8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Server Error");
      } else {
        const users = data
          .split("\n")
          .filter((line) => line.trim() !== "")
          .map((line) => line.split(",")[0].replace("Password: ", "").trim())
          .join("<br>");
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>All Users</title>
          </head>
          <body>
            <h2>All Registered Users</h2>
            ${users ? users : "<p>No users found.</p>"}
          </body>
          </html>
        `);
      }
    });
  } else {
    // Handle unknown routes
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("404 Not Found");
  }
});

server.listen(8080, () => {
  console.log("Server is running at http://localhost:8080");
});
