const express = require('express');
const router = express.Router();
const User = require('../models/User');
const SecretItem = require('../models/SecretItem');

// Middleware to get current user
const getCurrentUser = (req, res, next) => {
  req.userId = req.headers['x-user-id'] || 'default-user-id';
  next();
};

// Rate limiting for PIN verification (simple in-memory store)
const pinAttempts = new Map();
const PIN_LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 3;

// POST /api/secret/verify-pin - Verify secret PIN
router.post('/verify-pin', getCurrentUser, async (req, res) => {
  try {
    const { pin } = req.body;
    
    if (!pin) {
      return res.status(400).json({
        success: false,
        message: 'PIN is required'
      });
    }
    
    // Check if user is locked out
    const userAttempts = pinAttempts.get(req.userId);
    if (userAttempts && userAttempts.lockedUntil > Date.now()) {
      const remainingTime = Math.ceil((userAttempts.lockedUntil - Date.now()) / 1000);
      return res.status(429).json({
        success: false,
        message: `Too many failed attempts. Try again in ${remainingTime} seconds.`
      });
    }
    
    // Get user with secret PIN
    const user = await User.findById(req.userId).select('+secretPinHash');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const isValidPin = await user.verifySecretPin(pin);
    
    if (isValidPin) {
      // Reset attempts on successful verification
      pinAttempts.delete(req.userId);
      
      res.json({
        success: true,
        message: 'PIN verified successfully'
      });
    } else {
      // Track failed attempts
      const attempts = pinAttempts.get(req.userId) || { count: 0, lockedUntil: 0 };
      attempts.count++;
      
      if (attempts.count >= MAX_ATTEMPTS) {
        attempts.lockedUntil = Date.now() + PIN_LOCKOUT_DURATION;
        pinAttempts.set(req.userId, attempts);
        
        return res.status(429).json({
          success: false,
          message: `Too many failed attempts. Locked for ${PIN_LOCKOUT_DURATION / 1000} seconds.`
        });
      } else {
        pinAttempts.set(req.userId, attempts);
        
        return res.status(401).json({
          success: false,
          message: `Invalid PIN. ${MAX_ATTEMPTS - attempts.count} attempts remaining.`
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to verify PIN',
      error: error.message
    });
  }
});

// POST /api/secret/set-pin - Set or change secret PIN
router.post('/set-pin', getCurrentUser, async (req, res) => {
  try {
    const { pin } = req.body;
    
    if (!pin || pin.length < 4) {
      return res.status(400).json({
        success: false,
        message: 'PIN must be at least 4 characters long'
      });
    }
    
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    user.secretPinHash = pin; // Will be hashed by pre-save middleware
    await user.save();
    
    res.json({
      success: true,
      message: 'Secret PIN set successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to set secret PIN',
      error: error.message
    });
  }
});

// GET /api/secret/items - Get all secret items for user
router.get('/items', getCurrentUser, async (req, res) => {
  try {
    const items = await SecretItem.find({ userId: req.userId })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch secret items',
      error: error.message
    });
  }
});

// POST /api/secret/items - Create new secret item
router.post('/items', getCurrentUser, async (req, res) => {
  try {
    const { type, text, imageUrl, tags = [] } = req.body;
    
    if (!type || !['affirmation', 'image'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Type must be either "affirmation" or "image"'
      });
    }
    
    if (type === 'affirmation' && (!text || text.trim().length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'Text is required for affirmation type'
      });
    }
    
    if (type === 'image' && (!imageUrl || imageUrl.trim().length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'Image URL is required for image type'
      });
    }
    
    const item = new SecretItem({
      userId: req.userId,
      type,
      text: text?.trim(),
      imageUrl: imageUrl?.trim(),
      tags: tags.map(tag => tag.trim()).filter(tag => tag.length > 0)
    });
    
    await item.save();
    
    res.status(201).json({
      success: true,
      data: item,
      message: 'Secret item created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create secret item',
      error: error.message
    });
  }
});

// PATCH /api/secret/items/:id - Update secret item
router.patch('/items/:id', getCurrentUser, async (req, res) => {
  try {
    const { type, text, imageUrl, tags } = req.body;
    const itemId = req.params.id;
    
    const updateData = {};
    if (type) updateData.type = type;
    if (text !== undefined) updateData.text = text.trim();
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl.trim();
    if (tags) updateData.tags = tags.map(tag => tag.trim()).filter(tag => tag.length > 0);
    
    const item = await SecretItem.findOneAndUpdate(
      { _id: itemId, userId: req.userId },
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Secret item not found'
      });
    }
    
    res.json({
      success: true,
      data: item,
      message: 'Secret item updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update secret item',
      error: error.message
    });
  }
});

// DELETE /api/secret/items/:id - Delete secret item
router.delete('/items/:id', getCurrentUser, async (req, res) => {
  try {
    const itemId = req.params.id;
    
    const item = await SecretItem.findOneAndDelete({
      _id: itemId,
      userId: req.userId
    });
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Secret item not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Secret item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete secret item',
      error: error.message
    });
  }
});

module.exports = router;

