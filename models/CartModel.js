const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items:String,
});

const CartModel = mongoose.model('cart',cartSchema);

module.exports = CartModel;