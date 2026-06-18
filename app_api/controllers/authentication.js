const mongoose = require('mongoose');
const User = mongoose.model('users');

const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'All fields are required'
    });
  }

  try {
    const user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    await user.save();

    const token = user.generateJwt();

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(400).json({
      message: 'Registration failed',
      error: err.message
    });
  }
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'All fields are required'
    });
  }

  try {
    const user = await User.findOne({ email: req.body.email }).exec();

    if (!user) {
      return res.status(401).json({
        message: 'Authentication failed'
      });
    }

    if (!user.validPassword(req.body.password)) {
      return res.status(401).json({
        message: 'Authentication failed'
      });
    }

    const token = user.generateJwt();

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({
      message: 'Login failed',
      error: err.message
    });
  }
};

module.exports = {
  register,
  login
};
