const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order({ ...req.body, userId: req.user.id });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json(err.message);
  }
};