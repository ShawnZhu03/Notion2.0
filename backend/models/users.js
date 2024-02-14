const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username : {
        type: String, 
        required: true,
        unique: true, 
        trim: true,
        minlength: 1
    },

    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String 
    }

});

//Hash Password
userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();

    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

const User = mongoose.model('User', userSchema);

module.exports = User;