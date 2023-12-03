const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const fileSchema = new Schema ({
    name : {
        type: String, 
        required: true, 
        trim: true,
        minlength: 1
    },
    folder: [{
        type: Schema.Types.ObjectId,
        ref: 'Folder',
        required: true
    }],
    content: {}
});

const File = mongoose.model('File', fileSchema);

module.exports = File;