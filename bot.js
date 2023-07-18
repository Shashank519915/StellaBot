
/*
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
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions
  ],
});

const { prefix, token } = require("./config.json");
const jokeCommand = require("./Commands/jokeCommand");
const greetCommand = require("./Commands/greetCommand");
const weatherCommand = require("./Commands/weatherCommand");
const mentionCommand = require("./Commands/mentionCommand");
const helpCommand = require("./Commands/helpCommand");
const triviaCommand = require("./Commands/triviaCommand");
const journalCommand = require("./Commands/journalCommand");
const deleteCommand = require("./Commands/deleteCommand");
const showallJournalCommand = require("./Commands/showallJournalCommand");

const commands = {
  joke: jokeCommand,
  greet: greetCommand,
  weather: weatherCommand,
  mention: mentionCommand,
  help: helpCommand,
  trivia: triviaCommand,
  showall: showallJournalCommand,
};

client.once("ready", () => {
  console.log("Bot is ready!");
});

client.on("messageCreate", (message) => {
  console.log("Message received:", message.content);
  if (message.author.bot) return; // Ignore messages from other bots

  

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "joke") {
      jokeCommand.execute(message);
    } else if (command === "greet") {
      greetCommand.execute(message, args);
    } else if (command === "weather") {
      weatherCommand.execute(message, args);
    } else if (command === "help") {
      helpCommand.execute(message);
    } else if (command === "trivia") {
      triviaCommand.execute(message);
    } else if (command === "journal") {
      journalCommand.execute(message);
    } else if (command === "delete") {
      deleteCommand.execute(message);
    } else if (command === "showall") {
      showallJournalCommand.execute(message);
    }
  } else if (message.mentions.has(client.user)) {
    commands["mention"].execute(message);
  }
});

client.login(token);
