const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hashed });
    await newUser.save();
    res.status(201).json("User registered");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    // find user in the database
    const user = await User.findOne({ email: req.body.email });
    // check if user exists
    if (!user) return res.status(401).json("Invalid email");
    // comparing user password with the hashed password in the database
    const valid = await bcrypt.compare(req.body.password, user.password);
    // if password is not valid, return error
    if (!valid) return res.status(401).json("Invalid password");

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json(err.message);
  }
};