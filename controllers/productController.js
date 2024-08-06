const ProductModel = require('../models/ProductModel');

exports.getProducts = async (req, res) => {
    if (req.query.category) {
        const data = await ProductModel.find({ category: req.query.category });
        res.send(data);
    } else if (req.query.name) {
        const data = await ProductModel.find({ name: { $regex: `${req.query.name}`, $options: 'i' } });
        res.send(data);
    } else {
        const data = await ProductModel.find();
        res.send(data);
    }
};

exports.getProductById = async (req, res) => {
    let id = req.params.id;
    const data = await ProductModel.find({ _id: id });
    res.send(data);
};
