import { Command } from '@aeroware/aeroclient/dist/types';
import { Canvas } from 'canvas';
import { MessageAttachment } from 'discord.js';

export default {
  name: 'toilet',
  category: 'Fun',
  minArgs: 1,
  usage: '<user>',
  cooldown: 5,
  description:
    'Ever imagine what it would look like if your profile picture was in a toilet?',
  async callback({ message }) {
    const member = message.mentions.members?.first() || message.member;
    const canvas = Canvas?.createCanvas(800, 600);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage(
      'https://i.imgur.com/yU9fSU7.jpg'
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await Canvas.loadImage(
      member?.user.displayAvatarURL({ format: 'jpg' })
    );
    ctx.drawImage(avatar, 135, 350, 205, 205);
    const attachment = new MessageAttachment(
      canvas.toBuffer(),
      `toilet_${member?.user.username}.jpg`
    );
    message.channel.send(attachment);
  },
} as Command;
