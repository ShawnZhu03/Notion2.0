//userRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const User = require("../models/users.js");
const router = express.Router();

router.use("/ProfilePic", express.static("ProfilePic"));

// Storage for profile pictures
const profilePicStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "ProfilePic/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadProfilePic = multer({ storage: profilePicStorage });

// Sign Up Endpoint
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

// Login Endpoint
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

//Profile Pic Upload Endpoint
router.post(
  "/uploadProfilePicture",
  uploadProfilePic.single("profilePicture"),
  async (req, res) => {
    try {
      const username = req.body.username;
      const profilePictureUrl = req.file.path;
      
      const user = await User.findOneAndUpdate(
        { username: username },
        { profilePicture: profilePictureUrl },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res
        .status(200)
        .json({ message: "Profile picture updated successfully", user });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating profile picture", error: error });
    }
  }
);

//Fetch Profile Pic Endpoint
router.get("/getUserProfilePic/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username });

    if (user && user.profilePicture) {
      const profilePicUrl = `http://localhost:5001/users/${user.profilePicture}`;
      console.log(`Fetching profile picture URL: ${profilePicUrl}`); // Log the URL
      res.json({ profilePicUrl });
    } else {
      res.status(404).send("User or profile picture not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

//get users endpoint
router.get("/Users", async (req, res) => {
  try {
    const users = await User.find().select("username");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error });
  }
});

module.exports = router;
