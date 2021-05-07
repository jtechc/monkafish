import { Command } from '@aeroware/aeroclient/dist/types';

export default {
  name: 'simjoin',
  category: 'Owner',
  minArgs: 0,
  usage: '',
  staffOnly: true,
  cooldown: 5,
  description: 'Simulate a guild member joining',
  callback({ message, args, client }) {
    const mem =
      message.mentions.members?.first() ||
      message.guild?.members.cache.get(args[0]);
    if (mem) client.emit('guildMemberAdd', mem);
    else message.channel.send('Invalid Guild Member');
  },
} as Command;
