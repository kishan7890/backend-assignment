// index.js

// Import the crypto module
const crypto = require("crypto");

const args = process.argv.slice(2); // Ignore the first two arguments
const operation = args[0]; // First argument: the operation

// Function to generate a random number of a given length
function generateRandomNumber(length) {
  try {
    // Generate random bytes and convert to binary
    const randomNumber = crypto.randomBytes(Number(length)).toString("binary");
    console.log("Random Number:", randomNumber);
  } catch (err) {
    console.log("Error generating random number:", err.message);
  }
}

// Check if operation is provided
if (!operation) {
  console.log("Please provide an operation (add, sub, mult, divide, sin, cos, tan, random).");
  process.exit(1);
}

// Perform the calculation based on the operation
switch (operation) {
  case "add": {
    // Addition
    const numbers = args.slice(1).map(Number);
    if (numbers.length < 2) {
      console.log("Please provide at least two numbers for addition.");
    } else {
      const result = numbers.reduce((acc, num) => acc + num, 0);
      console.log("Result:", result);
    }
    break;
  }

  case "sub": {
    // Subtraction
    const numbers = args.slice(1).map(Number);
    if (numbers.length < 2) {
      console.log("Please provide at least two numbers for subtraction.");
    } else {
      const result = numbers.reduce((acc, num) => acc - num);
      console.log("Result:", result);
    }
    break;
  }

  case "mult": {
    // Multiplication
    const numbers = args.slice(1).map(Number);
    if (numbers.length < 2) {
      console.log("Please provide at least two numbers for multiplication.");
    } else {
      const result = numbers.reduce((acc, num) => acc * num, 1);
      console.log("Result:", result);
    }
    break;
  }

  case "divide": {
    // Division
    const numbers = args.slice(1).map(Number);
    if (numbers.length < 2) {
      console.log("Please provide at least two numbers for division.");
    } else if (numbers.slice(1).includes(0)) {
      console.log("Division by zero is not allowed.");
    } else {
      const result = numbers.reduce((acc, num) => acc / num);
      console.log("Result:", result);
    }
    break;
  }

  case "sin": {
    // Sine operation
    const angle = Number(args[1]);
    if (isNaN(angle)) {
      console.log("Please provide a valid number for sine calculation.");
    } else {
      console.log("Result:", Math.sin(angle));
    }
    break;
  }

  case "cos": {
    // Cosine operation
    const angle = Number(args[1]);
    if (isNaN(angle)) {
      console.log("Please provide a valid number for cosine calculation.");
    } else {
      console.log("Result:", Math.cos(angle));
    }
    break;
  }

  case "tan": {
    // Tangent operation
    const angle = Number(args[1]);
    if (isNaN(angle)) {
      console.log("Please provide a valid number for tangent calculation.");
    } else {
      console.log("Result:", Math.tan(angle));
    }
    break;
  }

  case "random": {
    // Random number generation
    const length = args[1];
    if (!length) {
      console.log("Provide length for random number generation.");
    } else if (isNaN(length) || Number(length) <= 0) {
      console.log("Please provide a valid positive number for the length.");
    } else {
      generateRandomNumber(length);
    }
    break;
  }

  default:
    console.log("Invalid operation. Supported operations: add, sub, mult, divide, sin, cos, tan, random.");
}
