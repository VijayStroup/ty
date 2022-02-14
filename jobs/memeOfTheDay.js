import axios from 'axios'

const url = 'https://meme-api.herokuapp.com/gimme'

const DogOfTheDay = {
  cronPattern: '0 18 * * *', // every day at 18:00
  channel: '🤣｜memes',
  async execute(channel) {
    const res = await axios.get(url)

    if (res.status !== 200) {
      console.error(`[${new Date().toString()}] Error getting meme of the day`)
      return
    }

    await channel.send({files: [res.data.url]})
  }
}

export default DogOfTheDay
