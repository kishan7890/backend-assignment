// Import required modules
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

// Initialize the app
const app = express();
const PORT = 3000;

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dductdeix', // Replace with your Cloudinary cloud name
  api_key: '391876118584796',       // Replace with your Cloudinary API key
  api_secret: 'R72EnBN4qEOMYkfAAi_yvM6_Hc0' // Replace with your Cloudinary API secret
});

// Configure Multer with Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'] // Allowed file types
  },
});
const upload = multer({ storage: storage });

// Serve the HTML form for file submission
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file && req.file.path) {
    res.status(200).json({
      message: 'File uploaded successfully',
      imageUrl: req.file.path
    });
  } else {
    res.status(400).json({
      message: 'File upload failed'
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
