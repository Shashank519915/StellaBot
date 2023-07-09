const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { readdirSync } = require('fs')
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const { prefix, token } = require("./config.json");
const commands = {}
for(let cmdName of fs.readdirSync('./commands/').replace('.js','')){
  commands[cmdName] = require('./commands/'+cmdName)
}

client.once("ready", () => {
  console.log("Bot is ready!");
});

client.on("messageCreate", (message) => {
  console.log("Message received:", message.content);
  // Ignore messages from other bots
  if (message.author.bot) return;
  // IF It's a message, just reply to it
  if (message.mentions.has(client.user.id)) return commands["mention"].execute(message);
  // From here, if it's not command, ignore.
  if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    if(commands[command]) return commands[command].execute(message);
});

client.login(token);
