import { SlashCommandBuilder } from '@discordjs/builders'
import music from '@koenie06/discord.js-music'

const Music = {
  builder: new SlashCommandBuilder()
    .setName('music')
    .setDescription('Music player.')
    .addSubcommand(subcommand =>
      subcommand.setName('play').setDescription('Play a song.')
        .addStringOption(option => 
          option.setName('url').setDescription('Url.').setRequired(true))
    )
    .addSubcommand(subcommand =>
      subcommand.setName('stop').setDescription('Stop playing.')
    ),
  channels: ['🎶｜music'],
  async execute(interaction) {
    if (!interaction.member.voice.channel) {
      await interaction.reply({content: 'You must be in a voice channel to use this command.', ephemeral: true })
      return
    }

    await interaction.deferReply()

    switch(interaction.options.getSubcommand()) {
    case 'play': {
      const url = interaction.options.getString('url')

      try {
        await music.play({
          interaction: interaction,
          channel: interaction.member.voice.channel,
          song: url
        })
        await interaction.editReply(`${url} has been added to queue.`)
      } catch (error) {
        await interaction.editReply(`Unable to play song from resource ${url}.`)
        return
      }

      break
    }
    case 'stop':
      try {
        await music.stop({ interaction: interaction })
        await interaction.editReply('Stopping music.')
      } catch (error) {
        await interaction.editReply({content: 'Nothing is currently playing.', ephemeral: true })
      }

      break
    default:
      await interaction.editReply('Invalid subcommand.')
    }
  }
}

export default Music
