const ISawThat = {
  name: 'messageDelete',
  async execute(message) {
    await message.channel.send(`i saw that <@${message.author.id}>`)
  }
}

export default ISawThat
