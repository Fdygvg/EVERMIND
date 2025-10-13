const mongoose = require('mongoose');

const timerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sessionId: {
    type: String,
    required: true
  },
  startedAt: {
    type: Date,
    required: true
  },
  pausedAt: {
    type: Date
  },
  accumulatedMs: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['running', 'paused', 'stopped'],
    default: 'running'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
timerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes
timerSchema.index({ userId: 1, sessionId: 1 });
timerSchema.index({ userId: 1, updatedAt: -1 });

module.exports = mongoose.model('Timer', timerSchema);

