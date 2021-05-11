import { Command } from '@aeroware/aeroclient/dist/types';
import CustomEmbed from '../../utils/CustomEmbed';

export default {
  name: 'examplecustomembed',
  category: 'Staff',
  minArgs: 0,
  usage: '',
  cooldown: 5,
  description: 'Global footer declared in CustomEmbed.ts',
  callback({ message, args }) {
    const content = args.join(' ');
    const embed = new CustomEmbed()
      .setTitle('Check out this global footer!')
      .setDescription(`${content}`);
    message.channel.send(embed);
  },
} as Command;
