const OtpModel = require('../models/OtpModel');
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendOtp = async (req, res) => {
    try {
        let emailid = req.body.email;
        if (!emailid) {
            return res.status(400).send({ "errormsg": "Email id is mandatory" });
        }

        let otp = Math.floor(Math.random() * 9000) + 1000;
        await transport.sendMail({
            from: process.env.EMAIL_FROM,
            to: emailid,
            subject: "Urgent: Your OTP",
            text: `Your verification OTP is ${otp}`
        });

        // Remove any existing OTP for this email
        await OtpModel.deleteMany({ email: emailid });

        // Save the new OTP
        const otpsave = new OtpModel({ otp: otp, email: emailid });
        await otpsave.save();

        res.status(200).send({ 'msg': 'OTP sent successfully', otp });
    } catch (e) {
        console.error('Error sending OTP:', e);
        res.status(500).send({ "errormsg": "Failed to send OTP" });
    }
};

exports.verifyOtp = async (req, res) => {
    try {
        let { email, otp } = req.body;
        let verify = await OtpModel.findOne({ email, otp });

        if (verify) {
            await OtpModel.deleteOne({ email, otp });
            res.status(200).send({ "msg": "Verified Successfully" });
        } else {
            res.status(404).send({ "errormsg": "Incorrect OTP" });
        }
    } catch (e) {
        console.error('Error verifying OTP:', e);
        res.status(500).send({ "errormsg": "Failed to verify OTP" });
    }
};
