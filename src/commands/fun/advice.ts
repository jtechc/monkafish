import { Command } from '@aeroware/aeroclient/dist/types';
import random from 'something-random-on-discord';

export default {
  name: 'advice',
  category: 'Fun',
  minArgs: 0,
  usage: '',
  cooldown: 5,
  description: 'Get some freshie advice',
  async callback({ message }) {
    const data = await random.getAdvice();
    message.channel.send(data);
  },
} as Command;
