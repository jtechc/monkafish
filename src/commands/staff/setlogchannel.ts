import { Command } from '@aeroware/aeroclient/dist/types';
import { MessageEmbed } from 'discord.js';
import logSchema from '../../schemas/logSchema';

export default {
  name: 'setlogchannel',
  category: 'Staff',
  minArgs: 1,
  usage: '<channel>',
  cooldown: 5,
  permissions: ['ADMINISTRATOR'],
  description: 'Set the log channel per guild',
  async callback({ message }) {
    try {
      const logChannel = message.mentions.channels.first();
      if (!logChannel) {
        await logSchema.findOneAndDelete({
          guildId: message.guild?.id,
        });
        const embed = new MessageEmbed()
          .setColor('RANDOM')
          .setTitle('Log Channel')
          .setDescription(`${message.author} changed Log Channel to \`None\``);

        message.channel.send(embed);
        return;
      }
      const logFind = await logSchema.findOne({
        guildId: message.guild?.id,
      });
      if (!logFind) {
        const newLog = new logSchema({
          guildId: message.guild?.id,
          channelId: logChannel.id,
        });
        await newLog
          .save()
          .catch((err) => message.reply(`There was an error: ${err.message}`));
      } else {
        await logSchema.findOneAndUpdate(
          {
            guildId: message.guild?.id,
          },
          {
            channelId: logChannel.id,
            guildId: message.guild?.id,
          },
          {
            upsert: true,
          }
        );
      }
      const embed2 = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Log Channel')
        .setDescription(
          `${message.author} changed Log Channel to ${logChannel}`
        );

      message.channel.send(embed2).catch(() => {
        ('');
      });
    } catch (e) {
      message.reply('`[❌]` Error. Please report!').catch(() => {
        ('');
      });
      console.log(e);
      return;
    }
  },
} as Command;
