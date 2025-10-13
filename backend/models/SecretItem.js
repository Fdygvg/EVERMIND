const mongoose = require('mongoose');

const secretItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['affirmation', 'image']
  },
  text: {
    type: String,
    trim: true,
    maxlength: 500
  },
  imageUrl: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
secretItemSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes
secretItemSchema.index({ userId: 1, createdAt: -1 });
secretItemSchema.index({ userId: 1, type: 1 });

module.exports = mongoose.model('SecretItem', secretItemSchema);

