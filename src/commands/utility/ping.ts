import { Command } from '@aeroware/aeroclient/dist/types';
import { MessageEmbed } from 'discord.js';

export default {
  name: 'ping',
  category: 'utility',
  description: 'Find out what the bot latency is.',
  aliases: ['latency'],
  async callback({ message, client }) {
    const member = message.member;
    const msg = await message.reply('```Checking my ping to the server...```');
    const latency = msg.createdTimestamp - message.createdTimestamp;
    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('PONG! :ping_pong:')
      .setThumbnail(`${member?.user.displayAvatarURL({ dynamic: true })}`)
      .addFields(
        { name: 'Latency', value: `\`${latency}\`` },
        { name: 'API Latency', value: `\`${Math.round(client.ws.ping)}ms\`` }
      );
    await msg.delete();
    await message.channel.send(embed);
  },
} as Command;
