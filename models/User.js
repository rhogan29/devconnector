const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create User Schema (model)
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

//mongoose.model is passed a string of users, and the second is the Schema we created. 
module.exports = User = mongoose.model('users', User);