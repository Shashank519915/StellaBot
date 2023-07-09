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

client.commands = {}
// For each command file name (["greet","help","joke",...]) make a property on the commands object with the content of the file as value
for(let cmdName of fs.readdirSync('./commands/').replace('.js','')){
  client.commands[cmdName] = require('./commands/'+cmdName)
  // { "greet" : { description: ...., execute : ... } }
}

client.once("ready", () => {
  console.log("Bot is ready!");
});

client.on("messageCreate", (message) => {
  console.log("Message received:", message.content);
  // Ignore messages from other bots
  if (message.author.bot) return;
  // IF It's a message, just reply to it
  if (message.mentions.has(client.user.id)) return message.channel.send("Hey, what's up?");
  // From here, if it's not command, ignore.
  if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    // If the commands object has a key with that command name, execute it's value
    if(client.commands[command]) return client.commands[command].execute(message);
});

client.login(token);
