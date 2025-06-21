// helpCommand.js
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Displays all available commands',
  async execute(message) {
    const combinedEmbed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle('📘 Journal System   |    🛠️ Utilities')
      .setDescription('Overview of Stella\'s core features')
      .addFields(
        // Row 1
        { 
          name: '`!journal [entry]`', 
          value: 'Save your daily thoughts\n• Auto-saves with timestamp\n• Offers grammar correction\n• Edit previous entries',
          inline: true 
        },
        { 
          name: '`!weather [location]`', 
          value: 'Get real-time forecasts\n• Supports cities worldwide\n• Shows temperature/conditions\n• 3-day outlook available',
          inline: true 
        },
        { name: '\u200B', value: '\u200B', inline: true }, // Force new row

        // Row 2
        { 
          name: '`!showall`', 
          value: 'View your journal history\n• Paginated navigation\n• Displays 5 entries/page\n• Sort by newest first', 
          inline: true 
        },
        { 
          name: '`!trivia`', 
          value: 'Daily knowledge challenge\n• 15 second timer\n• Multiple categories\n• Track your streak', 
          inline: true 
        },
        { name: '\u200B', value: '\u200B', inline: true }, // Force new row

        // Row 3
        { 
          name: '`!delete`', 
          value: 'Remove journal entries\n• Browse before deleting\n• Confirmation prompt\n• Remove by entry date', 
          inline: true 
        },
        { 
          name: '`!joke`', 
          value: 'Get a random joke\n• Various categories\n• Family-friendly\n• Rate your favorites', 
          inline: true 
        },
        { name: '\u200B', value: '\u200B', inline: true }, // Force new row

        // Row 4 // as left column has no entry in this row, forcing a tab next(now row)
        { 
          name: '\u200B', 
          value: '\u200B', 
          inline: true 
        },
        { 
          name: '`!greet @user`', 
          value: 'Send custom greetings\n• Mentions the user\n• Time-based messages\n• Optional custom text', 
          inline: true 
        },
        { name: '\u200B', value: '\u200B', inline: true } // Force new row
      );

    await message.channel.send({ embeds: [combinedEmbed] });

    // Grammar embed
    const grammarEmbed = new EmbedBuilder()
      .setColor(0xED4245)
      .setTitle('🔍 Grammar Check Details')
      .setDescription([
        '**How it works:**',
        '1. Use `!journal [your text]`',
        '2. Bot will detect grammar issues',
        '3. Accept/reject corrections',
        '4. Save improved version',
        '',
        '**Features:**',
        '• Fixes 100+ error types',
        '• British/US English support',
        '• Punctuation correction',
        '• Vocabulary enhancements'
      ].join('\n'))
      .setFooter({ text: 'Stella Bot v2.0 • Powered by TextGears API' });

    await message.channel.send({ embeds: [grammarEmbed] });
  }
};
