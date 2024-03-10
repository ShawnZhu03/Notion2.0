// folderRoutes.js
const express = require('express');
const router = express.Router();
const Folder = require('../models/folders.js');


// Fetch Folders Endpoint
router.post('/MainPage', async (req, res) => {
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
router.post('/AddFolder', async (req, res) => {
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

//share folder endpoint
router.post('/Share', async (req, res) => {
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

module.exports = router;
