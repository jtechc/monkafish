import { Command } from '@aeroware/aeroclient/dist/types';
import { fight } from 'weky';

export default {
  name: 'fight',
  category: 'Games',
  minArgs: 1,
  usage: '<user>',
  cooldown: 5,
  description: 'Let two users dual against each other',
  callback({ message, client }) {
    const newFight = new fight({
      client: client,
      message: message,
      acceptMessage: 'Click to fight with ' + message.author.tag,
      challenger: message.author,
      opponent: message.mentions.users.first(),
    });
    newFight.start();
    console.log(`${message.author} has picked a fight.`);
  },
} as Command;
