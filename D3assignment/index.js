const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.url === "/index") {
    const filePath = path.join(__dirname, "index.js");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Server Error");
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/javascript");
        res.end(data);
      }
    });
  }else if(req.url === "/"){
    res.statusCode = 200;
    res.setHeader("Content-type","text/plain");
    res.end("Welcome To Home Page");
  }else if(req.url === "/aboutus"){
    res.statusCode = 200;
    res.setHeader("Content-type","text/html");
    res.end("<h3>Welcome To Home Page</h3>");
  }else if(req.url === "/contactus"){
    res.statusCode = 200;
    res.setHeader("Content-type","text/html");
    res.end(`<a href="https://www.masaischool.com" target="_blank">Contact us at www.masaischool.com</a>`);
  }
   else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found");
  }
});

server.listen(8080, () => {
  console.log(`Server is listening on port http://localhost:8080`);
});

