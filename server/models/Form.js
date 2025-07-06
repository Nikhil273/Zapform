const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  formtitle: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  notificationEmail: {
    type: String,
    required: true,
  },
  redirectUrl: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  endpoint: {
    type: String,
    // Ensure each form has a unique endpoint
  },
});

module.exports = mongoose.model('Form', FormSchema);
