import { Command } from '@aeroware/aeroclient/dist/types';
import process from 'child_process';

export default {
  name: 'terminal',
  category: 'Owner',
  minArgs: 1,
  usage: '<command to run>',
  cooldown: 5,
  staffOnly: true,
  description: 'Use a terminal in discord chat!',
  async callback({ message, args }) {
    if (message.author.id === '132631391983632384') {
      const msg = await message.channel.send(
        'Please wait, this may take a while'
      );
      msg.delete({ timeout: 4000 });
      process.exec(args.join(' '), (error, stdout) => {
        const result = stdout || error;
        message.channel
          .send(result, { code: 'asciidoc', split: true })
          .catch(async (err) => await message.channel.send(err));
      });
    }
  },
} as Command;
