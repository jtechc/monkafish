import DIG from 'discord-image-generation';
import { MessageAttachment } from 'discord.js';
import { Command } from '@aeroware/aeroclient/dist/types';

export default {
  name: 'presentation',
  category: 'Utility',
  minArgs: 1,
  usage: '<message>',
  cooldown: 5,
  description: 'Present some info using a Lisa Presentation Meme',
  async callback({ message, text }) {
    const image = await new DIG.LisaPresentation().getImage(text);
    const attach = new MessageAttachment(image, 'presentation.png');
    message.channel.send(attach);
  },
} as Command;
