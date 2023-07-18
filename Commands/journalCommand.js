// journalCommand.js
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
RAPIDAPI_KEY = require("../config.json").textgearapikey;

module.exports = {
  name: "journal",
  description: "Enter today's journal entry",
  // Check if there is additional text after the command
  async execute(message) {
    const userId = message.author.id;
    const userJournalPath = path.join(__dirname, "../journals", `${userId}.json`);
    const journalEntry = message.content.slice("!journal".length).trim();

    if (!journalEntry) {
      message.channel.send(
        "Please provide your journal entry after the command."
      );
      return;
    }
    // Store the journal entry in a JSON file
    const entryData = {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      content: journalEntry,
    };
    let journalData = [];

    fs.readFile(userJournalPath, (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          // Create a new journal file if it doesn't exist
          fs.writeFile(userJournalPath, JSON.stringify([entryData]), (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`Journal entry saved for user: ${userId}`);
              message.channel.send("Journal entry saved.");
            }
          });
        } else {
          console.error(err);
        }
      } else {
        // Read existing journal data from the file
        journalData = JSON.parse(data);
        journalData.push(entryData);
      }
      fs.writeFile(userJournalPath, JSON.stringify(journalData), (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Journal entry saved for user: ${userId}`);
          message.channel.send("Journal entry saved.");

          // Ask the user if they want to perform grammar check
          message.channel.send(
            "Do you want to perform a grammar check on your journal entry? (yes/no)"
          );

          // Create a message collector to listen for the user's response
          const filter = (m) => m.author.id === message.author.id;
          const collector = message.channel.createMessageCollector(filter, {
            max: 1,
          });

          collector.on("collect", (collected) => {
            const response = collected.content.toLowerCase();

            if (response === "yes") {
              // Trigger the grammar check
              grammarCheck(entryData.content, message);
            } else {
              // Grammar check not triggered
              message.channel.send("Grammar check skipped.");
            }
          });
        }
      });
    });
  },
};

async function grammarCheck(journalEntry, message) {
  const url = "https://textgears-textgears-v1.p.rapidapi.com/detect";
  const encodedParams = new URLSearchParams();
  encodedParams.set("text", journalEntry);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "textgears-textgears-v1.p.rapidapi.com",
    },
    body: encodedParams,
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    // Check if grammar errors are detected
    if (result.errors && result.errors.length > 0) {
      // Grammar errors detected
      const correctedText = result.errors.reduce((text, error) => {
        return text.replace(error.bad, error.better);
      }, journalEntry);

      // Send the corrected text to the user
      message.channel.send(`Corrected Text: \n\`\`\`${correctedText}\`\`\``);

      // Ask the user to save the corrected text
      message.channel.send("Do you want to save this corrected text? (yes/no)");

      // Create a message collector to listen for the user's response
      const filter = (m) => m.author.id === message.author.id;
      const collector = message.channel.createMessageCollector(filter, {
        max: 1,
      });

      collector.on("collect", (collected) => {
        const response = collected.content.toLowerCase();

        if (response === "yes") {
          // Save the corrected text
          const correctedEntryData = {
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            content: correctedText,
          };

          fs.readFile(userJournalPath, (err, data) => {
            if (err) {
              console.error(err);
              return;
            }

            const journalData = JSON.parse(data);
            const lastIndex = journalData.length - 1;

            if (lastIndex >= 0) {
              // Replace the last entry with the corrected text
              journalData[lastIndex] = correctedEntryData;
            }

            fs.writeFile(userJournalPath, JSON.stringify(journalData), (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log("Corrected journal entry saved.");
              }
            });
          });
        }
      });
    } else {
      // No grammar errors found
      message.channel.send("No grammatical errors found in your journal entry.");
      return;
    }
  } catch (error) {
    console.error(error);
  }
}