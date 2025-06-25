const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      cart.products.push(req.body);
      await cart.save();
      res.json(cart);
    } else {
      const newCart = new Cart({ userId: req.user.id, products: [req.body] });
      await newCart.save();
      res.json(newCart);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json(cart);
  } catch (err) {
    res.status(500).json(err.message);
  }
};