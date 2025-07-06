// utils/jwt.js or config/jwt.js
const jwt = require('jsonwebtoken');

exports.jwtToken = (payload) => {
  try {

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  } catch (error) {
    console.error('JWT Sign Error:', error.message);
    throw new Error('Token generation failed');
  }
};
