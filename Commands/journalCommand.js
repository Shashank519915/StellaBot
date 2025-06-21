// journalCommand.js
const { JournalEntry } = require('../db');
const { textgearapikey } = require("../config.json");
const fetch = require("node-fetch");

module.exports = {
  name: "journal",
  description: "Enter today's journal entry",
  async execute(message) {
    try {
      // Validate message content
      if (!message.content || typeof message.content !== 'string') {
        return message.channel.send("❌ Invalid message format");
      }

      const userId = message.author.id;
      const journalEntryText = message.content.slice("!journal".length).trim();

      // Content validation
      if (!journalEntryText || journalEntryText.length < 3) {
        return message.channel.send("📝Send the Journal Entry after the command. Journal entry must be at least 3 characters long.");
      }

      // Inner try-catch for DB saving
      try {
        const now = new Date();
        const entryData = new JournalEntry({
          userId,
          date: now.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          }),
          time: now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          content: journalEntryText
        });

        // Save entry and handle errors
        const savedEntry = await entryData.save();
        console.log(`📔 Journal saved - ID: ${savedEntry._id}`);
        message.channel.send("✅ Journal entry saved successfully!");

        // Ask if user wants grammar check
        const checkMsg = await message.channel.send("Do you want to perform a grammar check? (yes/no)");
        
        try {
          const checkResponse = await message.channel.awaitMessages({
            filter: m => m.author.id === message.author.id && ['yes','no'].includes(m.content.toLowerCase()),
            max: 1,
            time: 15000,
            errors: ['time']
          });
          
          if (checkResponse.first().content.toLowerCase() === 'yes') {
            await grammarCheck(journalEntryText, message, userId);
          } else {
            message.channel.send("Grammar check skipped.");
          }
        } catch {
          message.channel.send("No response received. Grammar check skipped.");
        }

      } catch (innerError) {
        console.error("❌ Journal Save Error:", innerError);
        message.channel.send("⚠️ Failed to save journal. Please try again.");
      }

    } catch (outerError) {
      console.error("❌ Journal Command Outer Error:", outerError);
      message.channel.send("⚠️ An unexpected error occurred.");
    }
  }
};

// Grammar check function
async function grammarCheck(journalEntry, message, userId) {
  const url = "https://textgears-textgears-v1.p.rapidapi.com/grammar";
  const encodedParams = new URLSearchParams();
  encodedParams.set("text", journalEntry);
  encodedParams.set("language", "en-GB");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": textgearapikey,
      "X-RapidAPI-Host": "textgears-textgears-v1.p.rapidapi.com",
    },
    body: encodedParams,
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    if (result.response.errors && result.response.errors.length > 0) {
      const correctedText = result.response.errors.reduce((text, error) => {
        const suggestion = Array.isArray(error.better) ? error.better[0] : error.better;
        return text.replace(new RegExp(`\\b${error.bad}\\b`, "gi"), suggestion);
      }, journalEntry);

      message.channel.send(`Corrected Text: \n\`\`\`\n${correctedText}\n\`\`\``);
      message.channel.send("Do you want to save this corrected text? (yes/no)");

      try {
        const saveResponse = await message.channel.awaitMessages({
          filter: m => m.author.id === message.author.id && ['yes','no'].includes(m.content.toLowerCase()),
          max: 1,
          time: 15000,
          errors: ['time']
        });
        
        if (saveResponse.first().content.toLowerCase() === 'yes') {
          const lastEntry = await JournalEntry.findOne({ userId }).sort({ _id: -1 });
          if (lastEntry) {
            lastEntry.content = correctedText;
            lastEntry.date = new Date().toLocaleDateString();
            lastEntry.time = new Date().toLocaleTimeString();
            await lastEntry.save();
            message.channel.send("Corrected journal entry saved.");
          }
        } else {
          message.channel.send("Correction not saved.");
        }
      } catch {
        message.channel.send("No response received. Correction not saved.");
      }
    } else {
      message.channel.send("No grammatical errors found in your journal entry.");
    }
  } catch (error) {
    console.error("Grammar check API error:", error);
  }
}
