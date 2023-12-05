const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const folderSchema = new Schema ({
    folderName : {
        type: String, 
        required: true,
        trim: true,
        minlength: 1
    },
    owner: {
        type: String,
        required: true
    }
});

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;