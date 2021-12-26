const reactionRoleMap = {
  // TODO: Make reactions
}

const ReactionRolesAdd = {
  name: 'messageReactionAdd',
  async execute(reaction, user) {
    if (reaction.message.channel.name.equals('roles')) {
      if (await handleReaction(reaction)) {
        const role = findRole(reaction)
        if (role !== null) {
          user.roles.add(role)
        }
      }
    }
  }
}
const ReactionRolesRemove = {
  name: 'messageReactionRemove',
  async execute(reaction, user) {
    if (reaction.message.channel.name.equals('roles')) {
      if (await handleReaction(reaction)) {
        const role = findRole(reaction)
        if (role !== null) {
          user.roles.remove()
        }
      }
    }
  }
}

const findRole = reaction => {
  const roleName = reactionRoleMap[reaction.emoji.name]
  return reaction.guild.roles.cache.find(role => role.name === roleName)
}

const handleReaction = async reaction => {
  if (reaction.partial) {
    // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
    try {
      await reaction.fetch()
    } catch (error) {
      console.error('Something went wrong when fetching the message:', error)
      // Return as `reaction.message.author` may be undefined/null
      return false
    }
  }
  return true
}

export default {ReactionRolesRemove, ReactionRolesAdd}