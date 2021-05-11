import { Command } from '@aeroware/aeroclient/dist/types';
import { MessageAttachment } from 'discord.js';
import DIG from 'discord-image-generation';

export default {
  name: 'trash',
  category: 'Fun',
  minArgs: 1,
  usage: '<user>',
  cooldown: 5,
  description: 'Meme trash',
  async callback({ message }) {
    const user = message.mentions.users.first() || message.author;
    const avatar = user.displayAvatarURL({
      size: 1024,
      dynamic: false,
      format: 'png',
    });
    const img = await new DIG.Trash().getImage(avatar);
    const attach = new MessageAttachment(img, 'trash.png');
    message.channel.send(attach);
  },
} as Command;
