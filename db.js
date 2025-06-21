// db.js
const mongoose = require('mongoose');
const { mongoUri } = require('./config.json');

// Schema definition
const journalEntrySchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  content: { type: String, required: true, minlength: 3 }
}, { timestamps: true });

// Create model
const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

// Connection function
async function connectDB() {
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error);
    process.exit(1);
  }
}

module.exports = { connectDB, JournalEntry };
