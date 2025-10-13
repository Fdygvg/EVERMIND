const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  secretPinHash: {
    type: String,
    select: false // Don't include in queries by default
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash secret PIN before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('secretPinHash') && this.secretPinHash) {
    this.secretPinHash = await bcrypt.hash(this.secretPinHash, 12);
  }
  this.updatedAt = Date.now();
  next();
});

// Method to verify secret PIN
userSchema.methods.verifySecretPin = async function(pin) {
  if (!this.secretPinHash) return false;
  return await bcrypt.compare(pin, this.secretPinHash);
};

// Create indexes
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

module.exports = mongoose.model('User', userSchema);

