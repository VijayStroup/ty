import { SlashCommandBuilder } from '@discordjs/builders'

const Warn = {
  builder: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a member.')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('User to warn.')
        .setRequired(true)
    )
    .addStringOption(option => 
      option.setName('reason')
        .setDescription('Reason.')
        .setRequired(true)),
  async execute(interaction) {
    const target = interaction.options.getMember('user')
    const reason = interaction.options.getString('reason')

    await target.send(`You have been warned from **[REDACTED]** for reason **${reason}**`)

    await interaction.reply({ content: `You have warned ${target.user.username} for reason ${reason}.`, ephemeral: true })
  }
}

export default Warn
