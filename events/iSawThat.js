const ignored = ['864311867765686332', '369212248553422850','609330932431716353']

const ISawThat = {
  name: 'messageDelete',
  async execute(message) {
    if (message.author.bot) return

    const coin = (Math.floor(Math.random() * 2) == 0)

    if(coin){
    if (ignored.includes(message.author.id)) return
    await message.channel.send(`i saw that <@${message.author.id}>`)
    }
  }
}

export default ISawThat
