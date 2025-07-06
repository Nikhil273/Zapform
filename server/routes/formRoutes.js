const express = require('express');
const { check } = require('express-validator');
const { createForm, myForm, deleteForm } = require('../controllers/formController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
  '/createform',
  authMiddleware,
  [
    check('name', 'Form name is required').not().isEmpty(),
    check('notificationEmail', 'Valid email is required').isEmail(),
    check('redirectUrl', 'Redirect URL must be valid').optional()
  ],
  createForm
);
router.get("/myforms", authMiddleware, myForm);
router.delete("/:id", authMiddleware, deleteForm)
module.exports = router;
