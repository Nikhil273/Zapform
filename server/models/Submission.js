const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  ip: String,
  userAgent: String,
});

module.exports = mongoose.model('Submission', SubmissionSchema);
