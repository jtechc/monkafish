import { Command } from '@aeroware/aeroclient/dist/types';
import { MessageAttachment } from 'discord.js';
import fetch from 'node-fetch';

export default {
  name: 'stickbug',
  category: 'Fun',
  minArgs: 1,
  usage: '<user>',
  cooldown: 5,
  description: 'Get stickbugged lol',
  async callback({ message }) {
    const user = message.mentions.users.first() || message.author;
    const avatar = user.avatarURL({
      format: 'png',
      dynamic: false,
      size: 1024,
    });

    message.channel.send('`Loading...`');
    try {
      const res = await fetch(
        encodeURI(
          `https://nekobot.xyz/api/imagegen?type=stickbug&url=${avatar}`
        )
      );
      const vid = (await res.json()).message;
      const attachment = new MessageAttachment(vid, `${user.tag}-stickbug.mp4`);
      message.channel.send(attachment);
    } catch (err) {
      console.log(err);
    }
  },
} as Command;
