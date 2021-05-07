import { Command } from '@aeroware/aeroclient/dist/types';
import { MessageEmbed } from 'discord.js';

export default {
  name: 'embedmaker',
  category: 'Owner',
  minArgs: 1,
  usage:
    '<Title>^<Description>^<footer>^<[optional]color>^<[optional]thumbnail link>^<[optional]image link>',
  cooldown: 5,
  permissions: ['ADMINISTRATOR'],
  description: 'Customize an embedded message on the fly',
  async callback({ message, args }) {
    const channel = message.mentions.channels.first();
    if (channel == null) {
      return await message.channel.send('Specify a channel to send an embed');
    }
    args.shift();
    const arg = args.join(' ');
    const title = arg.split('^')[0];
    if (!title)
      return await message.channel.send('Specify a title for the embed!');
    const description = arg.split('^')[1];
    if (!description) {
      return await message.channel.send('Specify a description for the embed!');
    }
    const footer = arg.split('^')[2];
    if (!footer)
      return await message.channel.send('Specify a footer for the embed!');

    const color = `#${arg.split('^')[3]}`;
    const thumbnail = arg.split('^')[4];
    const image = arg.split('^')[5];

    if (![color, thumbnail, image]) {
      const embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setFooter(footer);
      channel.send(embed);
    } else if (![thumbnail, image]) {
      const embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setFooter(footer)
        .setColor(color);
      channel.send(embed);
    } else if (!image) {
      const embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setFooter(footer)
        .setColor(color)
        .setThumbnail(thumbnail);
      channel.send(embed);
    } else if ([color, thumbnail, image]) {
      const embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setFooter(footer)
        .setColor(color)
        .setThumbnail(thumbnail)
        .setImage(image);
      channel.send(embed);
    }
  },
} as Command;
