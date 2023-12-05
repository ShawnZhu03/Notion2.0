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
const fs = require('fs');


const port = 5001;

//store uploaded files in uploads directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
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

// Fetch Folders Endpoint
app.post('/MainPage', async (req, res) => {
  
  try {
    const {owner} = req.body;
    console.log(owner);
    const folders = await Folder.find({ owner: owner }); 
    res.json(folders); 
  } catch (error) {
    console.error('Error fetching folders:', error);
    res.status(500).json({ message: 'Error fetching folders', error: error });
  }
});

//Make Folders Endpoint
app.post('/AddFolder', async (req, res) => {
  try {
    const {folderName, owner} = req.body;
    const newFolder = new Folder({ folderName, owner});
    console.log(folderName);
    console.log(newFolder);
    console.log(owner);

    await newFolder.save();
    res.status(201).json({ message: 'Folder created successfully' });
    
  } catch (error) {
    res.status(500).json({ message: 'Error creating Folder' });
    console.log("create folder failed")
  }
});


// Fetch Files by Folder ID Endpoint
app.get('/files', async (req, res) => {
  try {
    const folderId = req.query.folderId;
    if (!folderId) {
      return res.status(400).json({ message: 'Folder ID is required' });
    }

    const files = await File.find({ folder: folderId });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching files', error: error });
  }
});

//File Upload Endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
      // Create a new file document
      const newFile = new File({
          name: req.file.originalname,
          folder: req.body.folderId,
          content: req.file.path
      });
      console.log(newFile);
      await newFile.save();

      // Update the folder to include this new file
      const folderId = req.body.folderId;
      if (folderId) {
          await Folder.findByIdAndUpdate(folderId, { $push: { files: newFile._id } });
      }

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

//File Delete Endpoint
app.delete('/files/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Delete the file from the filesystem
    if (file.content && fs.existsSync(file.content)) {
      fs.unlinkSync(file.content);
    }

    // Update folders to remove reference to this file
    await Folder.updateMany(
      { files: mongoose.Types.ObjectId(id) },
      { $pull: { files: mongoose.Types.ObjectId(id) } }
    );

    // Delete the file from the database
    await File.findByIdAndDelete(id);

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting file', error: error });
  }
});

app.listen(port, () => {
  console.log(`server is running on: ${port}`);
})

console.log("hello");

