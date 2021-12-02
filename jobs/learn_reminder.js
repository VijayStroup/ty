const users = ['864311867765686332', '653079222088106005']
// Kiwi & Lemon
const LearnReminder = {
  cronPattern: '0 * * * *', // every hour at minute 0
  channel: '💬｜general',
  async execute(channel) {
    for (let user of users) {
      await channel.send(`Go learn how to code <@${user}>`)
    }
  }
}

export default LearnReminder
