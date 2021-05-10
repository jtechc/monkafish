import { Command } from '@aeroware/aeroclient/dist/types';
import { MessageEmbed } from 'discord.js';
import { create } from 'sourcebin';
import { inspect } from 'util';

const embed = new MessageEmbed().setColor('GREEN').setTitle('Output');

export default {
  name: 'jseval',
  category: 'Owner',
  minArgs: 1,
  usage: '<code>',
  cooldown: 0,
  description: 'Evaluate Javascript code represented as a string',
  async callback({ message, args }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any;
    try {
      const data = args.join(' ').replace(/token/g, 'niceTry');
      let evaled = eval(data);

      if (evaled instanceof Promise) evaled = await evaled;

      evaled = typeof evaled !== 'string' ? inspect(evaled) : evaled;
      result = evaled
        .split(process.env.DISCORD_TOKEN)
        .join('[Hahahahaha, u tried to get the token, nice try]');
    } catch (error) {
      result = error.toString();
      embed.setColor('RED');
    }
    let response = result;
    if (response.length >= 2000) {
      let src;
      try {
        src = await create(
          [
            {
              name: 'Eval output',
              content: response,
              language: 'text',
            },
          ],
          {
            title: 'Eval response',
            description: 'Jaegnah#9999 - not that guy ',
          }
        );
      } catch (error) {
        response = response.slice(0, 1997) + '...';
        embed.setDescription(`\`\`\`\n${result}\`\`\``);

        return message.channel
          .send(embed)
          .catch(() => message.reply(`\`\`\`\n${result}\`\`\``));
      }

      return message.channel.send(
        `The output was too long so I have uploaded it to Sourcebin. You can find the response [here](${src.url})`
      );
    }

    embed.setDescription(`\`\`\`\n${result}\`\`\``);
    message.channel
      .send(embed)
      .catch(() => message.reply(`\`\`\`\n${result}\`\`\``));
  },
} as Command;
