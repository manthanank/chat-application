const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    req.io.emit('getUsers', users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
