const mongoose = require('mongoose');

const educationTopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  category: {
    type: String,
    required: true
  },

  summary: {
    type: String,
    required: true
  },

  body: {
    type: String,
    required: true
  },

  sourceName: {
    type: String
  },

  sourceUrl: {
    type: String
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('EducationTopic', educationTopicSchema);