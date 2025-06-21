//showallJournalCommand.js
const { JournalEntry } = require('../db');
const journalsPerPage = 5; // Number of journal entries to display per page

module.exports = {
  name: "showall",
  description: "Show all journal entries",
  async execute(message) {
    try {
      const userId = message.author.id;
      // Sort by _id in descending order (newest first)
      const journalData = await JournalEntry.find({ userId }).sort({ _id: -1 });

      if (journalData.length === 0) {
        return message.channel.send("📭 No journal entries found.");
      }

      // Format date and time consistently
      const formatEntryDateTime = (entry) => {
        try {
          // Try to parse existing date if it's in valid format
          const dateObj = entry.date instanceof Date ? entry.date : new Date(entry.date);
          if (isNaN(dateObj.getTime())) throw new Error('Invalid date');
          
          return {
            date: dateObj.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            }),
            time: dateObj.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })
          };
        } catch {
          // Fallback to raw values if parsing fails
          return {
            date: entry.date,
            time: entry.time
          };
        }
      };

      // Pagination setup
      const totalPages = Math.ceil(journalData.length / journalsPerPage);
      let currentPage = 1;
      let startIndex = 0;
      let endIndex = journalsPerPage;

      // Helper function to generate paginated embed
      const generateEmbed = (page) => {
        const embed = {
          color: 0x0099ff,
          title: "Journal Entries",
          fields: [],
          footer: {
            text: `Page ${page}/${totalPages}`,
          },
        };

        const entries = journalData.slice(startIndex, endIndex);

        entries.forEach((entry) => {
          const { date, time } = formatEntryDateTime(entry);
          embed.fields.push({
            name: `${date} - ${time}`,
            value: '```' + entry.content + '\n```',
          });
        });

        return embed;
      };

      // Send first page
      const sentMessage = await message.channel.send({ embeds: [generateEmbed(currentPage)] });

      // Add reaction buttons if multiple pages
      if (totalPages > 1) {
        await sentMessage.react("⬅️");
        await sentMessage.react("➡️");

        const filter = (reaction, user) => ["⬅️", "➡️"].includes(reaction.emoji.name) && user.id === userId;
        const collector = sentMessage.createReactionCollector({ filter, idle: 60000 });

        collector.on("collect", (reaction) => {
          if (reaction.emoji.name === "⬅️" && currentPage > 1) {
            currentPage--;
          } else if (reaction.emoji.name === "➡️" && currentPage < totalPages) {
            currentPage++;
          }

          startIndex = (currentPage - 1) * journalsPerPage;
          endIndex = startIndex + journalsPerPage;

          sentMessage.edit({ embeds: [generateEmbed(currentPage)] });
          reaction.users.remove(userId).catch(console.error);
        });
      }
    } catch (err) {
      console.error("❌ Showall journals error:", err);
      message.channel.send("⚠️ An error occurred while fetching your journal entries.");
    }
  },
};
