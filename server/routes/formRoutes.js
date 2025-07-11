const express = require('express');
const { check } = require('express-validator');
const { createForm, myForm, deleteForm, editForm, FormById } = require('../controllers/formController');
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
router.delete("/:id", authMiddleware, deleteForm);
router.get("/:id", authMiddleware, FormById); // Assuming you have a controller to get a specific form by ID
router.put("/:id", authMiddleware, editForm); // Assuming you have an editForm controller
module.exports = router;
