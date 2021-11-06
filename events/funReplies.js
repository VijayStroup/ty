const FunReplies = {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot) return

    const loweredMessage = message.content.toLowerCase()

    if (loweredMessage.split(' ')[0] === 'who')
      await message.reply('https://tenor.com/view/nba-shaquille-o-neal-yo-moma-point-laugh-gif-4759702')
    else if (loweredMessage === 'yo')
      await message.reply('yo')
    else if (loweredMessage === 'based')
      await message.reply('based on what?')
    else if (`${loweredMessage.split(' ')[0]} ${loweredMessage.split(' ')[1]}` === 'homie said')
      await message.reply({ content: `homie said "${message.content}"`, allowedMentions: {parse: []} }) 
  }
}

export default FunReplies
