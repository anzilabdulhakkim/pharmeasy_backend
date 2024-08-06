const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel'); 

exports.addItemToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || !quantity) {
            return res.status(400).send({ errormsg: 'User ID, Product ID, and Quantity are required' });
        }

        // Find or create the cart for the user
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Check if the item already exists in the cart
        const existingItem = cart.items.find(item => item.productId.toString() === productId);

        if (existingItem) {
            // Update the quantity if the item already exists
            existingItem.quantity += quantity;
        } else {
            // Add new item to the cart
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).send({ msg: 'Item added to cart successfully', cart });
    } catch (error) {
        res.status(500).send({ errormsg: 'Failed to add item to cart', error });
    }
};

// Remove item from cart
exports.removeItemFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).send({ errormsg: 'User ID and Product ID are required' });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).send({ errormsg: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();

        res.status(200).send({ msg: 'Item removed from cart successfully', cart });
    } catch (error) {
        res.status(500).send({ errormsg: 'Failed to remove item from cart', error });
    }
};

// Get cart items
exports.getCartItems = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).send({ errormsg: 'User ID is required' });
        }

        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart) {
            return res.status(404).send({ errormsg: 'Cart not found' });
        }

        res.status(200).send({ cart });
    } catch (error) {
        res.status(500).send({ errormsg: 'Failed to get cart items', error });
    }
};
