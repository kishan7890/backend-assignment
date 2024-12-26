// Import required modules
const crypto = require('crypto');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const os = require('os');
const path = require('path');

// Function to encrypt a string using crypto module
function encryptString(text) {
    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    console.log('Encrypted String:', encrypted);
    console.log('Key (Base64):', key.toString('base64'));
    console.log('IV (Base64):', iv.toString('base64'));
}

// Function to generate a random UUID
function generateUUID() {
    const randomUUID = uuidv4();
    console.log('Generated UUID:', randomUUID);
}

// Function to compare stream and fs read
function compareFileRead(filePath) {
    const startStream = Date.now();
    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

    readStream.on('data', (chunk) => {});
    readStream.on('end', () => {
        const endStream = Date.now();
        console.log('Stream Read Time:', endStream - startStream, 'ms');
    });

    const startFS = Date.now();
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        const endFS = Date.now();
        console.log('FS Read Time:', endFS - startFS, 'ms');
    });
}

// Function to print OS details
function printOSDetails() {
    console.log('Operating System:', os.type());
    console.log('Platform:', os.platform());
    console.log('Architecture:', os.arch());
    console.log('CPU Info:', os.cpus());
    console.log('Total Memory:', os.totalmem());
    console.log('Free Memory:', os.freemem());
    console.log('Home Directory:', os.homedir());
    console.log('Uptime:', os.uptime(), 'seconds');
}

// Command-line arguments
const args = process.argv.slice(2);
const command = args[0];
const input = args[1];

switch (command) {
    case 'encrypt':
        encryptString(input || 'Hello, Good Morning');
        break;
    case 'uuid':
        generateUUID();
        break;
    case 'compare':
        const filePath = path.resolve(input || './largeFile.txt');
        compareFileRead(filePath);
        break;
    case 'osdetails':
        printOSDetails();
        break;
    default:
        console.log('Usage: node index.js <command> [input]');
        console.log('Commands:');
        console.log('  encrypt [text]       Encrypt the provided text');
        console.log('  uuid                 Generate a random UUID');
        console.log('  compare [filePath]   Compare stream and fs read for a file');
        console.log('  osdetails            Print OS details');
        break;
}
