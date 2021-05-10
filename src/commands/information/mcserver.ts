import { Command } from '@aeroware/aeroclient/dist/types';
import util from 'minecraft-server-util';
import { MessageEmbed } from 'discord.js';

export default {
  name: 'mcserver',
  aliases: ['mc', 'mccheck', 'minecraft'],
  category: 'Info',
  minArgs: 2,
  usage: '<server IP> <server port[s]>',
  cooldown: 5,
  description: 'Get information on a minecraft server',
  callback({ message, args, client }) {
    if (!args[0])
      return message.channel.send('Please enter a minecraft server IP');
    if (!args[1])
      return message.channel.send('Please enter a minecraft server ports');

    util
      .status(args[0], { port: parseInt(args[1]) })
      .then((response) => {
        // console.log(response);
        const embed = new MessageEmbed()
          .setColor('#1E74BB')
          .setTitle('Mc server status')
          .addFields(
            { name: 'Server IP', value: response.host },
            { name: 'Online Players', value: response.onlinePlayers },
            { name: 'Max Players', value: response.maxPlayers },
            { name: 'Version', value: response.version }
          )
          .setFooter('Mc server util by Jaegnah');

        message.channel.send(embed);
      })
      .catch((error) => {
        message.channel.send('there was an error finding this server');
        client.logger.error(error);
      });
  },
} as Command;
