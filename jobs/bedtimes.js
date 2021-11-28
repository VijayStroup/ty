import moment from 'moment'

const bedtimes = {
  0: ['177940582226722816', '864311867765686332'],
  1: ['609330932431716353'],
  9: ['81187850996953088'],
  21: ['841043611414954034']
}

const Bedtimes = {
  cronPattern: '0 * * * *', // every hour at minute 0
  channel: '💬｜general',
  async execute(channel) {
    const hour = moment().tz('America/New_York').hour()

    if (bedtimes[hour]) {
      for (const id of bedtimes[hour])
        await channel.send(`go to cleep <@${id}>`)
    }
  }
}

export default Bedtimes
