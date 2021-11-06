import { SlashCommandBuilder } from '@discordjs/builders'

const ReadOnly = {
  builder: new SlashCommandBuilder()
    .setName('readonly')
    .setDescription('Set a user to readonly mode.')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('User to assign readonly to.')
        .setRequired(true)
    )
    .setDefaultPermission(false),
  roles: ['Admin'],
  members: ['841043611414954034'],
  async execute(interaction) {
    const target = interaction.options.getMember('user')
    const roles = interaction.guild.roles.cache

    await target.roles.add(roles.find(role => role.name === 'readonly'))

    await interaction.reply({ content: `${target.user.username} is now in readonly mode.` })
  }
}

export default ReadOnly
