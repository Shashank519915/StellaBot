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
      .setTimestamp()
      .setFooter({ text : 'Stella Bot'})
      let cmdNames = Object.keys(message.client.commands) // ["greet","help","joke"]
      .addFields(cmdNames.map(cmdName => ({
        name: "!"+cmdName,
        value: message.client.commands[cmdName].description
      }))
      message.channel.send({embeds:[embed]});
  },
};
