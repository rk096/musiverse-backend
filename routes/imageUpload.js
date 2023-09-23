// Import required packages
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const express = require("express");
const mongoose = ("mongoose");
const router = express.Router();
const Image = require("../models/image");


// Create a schema for your image model



// Set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    },
});

const upload = multer({ storage });

// Define a route for uploading an image
router.post('/img', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Create a new Image document in MongoDB
    const image = new Image({
        filename: req.file.filename,
        originalname: req.file.originalname,
        path: req.file.path,
    });

    image.save()
        .then(() => res.status(200).json({ message: 'Image uploaded successfully', path: image.path }))
        .catch(err => res.status(500).json({ message: 'Error saving image to MongoDB', error: err }));
});


module.exports = router;