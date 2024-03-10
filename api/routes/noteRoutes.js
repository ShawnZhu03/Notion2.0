// noteRoutes.js
const express = require('express');
const router = express.Router();
const Note = require('../models/notes.js')
const multer = require('multer');



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



//fetch notes endpoint
router.post('/Notes', async (req, res) => {
    try {
      const { folder } = req.body;
      console.log(folder);
      const notes = await Note.find({ folder: folder });
      res.json(notes);
      console.log(notes);
    } catch (error) {
      console.error('Error fetching folders:', error);
      res.status(500).json({ message: 'Error fetching folders', error: error });
    }
  });
  
  //Make Notes Endpoint
  router.post('/AddNote', async (req, res) => {
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
  router.post('/upload', upload.single('file'), async (req, res) => {
    try {
      const folderId = req.body.folderId; // Get folderId from the request
      const newFile = new Note({
        name: req.file.originalname,
        folder: folderId, // Use folderId here
        content: req.file.path
      });
      console.log(newFile);
      await newFile.save();
      res.status(200).json({ message: 'File uploaded successfully', file: newFile });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading file', error: error });
    }
  });
  

  
//edit note endpoint
router.post('/EditNote', async (req, res) => {
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
  router.post('/DeleteNote', async (req, res) => {
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

  module.exports = router;
