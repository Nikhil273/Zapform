const Form = require('../models/Form');
const Submission = require('../models/Submission');
const nodemailer = require('nodemailer');
const { sendEmail } = require('../utils/emailService');

exports.submitForm = async (req, res) => {
  const { formId } = req.params;

  try {
    const form = await Form.findById(formId);
    if (!form) return res.status(404).json({ msg: 'Form not found' });
    const formtitle = form.formtitle;
    const submissionData = req.body;

    submissionData.formTitle = formtitle;
    console.log('Received submission data:', submissionData);


    const submission = new Submission({
      formId: form._id,
      data: submissionData,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    await submission.save();

    // Send email notification
    await sendEmail(form.notificationEmail, submissionData, formtitle);

    return res.status(200).json({ msg: 'Form submitted successfully' });

  } catch (error) {
    console.error('Form submission error:', error.message);
    return res.status(500).json({ msg: 'Server error' });
  }
};


