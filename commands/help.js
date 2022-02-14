import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'
import getCommands from '../utils/getCommands.js'
import colors from '../utils/colors.js'

let commands
(async () => { commands = await getCommands() })()

const Help = {
  builder: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Respond with a list of commands.'),
  async execute(interaction) {
    const commandsEmbed = new MessageEmbed()
      .setColor(colors.gold)
      .setTitle('Commands')
      .setDescription('Below is a list of all available commands and their descriptions.\n*Admin only command')
      .setTimestamp()
    for (const key in commands) {
      if (commands[key].members) continue
      else if (commands[key].roles && commands[key].roles.includes('Admin'))
        commandsEmbed.addField(key, `${commands[key].builder.description}*`)
      else
        commandsEmbed.addField(key, commands[key].builder.description)
    }

    await interaction.reply({ embeds: [commandsEmbed], ephemeral: true })
  }
}

export default Help
