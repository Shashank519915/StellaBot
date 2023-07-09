module.exports = {
    name: 'greet',
    description: 'Greets a user',
    execute(message, args) {
      const user = message.mentions.members.first();
      
      // Validate user input
      if (!user) {
        message.channel.send('Please mention a user to greet.');
        return;
      }
  
      try {
        message.channel.send(`**Welcome**, ${user}! We’re elated to have you onboard of our community.
        *How can I assist you?*`);
      } catch (error) {
        console.error(error);
        message.channel.send('An error occurred while greeting the user.');
      }
    },
  };
  