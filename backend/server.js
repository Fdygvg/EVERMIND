const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

// Environment variables are loaded from .env file
// No manual assignment needed - use dotenv.config() above

// Debug: Check if environment variables are loaded
console.log('🔍 Environment check:', {
  MONGO_URI: process.env.MONGO_URI ? '✅ Loaded' : '❌ Missing',
  GROQ_API_KEY: process.env.GROQ_API_KEY ? '✅ Loaded' : '❌ Missing',
  GROQ_API_KEY2: process.env.GROQ_API_KEY2 ? '✅ Loaded' : '❌ Missing',
  PORT: process.env.PORT || '❌ Missing'
});

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8000', 'http://127.0.0.1:8000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('💡 Make sure to:');
    console.log('   1. Whitelist your IP address in MongoDB Atlas');
    console.log('   2. Check your connection string');
    console.log('   3. Verify database user permissions');
    console.log('🔄 Server will continue running without database connection');
    console.log('   You can still test API endpoints (they will return errors)');
  }
};

// Connect to database
connectDB();

// Routes
app.use('/api/questions', require('./routes/questions'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/timers', require('./routes/timers'));
app.use('/api/secret', require('./routes/secret'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'EVERMIND Backend API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to EVERMIND Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      questions: '/api/questions',
      processQuestions: '/api/questions/process',
      notes: '/api/notes',
      attendance: '/api/attendance',
      timers: '/api/timers',
      secret: '/api/secret'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 EVERMIND Backend server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📚 Questions API: http://localhost:${PORT}/api/questions`);
  console.log(`🤖 Process questions: http://localhost:${PORT}/api/questions/process`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});
