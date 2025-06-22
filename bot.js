// bot.js
/*  INTENTS USED IN OLD DISCORD.JS
const { Client, Intents } = require('discord.js');
const client = new Discord.Client({ 
  intents: [ 
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGES
  ] 
});
*/

const { Client, GatewayIntentBits } = require("discord.js");
const { connectDB, JournalEntry } = require('./db'); // Import the connection

// Initialize Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions
  ],
});

// Config and command imports
const { token, prefix } = require("./config.json");
const jokeCommand = require("./Commands/jokeCommand");
const greetCommand = require("./Commands/greetCommand");
const weatherCommand = require("./Commands/weatherCommand");
const mentionCommand = require("./Commands/mentionCommand");
const helpCommand = require("./Commands/helpCommand");
const triviaCommand = require("./Commands/triviaCommand");
const journalCommand = require("./Commands/journalCommand");
const deleteCommand = require("./Commands/deleteCommand");
const showallJournalCommand = require("./Commands/showallJournalCommand");

// Command mapping
const commands = {
  joke: jokeCommand,
  greet: greetCommand,
  weather: weatherCommand,
  mention: mentionCommand,
  help: helpCommand,
  trivia: triviaCommand,
  showall: showallJournalCommand,
};

// Bot ready event
client.once("ready", () => {
  console.log("🤖 Bot is ready!");
});

// Message handler
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  console.log("📩 Message received:", message.content);

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Execute corresponding command
    if (commands[command]) {
      commands[command].execute(message, args);
    } else if (command === "journal") {
      journalCommand.execute(message);
    } else if (command === "delete") {
      deleteCommand.execute(message);
    }
  } else if (message.mentions.has(client.user)) {
    commands["mention"].execute(message);
  }
});

// Start the application
async function startBot() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await connectDB();
    
    console.log('🤖 Logging in to Discord...');
    await client.login(token);
  } catch (error) {
    console.error('🚨 Startup failed:', error);
    process.exit(1);
  }
}

startBot();



// to keep the bot alive on render, setting up a dummy express port, that is utilised by UpTimeRobot to ping bot every 5mins.

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("✨ Stella Bot is alive and running!");
});

app.listen(PORT, () => {
  console.log(`🌐 Ping server running on http://localhost:${PORT}`);
});

