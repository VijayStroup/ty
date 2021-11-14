const ISawThat = {
  name: 'messageDelete',
  async execute(message) {
    if (message.author.bot) return
    await message.channel.send(`i saw that <@${message.author.id}>`)
  }
}

export default ISawThat
