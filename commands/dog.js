import { SlashCommandBuilder } from '@discordjs/builders'
import axios from 'axios'

const url = 'https://dog.ceo/api/breeds/image/random'

const Dog = {
  builder: new SlashCommandBuilder()
    .setName('dog')
    .setDescription('get dog pictures'),
  channel: '🐕｜pets',
  async execute(interaction) {
    const res = await axios.get(url)

    if (res.status !== 200) {
        console.error(`[${new Date().toString()}] Error getting dog of the day`)
      return
    }

    await interaction.reply({files: [res.data.message]})
  }
}
export default Dog