import { config } from 'dotenv'

config()

const Pin = {
  name: 'messageReactionAdd',
  async execute(reaction, user) {
    const threshold = (await (await reaction.client.guilds.fetch(process.env.GUILD_ID)).members.fetch()).size * .2
    
    if (reaction.emoji.name === '📌' && reaction.count >= threshold) {
      await reaction.message.pin()
      await reaction.message.reply(`Message from ${user.username} has been pinned.`)
    }
  }
}

export default Pin
