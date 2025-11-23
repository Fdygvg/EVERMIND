const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const Question = require('./models/Question');

// Load environment variables
dotenv.config();

// Manual environment setup for migration
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

// Migration function
const migrateData = async () => {
  try {
    await connectDB();
    
    // Clear existing questions (optional - comment out if you want to keep existing data)
    // await Question.deleteMany({});
    // console.log('🗑️ Cleared existing questions');
    
    const dataDir = path.join(__dirname, '..', 'data');
    const jsonFiles = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));
    
    console.log(`📁 Found ${jsonFiles.length} JSON files to migrate`);
    
    let totalMigrated = 0;
    let totalErrors = 0;
    
    for (const file of jsonFiles) {
      try {
        console.log(`\n📄 Processing ${file}...`);
        
        const filePath = path.join(dataDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const questions = JSON.parse(fileContent);
        
        // Determine section from filename
        const section = file.replace('.json', '');
        
        console.log(`   Found ${questions.length} questions in ${file}`);
        
        let fileMigrated = 0;
        let fileErrors = 0;
        
        for (const questionData of questions) {
          try {
            // Skip invalid question data
            if (!questionData || typeof questionData !== 'object') {
              console.warn(`   ⚠️ Skipping invalid question data:`, questionData);
              continue;
            }
            
        // Transform to our schema
        const transformedQuestion = {
          question: questionData.question || 'No question provided',
          answer: questionData.answer || questionData.question || 'No answer provided',
          type: questionData.type || inferType(questionData, section),
          tags: questionData.tags || [],
          code: questionData.code || null,
          image: questionData.image || null,
          audio: questionData.audio || addAudioForLanguages(questionData, section),
          section: section,
          difficulty: questionData.difficulty || 'medium'
        };
            
            // Check if question already exists (handle duplicate question text for flags)
            let existingQuestion;
            if (section === 'country_flags') {
                // For flags, check by image URL instead of question text
                existingQuestion = await Question.findOne({
                    image: transformedQuestion.image,
                    section: transformedQuestion.section
                });
            } else {
                // For other sections, check by question text
                existingQuestion = await Question.findOne({
                    question: transformedQuestion.question,
                    section: transformedQuestion.section
                });
            }
            
            if (existingQuestion) {
              console.log(`   ⚠️ Question already exists: "${transformedQuestion.question.substring(0, 50)}..."`);
              continue;
            }
            
            const question = new Question(transformedQuestion);
            await question.save();
            fileMigrated++;
            totalMigrated++;
            
          } catch (error) {
            console.error(`   ❌ Error migrating question: ${error.message}`);
            fileErrors++;
            totalErrors++;
          }
        }
        
        console.log(`   ✅ Migrated ${fileMigrated} questions from ${file}`);
        if (fileErrors > 0) {
          console.log(`   ❌ ${fileErrors} errors in ${file}`);
        }
        
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
        totalErrors++;
      }
    }
    
    console.log(`\n🎉 Migration completed!`);
    console.log(`✅ Total questions migrated: ${totalMigrated}`);
    console.log(`❌ Total errors: ${totalErrors}`);
    
    // Show summary by section
    const summary = await Question.aggregate([
      { $group: { _id: '$section', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log(`\n📊 Questions by section:`);
    summary.forEach(item => {
      console.log(`   ${item._id}: ${item.count} questions`);
    });
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Helper function to infer type from question data
const inferType = (questionData, section) => {
  // Check if questionData has the required fields
  if (!questionData || typeof questionData !== 'object') {
    return 'general';
  }
  
  const question = (questionData.question || '').toLowerCase();
  const answer = (questionData.answer || '').toLowerCase();
  
  // Programming types
  if (section === 'programming' || section === 'programming-mastered') {
    if (question.includes('javascript') || question.includes('js')) return 'javascript';
    if (question.includes('python')) return 'python';
    if (question.includes('html')) return 'html';
    if (question.includes('css')) return 'css';
    if (question.includes('git')) return 'git';
    if (question.includes('c++') || question.includes('c ')) return 'c';
    return 'programming';
  }
  
  // Other sections
  if (section === 'bible') return 'bible';
  if (section === 'country_flags') return 'flags';
  if (section === 'science') return 'science';
  if (section === 'facts') return 'facts';
  if (section === 'history') return 'history';
  if (section === 'languages') return 'languages';
  if (section === 'memes_brainrot') return 'memes';
  if (section === 'youtube_knowledge') return 'youtube';
  
  return 'general';
};

// Helper to add audio URLs for language questions
const addAudioForLanguages = (questionData, section) => {
  if (section === 'languages') {
    // Add audio URLs for common language phrases
    const audioMap = {
      'hello': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      'goodbye': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      'thank you': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      'please': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      'yes': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      'no': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      'water': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      'food': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      'house': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      'car': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
    };
    
    // Check if question contains any of these words
    const questionText = questionData.question.toLowerCase();
    for (const [word, audioUrl] of Object.entries(audioMap)) {
      if (questionText.includes(word)) {
        return audioUrl;
      }
    }
  }
  return null;
};

// Run migration
if (require.main === module) {
  migrateData();
}

module.exports = { migrateData };
