const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Displays the available commands',
  execute(message) {
    const embed = new EmbedBuilder()
      .setColor(0xFF00EE)
      .setTitle('Stella Bot')
      .setDescription('Here are the available commands:')
      .setThumbnail('https://i.ibb.co/HTNySYF/h.png')
      .addFields({ name : '!help', value :  'Shows this help message.'})
      .addFields({ name : '!greet @user', value : 'Greets the user who mentioned the bot.'})
      .addFields({ name : '!joke', value : 'Generates a random joke.'})
      .addFields({ name : '!weather (location)', value : 'Sends real-time weather at the location.'})
      .addFields({ name : '!trivia', value :  'Shows a trivia question that you have to answer in 15 seconds.'})
      .setTimestamp()
      .setFooter({ text : 'Stella Bot'});
      message.channel.send({embeds:[embed]});
  },
};
