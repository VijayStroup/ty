const FunReplies = {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot) return

    const coin = (Math.floor(Math.random() * 2) == 0)
    const loweredMessage = message.content.toLowerCase()

    if (coin) {
      if (loweredMessage.split(' ')[0] === 'who')
        await message.reply('https://tenor.com/view/nba-shaquille-o-neal-yo-moma-point-laugh-gif-4759702')
      else if (loweredMessage === 'yo')
        await message.reply('yo')
      else if (loweredMessage === 'based')
        await message.reply('based on what?')
      else if (`${loweredMessage.split(' ')[0]} ${loweredMessage.split(' ')[1]}` === 'homie said')
        await message.reply({ content: `homie said "${message.content.length <= 1987 ? message.content : 'that message too long homie'}"`, allowedMentions: {parse: []} }) 
      else if (message.mentions.has(message.client.user.id))
        await message.reply('bing chilling')
       else if(loweredMessage === 'where are you')
         await message.reply('https://tenor.com/view/your-mom-moms-house-your-moms-house-mother-your-mother-gif-20551331')
      
    }
  }
}

export default FunReplies
