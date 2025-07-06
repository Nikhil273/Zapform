const express = require('express');
const { check } = require('express-validator');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

// Register Route
router.post('/register', [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Valid email is required').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
], register);

// Login Route
router.post('/login', [
  check('email', 'Valid email is required').isEmail(),
  check('password', 'Password is required').exists(),
], login);

// Get Current User Route
router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select('-__v -password -createdAt -updatedAt');
  if (!user) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }
  res.json({ user });
});

module.exports = router;
