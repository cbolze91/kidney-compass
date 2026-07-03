const mongoose = require('mongoose');

const patientQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },

  notes: {
    type: String
  },

  status: {
    type: String,
    default: 'Open'
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  educationTopic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EducationTopic'
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('PatientQuestion', patientQuestionSchema);