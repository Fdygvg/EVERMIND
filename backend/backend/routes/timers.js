const express = require('express');
const router = express.Router();
const Timer = require('../models/Timer');

// Middleware to get current user
const getCurrentUser = (req, res, next) => {
  req.userId = req.headers['x-user-id'] || 'default-user-id';
  next();
};

// POST /api/timers/start - Start a new timer session
router.post('/start', getCurrentUser, async (req, res) => {
  try {
    const { sessionId } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }
    
    // Check if timer already exists for this session
    const existingTimer = await Timer.findOne({
      userId: req.userId,
      sessionId,
      status: { $in: ['running', 'paused'] }
    });
    
    if (existingTimer) {
      return res.json({
        success: true,
        data: existingTimer,
        message: 'Timer already exists for this session'
      });
    }
    
    const timer = new Timer({
      userId: req.userId,
      sessionId,
      startedAt: new Date(),
      status: 'running'
    });
    
    await timer.save();
    
    res.status(201).json({
      success: true,
      data: timer,
      message: 'Timer started successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to start timer',
      error: error.message
    });
  }
});

// POST /api/timers/pause - Pause timer
router.post('/pause', getCurrentUser, async (req, res) => {
  try {
    const { sessionId } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }
    
    const timer = await Timer.findOne({
      userId: req.userId,
      sessionId,
      status: 'running'
    });
    
    if (!timer) {
      return res.status(404).json({
        success: false,
        message: 'No running timer found for this session'
      });
    }
    
    const now = new Date();
    const sessionTime = now - timer.startedAt;
    timer.accumulatedMs += sessionTime;
    timer.pausedAt = now;
    timer.status = 'paused';
    
    await timer.save();
    
    res.json({
      success: true,
      data: timer,
      message: 'Timer paused successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to pause timer',
      error: error.message
    });
  }
});

// POST /api/timers/resume - Resume timer
router.post('/resume', getCurrentUser, async (req, res) => {
  try {
    const { sessionId } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }
    
    const timer = await Timer.findOne({
      userId: req.userId,
      sessionId,
      status: 'paused'
    });
    
    if (!timer) {
      return res.status(404).json({
        success: false,
        message: 'No paused timer found for this session'
      });
    }
    
    timer.startedAt = new Date();
    timer.pausedAt = null;
    timer.status = 'running';
    
    await timer.save();
    
    res.json({
      success: true,
      data: timer,
      message: 'Timer resumed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to resume timer',
      error: error.message
    });
  }
});

// POST /api/timers/stop - Stop timer
router.post('/stop', getCurrentUser, async (req, res) => {
  try {
    const { sessionId } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }
    
    const timer = await Timer.findOne({
      userId: req.userId,
      sessionId,
      status: { $in: ['running', 'paused'] }
    });
    
    if (!timer) {
      return res.status(404).json({
        success: false,
        message: 'No active timer found for this session'
      });
    }
    
    if (timer.status === 'running') {
      const now = new Date();
      const sessionTime = now - timer.startedAt;
      timer.accumulatedMs += sessionTime;
    }
    
    timer.status = 'stopped';
    timer.pausedAt = new Date();
    
    await timer.save();
    
    res.json({
      success: true,
      data: timer,
      message: 'Timer stopped successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to stop timer',
      error: error.message
    });
  }
});

// GET /api/timers/:sessionId - Get timer for session
router.get('/:sessionId', getCurrentUser, async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const timer = await Timer.findOne({
      userId: req.userId,
      sessionId
    });
    
    if (!timer) {
      return res.status(404).json({
        success: false,
        message: 'Timer not found for this session'
      });
    }
    
    res.json({
      success: true,
      data: timer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch timer',
      error: error.message
    });
  }
});

module.exports = router;

