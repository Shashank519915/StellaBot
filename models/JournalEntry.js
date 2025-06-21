// JournalEntry.js
const { connection } = require('../db');

const journalEntrySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  content: { type: String, required: true },
});

// Export the model using the specific connection
module.exports = connection.model("JournalEntry", journalEntrySchema);
