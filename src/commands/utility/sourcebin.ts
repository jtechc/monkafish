import sb from 'sourcebin';
import { MessageEmbed } from 'discord.js';
import { Command } from '@aeroware/aeroclient/dist/types';

export default {
  name: 'sourcebin',
  category: 'utility',
  minArgs: 1,
  usage: '<code>',
  cooldown: 5,
  description: 'Automatically upload code to sourcebin',
  async callback({ message, args, client }) {
    const content = args.join(' ');
    if (!content)
      return message.reply(
        new MessageEmbed({
          title: 'Error Usage',
          description: `Usage: ${client.prefixes}sourcebin <code>`,
        })
      );

    const value = await sb.create([
      {
        name: 'Random Code',
        content,
        language: 'javascript',
      },
    ]);
    await message.reply(
      new MessageEmbed()
        .setTitle('Sourcebin')
        .setDescription(`Here is your code: ${value.url}`)
        .setColor('RANDOM')
        .setFooter(`Created By ${client.user?.tag}`)
    );
  },
} as Command;
