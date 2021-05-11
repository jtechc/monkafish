import DIG from 'discord-image-generation';
import { MessageAttachment } from 'discord.js';
import { Command } from '@aeroware/aeroclient/dist/types';

export default {
  name: 'presentation',
  category: 'utility',
  minArgs: 1,
  usage: '<message>',
  cooldown: 5,
  description: 'Present some info using a Lisa Presentation Meme',
  async callback({ message, args }) {
    const messageContent = args.join(' ');
    const image = await new DIG.LisaPresentation().getImage(messageContent);
    const attach = new MessageAttachment(image, 'presentation.png');
    message.channel.send(attach);
  },
} as Command;
