const rateLimit = require('express-rate-limit');

const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: {
    msg: 'Too many submissions from this IP, please try again later.',
  },
});

module.exports = submissionLimiter;
