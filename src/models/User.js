const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique,
        required,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', UserSchema);


module.exports = User;