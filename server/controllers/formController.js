const Form = require('../models/Form');
const { validationResult } = require('express-validator');

exports.createForm = async (req, res) => {
  const errors = validationResult(req);
  console.log("Received form creation request:", errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, notificationEmail, redirectUrl } = req.body;

  try {
    const form = new Form({
      formtitle: name,
      owner: req.user.id, // from auth middleware
      notificationEmail,
      redirectUrl,
    });

    const savedForm = await form.save();
    const endpoint = `${process.env.BASE_URL}/api/submit/${savedForm._id}`;
    form.endpoint = endpoint; // Save the endpoint in the form document
    await form.save(); // Save the updated form with endpoint


    return res.status(201).json({
      formId: savedForm._id,
      endpoint,
      msg: 'Form created successfully',
    });

  } catch (error) {
    console.error('Form creation error:', error.message);
    return res.status(500).json({ msg: 'Server error' });
  }
};

exports.myForm = async (req, res) => {
  try {
    const forms = await Form.find({ owner: req.user.id }).select('-__v');
    return res.status(200).json({ forms });
  } catch (error) {
    console.error('Error fetching user forms:', error.message);
    return res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteForm = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ msg: "Form not found" });
    }

    // Check if the form belongs to the logged-in user
    if (form.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    await Form.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Form deleted successfully" });
  } catch (error) {
    console.error("Delete form error:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
}

