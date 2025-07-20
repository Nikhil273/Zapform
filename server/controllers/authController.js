const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { jwtToken } = require('../config/jwt');
const { validationResult } = require('express-validator');

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
exports.register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ msg: 'User already exists with this email' });
    }

    // Create new user
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email: email.toLowerCase(), // Store email in lowercase
      password: hashedPassword,
    });

    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwtToken(payload);
    console.log(token)
    return res.status(201).json({
      token,
      msg: 'User registered successfully',
    });

  } catch (error) {
    console.error('Registration Error:', error.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
};

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(422).json({ msg: errors.array() });
  }

  const { email, password } = req.body;
  console.log('Login attempt for email:', email);

  try {
    // Check if user exists
    let user = await User.findOne({ email: email.toLowerCase() }); // Convert to lowercase
    console.log('User found:', !!user);

    if (!user) {
      console.log('User not found for email:', email);
      return res.status(401).json({ msg: 'Invalid Credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      console.log('Password mismatch for user:', email);
      return res.status(401).json({ msg: 'Invalid Credentials' });
    }

    const payload = { user: { id: user.id } };
    const token = jwtToken(payload);
    console.log('Login successful for:', email);

    return res.status(200).json({
      token,
      msg: 'Login successful',
    });

  } catch (error) {
    console.error('Login Error:', error.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
};
