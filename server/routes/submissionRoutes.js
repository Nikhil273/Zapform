const express = require('express');
const { submitForm } = require('../controllers/submissionController');
const router = express.Router();
const submissionLimiter = require('../middleware/rateLimiter');
// Publicly accessible form endpoint
router.post('/submit/:formId', submissionLimiter, submitForm);
router.get('/submit/:formId', (req, res) => {
  res.status(405).json({ msg: 'Method Not Allowed' });
});
module.exports = router;
