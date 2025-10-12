const mongoose = require('mongoose');
const Question = require('./models/Question');

// Connect to MongoDB
mongoose.connect('mongodb+srv://multilingualprogrammingwiz:Aspectn9ne%402314@cluster0.ohp8ijj.mongodb.net/evermind')
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    
    // Get counts by section
    const stats = await Question.aggregate([
      { $group: { _id: '$section', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('\n📊 Database counts by section:');
    stats.forEach(s => {
      console.log(`   ${s._id}: ${s.count} questions`);
    });
    
    // Check specific sections
    const countryFlags = await Question.countDocuments({ section: 'country_flags' });
    const youtubeKnowledge = await Question.countDocuments({ section: 'youtube_knowledge' });
    
    console.log(`\n🔍 Specific sections:`);
    console.log(`   country_flags: ${countryFlags} questions`);
    console.log(`   youtube_knowledge: ${youtubeKnowledge} questions`);
    
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('❌ Error:', error);
    mongoose.connection.close();
  });
