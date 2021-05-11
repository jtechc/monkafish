import { Command } from '@aeroware/aeroclient/dist/types';

export default {
  name: 'say',
  aliases: ['botsay'],
  description: 'Have the bot say whatever you want, man',
  args: true,
  minArgs: 1,
  permissions: ['MANAGE_MESSAGES'],
  usage: '<text>',
  cooldown: 5,
  category: 'utility',
  callback({ message, args }) {
    if (!args[0]) {
      message
        .reply(
          'Oh, you want me to say something.. right? Well tell me what then.'
        )
        .then(async (msg) => await msg.delete({ timeout: 5000 }));
      return 'invalid';
    } else {
      message.delete();
      message.channel.send(args.join(' '));
    }
  },
} as Command;
