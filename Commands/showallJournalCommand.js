// shwoAllJournalsCommand.js
const fs = require('fs');
const path = require('path');

const journalsPerPage = 5; // Number of journal entries to display per page

module.exports = {
  name: 'showall',
  description: 'Show all journal entries',
  execute(message) {
    const userId = message.author.id;
    const userJournalPath = path.join(__dirname, '..', 'journals', `${userId}.json`);

    fs.readFile(userJournalPath, (err, data) => {
      if (err) {
        console.error(err);
        message.channel.send('An error occurred while accessing your journal.');
        return;
      }

      const journalData = JSON.parse(data);

      if (journalData.length === 0) {
        message.channel.send('No journal entries found.');
        return;
      }

      const totalPages = Math.ceil(journalData.length / journalsPerPage);

      let currentPage = 1;
      let startIndex = (currentPage - 1) * journalsPerPage;
      let endIndex = startIndex + journalsPerPage;

      const generateEmbed = (page) => {
        const embed = {
          color: 0x0099ff,
          title: 'Journal Entries',
          fields: [],
          footer: {
            text: `Page ${page}/${totalPages}`,
          },
        };

        const entries = journalData.slice(startIndex, endIndex);

        entries.forEach((entry) => {
          const field = {
            name: `${entry.date} - ${entry.time}`,
            value: '```\n' + entry.content + '\n```',
          };
          embed.fields.push(field);
        });

        return embed;
      };

      message.channel.send({ embeds: [generateEmbed(currentPage)] })
        .then((sentMessage) => {
          if (totalPages > 1) {
            sentMessage.react('⬅️').then(() => sentMessage.react('➡️'));

            const filter = (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === userId;
            const collector = sentMessage.createReactionCollector({ filter, idle: 60000 });

            collector.on('collect', (reaction) => {
              if (reaction.emoji.name === '⬅️' && currentPage !== 1) {
                currentPage--;
              } else if (reaction.emoji.name === '➡️' && currentPage !== totalPages) {
                currentPage++;
              }

              startIndex = (currentPage - 1) * journalsPerPage;
              endIndex = startIndex + journalsPerPage;

              const newEmbed = generateEmbed(currentPage);
              sentMessage.edit({ embeds: [newEmbed] });

              reaction.users.remove(userId).catch(console.error);
            });
          }
        });
    });
  },
};
