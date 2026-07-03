const express = require('express');
const PatientQuestion = require('../models/PatientQuestion');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// GET all questions for logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const questions = await PatientQuestion.find({ user: req.user._id })
      .populate('educationTopic', 'title category summary');

    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get questions', error: error.message });
  }
});

// GET one question for logged-in user
router.get('/:id', protect, async (req, res) => {
  try {
    const question = await PatientQuestion.findById(req.params.id)
      .populate('educationTopic', 'title category summary');

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (question.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this question' });
    }

    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get question', error: error.message });
  }
});

// CREATE question
router.post('/', protect, async (req, res) => {
  try {
    const { question, notes, status, educationTopic } = req.body;

    const newQuestion = await PatientQuestion.create({
      question,
      notes,
      status,
      educationTopic,
      user: req.user._id
    });

    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create question', error: error.message });
  }
});

// UPDATE question
router.put('/:id', protect, async (req, res) => {
  try {
    const existingQuestion = await PatientQuestion.findById(req.params.id);

    if (!existingQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (existingQuestion.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this question' });
    }

    const updatedQuestion = await PatientQuestion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update question', error: error.message });
  }
});

// DELETE question
router.delete('/:id', protect, async (req, res) => {
  try {
    const question = await PatientQuestion.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (question.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this question' });
    }

    await question.deleteOne();

    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete question', error: error.message });
  }
});

module.exports = router;