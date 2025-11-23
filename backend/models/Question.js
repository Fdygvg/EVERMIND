const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['javascript', 'python', 'c', 'html', 'git', 'bible', 'flags', 'science', 'facts', 'history', 'languages', 'programming', 'memes', 'youtube', 'shell', 'networking', 'css', 'concepts', 'ai', 'command-line', 'hardware', 'data', 'operating-system', 'programming-concepts', 'file-formats', 'general'],
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  code: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  audio: {
    type: String,
    trim: true
  },
  section: {
    type: String,
    required: true,
    enum: ['programming', 'programming-mastered', 'bible', 'country_flags', 'science', 'facts', 'history', 'languages', 'memes_brainrot', 'youtube_knowledge', 'new_words'],
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
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

// Update the updatedAt field before saving
questionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better query performance
questionSchema.index({ section: 1 });
questionSchema.index({ type: 1 });
questionSchema.index({ tags: 1 });
questionSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Question', questionSchema);
