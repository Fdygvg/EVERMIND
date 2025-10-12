const mongoose = require('mongoose');
const Question = require('./models/Question');

// Connect to MongoDB
mongoose.connect('mongodb+srv://multilingualprogrammingwiz:Aspectn9ne%402314@cluster0.ohp8ijj.mongodb.net/evermind')
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    
    // Clear existing flag questions
    const deleted = await Question.deleteMany({ section: 'country_flags' });
    console.log(`🗑️ Deleted ${deleted.deletedCount} existing flag questions`);
    
    // Clear existing YouTube knowledge questions
    const deletedYoutube = await Question.deleteMany({ section: 'youtube_knowledge' });
    console.log(`🗑️ Deleted ${deletedYoutube.deletedCount} existing YouTube questions`);
    
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('❌ Error:', error);
    mongoose.connection.close();
  });
