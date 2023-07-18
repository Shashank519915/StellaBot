// deletecommand.js
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'delete',
  description: 'Delete the last journal entry',
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
        message.channel.send('No journal entries found to delete.');
        return;
      }

      const lastEntryIndex = journalData.length - 1;
      const lastEntry = journalData[lastEntryIndex];

      const journalEmbed = {
        color: 0x0099ff,
        title: 'Last Journal Entry',
        description: `Date: ${lastEntry.date}\nTime: ${lastEntry.time}\n\n${lastEntry.content}`,
        footer: {
          text: 'React with ✅ to delete this entry',
        },
      };

      message.channel.send({ embeds: [journalEmbed] })
        .then((sentMessage) => {
          sentMessage.react('✅');
          const filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === userId;
          const collector = sentMessage.createReactionCollector({ filter, max: 1 });

          collector.on('collect', () => {
            journalData.pop();

            fs.writeFile(userJournalPath, JSON.stringify(journalData), (err) => {
              if (err) {
                console.error(err);
                message.channel.send('An error occurred while deleting the journal entry.');
              } else {
                console.log(`Journal entry deleted for user: ${userId}`);
                message.channel.send('Journal entry deleted.');
              }
            });
          });
        });
    });
  },
};