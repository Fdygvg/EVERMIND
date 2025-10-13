const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const mongoose = require('mongoose');

// Middleware to get current user (simplified for now)
const getCurrentUser = (req, res, next) => {
  req.userId = req.headers['x-user-id'] || 'default-user-id';
  next();
};

// GET /api/notes - Get all notes for user with pagination
router.get('/', getCurrentUser, async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      // Return mock data when MongoDB is not connected
      return res.json({
        success: true,
        data: [
          {
            _id: 'mock-note-1',
            userId: req.userId,
            content: 'Welcome to EVERMIND Notes! This is a sample note.',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            _id: 'mock-note-2', 
            userId: req.userId,
            content: 'You can create, edit, and delete notes here. Try creating a new note!',
            createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            updatedAt: new Date(Date.now() - 86400000).toISOString()
          }
        ],
        pagination: {
          page: 1,
          limit: 20,
          total: 2,
          pages: 1
        }
      });
    }

    const { page = 1, limit = 20, search = '' } = req.query;
    const skip = (page - 1) * limit;
    
    let query = { userId: req.userId };
    if (search) {
      query.content = { $regex: search, $options: 'i' };
    }
    
    const notes = await Note.find(query)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Note.countDocuments(query);
    
    res.json({
      success: true,
      data: notes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notes',
      error: error.message
    });
  }
});

// POST /api/notes - Create new note
router.post('/', getCurrentUser, async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Note content is required'
      });
    }
    
    if (content.length > 10000) {
      return res.status(400).json({
        success: false,
        message: 'Note content is too long (max 10,000 characters)'
      });
    }
    
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      // Return mock data when MongoDB is not connected
      return res.status(201).json({
        success: true,
        data: {
          _id: 'mock-note-' + Date.now(),
          userId: req.userId,
          content: content.trim(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        message: 'Note created successfully (mock mode)'
      });
    }
    
    const note = new Note({
      userId: req.userId,
      content: content.trim()
    });
    
    await note.save();
    
    res.status(201).json({
      success: true,
      data: note,
      message: 'Note created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create note',
      error: error.message
    });
  }
});

// PATCH /api/notes/:id - Update note
router.patch('/:id', getCurrentUser, async (req, res) => {
  try {
    const { content } = req.body;
    const noteId = req.params.id;
    
    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Note content is required'
      });
    }
    
    if (content.length > 10000) {
      return res.status(400).json({
        success: false,
        message: 'Note content is too long (max 10,000 characters)'
      });
    }
    
    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId: req.userId },
      { content: content.trim() },
      { new: true, runValidators: true }
    );
    
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }
    
    res.json({
      success: true,
      data: note,
      message: 'Note updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update note',
      error: error.message
    });
  }
});

// DELETE /api/notes/:id - Delete note
router.delete('/:id', getCurrentUser, async (req, res) => {
  try {
    const noteId = req.params.id;
    
    const note = await Note.findOneAndDelete({
      _id: noteId,
      userId: req.userId
    });
    
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete note',
      error: error.message
    });
  }
});

module.exports = router;

