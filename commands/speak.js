import { SlashCommandBuilder } from '@discordjs/builders'

const Speak = {
  builder: new SlashCommandBuilder()
    .setName('speak')
    .setDescription('Make Frodo speak.')
    .addStringOption(option => 
      option.setName('message')
        .setDescription('Message.')
        .setRequired(true))
    .setDefaultPermission(false),
  members: ['841043611414954034', '177940582226722816'],
  async execute(interaction) {
    await interaction.channel.send(interaction.options.getString('message'))
    await interaction.reply({content: '🦴', ephemeral: true })
  }
}

export default Speak
