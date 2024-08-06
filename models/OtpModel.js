const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
    email: String,
    otp: Number
});

const OtpModel = mongoose.model('Otp', OtpSchema);

module.exports = OtpModel;
