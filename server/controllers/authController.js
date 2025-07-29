const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { jwtToken } = require('../config/jwt');
const { validationResult } = require('express-validator');
// const sendEmail = require('../utils/sendEmail');
const { sendEmail } = require('../utils/emailService');
const jwt = require('jsonwebtoken');


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
      isVerified: false,
    });

    await user.save();


    const emailVerificationPayload = { userId: user.id }

    const emailVerificationToken = jwtToken(emailVerificationPayload, process.env.JWT_EMAIL)

    const verificationLink = `https://zapform.onrender.com/api/auth/verify/${emailVerificationToken}`;

    await sendEmail(email, 'Verify Your Email', `Click to verify: ${verificationLink}`);

    const payload = { user: { id: user.id } };
    const token = jwtToken(payload, process.env.JWT_SECRET);

    return res.status(201).json({ msg: 'Registration successful, please verify your email.' });

  } catch (error) {
    console.error('Registration Error:', error.message);
    if (error.code === 11000) {
      return res.status(409).json({ msg: 'Username already exists' });
    }
    return res.status(500).json({ msg: "server error" });
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
      return res.status(401).json({ msg: 'User Not Found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      console.log('Password mismatch for user:', email);
      return res.status(401).json({ msg: 'Invalid Credentials' });
    }
    if (!user.isVerified)
      return res.status(403).json({ msg: 'Please verify your email before login.' });

    const payload = { user: { id: user.id } };
    const token = jwtToken(payload, process.env.JWT_SECRET);
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


// @route   POST /api/auth/verify/:token
// @desc   Verify user email
// @access  Public
exports.verifyEmail = async (req, res) => {
  try {

    const decoded = jwt.verify(req.params.token, process.env.JWT_EMAIL);
    console.log('11')
    console.log('Decoded token:', decoded);
    const user = await User.findById(decoded.userId);

    console.log('Email verification for user:', user ? user.email : 'User not found');

    if (!user) return res.status(400).send('Invalid token or user not found');
    if (user.isVerified) return res.status(200).send('Already verified');

    user.isVerified = true;
    await user.save();

    res.send('Email verified successfully! Plese login to continue.');

  } catch (err) {
    console.log('JWT Verification Error:', err.message);
    console.log('Error name:', err.name);
    res.status(400).send('Invalid or expired token');
  }
};

