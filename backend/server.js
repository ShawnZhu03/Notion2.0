//server
const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/users.js');
const Folder = require('./models/folders.js');
const File = require('./models/files.js');

const port = 5001;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  }
});

const upload = multer({ storage: storage });
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

require('dotenv').config();
const uri = process.env.ATLAS_URI;

mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("mongoose databse connection established successfully");
})


// Sign Up Endpoint
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login Endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'User logged in successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

//Fetch Folders Endpoint
app.get('/MainPage', async (req, res) => {
  try {
    const folders = await Folder.find();
    res.json(folders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching folders' });
  }
});

//File Upload Endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const newFile = new File({
      name: req.file.originalname, // Original name of the file
      folder: [],
      content: req.file.path // Path where the file is saved
    });
    await newFile.save();
    res.status(200).json({ message: 'File uploaded successfully', file: newFile });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error: error });
  }
});


//List File Endpoint
app.get('/files', async (req, res) => {
  try {
    const files = await File.find();
    const fileData = files.map(file => {
      return {
        ...file.toObject(),
        url: `http://localhost:5001/uploads/${encodeURIComponent(file.name)}`
      };
    });
    res.status(200).json(fileData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching files', error: error });
  }
});


app.listen(port, () => {
  console.log(`server is running on: ${port}`);
})

console.log("hello");

