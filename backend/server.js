//server
const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/users.js');
const Folder = require('./models/folders.js');
const Note = require('./models/notes.js')
const File = require('./models/files.js');

const port = 5001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/ProfilePic', express.static('ProfilePic'));

// Storage for general file uploads
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const upload = multer({ storage: fileStorage });

// Storage for profile pictures
const profilePicStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'ProfilePic/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadProfilePic = multer({ storage: profilePicStorage });



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
    const { owner } = req.body;
    console.log(owner);
    const folders = await Folder.find({ owners: { $in: [owner] } });

    res.json(folders);
  } catch (error) {
    console.error('Error fetching folders:', error);
    res.status(500).json({ message: 'Error fetching folders', error: error });
  }
});

//Make Folders Endpoint
app.post('/AddFolder', async (req, res) => {
  try {
    const { folderName, owner } = req.body;
    const newFolder = new Folder({ folderName, owners: [owner] });
    console.log(owner);

    await newFolder.save();
    res.status(201).json({ message: 'Folder created successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error creating Folder' });
    console.log("create folder failed")
  }
});

//fetch notes endpoint
app.post('/Notes', async (req, res) => {
  try {
    const { folder } = req.body;
    console.log(folder);
    const notes = await Note.find({ folder: folder });
    res.json(notes);
  } catch (error) {
    console.error('Error fetching folders:', error);
    res.status(500).json({ message: 'Error fetching folders', error: error });
  }
});

//Make Notes Endpoint
app.post('/AddNote', async (req, res) => {
  try {
    const { name, folder, content } = req.body;
    const newNote = new Note({
      name: name,
      folder: folder,
      content: content,
    });
    console.log(newNote);
    await newNote.save();
    res.status(201).json({ message: 'Note created successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error creating Note' });
    console.log("create Note failed")
  }
});


//File Upload Endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const folderId = req.body.folderId; // Get folderId from the request
    const newFile = new Note({
      name: req.file.originalname,
      folder: folderId, // Use folderId here
      content: req.file.path
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
    const files = await Note.find();
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

//Profile Pic Upload Endpoint
app.post('/uploadProfilePicture', uploadProfilePic.single('profilePicture'), async (req, res) => {
  try {
    const username = req.body.username;
    const profilePictureUrl = req.file.path;

    const user = await User.findOneAndUpdate(
      { username: username },
      { profilePicture: profilePictureUrl },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile picture updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile picture', error: error });
  }
});

//Fetch Profile Pic Endpoint
app.get('/getUserProfilePic/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username });

    if (user && user.profilePicture) {
      const profilePicUrl = `http://localhost:5001/${user.profilePicture}`;
      console.log(`Fetching profile picture URL: ${profilePicUrl}`); // Log the URL
      res.json({ profilePicUrl });
    } else {
      res.status(404).send('User or profile picture not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

//get users endpoint
app.get('/Users', async (req, res) => {
  try {
    const users = await User.find().select('username')
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error });
  }
});

//share folder endpoint
app.post('/Share', async (req, res) => {
  try {
    const { folder, owner } = req.body;
    const updatedFolder = await Folder.findOneAndUpdate(
      { _id: folder },
      { $addToSet: { owners: owner } },
      { new: true }
    );
    if (!updatedFolder) {
      res.status(404).json({ message: 'Folder Already Shared with Specified User' });
    } else {
      res.status(200).json({ message: 'Share Success!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error sharing folder', error: error });
  }
});

//edit note endpoint
app.post('/EditNote', async (req, res) => {
  try {
    const { _id, name, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(_id, { name, content }, { new: true });

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note Edit Success!' });

  } catch (error) {
    res.status(500).json({ message: 'Error editing note', error: error });
  }
});

//delete note endpoint
app.post('/DeleteNote', async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(`id: ${_id}`);

    const result = await Note.deleteOne({ _id });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Document not found' });
    } else {
      res.status(200).json({ message: 'Document deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`server is running on: ${port}`);
})

console.log("hello");

