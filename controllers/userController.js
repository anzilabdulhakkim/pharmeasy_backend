const UserModel = require('../models/UserModel');

exports.signup = async (req, res) => {
    let data = req.body;
    if (data.email) {
        const check = await UserModel.find({ email: data.email });
        try {
            if (check.length > 0) {
                res.status(200).send(check);
            } else {
                const user = new UserModel(data);
                user.save((err, result) => {
                    if (!err) {
                        res.status(201).send([user]);
                    } else {
                        console.log(err);
                        res.status(400).send({ 'errormsg': 'Something went wrong' });
                    }
                });
            }
        } catch (err) {
            console.log("err", err);
        }
    } else {
        res.status(400).send({ 'errormsg': 'All fields are mandatory' });
    }
};

exports.updateUser = async (req, res) => {
    let data = req.body;
    if (data.email) {
        const check = await UserModel.find({ email: data.email });
        if (check.length > 0) {
            const user = await UserModel.updateOne({ email: data.email }, data);
            res.send(user);
        } else {
            res.send({ 'errormsg': 'Email not found' });
        }
    } else {
        res.status(400).send({ 'errormsg': 'All fields are mandatory' });
    }
};
