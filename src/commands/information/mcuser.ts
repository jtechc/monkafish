import { Command } from '@aeroware/aeroclient/dist/types';
import { MessageEmbed } from 'discord.js';
import mcapi from 'mcapi';

export default {
  name: 'mcuser',
  category: 'Information',
  minArgs: 1,
  usage: '<username>',
  cooldown: 5,
  description: 'Find information on a minecraft user!',
  async callback({ message, args, client, text }) {
    try {
      const uuid = await mcapi.usernameToUUID(`${args.join(' ')}`);
      const embed = new MessageEmbed()
        .setTitle(`User: ${args.join(' ')}`)
        .addField('Name:', `${args.join(' ')}`)
        .addField('UUID:', uuid)
        .addField(
          'Download:',
          `[Download](https://minotar.net/download/${args.join(' ')})`
        )
        .addField(
          'NameMC:',
          `[Click Here!](https://mine.ly/${args.join(' ')}.1)`
        )
        .setImage(
          `https://minecraftskinstealer.com/api/v1/skin/render/fullbody/${args.join(
            ' '
          )}/700`
        )
        .setColor('RANDOM')
        .setThumbnail(`https://minotar.net/cube/${args.join(' ')}/100.png`);
      message.channel.send(embed);
    } catch (e) {
      const embed2 = new MessageEmbed().setDescription(
        'That user was not able to be found :/'
      );
      message.channel.send(embed2);
    }
  },
} as Command;
