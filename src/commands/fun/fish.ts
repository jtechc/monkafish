import { Command } from '@aeroware/aeroclient/dist/types';

export default {
  name: 'fish',
  category: 'Fun',
  minArgs: 0,
  usage: '',
  cooldown: 5,
  description: 'Fish a monkfish',
  callback({ message, args, client, text }) {
    message.reply('You have caught a monkafish');
  },
} as Command;
