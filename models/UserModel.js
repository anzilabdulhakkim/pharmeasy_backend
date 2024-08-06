const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    number: Number,
    password: String
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
