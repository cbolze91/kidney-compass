const express = require('express');
const EducationTopic = require('../models/EducationTopic');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// GET all topics for logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const topics = await EducationTopic.find({
      user: req.user._id,
    }).populate('user', 'username email');

    res.json(topics);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get topics',
      error: error.message,
    });
  }
});

// GET one topic for logged-in user
router.get('/:id', protect, async (req, res) => {
  try {
    const topic = await EducationTopic.findById(req.params.id).populate(
      'user',
      'username email'
    );

    if (!topic) {
      return res.status(404).json({
        message: 'Topic not found',
      });
    }

    if (topic.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Not authorized to view this topic',
      });
    }

    res.json(topic);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get topic',
      error: error.message,
    });
  }
});

// CREATE topic
router.post('/', protect, async (req, res) => {
  try {
    const {
      title,
      category,
      summary,
      body,
      sourceName,
      sourceUrl,
    } = req.body;

    const topic = await EducationTopic.create({
      title,
      category,
      summary,
      body,
      sourceName,
      sourceUrl,
      user: req.user._id,
    });

    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create topic',
      error: error.message,
    });
  }
});

// UPDATE topic
router.put('/:id', protect, async (req, res) => {
  try {
    const topic = await EducationTopic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({
        message: 'Topic not found',
      });
    }

    if (topic.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Not authorized to edit this topic',
      });
    }

    const updatedTopic = await EducationTopic.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(updatedTopic);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update topic',
      error: error.message,
    });
  }
});

// DELETE topic
router.delete('/:id', protect, async (req, res) => {
  try {
    const topic = await EducationTopic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({
        message: 'Topic not found',
      });
    }

    if (topic.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Not authorized to delete this topic',
      });
    }

    await topic.deleteOne();

    res.json({
      message: 'Topic deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete topic',
      error: error.message,
    });
  }
});

module.exports = router;