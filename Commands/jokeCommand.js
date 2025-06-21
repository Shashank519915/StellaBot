// jokeCommand.js
const fetch = require('node-fetch').default;

module.exports = {
  name: 'joke',
  description: 'Fetches a random joke',
  async execute(message) {
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
      const data = await response.json();

      if (data.error) {
        throw new Error(data.message);
      }

      if (!data.joke) {
        throw new Error('No joke found.');
      }

      message.channel.send(data.joke);
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while fetching the joke.');
    }
  },
};
