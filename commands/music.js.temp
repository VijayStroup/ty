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
    )
    .addSubcommand(subcommand =>
      subcommand.setName('skip').setDescription('Skip current song.')
    )
    .addSubcommand(subcommand =>
      subcommand.setName('pause').setDescription('Pause the current song.')
    )
    .addSubcommand(subcommand =>
      subcommand.setName('resume').setDescription('Resume the current song.')
    )
    .addSubcommand(subcommand =>
      subcommand.setName('queue').setDescription('Get the current queue.')
    )
    .addSubcommand(subcommand =>
      subcommand.setName('clearqueue').setDescription('Clear the queue.')
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
    case 'skip':
      try {
        await music.skip({ interaction: interaction })
        await interaction.editReply('Skipping the current song.')
      } catch (error) {
        await interaction.editReply({content: 'Nothing to skip.', ephemeral: true })
      }

      break
    case 'pause':
      try {
        await music.pause({ interaction: interaction })
        await interaction.editReply('Pausing the current song.')
      } catch (error) {
        await interaction.editReply({content: 'Nothing to pause.', ephemeral: true })
      }

      break
    case 'resume':
      try {
        await music.resume({ interaction: interaction })
        await interaction.editReply('Resuming current song.')
      } catch (error) {
        await interaction.editReply({content: 'Nothing to resume.', ephemeral: true })
      }

      break
    case 'queue': {
      try {
        const queue = await music.getQueue({ interaction: interaction })
        let msg = ''

        queue.forEach((q, i) => {
          msg += `${i+1}: ${q.info.title}\n`
        })

        interaction.editReply(`\`\`\`${msg}\`\`\``)
      } catch (error) {
        await interaction.editReply('The queue is empty.')
      }

      break
    }
    case 'clearqueue': {
      try {
        const queue = await music.getQueue({ interaction: interaction })
  
        for (let i; i < queue.length; i++) {
          await music.removeQueue({
            interaction: interaction,
            number: i+1 
          })
        }
  
        await interaction.editReply('The queue has been cleared.')
      } catch (error) {
        await interaction.editReply('The queue is empty.')
      }

      break
    }
    default:
      await interaction.editReply('Invalid subcommand.')
    }
  }
}

export default Music
