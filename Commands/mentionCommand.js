// mentionCommand.js
module.exports = {
    name: 'mention',
    description: 'Responds when the bot is mentioned',
    execute(message) {
      message.channel.send("Hey, what's up?");
    },
  };
  
