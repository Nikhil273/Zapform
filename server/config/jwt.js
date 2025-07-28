// utils/jwt.js or config/jwt.js
const jwt = require('jsonwebtoken');

exports.jwtToken = (payload, secret) => {
  try {

    const token = jwt.sign(payload, secret, { expiresIn: '1d' });
    return token;
  } catch (error) {
    console.error('JWT Sign Error:', error.message);
    throw new Error('Token generation failed');
  }
};
