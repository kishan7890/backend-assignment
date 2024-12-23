const sum = require("./sum");
const sub = require("./sub");
const mul = require("./multiply");
const div = require("./division");

const args = process.argv.slice(2);
const operation = args[0];

console.log(args);
console.log(operation)


let sumA = 3;
let sumB = 5;
let sumResult = sum(sumA, sumB);
console.log(sumResult);

let mulA = 4;
let mulB = 6;
let mulResult = mul(mulA, mulB);
console.log(mulResult);

let subA = 4;
let subB = 6;
let subResult = sub(subA, subB);
console.log(subResult);

let divA = 4;
let divB = 6;
let divResult = div(divA, divB);
console.log(divResult);




// Check if operation is provided
if (!operation) {
    console.log("Please provide an operation (add, sub, mult, divide).");
    process.exit(1);
  }

switch(operation){
    case "add":{
        const numbers = args.slice(1).map(Number);
        if(numbers.length<2){
            console.log("provide atleast two number for addition");
        }else{
            const result = numbers.reduce((acc, num) => acc + num, 0);
            console.log("Result:", result);
        }
        break;
    }
    case "sub":{
        const numbers = args.slice(1).map(Number);
        if(numbers.length<2){
            console.log("provide atleast two number for addition");
        }else{
            const result = numbers.reduce((acc, num) => acc - num);
            console.log("Result:", result);
        }
        break;
    }
}