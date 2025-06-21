// deletecommand.js
const { JournalEntry } = require('../db');

module.exports = {
  name: 'delete',
  description: 'Navigate and delete journal entries',
  async execute(message) {
    // Get the user ID of the command author
    const userId = message.author.id;

    try {
      // Fetch all journal entries for this user, sorted newest first
      const allEntries = await JournalEntry.find({ userId }).sort({ _id: -1 });

      // Check if there are any entries to delete
      if (allEntries.length === 0) {
        return message.channel.send('No journal entries found.');
      }

      // Track which entry is currently being viewed
      let currentIndex = 0;

      /**
       * Displays a journal entry with navigation controls
       * @param {number} index - The index of the entry to display
       */
      const showEntry = async (index) => {
        // Get the specific journal entry
        const entry = allEntries[index];
        
        // Create embed message to display the entry
        const embed = {
          color: 0x0099ff,
          title: `Journal Entry (${index + 1}/${allEntries.length})`,
          fields: [{
            name: `${entry.date} - ${entry.time}`,
            value: '```' + entry.content + '\n```'
          }],
          footer: {
            text: 'React with to: ◀️ ▶️ Navigate | ✅ Delete | ❌ Cancel'
          },
        };

        // Send the embed message
        const msg = await message.channel.send({ embeds: [embed] });
        
        // Add navigation reactions if there are multiple entries
        if (allEntries.length > 1) {
          await msg.react('◀️'); // Left arrow for older entries
          await msg.react('▶️'); // Right arrow for newer entries
        }
        // Add action reactions
        await msg.react('✅'); // Check mark to delete
        await msg.react('❌'); // Cross to cancel

        // Filter to only accept reactions from the command author
        const filter = (reaction, user) => 
          (['◀️', '▶️', '✅', '❌'].includes(reaction.emoji.name)) && 
          user.id === userId;
        
        // Create collector with 60 second timeout
        const collector = msg.createReactionCollector({ 
          filter, 
          time: 60000
        });

        // Handle when a user reacts
        collector.on('collect', async (reaction) => {
          try {
            switch (reaction.emoji.name) {
              case '▶️': // Right arrow - newer entry
                if (currentIndex < allEntries.length - 1) {
                  currentIndex++;
                  collector.stop();
                  await msg.delete().catch(() => {}); // Delete old message
                  await showEntry(currentIndex); // Show new entry
                }
                break;
              
              case '◀️': // Left arrow - older entry
                if (currentIndex > 0) {
                  currentIndex--;
                  collector.stop();
                  await msg.delete().catch(() => {});
                  await showEntry(currentIndex);
                }
                break;
              
              case '✅': // Check mark - delete entry
                const entryToDelete = allEntries[currentIndex];
                await JournalEntry.deleteOne({ _id: entryToDelete._id });
                message.channel.send(`✅ Entry from ${entryToDelete.date} deleted.`);
                collector.stop();
                await msg.delete().catch(() => {});
                break;
              
              case '❌': // Cross - cancel operation
                message.channel.send('Deletion cancelled.');
                collector.stop();
                await msg.delete().catch(() => {});
                break;
            }
          } catch (error) {
            console.error('Error handling reaction:', error);
            message.channel.send('An error occurred.');
          }
        });

        // Clean up when collector ends (timeout or manual stop)
        collector.on('end', async () => {
          try {
            // Only try to remove reactions if message still exists
            if (!msg.deleted) {
              await msg.reactions.removeAll().catch(error => {
                // Ignore "Unknown Message" errors (code 10008)
                if (error.code !== 10008) console.error(error);
              });
            }
          } catch (error) {
            // Ignore "Unknown Message" errors (code 10008)
            if (error.code !== 10008) console.error(error);
          }
        });
      };

      // Start by showing the first (newest) entry
      await showEntry(0);

    } catch (error) {
      // Handle any errors in the main command execution
      console.error('Error in delete command:', error);
      message.channel.send('An error occurred while accessing your journal.');
    }
  },
};
