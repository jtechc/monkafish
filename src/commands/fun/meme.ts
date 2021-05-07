import { Command } from '@aeroware/aeroclient/dist/types';
import axios from 'axios';
import { MessageEmbed } from 'discord.js';

export default {
  name: 'meme',
  category: 'Fun',
  minArgs: 0,
  usage: '',
  cooldown: 5,
  description: 'Sends a meme from le reddit',
  async callback({ message }) {
    try {
      let data;
      do data = await fetchMeme();
      while (data.nsfw);

      message.channel.send(
        new MessageEmbed()
          .setTitle(data.title)
          .setColor('RANDOM')
          .setURL(data.postLink)
          .setDescription(`From r/${data.subreddit}`)
          .setImage(data.url)
          .setFooter(`${data.ups} upvotes - by u/${data.author}`)
      );
    } catch (e) {
      message.channel.send('There was a problem with the API!');
    }
  },
} as Command;
async function fetchMeme() {
  return (await axios.get('https://meme-api.herokuapp.com/gimme')).data;
}
