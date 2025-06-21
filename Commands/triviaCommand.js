// triviaCommand.js
const fetch = require('node-fetch').default;

module.exports = {
  name: 'trivia',
  description: 'Displays a random trivia question',
  async execute(message) {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=1');
      const data = await response.json();

      if (data.response_code !== 0) {
        throw new Error('Failed to fetch trivia question.');
      }

      const question = data.results[0].question;
      const options = data.results[0].incorrect_answers;
      const correctAnswer = data.results[0].correct_answer;

      options.push(correctAnswer);
      options.sort(); // Shuffle the options

      const triviaEmbed = {
        color: 0xFF00EE,
        title: 'Trivia',
        description: question,
        fields: [],
        footer: { text: `Type the correct answer in the chat to win!` },
      };

      options.forEach((option, index) => {
        triviaEmbed.fields.push({ name: `Option ${index + 1}`, value: option });
      });

      message.channel.send({ embeds: [triviaEmbed] });

      // Store the correct answer for later comparison
      const filter = (m) => m.author.id === message.author.id;
      const collector = message.channel.createMessageCollector({ filter, max: 1, time: 15000 });

      collector.on('collect', (msg) => {
        if (msg.content.toLowerCase() === correctAnswer.toLowerCase()) {
          msg.reply('Congratulations! You got the correct answer!');
        } else {
          msg.reply(`Oops! The correct answer was: ${correctAnswer}`);
        }
      });

      collector.on('end', (collected) => {
        if (collected.size === 0) {
          message.channel.send('Time is up! The correct answer was: ' + correctAnswer);
        }
      });
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while fetching the trivia question.');
    }
  },
};
