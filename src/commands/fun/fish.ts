import { Command } from '@aeroware/aeroclient/dist/types';
import { MessageEmbed } from 'discord.js';

export default {
  name: 'fish',
  category: 'Fun',
  minArgs: 0,
  usage: '',
  cooldown: 5,
  description: 'Fish a monkfish',
  callback({ message, args, client, text }) {
    const embed = new MessageEmbed()
      .setTitle('Fish caught!')
      .setColor('RANDOM')
      .setDescription('You have caught a monkafish!')
      .setThumbnail('https://i.imgur.com/caqSfyB.png');
    message.reply(embed);
  },
} as Command;
