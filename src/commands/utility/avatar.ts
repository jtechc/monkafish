import { Command } from '@aeroware/aeroclient/dist/types';
import { MessageEmbed } from 'discord.js';

export default {
  name: 'avatar',
  category: 'utility',
  minArgs: 1,
  usage: '<user>',
  cooldown: 5,
  description: 'Get a user profile picture with downloadable links',
  callback({ message }) {
    const user = message.mentions.users.first() || message.member?.user;

    const avatarembed = new MessageEmbed()
      .setTitle(`${user?.tag} Avatar`)
      .setColor('#11bed3')
      .setDescription(
        `
Link as:
- [png](${user?.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })})
- [jpg](${user?.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 })})
- [webp](${user?.displayAvatarURL({
          format: 'webp',
          dynamic: true,
          size: 1024,
        })})
`
      )

      .setImage(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        user!.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
      )
      .setFooter(
        `Requested By: ${message.author.tag}`,
        `${message.author.displayAvatarURL()}`
      )
      .setTimestamp();

    return message.channel.send(avatarembed);
  },
} as Command;
