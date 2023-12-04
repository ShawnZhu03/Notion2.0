const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const folderSchema = new Schema ({
    name : {
        type: String, 
        required: true,
        trim: true,
        minlength: 1
    },

    owner: [{
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }],
    files: [{
        type: Schema.Types.ObjectId,
        ref: 'File',
        required: true
    }]
});

folderSchema.index({ name: 1, owner: 1 }, { unique: true });

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;