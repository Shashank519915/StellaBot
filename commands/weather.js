const fetch = require('node-fetch').default;
const apiKey = require('../config.json').weatherapikey;

module.exports = {
  description: 'Fetches the weather for a location',
  async execute(message, args) {
    const location = args.join(' ');

    // Validate location input
    if (!/^[a-zA-Z0-9 ,]+$/.test(location)) {
      message.channel.send('Invalid location format. Please use alphanumeric characters, spaces, or commas.');
      return;
    }

    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;

        message.channel.send(`The weather in ${location} is ${weatherDescription} with a temperature of ${temperature}°C.`);
      } else {
        message.channel.send('Unable to fetch the weather for the specified location.');
      }
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while fetching the weather.');
    }
    },
};
