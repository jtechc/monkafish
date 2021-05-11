import { Command } from '@aeroware/aeroclient/dist/types';
import { parse } from 'twemoji-parser';
import Discord from 'discord.js';

export default {
  name: 'enlarge',
  aliases: ['enlarger', 'enlargen', 'big'],
  description: 'Take an emoji and make it a bit bigger',
  args: true,
  minArgs: 1,
  usage: '<emoji>',
  cooldown: 5,
  category: 'utility',
  async callback({ message, args }) {
    const Emoji = args[0];
    if (!Emoji) {
      message.reply('Please specify an emoji!');
      return 'invalid';
    }
    const custom = Discord.Util.parseEmoji(Emoji);

    try {
      if (custom?.id) {
        return message.channel.send(
          // eslint-disable-next-line prettier/prettier
          `https://cdn.discordapp.com/emojis/${custom?.id}.${custom?.animated ? 'gif' : 'png'
          }`
        );
      } else {
        const parsed = parse(Emoji, { assetType: 'png' });
        if (!parsed[0]) {
          message.reply(`Failed to enlarge ${Emoji}`);
          return 'invalid';
        }
        return await message.channel.send(parsed[0].url);
      }
    } catch (err) {
      message.reply(`I'm unable to enlarge this emoji: ${Emoji}`);
    }
  },
} as Command;
