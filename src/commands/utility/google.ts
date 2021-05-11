import { Command } from '@aeroware/aeroclient/dist/types';
import Scraper from 'images-scraper';

const google = new Scraper({
  puppeteer: {
    headless: true,
  },
});

export default {
  name: 'google',
  category: 'utility',
  minArgs: 1,
  usage: '<search>',
  cooldown: 5,
  description: 'Search google for something',
  async callback({ message, args }) {
    const imageQuery = args.join(' ');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const imageResults: any = await google.scrape(imageQuery, 1);
    message.channel.send(imageResults[0].url);
  },
} as Command;
