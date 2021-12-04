import { config } from 'dotenv'
import client from '../utils/client.js'

config()

const Pin = {
  name: 'raw',
  async execute(packet) {
    if (packet.t !== 'MESSAGE_REACTION_ADD') return
    const threshold = 5
    const message = await (await client.channels.fetch(packet.d.channel_id)).messages.fetch(packet.d.message_id)

    if (message.reactions.resolve('📌') && !message.pinned && message.reactions.resolve('📌').count >= threshold) {
      await message.pin()
      await message.reply('This message has been pinned.')
    }
  }
}

export default Pin
