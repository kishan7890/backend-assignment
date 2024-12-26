const fs = require("fs");
const path = require("path");

const operation = process.argv[2];
const file = process.argv[3];
const content = process.argv[4];

switch (operation) {
  case "read":
    if (!file) {
      console.log("Please specify a file to read.");
    } else {
      fs.readFile(file, "utf8", (err, data) => {
        if (err) {
          console.error(`Error reading file '${file}':`, err.message);
        } else {
          console.log(data);
        }
      });
    }
    break;

  case "create":
    if (!file) {
      console.log("Please specify a file to create.");
    } else {
      fs.writeFile(file, "", (err) => {
        if (err) {
          console.error(`Error creating file '${file}':`, err.message);
        } else {
          console.log(`File '${file}' created.`);
        }
      });
    }
    break;

  case "append":
    if (!file || !content) {
      console.log("Please specify a file and content to append.");
    } else {
      fs.appendFile(file, `\n${content}`, (err) => {
        if (err) {
          console.error(`Error appending to file '${file}':`, err.message);
        } else {
          console.log(`Content appended to the file '${file}'.`);
        }
      });
    }
    break;

  case "delete":
    if (!file) {
      console.log("Please specify a file to delete.");
    } else {
      fs.unlink(file, (err) => {
        if (err) {
          console.error(`Error deleting file '${file}':`, err.message);
        } else {
          console.log(`File '${file}' deleted.`);
        }
      });
    }
    break;

  case "rename":
    const newName = content;
    if (!file || !newName) {
      console.log("Please specify the current file name and the new name.");
    } else {
      fs.rename(file, newName, (err) => {
        if (err) {
          console.error(`Error renaming file '${file}':`, err.message);
        } else {
          console.log(`File '${file}' renamed to '${newName}'.`);
        }
      });
    }
    break;

  case "list":
    const dir = file || ".";
    fs.readdir(dir, (err, files) => {
      if (err) {
        console.error(`Error listing directory '${dir}':`, err.message);
      } else {
        console.log(`Contents of directory '${dir}':`);
        files.forEach((file) => console.log(file));
      }
    });
    break;

  default:
    console.log(`Invalid operation '${operation}'.`);
    console.log("Valid operations: read, create, append, delete, rename, list.");
}
