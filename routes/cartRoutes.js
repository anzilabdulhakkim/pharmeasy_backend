const express = require('express');
const CartModel = require('../models/CartModel');
const router = express.Router();

// Add item to cart
router.post('/add', async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Check if cart exists for user
        let cart = await CartModel.findOne({ userId });

        if (cart) {
            // Update existing cart
            const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
            await cart.save();
        } else {
            // Create new cart
            cart = new CartModel({ userId, items: [{ productId, quantity }] });
            await cart.save();
        }

        res.status(200).send({ msg: 'Item added to cart', cart });
    } catch (error) {
        res.status(500).send({ errormsg: error.message });
    }
});

// Get user cart
router.get('/:userId', async (req, res) => {
    try {
        const cart = await CartModel.findOne({ userId: req.params.userId }).populate('items.productId');
        if (cart) {
            res.status(200).send(cart);
        } else {
            res.status(404).send({ errormsg: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).send({ errormsg: error.message });
    }
});

module.exports = router;
