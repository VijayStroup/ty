// Kiwi & Lemon
const users = ['864311867765686332', '653079222088106005', '259154320186933248']
const LearnReminder = {
  cronPattern: '0 * * * *', // every hour at minute 0
  channel: '💬｜general',
  async execute(channel) {
    for (const user of users)
      await channel.send(`Go learn how to code <@${user}>`)
  }
}

export default LearnReminder
