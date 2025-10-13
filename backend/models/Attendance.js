const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  source: {
    type: String,
    enum: ['auto', 'manual'],
    default: 'auto'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure unique attendance per user per day
attendanceSchema.index({ userId: 1, date: 1 }, { unique: true });
attendanceSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Attendance', attendanceSchema);

