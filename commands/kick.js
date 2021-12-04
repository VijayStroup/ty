import { SlashCommandBuilder} from  '@discordjs/builders'
const userMap = new Map()

const kick = {
    builder: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('kick a member.')
        .adduserOption(option =>
            option.setName('user')
                .setDescription('User to kick.')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('reason')
                .setDescription('Reason.')
                .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getMember('user')
        const reason = interaction.options.getString('reason')
        
        if (userMap.has(target.id)) {
            
            await interaction.reply({ content: `There is already a vote for <@${target.id}.`, ephemeral: true })

        } else {
            await interaction.reply({ content: `You started vote kick for user ${target.user.username} for reason ${reason}.`, ephemeral: true })

            await target.send(`People want to kick you for reason **${reason}**`)

            await message.channel.send(`Vote kick has started for <@${target.id}> for reason **${reason}**`)

            message.react('🦵')

            userMap.set(target.id, 0)
            
            const threshold = (await (await client.guilds.fetch(process.env.GUILD_ID)).members.fetch()).size * .5
            const message = await (await client.channels.fetch(packet.d.channel_id)).messages.fetch(packet.d.message_id)

            if (message.reactions.resolve('🦵') && !message.pinned && message.reactions.resolve('🦵').count >= threshold) {
                await target.roles.remove()

                const roles = interaction.guild.roles.cache
                const role = roles.find(role => role.name === 'readonly')
                await interaction.member.roles.add(role)
                
                await message.channel.send(`<@${target.id}> has been kicked.`)
                userMap.delete(target.id, 0)
            }
            
        }
    }
}


