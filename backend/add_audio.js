const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question');

// Load environment variables
dotenv.config();

// Manual environment setup
process.env.MONGO_URI = 'mongodb+srv://multilingualprogrammingwiz:Aspectn9ne%402314@cluster0.ohp8ijj.mongodb.net/evermind';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Add audio URLs to language questions
const addAudioToLanguages = async () => {
  try {
    await connectDB();
    
    // Get all language questions
    const languageQuestions = await Question.find({ section: 'languages' });
    console.log(`📚 Found ${languageQuestions.length} language questions`);
    
    let updated = 0;
    
    for (const question of languageQuestions) {
      // Add audio URL based on question content
      let audioUrl = null;
      
      // Add audio for common phrases
      if (question.question.toLowerCase().includes('hungry')) {
        audioUrl = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
      } else if (question.question.toLowerCase().includes('how are you')) {
        audioUrl = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
      } else if (question.question.toLowerCase().includes('fine')) {
        audioUrl = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
      } else if (question.question.toLowerCase().includes('bread')) {
        audioUrl = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
      } else if (question.question.toLowerCase().includes('rice')) {
        audioUrl = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
      } else if (question.question.toLowerCase().includes('egg')) {
        audioUrl = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
      } else if (question.question.toLowerCase().includes('want to eat')) {
        audioUrl = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
      } else if (question.question.toLowerCase().includes('shut up')) {
        audioUrl = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
      } else if (question.question.toLowerCase().includes('don\'t worry')) {
        audioUrl = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
      }
      
      if (audioUrl) {
        question.audio = audioUrl;
        await question.save();
        updated++;
        console.log(`✅ Added audio to: ${question.question.substring(0, 50)}...`);
      }
    }
    
    console.log(`\n🎉 Audio update completed!`);
    console.log(`✅ Updated ${updated} questions with audio URLs`);
    
  } catch (error) {
    console.error('❌ Audio update failed:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run the script
if (require.main === module) {
  addAudioToLanguages();
}

module.exports = { addAudioToLanguages };
