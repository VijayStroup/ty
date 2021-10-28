import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageActionRow, MessageSelectMenu } from 'discord.js'

const options = [
  {
    label: 'Computer Science',
    description: '👨‍💻',
    value: 'ComputerScience'
  },
  {
    label: 'Psychology',
    description: '🤯',
    value: 'Psychology'
  },
  {
    label: 'Finance',
    description: '💰',
    value: 'Finance'
  },
  {
    label: 'Health Sciences',
    description: '⚕️',
    value: 'HealthSciences'
  },
  {
    label: 'Engineering',
    description: '📐',
    value: 'Engineering'
  },
  {
    label: 'Women Studies',
    description: '👯‍♀️',
    value: 'WomenStudies'
  },
  {
    label: 'Mathematics',
    description: '🧮',
    value: 'Mathematics'
  },
  {
    label: 'Business',
    description: '🏢',
    value: 'Business'
  },
]

const rolesMap = {
  ComputerScience: 'Computer Science',
  Psychology: 'Psychology',
  Finance: 'Finance',
  HealthSciences: 'Health Sciences',
  Engineering: 'Engineering',
  WomenStudies: 'Women Studies',
  Mathematics: 'Mathematics',
  Business: 'Business'
}

const rolesSet = new Set(Object.keys(rolesMap))

const Major = {
  builder: new SlashCommandBuilder()
    .setName('major')
    .setDescription('Select your majors.'),
  async execute(interaction) {
    const roles = interaction.guild.roles.cache

    const majorOptions = options

    for (const option of majorOptions) {
      const role = roles.find(role => role.name === rolesMap[option.value])
      option['default'] = false
      if (interaction.member.roles.resolve(role.id))
        option['default'] = true
    }

    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('major')
          .setPlaceholder('Select your majors.')
          .setMaxValues(3)
          .addOptions(majorOptions)
      )

    await interaction.reply({ content: 'Select majors to add.', components: [row], ephemeral: true })
  },
  async onSelect(interaction) {
    const roles = interaction.guild.roles.cache
    const valueSet = new Set(interaction.values)
    const notSelected = new Set([...rolesSet].filter(x => !valueSet.has(x)))

    // roles to add
    valueSet.forEach(async v => {
      const role = roles.find(role => role.name === rolesMap[v])
      await interaction.member.roles.add(role)
    })

    // roles to remove
    notSelected.forEach(async v => {
      const role = roles.find(role => role.name === rolesMap[v])
      await interaction.member.roles.remove(role)
    })

    await interaction.update({ content: `You are now part of the ${interaction.values.join(', ')} majors.`, components: [] })
  }
}

export default Major
